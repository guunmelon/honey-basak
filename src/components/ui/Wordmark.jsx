import { motion } from 'framer-motion';
import { cx } from '../../lib/cx';

/** 히어로 로고타입: 글자마다 튀어 오르는 등장 + 호버 시 젤리처럼 흔들림 */
export default function Wordmark({ text = '허니바삭', className, delay = 0, as = 'h1', label, ...rest }) {
  const Tag = as;
  return (
    <Tag className={cx('select-none font-display text-display-xl tracking-[-0.03em] text-cocoa-900', className)} aria-label={label ?? text} {...rest}>
      {Array.from(text).map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          aria-hidden="true"
          data-char={ch}
          className="outlined-letter inline-block cursor-default"
          initial={{ y: 110, opacity: 0, rotate: (i % 2 ? 1 : -1) * 14 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 380, damping: 15, delay: delay + i * 0.085 }}
          whileHover={{ y: -16, rotate: (i % 2 ? 1 : -1) * 9, scale: 1.06, transition: { type: 'spring', stiffness: 520, damping: 9 } }}
          whileTap={{ y: -10, scale: 0.94 }}
        >
          {ch}
        </motion.span>
      ))}
    </Tag>
  );
}
