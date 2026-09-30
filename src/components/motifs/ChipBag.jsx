import { useMemo } from 'react';
import { C } from '../../lib/tokens';
import { hexPath } from '../../lib/geometry';
import { useSafeId } from '../../hooks/useSafeId';
import { FLAVORS } from '../../data/content';
import Chip from './Chip';
import Basaki from './Basaki';
import HoneyJar from './HoneyJar';
import ButterCube from './ButterCube';
import MedalBadge from './MedalBadge';
import RibbonBanner from './RibbonBanner';

const BODY = 'M22 48 C 13 150, 11 370, 22 472 L 338 472 C 349 370, 347 150, 338 48 Z';
const WINDOW = hexPath(180, 160, 98, 16);

function crimpPath(y0, y1, up) {
  const x0 = 16;
  const x1 = 344;
  const n = 24;
  const w = (x1 - x0) / n;
  const d = 8;
  let p;
  if (up) {
    p = `M${x0} ${y1} L${x0} ${y0 + d}`;
    for (let i = 0; i < n; i++) p += ` L${(x0 + w * (i + 0.5)).toFixed(1)} ${y0} L${(x0 + w * (i + 1)).toFixed(1)} ${y0 + d}`;
    p += ` L${x1} ${y1} Z`;
  } else {
    p = `M${x0} ${y0} L${x0} ${y1 - d}`;
    for (let i = 0; i < n; i++) p += ` L${(x0 + w * (i + 0.5)).toFixed(1)} ${y1} L${(x0 + w * (i + 1)).toFixed(1)} ${y1 - d}`;
    p += ` L${x1} ${y0} Z`;
  }
  return p;
}
const CRIMP_TOP = crimpPath(6, 56, true);
const CRIMP_BOTTOM = crimpPath(464, 514, false);

/**
 * 허니바삭 제품 봉지 (가상 패키지) — 패키지의 레이아웃 원칙을 새로 조합:
 * 손글씨 스티커(좌상) · 메달(우상) · 헥사곤 창 속 칩 · 거대한 로고타입 · 캐릭터와 재료(하단)
 */
