import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GOLDEN } from '../../data/content';
import { useAppState } from '../../context/AppState';
import { useMotionPrefs } from '../../context/MotionPrefs';
import { useSafeId } from '../../hooks/useSafeId';
import { chipBlob, rng } from '../../lib/geometry';
import { C } from '../../lib/tokens';
import { cx } from '../../lib/cx';
import Basaki from '../motifs/Basaki';
import Bee from '../motifs/Bee';
import HoneyDipper from '../motifs/HoneyDipper';
import ButterCube from '../motifs/ButterCube';
import MedalBadge from '../motifs/MedalBadge';
import Sparkle from '../motifs/Sparkle';
import { HEX_D } from '../motifs/Hex';
import SectionHeading from '../ui/SectionHeading';
import StickerCard from '../ui/StickerCard';
import HexMeter from '../ui/HexMeter';
import HexIconButton from '../ui/HexIconButton';
import HoneyButton from '../ui/HoneyButton';
import Mark from '../ui/Mark';
import StickerText from '../ui/StickerText';
import { ArrowRight, Crunch, Minus, Plus, Refresh } from '../ui/Icons';

const MAX = 5;
const CHIP_OUTLINE = chipBlob(21, 100, 80, 86, 64, 12, 0.1);
const DRIZZLES = [
  'M36 64 C 56 40, 70 92, 90 62 S 122 38, 134 70 S 164 48, 174 64',
  'M32 92 C 54 72, 72 116, 96 88 S 130 66, 142 98 S 170 80, 180 94',
  'M52 116 C 70 98, 86 134, 106 110 S 136 96, 152 120',
  'M58 40 C 78 28, 96 64, 118 42 S 148 32, 160 50',
  'M40 78 Q 100 136, 168 76',
];
const PATS = [
  { x: 76, y: 66, r: -12 },
  { x: 126, y: 56, r: 10 },
  { x: 104, y: 100, r: -4 },
  { x: 60, y: 104, r: 16 },
  { x: 148, y: 94, r: -18 },
];
const BITES = [
  [{ cx: 190, cy: 72, r: 16 }, { cx: 184, cy: 48, r: 12 }, { cx: 190, cy: 96, r: 12 }],
  [{ cx: 26, cy: 44, r: 16 }, { cx: 12, cy: 66, r: 13 }, { cx: 46, cy: 24, r: 12 }],
  [{ cx: 98, cy: 152, r: 17 }, { cx: 122, cy: 154, r: 13 }, { cx: 74, cy: 150, r: 12 }],
];
const BITE_SPOT = [
  { x: '84%', y: '42%' },
  { x: '16%', y: '30%' },
  { x: '50%', y: '84%' },
];
const WORDS = ['바삭!', '와삭!', '크런치!'];

function verdict(h, b) {
  const dist = Math.abs(h - GOLDEN.honey) + Math.abs(b - GOLDEN.butter);
  if (dist === 0) return { key: 'golden', title: '황금 비율 3 : 2 달성!', desc: '바로 이 맛! 오리지널 허니바삭의 비율을 찾아냈어요. 구매 섹션에 쿠폰이 열렸어요.', mood: 'yum' };
  if (h === 0 && b === 0) return { key: 'plain', title: '아직은 민낯 감자칩', desc: '꿀과 버터를 한 스푼씩 올려 보세요. 힌트: 꿀이 조금 더 많아야 해요.', mood: 'happy' };
  if (h === MAX && b === MAX) return { key: 'max', title: '칼로리는 내일 생각해요', desc: '꿀도 버터도 가득! 오늘만큼은 괜찮아요. 그래도 황금 비율은 따로 있답니다.', mood: 'wow' };
  if (dist === 1) return { key: 'near', title: '황금 비율까지 한 걸음!', desc: `지금은 꿀 ${h} : 버터 ${b}. 딱 한 번만 더 조절해 보세요.`, mood: 'wow' };
  if (b === 0) return { key: 'honey', title: h >= 3 ? '꿀벌 비비의 최애, 꿀 폭포' : '살짝 꿀칩', desc: '고소함이 아쉬워요. 버터를 더해 볼까요?', mood: 'yum' };
  if (h === 0) return { key: 'butter', title: b >= 3 ? '버터 공방 스페셜' : '버터 한 조각', desc: '달콤함이 빠졌어요. 꿀을 더해 볼까요?', mood: 'happy' };
  if (h > b) return { key: 'sweet', title: '달콤한 쪽으로 기울었어요', desc: `꿀 ${h} : 버터 ${b}. 비율을 3 : 2로 맞춰 보세요.`, mood: 'yum' };
  if (b > h) return { key: 'savory', title: '고소한 쪽으로 기울었어요', desc: `꿀 ${h} : 버터 ${b}. 꿀이 버터보다 조금 더 많아야 해요.`, mood: 'happy' };
  return { key: 'even', title: '반반 밸런스', desc: `꿀 ${h} : 버터 ${b}. 꿀을 살짝 더하면…?`, mood: 'happy' };
}

