/* 파도한의원 — 공통 스크립트 (순수 JS). layout.js 다음에 로드됩니다. */
(function () {
  "use strict";
  var SITE = window.SITE || { links: {} };
  var TODO = "[입력 필요]";

  /* 1) 설정값(config.js) 채우기 -------------------------------------------- */
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
      el.setAttribute("data-todo", "1");
    }
  });

  /* 2) 준비 중인 링크 안내 -------------------------------------------------- */
  var timer;
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[data-todo]");
    if (!a) return;
    e.preventDefault();
    var t = document.querySelector(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.appendChild(t); }
    t.textContent = "준비 중입니다. 전화로 문의해 주세요: " + (SITE.phone || "");
    t.hidden = false;
    clearTimeout(timer);
    timer = setTimeout(function () { t.hidden = true; }, 3600);
  });

  /* 3) 사진 자리: 파일이 없으면 회색 안내 박스로 전환 -------------------------- */
  document.querySelectorAll(".media > img").forEach(function (img) {
    function empty() { img.parentNode.classList.add("is-empty"); }
    if (img.complete && img.naturalWidth === 0) { empty(); }
    img.addEventListener("error", empty);
  });
  /* 영상 자리: images 폴더에 영상이 있으면 교체 */
  document.querySelectorAll(".media[data-video]").forEach(function (box) {
    var v = document.createElement("video");
    v.preload = "metadata"; v.playsInline = true; v.controls = true;
    v.addEventListener("loadeddata", function () {
      box.classList.remove("is-empty");
      box.textContent = "";
      box.appendChild(v);
    });
    v.src = box.getAttribute("data-video");
  });

  /* 4) 모바일 메뉴 -------------------------------------------------------- */
  var toggle = document.querySelector(".menu-btn");
  var nav = document.getElementById("gnav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "닫기" : "메뉴";
    });
  }

  /* 5) 가로 슬라이드 화살표 -------------------------------------------------- */
  document.querySelectorAll("[data-rail-for]").forEach(function (nv) {
    var rail = document.getElementById(nv.getAttribute("data-rail-for"));
    if (!rail) return;
    nv.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-dir]");
      if (!b) return;
      var step = (rail.firstElementChild ? rail.firstElementChild.getBoundingClientRect().width : 320) + 20;
      rail.scrollBy({ left: Number(b.getAttribute("data-dir")) * step, behavior: "smooth" });
    });
  });

  /* 6) 진료 라인업 필터 ------------------------------------------------------ */
  var bar = document.querySelector("[data-filter-bar]");
  if (bar) {
    var rows = document.querySelectorAll("[data-cat]");
    bar.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-filter]");
      if (!b) return;
      bar.querySelectorAll("button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
      var f = b.getAttribute("data-filter");
      rows.forEach(function (r) {
        r.hidden = !(f === "all" || r.getAttribute("data-cat").split(" ").indexOf(f) !== -1);
      });
    });
  }

  /* 6-2) 카테고리 탭 (랜딩) -------------------------------------------------- */
  document.querySelectorAll("[data-tabs]").forEach(function (box) {
    var tabs = box.querySelectorAll('[role="tab"]');
    var panels = box.querySelectorAll('[role="tabpanel"]');
    function show(id) {
      tabs.forEach(function (t) { t.setAttribute("aria-selected", String(t.getAttribute("aria-controls") === id)); });
      panels.forEach(function (p) { p.hidden = p.id !== id; });
    }
    tabs.forEach(function (t) {
      t.addEventListener("click", function () { show(t.getAttribute("aria-controls")); });
    });
    var first = tabs[0];
    if (first) { show(first.getAttribute("aria-controls")); }
  });

  /* 7) 연도 ----------------------------------------------------------------- */
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
