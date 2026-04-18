# Spark Claw — Landing Site

스파크랩의 AI 네이티브 1인 창업자 전문 프로그램 **Spark Claw**의 프로모션 및 사전 모집용 랜딩 페이지.
_The bilingual (KO / EN) landing page for SparkLabs' accelerator for AI-native solo founders._

---

## 구조 / Structure

```
sparkclaw-site/
├── index.html       # 메인 페이지 (모든 섹션)
├── styles.css       # 스타일시트 (Light + Accent 톤)
├── script.js        # i18n 토글, FAQ 아코디언, 폼 핸들러
├── favicon.svg
├── vercel.json      # Vercel 설정 (clean URLs, 보안 헤더)
├── .gitignore
└── README.md
```

정적 파일만으로 구성되어 별도의 빌드 단계가 필요 없습니다. (No build step required.)

---

## 로컬에서 확인하기 / Run locally

가장 간단한 방법은 Python의 기본 정적 서버를 이용하는 것입니다.

```bash
cd sparkclaw-site
python3 -m http.server 5173
# 브라우저에서 http://localhost:5173 접속
```

또는 Node 환경이라면:

```bash
npx serve .
```

---

## 배포 방법 / Deploy

### 1. GitHub 저장소 생성 & 푸시

```bash
cd sparkclaw-site
git init
git add .
git commit -m "Initial commit: Spark Claw landing"
git branch -M main
git remote add origin https://github.com/<your-org>/sparkclaw-site.git
git push -u origin main
```

### 2. Vercel에 연결

1. https://vercel.com/new 에서 위에서 만든 저장소를 import
2. **Framework Preset**: `Other` (정적 사이트)
3. **Build Command**: 비워둠
4. **Output Directory**: 비워둠 (루트가 곧 배포 루트)
5. Deploy 클릭

배포 후 Vercel 대시보드 → Settings → Domains 에서 커스텀 도메인(예: `sparkclaw.sparklabs.co.kr`)을 연결합니다.

---

## 이메일 구독 폼 연결 / Email signup wiring

기본 상태에서는 폼이 **로컬 성공 UI만 표시**합니다 (실제 전송 X).
실제 이메일 수집을 하려면 `index.html`의 `form action`을 본인의 엔드포인트로 교체하세요.

### 옵션 A — Formspree (추천)
1. https://formspree.io 에서 폼을 생성하면 `https://formspree.io/f/XXXXXXXX` 형태의 엔드포인트 발급
2. `index.html` 에서 다음 한 줄만 교체:
   ```html
   <form class="notify__form" action="https://formspree.io/f/REPLACE_ME" method="POST">
   ```
   → `REPLACE_ME` 부분을 본인 Form ID로 변경

### 옵션 B — Web3Forms, Getform 등
Formspree 호환 엔드포인트를 제공하는 서비스라면 동일하게 `action` URL만 교체하면 됩니다.

### 옵션 C — Mailchimp / ConvertKit / Substack
해당 서비스가 제공하는 임베드 폼 HTML로 `<form>` 블록을 통째로 교체합니다.

---

## 다국어 관리 / Editing translations

모든 번역은 `script.js` 상단의 `dict` 객체에서 한 곳에 모아 관리합니다.

```js
const dict = {
  ko: { /* 한국어 카피 */ },
  en: { /* English copy */ }
};
```

- HTML 요소에 `data-i18n="hero.title.line1"` 같은 점(.) 기반 키가 붙어 있고, 토글 시 해당 키의 문자열로 교체됩니다.
- `data-i18n-placeholder` 는 `<input placeholder>`에만 적용됩니다.
- `<em>`, `<strong>`, `<br>`, `<span>` 은 번역 문자열 안에서 그대로 렌더링됩니다.

사용자의 언어 선택은 `localStorage`(`sparkclaw.lang`)에 저장되어 다음 방문 시 유지됩니다.

---

## 디자인 토큰 / Design tokens

`styles.css` 상단 `:root` 에서 일괄 변경 가능합니다.

```css
--bg:     #FAF8F3;   /* 배경 */
--ink:    #0C0C0C;   /* 본문 텍스트 */
--accent: #E8441C;   /* Spark Claw 액센트 */
```

---

## 접근성 & SEO 체크리스트

- [x] 시맨틱 HTML (`<main>`, `<nav>`, `<section>`, `<footer>`)
- [x] `prefers-reduced-motion` 대응 애니메이션
- [x] `aria-expanded`, `aria-pressed` 상태 관리
- [x] 한국어/영어 전환 시 `<html lang>` 업데이트
- [x] Open Graph 기본 메타
- [ ] 실제 OG 이미지 추가 (배포 전 권장)
- [ ] `og:url` 을 최종 배포 도메인으로 수정

---

## License

© 2026 SparkLabs. All rights reserved.