/** 실험실의 큰 칩: 꿀 드리즐(pathLength), 녹는 버터, 한 입 자국(mask) */
function LabChip({ honey, butter, bites }) {
  const id = useSafeId('lab');
  const specks = useMemo(() => {
    const r = rng(77);
    return Array.from({ length: 26 }, () => ({ x: 24 + r() * 152, y: 26 + r() * 108, r: 0.9 + r() * 1.6, light: r() > 0.5 }));
  }, []);
  const biteCircles = BITES.slice(0, bites).flat();

  return (
    <svg viewBox="-12 -16 224 196" className="w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-g`} cx="40%" cy="34%" r="74%">
          <stop offset="0%" stopColor="#FFF2BF" />
          <stop offset="45%" stopColor="#F9D26C" />
          <stop offset="84%" stopColor="#EDB04A" />
          <stop offset="100%" stopColor="#D9953A" />
        </radialGradient>
        <clipPath id={`${id}-c`}>
          <path d={CHIP_OUTLINE} />
        </clipPath>
        <mask id={`${id}-m`} maskUnits="userSpaceOnUse" x="-40" y="-60" width="300" height="300">
          <rect x="-40" y="-60" width="300" height="300" fill="#fff" />
          {biteCircles.map((c, i) => (
            <motion.circle key={i} cx={c.cx} cy={c.cy} fill="#000" initial={{ r: 0 }} animate={{ r: c.r }} transition={{ type: 'spring', stiffness: 400, damping: 18 }} />
          ))}
        </mask>
      </defs>
      <ellipse cx="100" cy="156" rx="66" ry="7" fill={C.honey700} opacity="0.18" />
      <g mask={`url(#${id}-m)`}>
        <path d={CHIP_OUTLINE} fill={`url(#${id}-g)`} />
        <g clipPath={`url(#${id}-c)`}>
          {[40, 68, 96, 124].map((y) => (
            <g key={y}>
              <path d={`M0 ${y} C 50 ${y - 14}, 92 ${y + 12}, 132 ${y - 4} S 186 ${y + 8}, 204 ${y - 2}`} fill="none" stroke="#C4832C" strokeOpacity="0.28" strokeWidth="5.5" strokeLinecap="round" />
              <path d={`M0 ${y - 5} C 50 ${y - 19}, 92 ${y + 7}, 132 ${y - 9} S 186 ${y + 3}, 204 ${y - 7}`} fill="none" stroke="#FFF7DA" strokeOpacity="0.5" strokeWidth="2.4" strokeLinecap="round" />
            </g>
          ))}
          {specks.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={s.light ? '#FFF6D2' : '#8E5A22'} opacity={s.light ? 0.9 : 0.4} />
          ))}
          <path d="M48 42 C 72 28, 108 25, 138 34" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="7" strokeLinecap="round" />
          {/* 녹은 버터 웅덩이 */}
          {PATS.slice(0, butter).map((p, i) => (
            <motion.ellipse
              key={`pool-${i}`}
              cx={p.x}
              cy={p.y + 4}
              rx="20"
              ry="11"
              fill="#FFF0B0"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.85 }}
              transition={{ delay: 0.55, duration: 0.9 }}
              className="svg-origin-center"
            />
          ))}
          {/* 꿀 드리즐 */}
          {DRIZZLES.slice(0, honey).map((d, i) => (
            <g key={`dz-${i}`}>
              <motion.path d={d} fill="none" stroke={C.honey700} strokeOpacity="0.35" strokeWidth="9" strokeLinecap="round" transform="translate(0 3)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: 'easeInOut' }} />
              <motion.path d={d} fill="none" stroke={C.honey500} strokeWidth="8" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: 'easeInOut' }} />
              <motion.path d={d} fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" transform="translate(-1 -2)" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: 'easeInOut', delay: 0.1 }} />
            </g>
          ))}
        </g>
        <path d={CHIP_OUTLINE} fill="none" stroke={C.cocoa900} strokeWidth="3.6" strokeLinejoin="round" />
        {/* 한 입 자국 테두리 */}
        <g clipPath={`url(#${id}-c)`}>
          {biteCircles.map((c, i) => (
            <motion.circle key={`bo-${i}`} cx={c.cx} cy={c.cy} fill="none" stroke={C.cocoa900} strokeWidth="7" initial={{ r: 0 }} animate={{ r: c.r }} transition={{ type: 'spring', stiffness: 400, damping: 18 }} />
          ))}
        </g>
        {/* 버터 조각 */}
        {PATS.slice(0, butter).map((p, i) => (
          <g key={`pat-${i}`} transform={`translate(${p.x} ${p.y}) rotate(${p.r})`}>
            <motion.g initial={{ y: -150, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 16 }}>
              <motion.g initial={{ scaleY: 1, scaleX: 1 }} animate={{ scaleY: 0.7, scaleX: 1.14 }} transition={{ delay: 0.6, duration: 1.4 }} className="svg-origin-bottom">
                <rect x="-13" y="-10" width="26" height="19" rx="4.5" fill="#FFF4C4" stroke={C.cocoa900} strokeWidth="2.6" />
                <rect x="-13" y="-10" width="26" height="6" rx="3" fill="#fff" opacity="0.7" />
                <path d="M-13 3 H13" stroke="#F0C85F" strokeWidth="2.5" />
              </motion.g>
            </motion.g>
          </g>
        ))}
      </g>
    </svg>
  );
}

