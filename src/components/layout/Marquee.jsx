import { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, wrap } from 'framer-motion';
import { useMotionPrefs } from '../../context/MotionPrefs';
import { cx } from '../../lib/cx';
import { C } from '../../lib/tokens';
import { HexDot } from '../ui/SectionHeading';

/** 스크롤 속도에 반응하는 띠 — 빠르게 내리면 빨라지고, 올리면 방향이 바뀜 */
export default function Marquee({ words, tone = 'cocoa', baseVelocity = -2, rotate = -2, className }) {
  const { reduced } = useMotionPrefs();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let move = dir.current * baseVelocity * (Math.min(delta, 64) / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    baseX.set(baseX.get() + move);
  });

  const dark = tone === 'cocoa';
  const row = [...words, ...words];

  return (
    <div
      aria-hidden="true"
      className={cx(
        'relative overflow-hidden border-y-[3px] border-cocoa-900 py-3 sm:py-4',
        dark ? 'bg-cocoa-900 text-butter-200' : 'bg-honey-400 text-cocoa-950',
        className,
      )}
      style={{ rotate: `${rotate}deg` }}
    >
      <motion.div className="flex w-max whitespace-nowrap" style={{ x }}>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((w, i) => (
              <span key={`${k}-${i}`} className="flex items-center gap-6 px-6 font-display text-2xl leading-none sm:text-[2rem]">
                {/[A-Z]/.test(w) ? <span className="fraunces-soft font-serif font-black italic tracking-tight">{w}</span> : w}
                <HexDot className="size-4" color={dark ? C.honey400 : C.cream} />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
