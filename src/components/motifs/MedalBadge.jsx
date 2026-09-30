import { motion } from 'framer-motion';
import { C } from '../../lib/tokens';
import { scallopPath } from '../../lib/geometry';
import { useSafeId } from '../../hooks/useSafeId';

const ROSETTE = scallopPath(100, 100, 80, 22, 0.06);
const R = 69;
const RING = `M100 100 m -${R} 0 a ${R} ${R} 0 1 1 ${R * 2} 0 a ${R} ${R} 0 1 1 -${R * 2} 0`;

/** 금메달 로제트 배지 — ringRotate(MotionValue)로 스크롤 회전 */
export default function MedalBadge({
  label = '국내산 감자',
  value = '100',
  unit = '%',
  ringText = 'KOREAN POTATO • 100% • CRISPY • GOLDEN • ',
  ribbon = C.berry500,
  ringRotate,
  title,
  ...rest
}) {
  const id = useSafeId('medal');
  return (
    <svg viewBox="0 0 200 232" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} {...rest}>
      <defs>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFE38F" />
          <stop offset="50%" stopColor="#F4AE2F" />
          <stop offset="100%" stopColor="#D98A12" />
        </linearGradient>
        <path id={`${id}-ring`} d={RING} />
      </defs>
      <path d="M72 148 L50 224 L68 212 L80 229 L102 160 Z" fill={ribbon} stroke={C.cocoa900} strokeWidth="3.4" strokeLinejoin="round" />
      <path d="M128 148 L150 224 L132 212 L120 229 L98 160 Z" fill={ribbon} stroke={C.cocoa900} strokeWidth="3.4" strokeLinejoin="round" />
      <path d="M73 150 L68 168 L92 160 Z" fill="#000" opacity="0.18" />
      <path d="M127 150 L132 168 L108 160 Z" fill="#000" opacity="0.18" />
      <path d={ROSETTE} fill={`url(#${id}-gold)`} stroke={C.cocoa900} strokeWidth="3.6" strokeLinejoin="round" />
      <motion.g style={ringRotate ? { rotate: ringRotate } : undefined} className="svg-origin-center">
        <circle cx="100" cy="100" r="88" fill="none" />
        <text fontFamily="Fraunces Variable, Georgia, serif" fontWeight="700" fontSize="11.5" fill={C.cocoa900}>
          <textPath href={`#${id}-ring`} startOffset="0" textLength={Math.round(2 * Math.PI * R - 6)} lengthAdjust="spacing">
            {ringText}
          </textPath>
        </text>
      </motion.g>
      <circle cx="100" cy="100" r="60" fill={C.cream} stroke={C.cocoa900} strokeWidth="3.2" />
      <circle cx="100" cy="100" r="53" fill="none" stroke={C.honey400} strokeWidth="2.8" strokeDasharray="0.5 7.5" strokeLinecap="round" />
      <text x="100" y="86" textAnchor="middle" fontFamily="Jua, sans-serif" fontSize="17" fill={C.cocoa900}>
        {label}
      </text>
      <text x={unit ? 94 : 100} y="131" textAnchor="middle" fontFamily="Fraunces Variable, Georgia, serif" fontWeight="900" fontSize="44" letterSpacing="-1" fill={C.cocoa900}>
        {value}
      </text>
      {unit && (
        <text x={94 + value.length * 12.5} y="116" textAnchor="start" fontFamily="Fraunces Variable, Georgia, serif" fontWeight="800" fontSize="20" fill={C.berry500}>
          {unit}
        </text>
      )}
    </svg>
  );
}
