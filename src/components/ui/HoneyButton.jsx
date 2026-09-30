import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cx, mergeClasses } from '../../lib/cx';
import { C } from '../../lib/tokens';
import { dripPath } from '../../lib/geometry';

// 면(face) 색과 글자색을 분리: 글자색은 루트에 적용해야 라벨 span이 상속받음
const FACE = {
  honey: 'bg-honey-400',
  butter: 'bg-cream',
  cocoa: 'bg-cocoa-900',
};
const TEXT = {
  honey: 'text-cocoa-950',
  butter: 'text-cocoa-900',
  cocoa: 'text-butter-100',
};
const SIZE = {
  sm: 'h-11 px-5 text-[1.02rem] gap-2',
  md: 'h-14 px-7 text-lg gap-2.5',
  lg: 'h-16 px-9 text-xl gap-3',
};
// 버튼 하단에서 흘러내리는 꿀 3줄기 (좌표: 버튼 폭 %)
const DRIPS = [
  { x: 20, len: 30, w: 5.2, delay: 0 },
  { x: 54, len: 44, w: 6.4, delay: 0.06 },
  { x: 80, len: 24, w: 4.6, delay: 0.12 },
];
const SHADOW = {
  rest: { boxShadow: `0 5px 0 0 ${C.cocoa900}` },
  hover: { boxShadow: `0 8px 0 0 ${C.cocoa900}` },
  tap: { boxShadow: `0 1px 0 0 ${C.cocoa900}` },
};

function ButterMelt() {
  return (
    <motion.span
      className="absolute inset-x-0 bottom-0 h-full"
      variants={{ rest: { y: '135%' }, hover: { y: '0%' }, tap: { y: '0%' } }}
      transition={{ type: 'spring', stiffness: 180, damping: 22 }}
    >
      <span
        className="absolute inset-x-0 -top-[9px] h-[10px]"
        style={{ background: `radial-gradient(circle at 10px 10px, ${C.butter300} 7px, transparent 7.5px) 0 0 / 20px 10px repeat-x` }}
      />
      <span className="absolute inset-0 bg-butter-300" />
    </motion.span>
  );
}

/**
 * 브랜드 버튼
 * - honey: 주 CTA. 호버 시 버튼 아래로 꿀이 흘러내리고 벌집 패턴이 번짐
 * - butter: 보조. 호버 시 버터가 아래에서 녹아 차오름
 * - cocoa: 어두운 배경/대비용
 */
const HoneyButton = forwardRef(function HoneyButton(
  { as = 'button', variant = 'honey', size = 'md', icon, iconLeft, children, className, faceClassName, type, ...props },
  ref,
) {
  const Comp = as === 'a' ? motion.a : motion.button;
  return (
    <Comp
      ref={ref}
      type={as === 'button' ? type || 'button' : undefined}
      className={mergeClasses(
        cx('group/btn relative isolate inline-flex shrink-0 select-none items-center justify-center whitespace-nowrap font-display leading-none tracking-tight outline-offset-[6px]', SIZE[size], TEXT[variant]),
        className,
      )}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap="tap"
      whileFocus="hover"
      variants={{ rest: { y: 0 }, hover: { y: -3 }, tap: { y: 3 } }}
      transition={{ type: 'spring', stiffness: 520, damping: 24 }}
      {...props}
    >
      {variant !== 'butter' && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-full z-0 -mt-2 h-[52px]">
          {DRIPS.map((d, i) => (
            <motion.svg
              key={i}
              viewBox="0 0 16 52"
              className="absolute top-0 h-[52px] w-4 origin-top"
              style={{ left: `calc(${d.x}% - 8px)` }}
              variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 }, tap: { scaleY: 0.6 } }}
              transition={{ type: 'spring', stiffness: 240, damping: 15, delay: d.delay }}
            >
              <path d={dripPath(8, 0, d.len, d.w)} fill={C.honey400} stroke={C.cocoa900} strokeWidth="2.5" strokeLinejoin="round" />
              <ellipse cx={8 - d.w * 0.35} cy={d.len - d.w * 1.3} rx="1.3" ry="2.2" fill="#fff" opacity="0.7" />
            </motion.svg>
          ))}
        </span>
      )}
      <motion.span
        aria-hidden="true"
        className={cx('absolute inset-0 z-[1] overflow-hidden rounded-full border-[3px] border-cocoa-900', FACE[variant], faceClassName)}
        variants={SHADOW}
        transition={{ type: 'spring', stiffness: 520, damping: 24 }}
      >
        {variant === 'butter' && <ButterMelt />}
        {variant !== 'butter' && (
          <span className="absolute inset-0 bg-honeycomb-honey opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100 group-focus-visible/btn:opacity-100" />
        )}
        <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-[140%] bg-white/45 blur-[1px] group-hover/btn:animate-shimmer" />
      </motion.span>
      <span className="relative z-[2] inline-flex items-center gap-[inherit]">
        {iconLeft}
        {children}
        {icon && (
          <motion.span className="inline-flex" variants={{ rest: { x: 0, rotate: 0 }, hover: { x: 4, rotate: 0 }, tap: { x: 6 } }}>
            {icon}
          </motion.span>
        )}
      </span>
    </Comp>
  );
});

export default HoneyButton;
