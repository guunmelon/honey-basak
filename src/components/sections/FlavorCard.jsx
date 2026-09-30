import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useMotionPrefs } from '../../context/MotionPrefs';
import { C } from '../../lib/tokens';
import { cx } from '../../lib/cx';
import ChipBag from '../motifs/ChipBag';
import Chip from '../motifs/Chip';
import Bee from '../motifs/Bee';
import HoneyDrips from '../motifs/HoneyDrips';
import Sparkle from '../motifs/Sparkle';
import HexMeter from '../ui/HexMeter';
import { ArrowRight } from '../ui/Icons';
import { HEX_D } from '../motifs/Hex';

const BADGE = {
  berry: 'bg-berry-500 text-cream',
  honey: 'bg-honey-400 text-cocoa-950',
  cocoa: 'bg-cocoa-800 text-butter-100',
};

export function FlavorMeters({ flavor, size = 16 }) {
  const rows = [
    ['달콤', flavor.sweet, C.honey400],
    ['고소', flavor.butter, C.butter300],
    ['바삭', flavor.crunch, C.chipDark],
  ];
  return (
    <dl className="grid gap-1.5">
      {rows.map(([label, value, color]) => (
        <div key={label} className="flex items-center gap-3">
          <dt className="w-9 font-display text-[0.95rem] text-cocoa-800">{label}</dt>
          <dd>
            <HexMeter value={value} label={label} color={color} size={size} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * 맛 카드 — 호버/포커스(터치 기기는 화면 중앙 진입) 시 패키지 모티프가 등장:
 * 벌집 패턴 번짐 · 위에서 꿀이 흘러내림 · 봉지 뒤에서 칩이 튀어나옴 · 꿀벌이 날아듦
 */
export default function FlavorCard({ flavor, index, onOpen }) {
  const ref = useRef(null);
  const { coarse } = useMotionPrefs();
  const [focused, setFocused] = useState(false);
  const inView = useInView(ref, { amount: 0.8 });
  const t = flavor.tint;
  const on = focused || (coarse && inView);

  return (
    <motion.article
      ref={ref}
      className="group/card relative h-full rounded-card border-[3px] border-cocoa-900 bg-cream shadow-sticker"
      initial="rest"
      animate={on ? 'hover' : 'rest'}
      whileHover="hover"
      variants={{ rest: { y: 0, rotate: 0 }, hover: { y: -10, rotate: index % 2 ? 1.2 : -1.2 } }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <div
        className="relative m-2.5 aspect-square overflow-hidden rounded-[1.35rem] border-[3px] border-cocoa-900"
        style={{ background: `radial-gradient(circle at 50% 38%, ${t.from} 0%, ${t.to} 88%)` }}
      >
        {/* 벌집 패턴 */}
        <motion.div
          className="absolute inset-0 bg-honeycomb-honey"
          variants={{ rest: { opacity: 0, scale: 1.25 }, hover: { opacity: 1, scale: 1 } }}
          transition={{ duration: 0.5 }}
          aria-hidden="true"
        />
        {/* 꿀 드립 */}
        <motion.div
          className="absolute inset-x-0 top-0 z-[3] origin-top"
          variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
          transition={{ type: 'spring', stiffness: 110, damping: 14 }}
          aria-hidden="true"
        >
          <HoneyDrips className="h-16 w-full" count={8} seed={index * 7 + 3} width={420} height={72} band={10} idle={false} color={t.window} shade={C.cocoa900} gloss />
        </motion.div>
        {/* 튀어나오는 칩 */}
        <motion.div
          className="absolute left-[8%] top-[40%] z-[1] w-[34%]"
          variants={{ rest: { y: 50, x: 20, rotate: 0, opacity: 0 }, hover: { y: -26, x: -10, rotate: -30, opacity: 1 } }}
          transition={{ type: 'spring', stiffness: 200, damping: 13 }}
          aria-hidden="true"
        >
          <Chip seed={index * 3 + 2} className="w-full" />
        </motion.div>
        <motion.div
          className="absolute right-[6%] top-[36%] z-[1] w-[30%]"
          variants={{ rest: { y: 50, x: -20, rotate: 0, opacity: 0 }, hover: { y: -40, x: 8, rotate: 26, opacity: 1 } }}
          transition={{ type: 'spring', stiffness: 200, damping: 13, delay: 0.05 }}
          aria-hidden="true"
        >
          <Chip seed={index * 3 + 5} className="w-full" />
        </motion.div>
        {/* 봉지 */}
        <motion.div
          className="absolute left-1/2 top-[9%] z-[2] w-[54%] -translate-x-1/2"
          variants={{ rest: { rotate: -3, y: 0, scale: 1 }, hover: { rotate: 4, y: -6, scale: 1.05 } }}
          transition={{ type: 'spring', stiffness: 260, damping: 14 }}
          aria-hidden="true"
        >
          <ChipBag flavor={flavor} className="w-full drop-shadow-[0_10px_0_rgba(51,32,15,0.2)]" aria-hidden="true" />
        </motion.div>
        {/* 꿀벌 */}
        <motion.div
          className="absolute bottom-[8%] right-[5%] z-[4] w-[22%]"
          variants={{ rest: { x: 90, y: 40, opacity: 0, rotate: 20 }, hover: { x: 0, y: 0, opacity: 1, rotate: -8 } }}
          transition={{ type: 'spring', stiffness: 150, damping: 12, delay: 0.1 }}
          aria-hidden="true"
        >
          <Bee className="w-full" />
        </motion.div>
        <motion.div
          className="absolute left-[10%] bottom-[12%] z-[4] w-[9%]"
          variants={{ rest: { scale: 0, rotate: -90 }, hover: { scale: 1, rotate: 0 } }}
          transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.15 }}
          aria-hidden="true"
        >
          <Sparkle className="w-full" color={C.cream} />
        </motion.div>
        <span className={cx('absolute left-3 top-3 z-[5] rounded-full border-[2.5px] border-cocoa-900 px-3 py-1 font-display text-sm leading-none shadow-sticker-sm', BADGE[flavor.badgeTone])}>
          {flavor.badge}
        </span>
      </div>

      <div className="px-5 pb-5 pt-2">
        <p className="fraunces-soft font-serif text-sm font-semibold italic text-honey-700">{flavor.en}</p>
        <h3 className="font-display text-[1.6rem] leading-tight text-cocoa-900">{flavor.name}</h3>
        <p className="mt-2 min-h-[3.2em] text-[0.95rem] leading-relaxed text-cocoa-700">{flavor.desc}</p>
        <div className="mt-4">
          <FlavorMeters flavor={flavor} />
        </div>
        <div className="mt-4 flex items-center justify-between border-t-2 border-dashed border-cocoa-900/20 pt-3">
          <span className="font-serif text-sm font-semibold text-cocoa-700">
            {flavor.weight} · {flavor.kcal}kcal
          </span>
          <span className="relative grid size-11 place-items-center" aria-hidden="true">
            <motion.svg viewBox="0 0 100 100" className="absolute inset-0 size-full" variants={{ rest: { rotate: 0 }, hover: { rotate: 30 } }}>
              <path d={HEX_D} fill={C.honey400} stroke={C.cocoa900} strokeWidth="7" />
            </motion.svg>
            <ArrowRight className="relative size-5 text-cocoa-900" />
          </span>
        </div>
      </div>

      {/* 카드 전체 클릭 영역 */}
      <button
        type="button"
        onClick={() => onOpen(flavor)}
        aria-label={`${flavor.name} 자세히 보기`}
        aria-haspopup="dialog"
        className="absolute inset-0 z-10 rounded-card outline-offset-4"
      />
    </motion.article>
  );
}
