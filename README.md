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
pricing.html        비급여 안내 (사용하지 않으면 메뉴/푸터 링크와 함께 삭제)
css/style.css       공통 스타일 (색상은 :root 변수)
js/config.js        전화·링크·사업자 정보 설정 ← 가장 먼저 채워 주세요
js/main.js          공통 스크립트
images/             사진·영상 (아래 목록 참고)
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

## 2. 사진·영상 넣는 법

`images/` 폴더에 **아래 파일명 그대로** 저장하면 회색 박스가 자동으로 해당 파일로 바뀝니다. 코드 수정은 필요 없습니다.

| 파일명 | 들어갈 곳 | 권장 비율 |
|---|---|---|
| `logo.png` | 로고 (투명 배경 PNG, 높이 40px 기준) | 가로형 |
| `main-hero.jpg` / `main-hero.mp4` | 메인 대표 이미지 / 영상 | 16:10 |
| `about-concept.jpg` | 콘셉트 이미지 | 4:3 |
| `intro-video.mp4` | 소개 영상 | 16:9 |
| `intro-video-poster.jpg` | 소개 영상 대표 이미지 | 16:9 |
| `doctor-1.jpg` | 박신형 원장 프로필 | 3:4 |
| `doctor-2.jpg` | 원장 2 프로필 | 3:4 |
| `doctor-3.jpg` | 원장 3 프로필 | 3:4 |
| `treat-01-pain.jpg` | 비수술 통증치료 | 3:2 |
| `treat-02-chuna.jpg` | 추나요법 | 3:2 |
| `treat-03-traffic.jpg` | 교통사고 진료 | 3:2 |
| `treat-04-menopause.jpg` | 갱년기증후군 | 3:2 |
| `treat-05-lifting.jpg` | 리프팅·안면비대칭 | 3:2 |
| `treat-06-diet.jpg` | 다이어트 | 3:2 |
| `treat-07-skinbooster.jpg` | 스킨부스터 | 3:2 |
| `treat-08-craniosacral.jpg` | 두개천골약침 | 3:2 |
| `facility-01.jpg` ~ `facility-06.jpg` | 시설 갤러리 6장 (접수·진료실·치료실·의료기기·상담실·입구) | 4:3 |
| `map.jpg` | 오시는 길 지도 | 4:3 |

참고
- 비율이 달라도 자동으로 잘라서 채워지지만, 권장 비율에 맞추면 가장 깔끔합니다.
- 용량: 사진은 한 장당 500KB~1MB 이하(가로 1600px 내외), 영상은 20MB 이하를 권장합니다.
- 시설 갤러리 칸 이름은 `facility.html`의 `figcaption`에서 수정합니다.

## 3. 문구 수정

`[입력 필요]`(주황색 표시)로 되어 있는 곳이 직접 채워야 할 부분입니다. 검색(Ctrl+Shift+F)으로 `입력 필요`를 찾으면 한 번에 확인할 수 있습니다.

주요 입력 항목: 원장 2·3 성함과 약력, 진료 항목별 상세 설명, 오시는 길(지하철역·출구·도보 시간), 주차료 지원 조건, 휴진일, 비급여 항목·비용, 사업자 정보, 소개 문구.

## 4. 의료광고 유의사항

문구를 수정하실 때 아래 표현은 사용하지 않도록 주의해 주세요. (최종 판단은 반드시 관련 규정과 심의 기준을 확인해 주세요.)

- 치료 효과 보장, 완치 등 단정적 표현
- "최고", "유일", "최초" 등 최상급·비교 표현
- 치료 전후 사진
- 환자 후기·체험담
- 근거 없는 수치나 가격 표시

## 5. 색상 변경

`css/style.css` 맨 위 `:root`의 변수만 바꾸면 전체 톤이 바뀝니다. 모래색 배경을 쓰지 않으려면 `--c-sand: #ffffff;` 로 바꿔 주세요.

## 6. 로컬에서 확인하기

`index.html`을 더블클릭하거나, 폴더에서 `python -m http.server 8000` 실행 후 `http://localhost:8000` 으로 접속합니다.

## 7. 배포 (참고)

정적 사이트이므로 GitHub Pages, Netlify 등에서 무료로 호스팅할 수 있습니다. 비공개 저장소의 GitHub Pages 사용 가능 여부는 계정 요금제에 따라 다르니 배포 전에 확인해 주세요.
