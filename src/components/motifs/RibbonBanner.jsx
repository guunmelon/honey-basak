import { C } from '../../lib/tokens';
import { useSafeId } from '../../hooks/useSafeId';

// 패키지 좌상단의 “물결치는 빨간 리본 + 두 톤 손글씨” 원칙을 재구성
const BAND = 'M22 36 C 102 16, 182 46, 262 26 C 302 16, 330 12, 350 14 L 346 76 C 324 74, 296 78, 256 88 C 176 108, 98 80, 18 98 Z';
const GLOSS = 'M32 43 C 108 25, 186 53, 262 33 C 300 23, 326 19, 340 21';
const TEXT_PATH = 'M 34 76 C 110 58, 188 84, 262 64 C 300 54, 326 50, 346 50';

/** 물결 리본 배너 — 첫 단어는 버터 옐로, 나머지는 크림색 손글씨가 리본의 굴곡을 따라 흐름 */
export default function RibbonBanner({ first = '달콤~한', rest = '꿀이 사르르', title, fontSize = 31, ...props }) {
  const id = useSafeId('ribbon');
  return (
    <svg viewBox="-8 0 392 120" overflow="visible" role="img" aria-label={title ?? `${first} ${rest}`} {...props}>
      <defs>
        <path id={`${id}-p`} d={TEXT_PATH} />
      </defs>
      <path d="M28 40 L -2 50 L 11 71 L -5 94 L 21 97 Z" fill={C.berry600} stroke={C.cocoa900} strokeWidth="3" strokeLinejoin="round" />
      <path d="M342 16 L 378 11 L 361 44 L 381 73 L 342 77 Z" fill={C.berry600} stroke={C.cocoa900} strokeWidth="3" strokeLinejoin="round" />
      <path d={BAND} transform="translate(0 6)" fill={C.cocoa900} opacity="0.28" />
      <path d={BAND} fill={C.berry500} stroke={C.cocoa900} strokeWidth="3.2" strokeLinejoin="round" />
      <path d={GLOSS} stroke="#fff" strokeOpacity="0.38" strokeWidth="3" fill="none" strokeLinecap="round" />
      <text fontFamily="Gaegu, Jua, cursive" fontWeight="700" fontSize={fontSize} letterSpacing="-0.5" stroke={C.berry600} strokeWidth="1" paintOrder="stroke">
        <textPath href={`#${id}-p`} startOffset="50%" textAnchor="middle">
          <tspan fill={C.butter300}>{first}</tspan>
          <tspan fill={C.cream} dx="8">
            {rest}
          </tspan>
        </textPath>
      </text>
    </svg>
  );
}
