import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useScroll, useTransform } from 'framer-motion';
import { BENEFITS, LAYERS, STATS } from '../../data/content';
import { useMotionPrefs } from '../../context/MotionPrefs';
import { useFx } from '../../hooks/useFx';
import { useSafeId } from '../../hooks/useSafeId';
import { chipBlob, rng, dripPath } from '../../lib/geometry';
import { C } from '../../lib/tokens';
import { HEX_D } from '../motifs/Hex';
import ButterCube from '../motifs/ButterCube';
import SectionHeading from '../ui/SectionHeading';
import StickerCard from '../ui/StickerCard';
import Reveal from '../ui/Reveal';
import Mark from '../ui/Mark';
import { ICONS } from '../ui/Icons';

const LAYER_SHAPE = chipBlob(8, 200, 0, 150, 56, 12, 0.08);

/** 칩 한 조각의 3단 레이어 분해도 — 스크롤하면 층이 벌어짐 */
function LayerExplode() {
  const ref = useRef(null);
  const id = useSafeId('layer');
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center 45%'] });
  const spread = useFx(scrollYProgress, [0.15, 1], [0, 1], { rest: 1 });
  const topY = useTransform(spread, [0, 1], [300, 110]);
  const midY = useTransform(spread, [0, 1], [318, 225]);
  const botY = useTransform(spread, [0, 1], [336, 340]);
  const tilt = useTransform(spread, [0, 1], [-4, 0]);
  const labelOpacity = useTransform(spread, [0.35, 0.9], [0, 1]);
  const labelX = useTransform(spread, [0.35, 0.9], [24, 0]);
  const specks = useRef(
    (() => {
      const r = rng(5);
      return Array.from({ length: 34 }, () => ({ x: 70 + r() * 260, y: -40 + r() * 80, r: 1.6 + r() * 2.4, light: r() > 0.45 }));
    })(),
  ).current;

  return (
    <StickerCard className="flex h-full flex-col overflow-hidden p-6 sm:p-8 lg:row-span-2">
      <div className="absolute inset-0 bg-honeycomb opacity-60" aria-hidden="true" />
      <div className="relative">
        <p className="fraunces-soft font-serif text-sm font-semibold italic text-honey-700">Anatomy of a crisp</p>
        <h3 className="font-display text-[1.9rem] leading-tight">한 조각, 세 겹의 이야기</h3>
      </div>
      <div ref={ref} className="relative mt-4 grid flex-1 items-center gap-4 md:grid-cols-[1.25fr_0.75fr]">
        <motion.svg viewBox="0 0 400 420" className="w-full overflow-visible" style={{ rotate: tilt }} role="img" aria-label="감자 슬라이스, 고메버터 시즈닝, 아카시아 꿀 글레이즈로 이루어진 칩 단면 분해도">
          <defs>
            <radialGradient id={`${id}-chip`} cx="40%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#FFF0B8" />
              <stop offset="60%" stopColor="#F4C457" />
              <stop offset="100%" stopColor="#D9953A" />
            </radialGradient>
            <linearGradient id={`${id}-glaze`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFD35C" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#E8950F" stopOpacity="0.75" />
            </linearGradient>
          </defs>
          {/* 01 감자 슬라이스 */}
          <motion.g style={{ y: botY }}>
            <path d={LAYER_SHAPE} transform="translate(0 14)" fill={C.chipDark} stroke={C.cocoa900} strokeWidth="3.5" />
            <path d={LAYER_SHAPE} fill={`url(#${id}-chip)`} stroke={C.cocoa900} strokeWidth="3.5" />
            <path d="M90 -8 C 150 -30, 240 -26, 300 -6" stroke="#FFF7DA" strokeOpacity="0.7" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d="M80 16 C 150 0, 250 4, 320 18" stroke="#C4832C" strokeOpacity="0.35" strokeWidth="5" fill="none" strokeLinecap="round" />
          </motion.g>
          {/* 02 버터 시즈닝 */}
          <motion.g style={{ y: midY }}>
            <path d={LAYER_SHAPE} fill="#FFF4C4" fillOpacity="0.7" stroke={C.cocoa900} strokeWidth="3" strokeDasharray="9 7" />
            {specks.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y * 0.7} r={s.r} fill={s.light ? '#FFFDF4' : '#F0C85F'} stroke={s.light ? C.cocoa900 : 'none'} strokeWidth="1" />
            ))}
            <ButterCube x="150" y="-44" width="56" height="50" flag={false} />
            <ButterCube x="236" y="-30" width="40" height="36" flag={false} />
          </motion.g>
          {/* 03 꿀 글레이즈 */}
          <motion.g style={{ y: topY }}>
            <path d={LAYER_SHAPE} fill={`url(#${id}-glaze)`} stroke={C.cocoa900} strokeWidth="3.5" />
            <path d={dripPath(120, 44, 40, 9)} fill={C.honey500} stroke={C.cocoa900} strokeWidth="3" />
            <path d={dripPath(282, 40, 28, 7)} fill={C.honey500} stroke={C.cocoa900} strokeWidth="3" />
            <path d="M100 -18 C 150 -38, 230 -36, 290 -18" stroke="#fff" strokeOpacity="0.8" strokeWidth="7" fill="none" strokeLinecap="round" />
            <circle cx="312" cy="-10" r="5" fill="#fff" opacity="0.8" />
          </motion.g>
        </motion.svg>
        <motion.ol style={{ opacity: labelOpacity, x: labelX }} className="grid gap-4">
          {LAYERS.map((l, i) => (
            <li key={l.id} className="flex items-start gap-3">
              <span className="relative grid size-10 shrink-0 place-items-center font-serif text-sm font-black" aria-hidden="true">
                <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
                  <path d={HEX_D} fill={[C.honey400, C.butter200, C.chip][i]} stroke={C.cocoa900} strokeWidth="8" />
                </svg>
                <span className="relative">{l.no}</span>
              </span>
              <div>
                <p className="font-display text-lg leading-tight">{l.title}</p>
                <p className="text-sm text-cocoa-600">{l.desc}</p>
              </div>
            </li>
          ))}
        </motion.ol>
      </div>
    </StickerCard>
  );
}

