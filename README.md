# 파도한의원 홈페이지

순수 HTML / CSS / JS로 만든 모바일 우선 반응형 정적 사이트입니다. 빌드 도구 없이 `index.html`을 브라우저로 열면 바로 확인할 수 있습니다.

## 폴더 구조

```
index.html          메인
about.html          한의원 소개 (콘셉트·차별점)
doctors.html        의료진
treatments.html     진료 안내 (8개 분야)
facility.html       시설 둘러보기
visit.html          진료시간·오시는 길·주차
reservation.html    예약·상담
pricing.html        비급여 안내 (사용하지 않으면 js/layout.js 메뉴에서 링크 삭제)
css/style.css       공통 스타일 (색상은 맨 위 :root 변수)
js/config.js        전화·링크·사업자 정보 설정 ← 가장 먼저 채워 주세요
js/layout.js        공통 헤더·푸터·하단 예약 바 (메뉴 수정은 여기서)
js/main.js          공통 스크립트
images/             사진·영상
```

## 1. 먼저 채울 것: `js/config.js`

| 항목 | 설명 |
|---|---|
| `landline` | 유선번호 |
| `businessNo` | 사업자등록번호 |
| `representative` | 대표자 |
| `links.naverBooking` | 네이버 예약 주소 |
| `links.naverTalk` | 네이버 톡톡 주소 |
| `links.kakaoChannel` | 카카오톡 채널 주소 |
| `links.blog` / `links.instagram` | 블로그, 인스타그램 |
| `links.naverMap` | 네이버 지도 주소 |

비워 두면 화면에 `[입력 필요]`로 표시되고, 링크 버튼은 "준비 중" 안내가 나옵니다.

## 2. 디자인 기준

- 레퍼런스 사이트(medicalo.co.kr)의 **구성**을 따랐습니다: 떠 있는 둥근 헤더, 큰 제목, 가로 카드 슬라이드, 라인업 리스트, 철학 타일, 숫자 띠, 하단 고정 예약 바. 문구와 이미지는 따로 만들었습니다.
- 색상은 **블루 / 화이트 / 블랙 글씨 + 월넛(목재) 포인트**만 사용합니다. `css/style.css` 맨 위 변수로 바꿉니다.
  - 블루 `--blue: #1f6fc2`, 로고 하늘색 `--blue-l: #58acf2`
  - 월넛 `--walnut: #4a3426`, 목재 `--wood: #b88b5e`
- 기본 글씨 18px, 전화·예약 버튼은 하단에 항상 표시됩니다.
- 레퍼런스에 있는 "전후 사진·후기" 영역은 의료광고 규정을 고려해 **시설 둘러보기**로 대체했습니다.

## 3. 사진·영상

### 지금 들어가 있는 임시 사진 (Unsplash)

아래 사진은 Unsplash 라이선스(상업적 이용 가능, 출처 표기 의무 없음)의 **임시 사진**입니다. 정식 오픈 전에 원내 사진으로 교체하는 것을 권장합니다. 사진 속 인물의 초상권 확인이 필요하고, 의료광고에서 환자처럼 보이는 사진은 오해를 줄 수 있기 때문입니다.

| 파일 | 용도 | 촬영자 (Unsplash) |
|---|---|---|
| `main-hero.jpg` | 메인 대표 이미지 (파도) | Francesco Ungaro |
| `treat-01-pain.jpg` | 비수술 통증치료 | Katherine Hanlon |
| `treat-02-chuna.jpg` | 추나요법 | Paige Madison |
| `treat-04-menopause.jpg` | 갱년기증후군 | Daiga Ellaby |
| `treat-05-lifting.jpg` | 리프팅·안면비대칭 | karelys Ruiz |
| `treat-06-diet.jpg` | 다이어트 | Olesya Sukhomlin |
| `treat-07-skinbooster.jpg` | 스킨부스터 | engin akyurt |
| `treat-08-craniosacral.jpg` | 두개천골약침 | Anna Blake |
| `diagnosis-herbs.jpg` | 한의학적 진단 | Bundo Kim |

교체 방법: **같은 파일명**으로 `images/`에 덮어쓰면 됩니다.

### 아직 비어 있는 자리 (회색 박스로 표시)

파일을 `images/`에 아래 이름으로 넣으면 자동으로 바뀝니다.

| 파일명 | 들어갈 곳 | 권장 비율 |
|---|---|---|
| `treat-03-traffic.jpg` | 교통사고 진료 | 4:3 |
| `doctor-1.jpg` / `doctor-2.jpg` / `doctor-3.jpg` | 원장 프로필 | 3:4 |
| `facility-01.jpg` ~ `facility-06.jpg` | 시설 갤러리 | 4:3 |
| `device-main.jpg` | 의료기기 타일 | 4:3 |
| `band-wide.jpg` | 와이드 이미지 띠 | 21:8 |
| `intro-video.mp4` / `intro-video-poster.jpg` | 소개 영상 / 대표 이미지 | 16:9 |
| `map.jpg` | 오시는 길 지도 | 4:3 |

### 로고

| 파일 | 설명 |
|---|---|
| `logo.png` | 헤더 로고 (심볼 + 파도한의원) — 적용됨 |
| `logo-full.png` | 영문 병기 포함 로고 — 보관용 |
| `logo-symbol.png` | 원형 심볼 — 보관용 |
| `favicon.png` | 브라우저 탭 아이콘 |

용량 권장: 사진은 한 장당 500KB~1MB 이하(가로 1600px 내외), 영상은 20MB 이하.

## 4. 문구 수정

- `[입력 필요]`(주황색 표시)가 직접 채워야 할 부분입니다. 검색(Ctrl+Shift+F)으로 `입력 필요`를 찾으면 한 번에 확인할 수 있습니다.
- `진료 안내`의 각 항목 본문은 **임시 문구**입니다(주황색 안내 표시). 원장님이 검수하고 수정해 주세요.
- 메인의 숫자(3 / 8 / 3)는 주력 분야, 진료 항목, 원장진 수입니다. 변경되면 `index.html`에서 수정합니다.

## 5. 의료광고 유의사항

문구를 수정하실 때 아래 표현은 사용하지 않도록 주의해 주세요. (최종 판단은 반드시 관련 규정과 심의 기준을 확인해 주세요.)

- 치료 효과 보장, 완치 등 단정적 표현
- "최고", "유일", "최초" 등 최상급·비교 표현
- 치료 전후 사진
- 환자 후기·체험담
- 근거 없는 수치나 가격 표시

## 6. 로컬에서 확인하기

`index.html`을 더블클릭하면 열립니다. 서버가 필요하면 폴더에서 `python -m http.server 8000` 실행 후 `http://localhost:8000` 으로 접속합니다.
