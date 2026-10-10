/* 파도한의원 — 공통 스크립트 (순수 JS) */
(function () {
  "use strict";
  var SITE = window.SITE || { links: {} };
  var TODO = "[입력 필요]";

  /* 1) 설정값 채우기 ------------------------------------------------------- */
  document.querySelectorAll("[data-config]").forEach(function (el) {
    var v = SITE[el.getAttribute("data-config")];
    if (v) { el.textContent = v; } else { el.textContent = TODO; el.classList.add("todo"); }
  });

  document.querySelectorAll("[data-link]").forEach(function (el) {
    var url = (SITE.links || {})[el.getAttribute("data-link")];
    if (url) {
      el.setAttribute("href", url);
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    } else {
      el.setAttribute("href", "#");
      el.classList.add("is-todo");
      el.setAttribute("data-todo", "1");
    }
  });

  document.querySelectorAll("[data-tel]").forEach(function (el) {
    var v = SITE[el.getAttribute("data-tel")];
    if (v) { el.setAttribute("href", "tel:" + v.replace(/[^0-9+]/g, "")); }
    else { el.setAttribute("href", "#"); el.classList.add("is-todo"); el.setAttribute("data-todo", "1"); }
  });

  /* 2) 준비 중 링크 안내 ---------------------------------------------------- */
  var toastTimer;
  function toast(msg) {
    var t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, 3600);
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-todo]");
    if (!a) return;
    e.preventDefault();
    toast("준비 중입니다. 전화로 문의해 주세요: " + (SITE.phone || ""));
  });

  /* 3) 이미지·영상 자리: images 폴더에 파일이 있으면 자동 교체 ------------------- */
  function fill(box, node) {
    box.classList.add("is-filled");
    box.textContent = "";
    box.appendChild(node);
  }
  document.querySelectorAll(".ph[data-src], .ph[data-video]").forEach(function (box) {
    var label = (box.getAttribute("data-label") || "").trim();
    var src = box.getAttribute("data-src");
    var vid = box.getAttribute("data-video");
    if (src) {
      var img = new Image();
      img.alt = label;
      img.onload = function () { if (!box.querySelector("video")) fill(box, img); };
      img.src = src;
    }
    if (vid) {
      var v = document.createElement("video");
      v.preload = "metadata"; v.playsInline = true;
      if (box.hasAttribute("data-controls")) { v.controls = true; }
      else { v.muted = true; v.loop = true; v.autoplay = true; }
      v.addEventListener("loadeddata", function () { fill(box, v); if (v.autoplay) { v.play().catch(function () {}); } });
      v.src = vid;
    }
  });

  /* 로고 이미지 */
  document.querySelectorAll(".logo__img[data-src]").forEach(function (el) {
    var probe = new Image();
    probe.onload = function () { el.src = probe.src; el.classList.add("is-on"); };
    probe.src = el.getAttribute("data-src");
  });

  /* 4) 모바일 메뉴 -------------------------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("gnav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "닫기" : "메뉴";
    });
  }

  /* 5) 진료 라인업 필터 (메인) ---------------------------------------------- */
  var bar = document.querySelector("[data-filter-bar]");
  if (bar) {
    var cards = document.querySelectorAll("[data-cat]");
    bar.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-filter]");
      if (!b) return;
      bar.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      var f = b.getAttribute("data-filter");
      cards.forEach(function (c) {
        c.hidden = !(f === "all" || c.getAttribute("data-cat").split(" ").indexOf(f) !== -1);
      });
    });
  }

  /* 6) 연도 ----------------------------------------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
