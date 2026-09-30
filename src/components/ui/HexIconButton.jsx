import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cx, mergeClasses } from '../../lib/cx';
import { C } from '../../lib/tokens';
import { HEX_D } from '../motifs/Hex';

const SIZE = { sm: 'size-10', md: 'size-12', lg: 'size-14' };

/** 헥사곤 아이콘 버튼 — 호버 시 30° 회전(flat → pointy)하며 꿀색으로 채워짐 */
const HexIconButton = forwardRef(function HexIconButton(
  { label, pressed, size = 'md', tone = 'cream', className, children, badge, ...props },
  ref,
) {
  const on = pressed === true;
  const fill = on ? C.honey400 : tone === 'cocoa' ? C.cocoa800 : C.cream;
  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      title={label}
      className={mergeClasses(cx('group/hex relative grid shrink-0 place-items-center outline-offset-2', SIZE[size]), className)}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      <span aria-hidden="true" className="absolute inset-0" style={{ filter: `drop-shadow(0 3.5px 0 ${C.cocoa900})` }}>
        <motion.svg
          viewBox="0 0 100 100"
          className="size-full overflow-visible"
          variants={{ rest: { rotate: 0, scale: 1 }, hover: { rotate: 30, scale: 1.06 }, tap: { rotate: 30, scale: 0.9 } }}
          transition={{ type: 'spring', stiffness: 420, damping: 16 }}
        >
          <path
            d={HEX_D}
            fill={fill}
            stroke={C.cocoa900}
            strokeWidth="7"
            strokeLinejoin="round"
            className={cx('transition-[fill] duration-200', !on && 'group-hover/hex:fill-honey-300')}
          />
        </motion.svg>
      </span>
      <span className={cx('relative z-10 grid place-items-center', tone === 'cocoa' && !on ? 'text-butter-100 group-hover/hex:text-cocoa-900' : 'text-cocoa-900')}>
        {children}
      </span>
      {badge}
    </motion.button>
  );
});

export default HexIconButton;
