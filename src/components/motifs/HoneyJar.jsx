import { C } from '../../lib/tokens';
import { hexPath } from '../../lib/geometry';
import { useSafeId } from '../../hooks/useSafeId';

const JAR = 'M36 66 C 22 74, 16 96, 16 124 C 16 164, 40 188, 80 188 C 120 188, 144 164, 144 124 C 144 96, 138 74, 124 66 Z';

/** 꿀단지 — 천 뚜껑 + 헥사곤 라벨 */
export default function HoneyJar({ title, label = true, ...rest }) {
  const id = useSafeId('jar');
  return (
    <svg viewBox="0 0 160 200" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} {...rest}>
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFD35C" />
          <stop offset="45%" stopColor="#F2A51E" />
          <stop offset="100%" stopColor="#C97506" />
        </linearGradient>
        <linearGradient id={`${id}-s`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={C.honey700} stopOpacity="0.45" />
          <stop offset="22%" stopColor={C.honey700} stopOpacity="0" />
          <stop offset="78%" stopColor={C.honey700} stopOpacity="0" />
          <stop offset="100%" stopColor={C.honey700} stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <path d={JAR} fill={`url(#${id}-g)`} />
      <path d={JAR} fill={`url(#${id}-s)`} />
      <path d="M26 88 C 50 97, 110 97, 134 88" stroke="#FFE08A" strokeWidth="3" opacity="0.8" fill="none" strokeLinecap="round" />
      {label && (
        <>
          <path d={hexPath(80, 130, 31, 6)} fill={C.cream} stroke={C.cocoa900} strokeWidth="3" />
          <text x="80" y="128" textAnchor="middle" fontFamily="Fraunces Variable, Georgia, serif" fontWeight="800" fontSize="13" fill={C.cocoa900}>
            HONEY
          </text>
          <text x="80" y="142" textAnchor="middle" fontFamily="Fraunces Variable, Georgia, serif" fontWeight="600" fontSize="8.5" letterSpacing="1.6" fill={C.honey700}>
            ACACIA
          </text>
        </>
      )}
      <path d="M33 100 C 27 122, 29 146, 41 164" stroke="#fff" strokeOpacity="0.7" strokeWidth="7" fill="none" strokeLinecap="round" />
      <circle cx="40" cy="89" r="4" fill="#fff" opacity="0.85" />
      <path d={JAR} fill="none" stroke={C.cocoa900} strokeWidth="3.6" strokeLinejoin="round" />
      <rect x="40" y="52" width="80" height="18" rx="6" fill="#F4B23A" stroke={C.cocoa900} strokeWidth="3.4" />
      <path d="M96 66 C 96 78, 92 84, 92 94 C 92 103, 105 103, 105 94 C 105 84, 101 78, 101 66 Z" fill="#F2A51E" stroke={C.cocoa900} strokeWidth="3" strokeLinejoin="round" />
      <circle cx="96" cy="93" r="2" fill="#fff" opacity="0.8" />
      <path
        d="M28 54 C 26 40, 38 30, 52 30 L 108 30 C 122 30, 134 40, 132 54 C 124 60, 118 50, 110 56 C 102 62, 96 52, 88 58 C 80 64, 72 52, 64 58 C 56 62, 50 52, 42 58 C 36 62, 32 56, 28 54 Z"
        fill={C.cream}
        stroke={C.cocoa900}
        strokeWidth="3.4"
        strokeLinejoin="round"
      />
      {[
        [46, 40], [62, 38], [78, 40], [94, 38], [110, 40], [54, 48], [70, 47], [86, 48], [102, 47], [118, 48],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill={C.honey400} opacity="0.8" />
      ))}
      <path d="M30 50 C 60 58, 100 58, 130 50" stroke={C.cocoa600} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M36 52 c -12 -9 -18 4 -7 7 c 4 1 7 -3 7 -7 z M36 52 c 3 -13 15 -9 10 0 c -2 3 -6 2 -10 0 z" fill={C.berry500} stroke={C.cocoa900} strokeWidth="2.4" strokeLinejoin="round" />
    </svg>
  );
}
