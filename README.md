# 허니바삭 HONEY BASAK — 인터랙티브 브랜드 랜딩 페이지

허니버터칩 패키지의 디자인 원칙을 재해석한 **가상 스낵 브랜드** 사이트입니다.
React 19 · Tailwind CSS v4 · Framer Motion · Vite. 외부 이미지 없이 모든 그래픽을 CSS/SVG로 그렸습니다.

**🍯 라이브 데모 → [https://guunmelon.github.io/honey-basak/](https://guunmelon.github.io/honey-basak/)**

## 실행

```bash
npm install
npm run dev              # 개발 서버 http://localhost:5173
npm run build            # 프로덕션 빌드 → dist/
npm run preview          # 빌드 미리보기 http://localhost:4173
```

## 배포 (GitHub Pages)

`main` 브랜치에 push하면 GitHub Actions([`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml))가
`npm ci → npm run build`로 빌드한 뒤 `dist/`를 GitHub Pages에 배포합니다. Actions 탭의 **Run workflow**로 수동 실행도 됩니다.

- `vite.config.js`의 `base: './'`(상대 경로) 덕분에 저장소 이름을 바꾸거나 커스텀 도메인을 연결해도 에셋 경로가 깨지지 않습니다.
- 저장소를 포크해 새로 배포할 때는 **Settings → Pages → Source**를 **GitHub Actions**로 한 번 지정해 주세요.

### 단일 HTML 파일 (오프라인)

`honey-basak-standalone.html` 한 파일에 JS·CSS·서브셋 폰트가 모두 들어 있어 더블클릭만으로 열립니다.
다시 만들려면:

```bash
pip install fonttools brotli
# google/fonts 저장소의 원본 TTF(Jua-Regular, Gaegu-Bold, GowunDodum-Regular)를 한 폴더에 받아 두고
python3 scripts/build-standalone-fonts.py <TTF 폴더>
npm run build:standalone && cp dist-standalone/index.html honey-basak-standalone.html
```

## 구조

```
src/
├─ index.css                 # 디자인 토큰(@theme), 패턴 유틸리티, 키프레임, 모션 감소
├─ App.jsx                   # 프로바이더 + 섹션 조립
├─ data/content.js           # 브랜드 카피·맛·가격·스토리 데이터
├─ lib/                      # tokens(SVG용 색상), geometry(헥사곤·칩·드립 경로), sound(WebAudio), flyToCart
├─ context/                  # MotionPrefs · AppState(장바구니·쿠폰·사운드·토스트) · Pointer · SectionTheme
├─ hooks/                    # useFx(모션 감소 대응 스크롤 변환) · useMedia · useSafeId
└─ components/
   ├─ motifs/                # ChipBag · Basaki · Bee · Chip · HoneyJar · ButterCube · HoneyDipper
   │                         # MedalBadge · RibbonBanner · HoneyDrips · Hex · Potato · Sparkle · LogoMark
   ├─ ui/                    # HoneyButton · HexIconButton · StickerCard · Modal · Toaster · HexMeter …
   ├─ layout/                # Navbar · MobileMenu · BackgroundStage · Marquee · CartDrawer · ScrollHoneyJar · Footer
   └─ sections/              # Hero · World · Flavors(+Card/Modal) · Lab · Features · Story(+Scene) · CTA
```

디자인 시스템 상세는 [DESIGN.md](./DESIGN.md)를 참고하세요.

> 포트폴리오용 가상 브랜드이며 실제 제품·회사와 관련이 없습니다. 폰트: SIL Open Font License 1.1.