function StatCard({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const { reduced } = useMotionPrefs();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    if (reduced) {
      setVal(stat.value);
      return undefined;
    }
    const controls = animate(0, stat.value, { duration: 1.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1], onUpdate: setVal });
    return () => controls.stop();
  }, [inView, reduced, stat.value, index]);

  return (
    <Reveal delay={index * 0.06} className="h-full">
      <StickerCard className="group flex h-full flex-col justify-between gap-6 overflow-hidden p-6 transition-transform duration-300 hover:-translate-y-1.5">
        <div className="absolute -right-6 -top-6 size-24 opacity-0 transition-all duration-500 group-hover:rotate-30 group-hover:opacity-100" aria-hidden="true">
          <svg viewBox="0 0 100 100" className="size-full">
            <path d={HEX_D} fill={C.honey300} stroke={C.cocoa900} strokeWidth="5" />
          </svg>
        </div>
        <div ref={ref} className="relative">
          <p className="fraunces-soft font-serif text-[3.4rem] font-black leading-none tracking-tight tabular-nums text-cocoa-900" aria-hidden="true">
            {val.toFixed(stat.decimals ?? 0)}
            <span className="text-[1.8rem] text-honey-600">{stat.suffix}</span>
          </p>
          <span className="sr-only">
            {stat.value}
            {stat.suffix}
          </span>
        </div>
        <div className="relative">
          <p className="font-display text-xl leading-tight">{stat.label}</p>
          <p className="mt-1 text-sm text-cocoa-600">{stat.caption}</p>
        </div>
      </StickerCard>
    </Reveal>
  );
}

function BenefitCard({ item, index }) {
  const Icon = ICONS[item.icon];
  return (
    <Reveal delay={index * 0.07} className="h-full">
      <motion.div whileHover="hover" initial="rest" animate="rest" className="h-full">
        <StickerCard className="group relative h-full overflow-hidden p-6" tone={index % 2 ? 'butter' : 'cream'}>
          <motion.div
            className="absolute inset-x-6 top-0 h-10 origin-top"
            variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
            transition={{ type: 'spring', stiffness: 200, damping: 14 }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 200 40" preserveAspectRatio="xMidYMin slice" className="h-full w-full overflow-visible">
              <path d={dripPath(40, 0, 26, 6)} fill={C.honey400} stroke={C.cocoa900} strokeWidth="2.5" />
              <path d={dripPath(150, 0, 18, 5)} fill={C.honey400} stroke={C.cocoa900} strokeWidth="2.5" />
            </svg>
          </motion.div>
          <div className="absolute inset-0 bg-honeycomb-honey opacity-0 transition-opacity duration-500 group-hover:opacity-50" aria-hidden="true" style={{ maskImage: 'linear-gradient(to top left, black, transparent 60%)' }} />
          <motion.span
            className="relative grid size-16 place-items-center"
            variants={{ rest: { rotate: 0, y: 0 }, hover: { rotate: 30, y: -4 } }}
            transition={{ type: 'spring', stiffness: 300, damping: 12 }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
              <path d={HEX_D} transform="translate(0 6)" fill={C.cocoa900} />
              <path d={HEX_D} fill={C.honey400} stroke={C.cocoa900} strokeWidth="6" />
            </svg>
            <motion.span variants={{ rest: { rotate: 0 }, hover: { rotate: -30 } }} className="relative">
              <Icon className="size-7 text-cocoa-900" />
            </motion.span>
          </motion.span>
          <h3 className="relative mt-5 font-display text-[1.45rem] leading-tight">{item.title}</h3>
          <p className="relative mt-2 text-cocoa-700">{item.desc}</p>
        </StickerCard>
      </motion.div>
    </Reveal>
  );
}

export default function Features() {
  return (
    <section id="features" data-section="features" data-bg="#FFF6D8" aria-labelledby="features-title" className="relative py-section">
      <div className="container-honey">
        <SectionHeading
          eyebrow="Why Honey Basak"
          index="04"
          id="features-title"
          title={
            <>
              바삭함에는 <Mark>이유</Mark>가 있어요
            </>
          }
          desc="얇게, 두 번, 낮은 온도로. 달콤함과 고소함이 싸우지 않도록 비율까지 계산했어요."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-[auto_auto]">
          <div className="md:col-span-2 lg:row-span-2">
            <LayerExplode />
          </div>
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} />
          ))}
        </div>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <BenefitCard key={b.id} item={b} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