export default function ChipBag({ flavor = FLAVORS[0], title, detail = true, medal = true, ...rest }) {
  const id = useSafeId('bag');
  const t = flavor.tint;
  const label = title ?? `허니바삭 ${flavor.name} 봉지 일러스트`;
  const ridges = useMemo(() => Array.from({ length: 40 }, (_, i) => 20 + i * 8.1), []);

  return (
    <svg viewBox="0 0 360 520" role="img" aria-label={label} {...rest}>
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={t.from} />
          <stop offset="100%" stopColor={t.to} />
        </linearGradient>
        <radialGradient id={`${id}-light`} cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-side`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={C.cocoa900} stopOpacity="0.3" />
          <stop offset="12%" stopColor={C.cocoa900} stopOpacity="0" />
          <stop offset="86%" stopColor={C.cocoa900} stopOpacity="0" />
          <stop offset="100%" stopColor={C.cocoa900} stopOpacity="0.34" />
        </linearGradient>
        <linearGradient id={`${id}-gloss`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-win`} cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#FFE9A8" />
          <stop offset="100%" stopColor={t.window} />
        </radialGradient>
        <clipPath id={`${id}-clip`}>
          <path d={BODY} />
        </clipPath>
        <clipPath id={`${id}-wclip`}>
          <path d={WINDOW} />
        </clipPath>
        <pattern id={`${id}-hex`} width="28" height="50" patternUnits="userSpaceOnUse">
          <path d="M14 33L0 25V8L14 0l14 8v17L14 33v17M14 0v17L0 25v17l14 8 14-8V25L14 17" fill="none" stroke={C.cocoa900} strokeOpacity="0.08" strokeWidth="1.6" />
        </pattern>
      </defs>

      {/* ── 봉지 몸통 ── */}
      <path d={BODY} fill={`url(#${id}-body)`} />
      <g clipPath={`url(#${id}-clip)`}>
        <rect x="0" y="40" width="360" height="440" fill={`url(#${id}-hex)`} />
        <ellipse cx="180" cy="210" rx="190" ry="210" fill={`url(#${id}-light)`} />

        {/* 헥사곤 창 — 속이 들여다보이는 칩 */}
        <path d={WINDOW} fill={`url(#${id}-win)`} />
        <g clipPath={`url(#${id}-wclip)`}>
          <g transform="rotate(-16 214 142)">
            <Chip seed={7} x="150" y="84" width="130" height="104" />
          </g>
          <g transform="rotate(10 130 150)">
            <Chip seed={3} x="70" y="104" width="136" height="109" />
          </g>
          <g transform="rotate(-6 196 210)">
            <Chip seed={11} x="118" y="160" width="150" height="120" />
          </g>
          <path d="M70 120 C 110 96, 142 150, 184 122 S 252 96, 292 128" stroke={C.honey500} strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d="M70 120 C 110 96, 142 150, 184 122 S 252 96, 292 128" stroke={C.honey700} strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.25" transform="translate(0 4)" />
          <path d="M78 114 C 110 96, 140 142, 180 118" stroke="#fff" strokeOpacity="0.65" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
        <path d={WINDOW} fill="none" stroke={C.cocoa900} strokeWidth="19" strokeLinejoin="round" />
        <path d={WINDOW} fill="none" stroke={C.cream} strokeWidth="11.5" strokeLinejoin="round" />

        {/* 리본 배너 카피 */}
        <g transform="rotate(-10 104 96)">
          <RibbonBanner x="18" y="66" width="182" height="56" fontSize={33} aria-hidden="true" title="" />
        </g>

        {/* 로고타입 */}
        <g fontFamily="Jua, sans-serif" fontSize="78" textAnchor="middle" letterSpacing="-2">
          <text x="180" y="330" transform="translate(0 7)" fill={C.cocoa900} stroke={C.cocoa900} strokeWidth="15" strokeLinejoin="round">
            허니바삭
          </text>
          <text x="180" y="330" fill={C.cocoa900} stroke={C.cream} strokeWidth="12" strokeLinejoin="round" paintOrder="stroke">
            허니바삭
          </text>
        </g>

        {/* 맛 리본 */}
        <path d="M84 350 H276 L263 366 L276 382 H84 L97 366 Z" fill={t.ribbon} stroke={C.cocoa900} strokeWidth="3.2" strokeLinejoin="round" />
        <text x="180" y="373" textAnchor="middle" fontFamily="Jua, sans-serif" fontSize="18" fill={C.cream}>
          {flavor.short}
        </text>
        <text x="180" y="402" textAnchor="middle" fontFamily="Fraunces Variable, Georgia, serif" fontWeight="700" fontSize="11" letterSpacing="3.2" fill={C.cocoa700}>
          HONEY BUTTER CRISPS
        </text>

        {detail && (
          <>
            <Basaki x="12" y="382" width="104" height="108" mood="happy" withBee={false} />
            <ButterCube x="200" y="410" width="80" height="72" flag={false} />
            <HoneyJar x="262" y="384" width="72" height="90" label={false} />
          </>
        )}
        <text x="118" y="456" fontFamily="Fraunces Variable, Georgia, serif" fontWeight="600" fontSize="10" letterSpacing="1" fill={C.cocoa700}>
          NET {flavor.weight}
        </text>

        {/* 봉지 광택/음영 */}
        <rect x="0" y="40" width="360" height="440" fill={`url(#${id}-side)`} />
        <rect x="54" y="60" width="14" height="400" rx="7" fill={`url(#${id}-gloss)`} />
        <rect x="76" y="80" width="5" height="360" rx="2.5" fill={`url(#${id}-gloss)`} />
        <rect x="300" y="70" width="8" height="380" rx="4" fill={`url(#${id}-gloss)`} opacity="0.6" />
      </g>
      <path d={BODY} fill="none" stroke={C.cocoa900} strokeWidth="4" strokeLinejoin="round" />

      {/* ── 실링(톱니) ── */}
      {[CRIMP_TOP, CRIMP_BOTTOM].map((d, i) => (
        <g key={i}>
          <path d={d} fill={t.to} />
          <clipPath id={`${id}-cr${i}`}>
            <path d={d} />
          </clipPath>
          <g clipPath={`url(#${id}-cr${i})`}>
            {ridges.map((x) => (
              <line key={x} x1={x} x2={x} y1={i ? 462 : 0} y2={i ? 520 : 58} stroke={C.cocoa900} strokeOpacity="0.16" strokeWidth="2" />
            ))}
            <rect x="0" y={i ? 470 : 10} width="360" height="6" fill="#fff" opacity="0.3" />
          </g>
          <path d={d} fill="none" stroke={C.cocoa900} strokeWidth="3.6" strokeLinejoin="round" />
          <line x1="24" x2="336" y1={i ? 478 : 42} y2={i ? 478 : 42} stroke={C.cocoa900} strokeOpacity="0.35" strokeWidth="2" strokeDasharray="4 5" />
        </g>
      ))}

      {detail && medal && <MedalBadge x="252" y="46" width="96" height="111" />}
    </svg>
  );
}
