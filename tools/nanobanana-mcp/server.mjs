#!/usr/bin/env node
/*
  Nano Banana (Gemini image generation) MCP server for the Pado homepage.

  - Zero dependencies (Node 18+). Speaks MCP over stdio.
  - Only the slots listed in SLOTS can be generated. Doctor photos, facility photos,
    maps and treatment-case photos are intentionally NOT allowed (they must be real).
  - The API key is read from the GEMINI_API_KEY environment variable. If the app was
    started before the variable was set, it is read from the Windows user environment.
    The key is never printed, logged or written to disk.
  - Output is resized and saved as images/<slot>.jpg by tools/import-image.ps1.

  CLI usage (no MCP needed):
    node tools/nanobanana-mcp/server.mjs --list
    node tools/nanobanana-mcp/server.mjs --generate <slot> "<english prompt>" [--model <id>]
*/
import { spawnSync, execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import os from "node:os";
import readline from "node:readline";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..", "..");
const IMPORT_PS1 = join(ROOT, "tools", "import-image.ps1");
const DEFAULT_MODEL = process.env.NANOBANANA_MODEL || "gemini-3.1-flash-image";
const API = "https://generativelanguage.googleapis.com/v1beta/models";

/** Slots that may be generated with AI. Everything else is refused. */
const SLOTS = {
  "treat-03-traffic": { ratio: "4:3", size: "1K", use: "Treatment card: traffic accident care (mood image, no people/vehicles/plates)" },
  "band-wide": { ratio: "21:9", size: "2K", use: "Wide band on the landing page (calm sea, brand blue)" },
  "intro-video-poster": { ratio: "16:9", size: "2K", use: "Poster image for the intro video (wave)" },
};

const BLOCKED = /(원장|의사|한의사|환자|전후|비포|애프터|후기|before\s*[\/&]?\s*after|doctor|physician|patient|nurse|testimonial|\bface\b|\bfaces\b|portrait|selfie)/i;
const GUARD = " Photorealistic. No text, no letters, no logos, no watermarks, no people, no faces, no hands.";

function getKey() {
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY.trim();
  if (process.platform === "win32") {
    try {
      const out = execFileSync("reg", ["query", "HKCU\\Environment", "/v", "GEMINI_API_KEY"], { encoding: "utf8", windowsHide: true });
      const m = out.match(/REG_(?:EXPAND_)?SZ\s+(.+)/);
      if (m) return m[1].trim();
    } catch { /* fall through */ }
  }
  throw new Error("GEMINI_API_KEY is not set. Run: setx GEMINI_API_KEY \"<your key>\"");
}

function listSlots() {
  return Object.entries(SLOTS).map(([slot, s]) => `${slot}  ratio=${s.ratio}  size=${s.size}  — ${s.use}`).join("\n");
}

async function generate({ slot, prompt, model }) {
  const cfg = SLOTS[slot];
  if (!cfg) {
    throw new Error(`Slot "${slot}" is not allowed for AI generation. Allowed slots:\n${listSlots()}`);
  }
  if (typeof prompt !== "string" || prompt.trim().length < 10 || prompt.length > 1500) {
    throw new Error("prompt must be a string of 10-1500 characters (English recommended).");
  }
  if (BLOCKED.test(prompt)) {
    throw new Error("The prompt mentions people, medical staff, patients or before/after content, which is not allowed for AI images on this site.");
  }
  const useModel = model || DEFAULT_MODEL;
  if (!/^[a-z0-9.\-]+$/i.test(useModel)) throw new Error("Invalid model id.");

  const body = {
    contents: [{ parts: [{ text: prompt.trim() + GUARD }] }],
    generationConfig: {
      responseModalities: ["IMAGE"],
      imageConfig: { aspectRatio: cfg.ratio, imageSize: cfg.size },
    },
  };
  const res = await fetch(`${API}/${useModel}:generateContent`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-goog-api-key": getKey() },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = json?.error?.message || res.statusText;
    throw new Error(`Gemini API error ${res.status}: ${String(msg).slice(0, 400)}`);
  }
  const parts = json?.candidates?.[0]?.content?.parts || [];
  const img = parts.find((p) => p.inlineData?.data || p.inline_data?.data);
  if (!img) {
    const why = json?.candidates?.[0]?.finishReason || json?.promptFeedback?.blockReason || "no image returned";
    const text = parts.map((p) => p.text).filter(Boolean).join(" ").slice(0, 300);
    throw new Error(`No image was returned (${why}). ${text}`.trim());
  }
  const data = (img.inlineData || img.inline_data).data;
  const mime = (img.inlineData || img.inline_data).mimeType || (img.inlineData || img.inline_data).mime_type || "image/png";
  const ext = mime.includes("jpeg") ? "jpg" : "png";

  const dir = join(os.tmpdir(), "pado-gen");
  mkdirSync(dir, { recursive: true });
  const raw = join(dir, `${slot}-${Date.now()}.${ext}`);
  writeFileSync(raw, Buffer.from(data, "base64"));

  const ps = spawnSync(
    "powershell.exe",
    ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", IMPORT_PS1, "-Source", raw, "-Slot", slot],
    { encoding: "utf8", windowsHide: true },
  );
  if (ps.status !== 0) throw new Error(`Image import failed: ${(ps.stderr || ps.stdout || "").slice(0, 400)}`);

  return `Generated with ${useModel} (${cfg.ratio}, ${cfg.size}). ${ps.stdout.trim()}\nRaw output: ${raw}`;
}

/* ------------------------------ CLI mode ------------------------------ */
async function cli(argv) {
  if (argv[0] === "--list") { console.log(listSlots()); return; }
  if (argv[0] === "--generate") {
    const slot = argv[1];
    const prompt = argv[2];
    const mi = argv.indexOf("--model");
    const model = mi > -1 ? argv[mi + 1] : undefined;
    console.log(await generate({ slot, prompt, model }));
    return;
  }
  console.error("Usage: --list | --generate <slot> \"<prompt>\" [--model <id>]");
  process.exitCode = 1;
}

/* ------------------------------ MCP mode ------------------------------ */
const TOOLS = [
  {
    name: "list_slots",
    description: "List the image slots that may be generated with AI for the Pado homepage, with aspect ratio and purpose.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "generate_image",
    description:
      "Generate an image with Gemini (Nano Banana) and save it to images/<slot>.jpg. Only allowed slots work (see list_slots). " +
      "Prompts must not contain people, doctors, patients or before/after content.",
    inputSchema: {
      type: "object",
      properties: {
        slot: { type: "string", description: "Slot name, e.g. treat-03-traffic" },
        prompt: { type: "string", description: "Scene description, English recommended" },
        model: { type: "string", description: "Optional Gemini image model id" },
      },
      required: ["slot", "prompt"],
      additionalProperties: false,
    },
  },
];

function send(msg) { process.stdout.write(JSON.stringify(msg) + "\n"); }
const ok = (id, result) => send({ jsonrpc: "2.0", id, result });
const fail = (id, code, message) => send({ jsonrpc: "2.0", id, error: { code, message } });

async function handle(msg) {
  const { id, method, params } = msg;
  if (method === "initialize") {
    return ok(id, {
      protocolVersion: params?.protocolVersion || "2024-11-05",
      capabilities: { tools: {} },
      serverInfo: { name: "pado-nanobanana", version: "1.0.0" },
    });
  }
  if (method === "ping") return ok(id, {});
  if (method === "tools/list") return ok(id, { tools: TOOLS });
  if (method === "tools/call") {
    const name = params?.name;
    try {
      if (name === "list_slots") return ok(id, { content: [{ type: "text", text: listSlots() }] });
      if (name === "generate_image") {
        const text = await generate(params?.arguments || {});
        return ok(id, { content: [{ type: "text", text }] });
      }
      return fail(id, -32602, `Unknown tool: ${name}`);
    } catch (e) {
      return ok(id, { isError: true, content: [{ type: "text", text: String(e.message || e) }] });
    }
  }
  if (id !== undefined && id !== null) return fail(id, -32601, `Method not found: ${method}`);
  /* notifications (no id) are ignored */
}

const args = process.argv.slice(2);
if (args.length) {
  cli(args).catch((e) => { console.error(String(e.message || e)); process.exitCode = 1; });
} else {
  const rl = readline.createInterface({ input: process.stdin });
  rl.on("line", (line) => {
    if (!line.trim()) return;
    let msg;
    try { msg = JSON.parse(line); } catch { return; }
    handle(msg).catch((e) => { if (msg.id != null) fail(msg.id, -32603, String(e.message || e)); });
  });
}