function Crumbs({ burst }) {
  const pieces = useMemo(() => {
    if (!burst) return [];
    const r = rng(burst.id % 100000);
    return Array.from({ length: 12 }, (_, i) => ({
      i,
      dx: (r() - 0.5) * 260,
      dy: -60 - r() * 110,
      fall: 120 + r() * 120,
      rot: (r() - 0.5) * 720,
      s: 8 + r() * 14,
      light: r() > 0.5,
    }));
  }, [burst]);
  if (!burst) return null;
  return (
    <div className="pointer-events-none absolute z-30" style={{ left: burst.x, top: burst.y }} aria-hidden="true">
      {pieces.map((p) => (
        <motion.svg
          key={`${burst.id}-${p.i}`}
          viewBox="0 0 20 20"
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ width: p.s, height: p.s }}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          animate={{ x: [0, p.dx * 0.6, p.dx], y: [0, p.dy, p.dy + p.fall], rotate: p.rot, opacity: [1, 1, 0] }}
          transition={{ duration: 1.1, ease: 'easeOut', times: [0, 0.35, 1] }}
        >
          <path d="M3 8 L9 2 L17 5 L18 13 L11 18 L4 15 Z" fill={p.light ? C.chipLight : C.chip} stroke={C.cocoa900} strokeWidth="2" strokeLinejoin="round" />
        </motion.svg>
      ))}
      <motion.div
        key={`w-${burst.id}`}
        className="absolute -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0.2, opacity: 0, y: 0 }}
        animate={{ scale: [0.2, 1.25, 1], opacity: [0, 1, 1, 0], y: -70 }}
        transition={{ duration: 1.1, times: [0, 0.25, 0.7, 1] }}
      >
        <StickerText className="whitespace-nowrap text-5xl" rotate={-10}>
          {burst.word}
        </StickerText>
      </motion.div>
    </div>
  );
}

