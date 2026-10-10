/* 파도한의원 — 공통 헤더·푸터·하단 예약 바
   모든 페이지에서 동일하게 쓰이므로 메뉴를 바꿀 때는 이 파일만 고치면 됩니다. */
(function () {
  "use strict";
  var page = document.body.getAttribute("data-page") || "";

  function cur(keys) { return keys.indexOf(page) !== -1 ? ' aria-current="page"' : ""; }

  var header =
    '<a class="skip" href="#main">본문 바로가기</a>' +
    '<header class="header"><div class="header__in">' +
      '<a class="logo" href="index.html" aria-label="파도한의원 홈"><img src="images/logo.png" alt="파도한의원"></a>' +
      '<nav class="nav" id="gnav" aria-label="주 메뉴"><ul>' +
        '<li class="has-sub"><a href="pain.html"' + cur(["pain"]) + '>난치성 통증</a><ul class="sub">' +
          '<li><a href="treatments.html#t1">비수술 통증치료</a></li>' +
          '<li><a href="treatments.html#t2">추나요법</a></li>' +
          '<li><a href="treatments.html#t3">교통사고 진료</a></li>' +
          '<li><a href="treatments.html#t8">두개천골약침</a></li></ul></li>' +
        '<li class="has-sub"><a href="menopause.html"' + cur(["menopause"]) + '>갱년기 증후군</a><ul class="sub">' +
          '<li><a href="treatments.html#t4">갱년기증후군</a></li>' +
          '<li><a href="treatments.html#t9">자율신경 (불면·이명)</a></li>' +
          '<li><a href="treatments.html#t10">초음파 검진</a></li></ul></li>' +
        '<li class="has-sub"><a href="beauty.html"' + cur(["beauty"]) + '>리프팅 · 다이어트</a><ul class="sub">' +
          '<li><a href="treatments.html#t5">리프팅·안면비대칭</a></li>' +
          '<li><a href="treatments.html#t6">다이어트</a></li>' +
          '<li><a href="treatments.html#t7">스킨부스터</a></li></ul></li>' +
        '<li><a href="cases.html"' + cur(["cases"]) + '>치료 사례</a></li>' +
        '<li class="has-sub"><a href="about.html"' + cur(["about", "doctors", "facility"]) + '>한의원 소개</a><ul class="sub">' +
          '<li><a href="about.html">콘셉트·차별점</a></li>' +
          '<li><a href="doctors.html">의료진</a></li>' +
          '<li><a href="facility.html">시설 둘러보기</a></li></ul></li>' +
        '<li class="has-sub"><a href="guide.html"' + cur(["guide", "visit", "reservation", "pricing"]) + '>처음 오시는 분</a><ul class="sub">' +
          '<li><a href="guide.html">진료 과정 · FAQ</a></li>' +
          '<li><a href="visit.html">진료시간 · 오시는 길</a></li>' +
          '<li><a href="reservation.html">예약 · 상담</a></li>' +
          '<li><a href="pricing.html">비급여 안내</a></li></ul></li>' +
      '</ul></nav>' +
      '<div class="header__cta">' +
        '<a class="header__tel" href="tel:01080182459">010-8018-2459</a>' +
        '<a class="pill pill--blue" href="reservation.html">예약 문의</a>' +
        '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="gnav">메뉴</button>' +
      '</div>' +
    '</div></header>';

  var footer =
    '<footer class="footer"><div class="wrap">' +
      '<div class="footer__grid">' +
        '<div>' +
          '<a class="logo" href="index.html"><img src="images/logo.png" alt="파도한의원"></a>' +
          '<p>서울시 송파구 석촌호수로 80, 3층</p>' +
          '<p>대표전화 <a href="tel:01080182459">010-8018-2459</a> · 유선 <span data-config="landline"></span></p>' +
          '<p>대표자 <span data-config="representative"></span></p>' +
          '<p>사업자등록번호 <span data-config="businessNo"></span></p>' +
        '</div>' +
        '<div><h2>진료시간</h2>' +
          '<p>평일·야간 09:00 ~ 20:30<br>(점심 12:40 ~ 14:00)</p>' +
          '<p>주말·공휴일 09:00 ~ 14:30<br>(점심시간 없음)</p></div>' +
        '<div><h2>바로가기</h2><div class="footer__links">' +
          '<a href="pain.html">난치성 통증</a><a href="menopause.html">갱년기 증후군</a>' +
          '<a href="beauty.html">리프팅·다이어트</a><a href="cases.html">치료 사례</a>' +
          '<a href="about.html">한의원 소개</a><a href="doctors.html">의료진</a>' +
          '<a href="guide.html">처음 오시는 분</a><a href="visit.html">오시는 길</a>' +
          '<a href="reservation.html">예약·상담</a><a href="pricing.html">비급여 안내</a>' +
          '<a data-link="blog" href="#">블로그</a><a data-link="instagram" href="#">인스타그램</a>' +
        '</div></div>' +
      '</div>' +
      '<p class="copy">© <span data-year>2026</span> 파도한의원. All rights reserved.</p>' +
    '</div></footer>';

  var dock =
    '<div class="dock" role="complementary" aria-label="빠른 예약 및 전화">' +
      '<p class="dock__msg">방문 전 예약 시 <strong>주차 문의</strong>를 꼭 해 주세요.</p>' +
      '<a class="dock__btn dock__tel" href="tel:01080182459">전화하기</a>' +
      '<a class="dock__btn dock__book" data-link="naverBooking" href="#">예약 문의</a>' +
      '<a class="dock__ic" data-link="naverTalk" href="#" aria-label="네이버 톡톡">톡톡</a>' +
      '<a class="dock__ic" data-link="kakaoChannel" href="#" aria-label="카카오톡 채널">카톡</a>' +
    '</div>';

  var h = document.getElementById("site-header");
  var f = document.getElementById("site-footer");
  if (h) { h.outerHTML = header; }
  if (f) { f.outerHTML = footer + dock; }
})();
