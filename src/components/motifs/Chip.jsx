import { useMemo } from 'react';
import { chipBlob, rng } from '../../lib/geometry';
import { C } from '../../lib/tokens';
import { useSafeId } from '../../hooks/useSafeId';

/** 감자칩 — 시드별로 실루엣·굴곡·시즈닝 점이 달라지는 벡터 칩 */
export default function Chip({ seed = 1, glaze = true, title, ...rest }) {
  const id = useSafeId('chip');
  const data = useMemo(() => {
    const rand = rng(seed * 97 + 13);
    const outline = chipBlob(seed, 100, 80, 84, 62, 11, 0.13);
    const ridges = [0, 1, 2, 3].map((i) => {
      const y = 36 + i * 27 + (rand() - 0.5) * 6;
      const a = (rand() - 0.5) * 18;
      return `M2 ${y} C 50 ${y - 14 + a}, 92 ${y + 12 - a}, 132 ${y - 4} S 186 ${y + 8}, 200 ${y - 2}`;
    });
    const spots = Array.from({ length: 5 }, () => ({
      cx: 40 + rand() * 120, cy: 34 + rand() * 92, rx: 4 + rand() * 8, ry: 3 + rand() * 4, r: rand() * 180,
    }));
    const specks = Array.from({ length: 18 }, () => ({
      cx: 28 + rand() * 144, cy: 30 + rand() * 100, r: 0.9 + rand() * 1.4, light: rand() > 0.5,
    }));
    return { outline, ridges, spots, specks };
  }, [seed]);

  return (
    <svg viewBox="0 0 200 160" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} {...rest}>
      <defs>
        <radialGradient id={`${id}-g`} cx="40%" cy="34%" r="72%">
          <stop offset="0%" stopColor="#FFF2BF" />
          <stop offset="42%" stopColor="#F9D26C" />
          <stop offset="82%" stopColor="#EDB04A" />
          <stop offset="100%" stopColor="#D9953A" />
        </radialGradient>
        <clipPath id={`${id}-c`}>
          <path d={data.outline} />
        </clipPath>
      </defs>
      <path d={data.outline} fill={`url(#${id}-g)`} />
      <g clipPath={`url(#${id}-c)`}>
        {data.ridges.map((d, i) => (
          <g key={i}>
            <path d={d} fill="none" stroke="#C4832C" strokeOpacity="0.3" strokeWidth="5" strokeLinecap="round" />
            <path d={d} transform="translate(0 -5)" fill="none" stroke="#FFF7DA" strokeOpacity="0.55" strokeWidth="2.4" strokeLinecap="round" />
          </g>
        ))}
        {data.spots.map((s, i) => (
          <ellipse key={i} cx={s.cx} cy={s.cy} rx={s.rx} ry={s.ry} transform={`rotate(${s.r} ${s.cx} ${s.cy})`} fill="#C77F2A" opacity="0.22" />
        ))}
        {data.specks.map((s, i) => (
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={s.light ? '#FFF6D2' : '#8E5A22'} opacity={s.light ? 0.9 : 0.45} />
        ))}
        {glaze && (
          <>
            <path d="M50 44 C 74 30, 110 27, 140 36" fill="none" stroke="#fff" strokeOpacity="0.75" strokeWidth="7" strokeLinecap="round" />
            <circle cx="153" cy="43" r="4" fill="#fff" opacity="0.7" />
          </>
        )}
      </g>
      <path d={data.outline} fill="none" stroke={C.cocoa900} strokeWidth="3.6" strokeLinejoin="round" />
    </svg>
  );
}