function Confetti({ run }) {
  const pieces = useMemo(() => {
    const r = rng(run * 13 + 7);
    return Array.from({ length: 22 }, (_, i) => ({
      i,
      x: (r() - 0.5) * 520,
      y: (r() - 0.8) * 420,
      rot: (r() - 0.5) * 540,
      s: 14 + r() * 18,
      kind: i % 3,
    }));
  }, [run]);
  if (!run) return null;
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 z-40" aria-hidden="true">
      {pieces.map((p) => (
        <motion.div
          key={`${run}-${p.i}`}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ width: p.s, height: p.s }}
          initial={{ x: 0, y: 0, scale: 0, rotate: 0, opacity: 1 }}
          animate={{ x: p.x, y: [0, p.y, p.y + 160], scale: [0, 1, 0.9], rotate: p.rot, opacity: [1, 1, 0] }}
          transition={{ duration: 1.8, ease: 'easeOut', times: [0, 0.4, 1] }}
        >
          {p.kind === 0 && (
            <svg viewBox="0 0 100 100" className="size-full">
              <path d={HEX_D} fill={C.honey400} stroke={C.cocoa900} strokeWidth="8" />
            </svg>
          )}
          {p.kind === 1 && <Sparkle className="size-full" color={C.berry500} />}
          {p.kind === 2 && <Bee className="size-full" flap={false} />}
        </motion.div>
      ))}
    </div>
  );
}

function IngredientRow({ icon, label, en, value, color, onAdd, onRemove, addText, addLabel, removeLabel }) {
  return (
    <div className="rounded-sticker border-[2.5px] border-cocoa-900 bg-butter-50 p-4">
      <div className="flex items-center gap-3">
        <div className="grid size-12 shrink-0 place-items-center rounded-2xl border-[2.5px] border-cocoa-900 bg-butter-200">{icon}</div>
        <div className="min-w-0 flex-1">
          <p className="font-display text-lg leading-tight">{label}</p>
          <p className="fraunces-soft font-serif text-xs italic text-honey-700">{en}</p>
        </div>
        <span className="font-serif text-3xl font-black tabular-nums" aria-hidden="true">
          {value}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <HexMeter value={value} max={MAX} color={color} label={label} size={24} />
        <div className="flex items-center gap-2">
          <HexIconButton size="md" label={removeLabel} onClick={onRemove} disabled={value === 0} className="disabled:opacity-40">
            <Minus className="size-5" />
          </HexIconButton>
          <HoneyButton size="sm" onClick={onAdd} disabled={value === MAX} iconLeft={<Plus className="size-4" />} aria-label={addLabel} className="disabled:opacity-50">
            {addText}
          </HoneyButton>
        </div>
      </div>
    </div>
  );
}

