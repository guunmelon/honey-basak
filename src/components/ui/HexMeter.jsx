import { motion } from 'framer-motion';
import { C } from '../../lib/tokens';
import { HEX_D } from '../motifs/Hex';

/** 벌집 칸으로 표현한 수치 미터 (맛 지표·실험실 게이지) */
export default function HexMeter({ value, max = 5, color = C.honey400, label, size = 18, className }) {
  return (
    <span role="img" aria-label={`${label} ${max}점 중 ${value}점`} className={className ?? 'inline-flex gap-[3px]'}>
      {Array.from({ length: max }, (_, i) => {
        const on = i < value;
        return (
          <svg key={i} viewBox="0 0 100 100" width={size} height={size} aria-hidden="true" className="overflow-visible">
            <motion.path
              d={HEX_D}
              stroke={C.cocoa900}
              strokeWidth="10"
              initial={false}
              animate={{ fill: on ? color : 'rgba(255,253,244,0.6)', scale: on ? 1 : 0.86 }}
              transition={{ type: 'spring', stiffness: 500, damping: 18, delay: on ? i * 0.03 : 0 }}
              className="svg-origin-center"
            />
          </svg>
        );
      })}
    </span>
  );
}
