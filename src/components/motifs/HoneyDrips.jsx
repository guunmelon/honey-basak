import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { dripPath, rng } from '../../lib/geometry';
import { C } from '../../lib/tokens';

/**
 * 꿀이 흘러내리는 가장자리 — 섹션 경계, 버튼, 카드 호버에 재사용
 * pour: 진입 시 흘러내리는 애니메이션 / idle: 천천히 늘어지는 루프
 */
export default function HoneyDrips({
  className,
  color = C.honey400,
  shade = C.honey600,
  height = 150,
  band = 26,
  count = 16,
  seed = 3,
  pour = false,
  delay = 0,
  idle = true,
  width = 1440,
  gloss = true,
}) {
  const drips = useMemo(() => {
    const rand = rng(seed);
    return Array.from({ length: count }, (_, i) => {
      const slot = width / count;
      const x = slot * (i + 0.5) + (rand() - 0.5) * slot * 0.55;
      const len = 16 + rand() * (height - band - 30);
      const w = 7 + rand() * 9;
      return { x, len, w, d: rand() };
    });
  }, [seed, count, height, band, width]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMin slice" className={className} aria-hidden="true" focusable="false">
      <rect x="0" y="0" width={width} height={band + 4} fill={shade} />
      {drips.map((dp, i) => (
        <motion.g
          key={i}
          initial={pour ? { scaleY: 0 } : false}
          animate={{ scaleY: 1 }}
          transition={{ delay: delay + dp.d * 0.9, duration: 1.2, ease: [0.55, 0, 0.45, 1] }}
          style={{ originY: 0 }}
        >
          <g className={idle ? 'animate-drip svg-origin-top' : undefined} style={{ animationDelay: `${(-dp.d * 3.4).toFixed(2)}s` }}>
            <path d={dripPath(dp.x, band, dp.len, dp.w)} transform="translate(0 4)" fill={shade} />
            <path d={dripPath(dp.x, band, dp.len, dp.w)} fill={color} />
            {gloss && (
              <ellipse cx={dp.x - dp.w * 0.38} cy={band + dp.len - dp.w * 1.25} rx={dp.w * 0.26} ry={dp.w * 0.46} fill="#fff" opacity="0.6" />
            )}
          </g>
        </motion.g>
      ))}
      <rect x="0" y="0" width={width} height={band} fill={color} />
      {gloss && <rect x="0" y={band * 0.3} width={width} height="3" fill="#fff" opacity="0.35" />}
    </svg>
  );
}