export default function Lab() {
  const { play, pushToast, unlockGolden, golden } = useAppState();
  const { reduced } = useMotionPrefs();
  const [honey, setHoney] = useState(0);
  const [butter, setButter] = useState(0);
  const [bites, setBites] = useState(0);
  const [chipKey, setChipKey] = useState(0);
  const [burst, setBurst] = useState(null);
  const [confetti, setConfetti] = useState(0);
  const [react, setReact] = useState(0);
  const [drop, setDrop] = useState(0);
  const stageRef = useRef(null);
  const celebrated = useRef(false);

  const v = verdict(honey, butter);
  const isGolden = v.key === 'golden';
  const finished = bites >= 3;

  useEffect(() => {
    if (!isGolden) return;
    setConfetti((c) => c + 1);
    play('chime');
    if (!celebrated.current) {
      celebrated.current = true;
      unlockGolden();
      pushToast('황금 비율 달성! 구매 섹션에서 쿠폰을 확인하세요 🍯');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGolden]);

  const addHoney = () => {
    if (honey >= MAX || finished) return;
    setHoney((h) => h + 1);
    setDrop((d) => d + 1);
    setReact((r) => r + 1);
    play('drip');
  };
  const addButter = () => {
    if (butter >= MAX || finished) return;
    setButter((b) => b + 1);
    setReact((r) => r + 1);
    play('plop');
  };
  const bite = () => {
    if (finished) return;
    const n = bites + 1;
    setBites(n);
    setReact((r) => r + 1);
    play('crunch');
    const spot = BITE_SPOT[n - 1];
    setBurst({ id: Date.now(), word: WORDS[(n - 1) % WORDS.length], x: spot.x, y: spot.y });
    if (n === 3) window.setTimeout(() => pushToast('한 봉지 더? 새 칩을 꺼내 보세요!'), 900);
  };
  const reset = () => {
    setHoney(0);
    setButter(0);
    setBites(0);
    setBurst(null);
    setChipKey((k) => k + 1);
    play('pop');
  };

  const mood = finished ? 'wow' : v.mood;

  return (
    <section id="lab" data-section="lab" data-bg="#F8CB5E" aria-labelledby="lab-title" className="relative overflow-hidden py-section">
      <div className="absolute inset-0 bg-seasoning opacity-60" aria-hidden="true" />
      <div className="container-honey relative">
        <SectionHeading
          eyebrow="Golden Ratio Lab"
          index="03"
          id="lab-title"
          align="center"
          title={
            <>
              황금 비율 <Mark tone="cream">실험실</Mark>
            </>
          }
          desc="꿀과 버터를 올려 나만의 한 조각을 만들어 보세요. 칩을 누르면 한 입 바삭! 오리지널의 비율을 찾아내면 쿠폰이 열려요."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
          {/* 무대 */}
          <div ref={stageRef} className="relative mx-auto aspect-square w-full max-w-[560px]">
            <div className="absolute inset-[5%] rounded-full border-[3px] border-cocoa-900 bg-cream shadow-sticker-lg" aria-hidden="true">
              <div className="absolute inset-[8%] rounded-full border-[3px] border-dashed border-cocoa-900/20" />
              <div className="absolute inset-[16%] rounded-full bg-butter-100/70" />
            </div>

            {/* 꿀 디퍼 & 떨어지는 꿀방울 */}
            <motion.div
              className="absolute right-[14%] top-[-2%] z-20 w-[9%]"
              animate={drop ? { rotate: [0, -24, 0], y: [0, 10, 0] } : {}}
              key={`dip-${drop}`}
              transition={{ duration: 0.6 }}
              aria-hidden="true"
            >
              <HoneyDipper className="w-full rotate-[18deg]" />
            </motion.div>
            <AnimatePresence>
              {drop > 0 && !reduced && (
                <motion.svg
                  key={`drop-${drop}`}
                  viewBox="0 0 40 52"
                  className="absolute right-[19%] top-[20%] z-20 w-[4%]"
                  initial={{ y: 0, opacity: 1, scale: 0.6 }}
                  animate={{ y: [0, 150], opacity: [1, 1, 0], scale: [0.6, 1, 1.2] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: 'easeIn' }}
                  aria-hidden="true"
                >
                  <path d="M20 2 C 26 16, 36 24, 36 34 A 16 16 0 0 1 4 34 C 4 24, 14 16, 20 2 Z" fill={C.honey400} stroke={C.cocoa900} strokeWidth="3" />
                </motion.svg>
              )}
            </AnimatePresence>

            {/* 칩 = 한 입 버튼 */}
            <AnimatePresence mode="popLayout">
              <motion.button
                key={chipKey}
                type="button"
                onClick={bite}
                disabled={finished}
                aria-label={finished ? '칩을 다 먹었어요. 새 칩을 꺼내 주세요' : `칩 한 입 먹기, 현재 ${bites}입 먹음 (총 3입)`}
                className="absolute left-[13%] top-[22%] z-10 w-[74%] rounded-[40%] outline-offset-8 disabled:cursor-default"
                initial={{ x: 320, rotate: 50, opacity: 0 }}
                animate={{ x: 0, rotate: -5, opacity: finished ? 0.35 : 1 }}
                exit={{ x: -320, rotate: -50, opacity: 0 }}
                whileHover={finished ? undefined : { scale: 1.03, rotate: -2 }}
                whileTap={finished ? undefined : { scale: 0.95, rotate: -8 }}
                transition={{ type: 'spring', stiffness: 160, damping: 17 }}
              >
                <LabChip honey={honey} butter={butter} bites={bites} />
              </motion.button>
            </AnimatePresence>

            {finished && (
              <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute inset-x-0 top-[42%] z-20 text-center">
                <StickerText className="text-4xl" rotate={-4}>
                  냠, 다 먹었다!
                </StickerText>
              </motion.div>
            )}

            {/* 바삭이 리액션 */}
            <motion.div key={`bsk-${react}`} className="absolute bottom-[-2%] left-[-3%] z-20 w-[31%]" animate={react ? { y: [0, -26, 0], rotate: [0, -6, 0] } : {}} transition={{ duration: 0.5 }} aria-hidden="true">
              <Basaki mood={mood} className="w-full drop-shadow-[0_8px_0_rgba(51,32,15,0.18)]" />
            </motion.div>

            {/* 꿀벌 */}
            <motion.div
              className="absolute left-[8%] top-[4%] z-20 w-[14%]"
              animate={reduced ? undefined : { x: [0, 30, 0, -10, 0], y: [0, 16, 30, 10, 0], rotate: honey > butter ? [0, 12, -4, 0] : [0, -8, 4, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              <Bee className="w-full" />
            </motion.div>

            {/* 황금 비율 메달 */}
            <AnimatePresence>
              {isGolden && (
                <motion.div
                  className="absolute bottom-[2%] right-[-2%] z-30 w-[30%]"
                  initial={{ scale: 0, rotate: -120 }}
                  animate={{ scale: 1, rotate: 10 }}
                  exit={{ scale: 0, rotate: 60 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 12 }}
                >
                  <MedalBadge label="황금 비율" value="3:2" unit="" ringText="GOLDEN RATIO • HONEY 3 • BUTTER 2 • " className="w-full" title="황금 비율 3:2 달성 메달" />
                </motion.div>
              )}
            </AnimatePresence>

            <Crumbs burst={burst} />
            <Confetti run={confetti} />
          </div>

          {/* 컨트롤 패널 */}
          <StickerCard className="p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-[1.7rem]">오늘의 레시피</h3>
              <p className="fraunces-soft rounded-full border-2 border-cocoa-900 bg-honey-300 px-3 py-1 font-serif text-lg font-black tabular-nums" aria-label={`현재 비율 꿀 ${honey} 대 버터 ${butter}`}>
                {honey} : {butter}
              </p>
            </div>
            <div className="mt-5 grid gap-3">
              <IngredientRow
                icon={<HoneyDipper className="h-10 w-4" />}
                label="아카시아 꿀"
                en="Acacia Honey"
                value={honey}
                color={C.honey400}
                onAdd={addHoney}
                onRemove={() => {
                  setHoney((h) => Math.max(0, h - 1));
                  play('pop');
                }}
                addText="한 스푼"
                addLabel="꿀 한 스푼 추가"
                removeLabel="꿀 한 스푼 빼기"
              />
              <IngredientRow
                icon={<ButterCube className="w-9" flag={false} />}
                label="고메버터"
                en="Gourmet Butter"
                value={butter}
                color={C.butter300}
                onAdd={addButter}
                onRemove={() => {
                  setButter((b) => Math.max(0, b - 1));
                  play('pop');
                }}
                addText="한 조각"
                addLabel="버터 한 조각 추가"
                removeLabel="버터 한 조각 빼기"
              />
            </div>

            <div
              className={cx(
                'relative mt-5 overflow-hidden rounded-sticker border-[2.5px] border-cocoa-900 p-4 transition-colors duration-500',
                isGolden ? 'bg-honey-400' : 'bg-butter-100',
              )}
              aria-live="polite"
            >
              {isGolden && <div className="absolute inset-0 bg-honeycomb-honey" aria-hidden="true" />}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={v.key + honey + butter} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }} className="relative">
                  <p className="font-display text-xl leading-snug">{v.title}</p>
                  <p className="mt-1 text-[0.95rem] text-cocoa-800">{v.desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <HoneyButton onClick={bite} disabled={finished} icon={<Crunch className="size-5" />} aria-label="칩 한 입 먹기" className="disabled:opacity-50">
                한 입 바삭!
              </HoneyButton>
              <HoneyButton variant="butter" onClick={reset} iconLeft={<Refresh className="size-4" />} aria-label="새 칩 꺼내서 처음부터 다시 하기">
                새 칩 꺼내기
              </HoneyButton>
            </div>
            <AnimatePresence>
              {golden && (
                <motion.a
                  href="#buy"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 inline-flex items-center gap-2 font-display text-lg text-berry-600 underline decoration-wavy decoration-2 underline-offset-4"
                >
                  쿠폰 확인하러 가기 <ArrowRight className="size-4" />
                </motion.a>
              )}
            </AnimatePresence>
          </StickerCard>
        </div>
      </div>
    </section>
  );
}
