import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { BASAKI, KEYWORDS, PLACES } from '../../data/content';
import { useAppState } from '../../context/AppState';
import { useFx } from '../../hooks/useFx';
import { useSafeId } from '../../hooks/useSafeId';
import { C } from '../../lib/tokens';
import { cx } from '../../lib/cx';
import { hexPath, dripPath } from '../../lib/geometry';
import Potato from '../motifs/Potato';
import HoneyJar from '../motifs/HoneyJar';
import ButterCube from '../motifs/ButterCube';
import Basaki from '../motifs/Basaki';
import Sparkle from '../motifs/Sparkle';
import SectionHeading from '../ui/SectionHeading';
import StickerCard from '../ui/StickerCard';
import Mark from '../ui/Mark';
import HoneyButton from '../ui/HoneyButton';
import Reveal from '../ui/Reveal';
import { ArrowRight } from '../ui/Icons';

// flat-top 벌집 좌표 (600×600 공간, 반지름 100)
const R = 100;
const H = Math.sqrt(3) * R;
const axial = (q, r) => ({ x: 300 + 1.5 * R * q, y: 300 + H * (r + q / 2) });
const CELL_HEX = hexPath(100, H / 2, 92, 16);

const CELLS = [
  { key: 'basaki', ...axial(0, 0), place: 'basaki', ring: 0 },
  { key: 'potato', ...axial(-1, 0), place: 'potato', ring: 1 },
  { key: 'hive', ...axial(1, -1), place: 'hive', ring: 1 },
  { key: 'butter', ...axial(0, 1), place: 'butter', ring: 1 },
  { key: 'd1', ...axial(0, -1), deco: 'honey', ring: 1 },
  { key: 'd2', ...axial(1, 0), deco: 'honeyDrip', ring: 1 },
  { key: 'd3', ...axial(-1, 1), deco: 'spark', ring: 1 },
  { key: 'e1', ...axial(-1, -1), deco: 'empty', ring: 2 },
  { key: 'e2', ...axial(2, -1), deco: 'honey', ring: 2 },
  { key: 'e3', ...axial(1, 1), deco: 'empty', ring: 2 },
  { key: 'e4', ...axial(-2, 1), deco: 'empty', ring: 2 },
  { key: 'e5', ...axial(2, -2), deco: 'empty', ring: 2 },
  { key: 'e6', ...axial(-2, 2), deco: 'honey', ring: 2 },
];

const ICONS = {
  potato: (p) => <Potato {...p} />,
  hive: (p) => <HoneyJar {...p} />,
  butter: (p) => <ButterCube {...p} />,
  basaki: (p) => <Basaki {...p} mood="happy" />,
};

const cellStyle = (c) => ({
  left: `${((c.x - R) / 600) * 100}%`,
  top: `${((c.y - H / 2) / 600) * 100}%`,
  width: `${((2 * R) / 600) * 100}%`,
  height: `${(H / 600) * 100}%`,
});

function HexFrame({ fill, stroke = C.cocoa900, strokeWidth = 5, honey, active, shadow = true, dashed = false, children }) {
  const id = useSafeId('cell');
  return (
    <svg viewBox={`0 0 200 ${H}`} className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
      <defs>
        <clipPath id={id}>
          <path d={CELL_HEX} />
        </clipPath>
      </defs>
      {shadow && <path d={CELL_HEX} transform="translate(0 7)" fill={C.cocoa900} opacity={active ? 1 : 0.9} />}
      <path d={CELL_HEX} fill={fill} />
      {honey && (
        <g clipPath={`url(#${id})`}>
          <motion.path
            d={`M-10 14 Q 15 2 40 14 T 90 14 T 140 14 T 190 14 T 240 14 V ${H + 20} H -10 Z`}
            fill={C.honey400}
            variants={{ rest: { y: H - 6 }, hover: { y: H * 0.42 }, active: { y: H * 0.08 } }}
            transition={{ type: 'spring', stiffness: 90, damping: 16 }}
          />
        </g>
      )}
      {children}
      <path d={CELL_HEX} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" strokeDasharray={dashed ? '10 9' : undefined} strokeLinecap="round" />
    </svg>
  );
}

function DecoCell({ cell }) {
  const empty = cell.deco === 'empty';
  return (
    <div className="absolute" style={cellStyle(cell)} aria-hidden="true">
      <HexFrame fill={empty ? 'rgba(255,253,244,0.35)' : C.honey400} stroke={empty ? 'rgba(51,32,15,0.3)' : C.cocoa900} strokeWidth={empty ? 3.5 : 5} shadow={!empty} dashed={empty}>
        {!empty && (
          <>
            <path d="M52 34 L86 20" stroke="#fff" strokeOpacity="0.75" strokeWidth="9" strokeLinecap="round" />
            <path d="M44 56 L58 50" stroke="#fff" strokeOpacity="0.55" strokeWidth="7" strokeLinecap="round" />
          </>
        )}
        {cell.deco === 'honeyDrip' && (
          <g>
            <path d={dripPath(128, 12, 58, 8)} fill={C.honey500} stroke={C.cocoa900} strokeWidth="3.5" />
            <path d={dripPath(78, 12, 36, 6)} fill={C.honey500} stroke={C.cocoa900} strokeWidth="3.5" />
          </g>
        )}
      </HexFrame>
      {cell.deco === 'spark' && (
        <div className="absolute inset-0 grid place-items-center">
          <Sparkle className="w-[30%] animate-twinkle" color={C.cream} />
        </div>
      )}
    </div>
  );
}

function PlaceCell({ cell, data, selected, onSelect }) {
  const Icon = ICONS[cell.place];
  const center = cell.place === 'basaki';
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(cell.place)}
      aria-pressed={selected}
      aria-controls="place-detail"
      aria-label={`${data.name} — ${data.hint} 자세히 보기`}
      className="clip-hex absolute outline-none focus-visible:[&_.focus-ring]:opacity-100"
      style={cellStyle(cell)}
      initial="rest"
      animate={selected ? 'active' : 'rest'}
      whileHover={selected ? 'active' : 'hover'}
      whileTap={{ scale: 0.95 }}
    >
      <HexFrame fill={selected ? C.butter100 : C.cream} honey active={selected} strokeWidth={selected ? 7 : 5} />
      <svg viewBox={`0 0 200 ${H}`} className="focus-ring pointer-events-none absolute inset-0 size-full opacity-0" aria-hidden="true">
        <path d={hexPath(100, H / 2, 80, 12)} fill="none" stroke={C.berry500} strokeWidth="5" strokeDasharray="10 8" />
      </svg>
      <motion.span
        className="relative z-10 flex size-full flex-col items-center justify-center pb-[6%]"
        variants={{ rest: { y: 0 }, hover: { y: -5 }, active: { y: -3 } }}
        transition={{ type: 'spring', stiffness: 400, damping: 14 }}
      >
        <Icon className={center ? 'w-[62%]' : 'w-[48%]'} />
        <span className={cx('mt-0.5 font-display leading-none text-cocoa-900', center ? 'text-[clamp(0.85rem,2.2vw,1.25rem)]' : 'text-[clamp(0.75rem,1.9vw,1.1rem)]')}>
          {data.name}
        </span>
      </motion.span>
      {selected && (
        <motion.span
          layoutId="hive-selected"
          className="absolute right-[18%] top-[10%] z-20 grid size-[18%] place-items-center rounded-full border-[3px] border-cocoa-900 bg-berry-500 font-display text-[clamp(0.6rem,1.4vw,0.9rem)] text-cream"
          aria-hidden="true"
        >
          ♥
        </motion.span>
      )}
    </motion.button>
  );
}

function HiveMap({ selected, onSelect }) {
  const lookup = { basaki: BASAKI, ...Object.fromEntries(PLACES.map((p) => [p.id, p])) };
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[580px]">
      {CELLS.map((cell) => (
        <motion.div
          key={cell.key}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 170, damping: 15, delay: 0.1 + cell.ring * 0.16 + (cell.key.charCodeAt(cell.key.length - 1) % 5) * 0.03 }}
          style={{ pointerEvents: 'none' }}
        >
          <div className="pointer-events-auto">
            {cell.place ? (
              <PlaceCell cell={cell} data={lookup[cell.place]} selected={selected === cell.place} onSelect={onSelect} />
            ) : (
              <DecoCell cell={cell} />
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function PlaceDetail({ place, onNext }) {
  const Icon = ICONS[place.id];
  return (
    <StickerCard id="place-detail" className="mt-10 overflow-hidden p-6 sm:p-7" aria-live="polite">
      <div className="absolute inset-y-0 right-0 w-1/3 bg-honeycomb-honey opacity-40" aria-hidden="true" style={{ maskImage: 'linear-gradient(to left, black, transparent)' }} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={place.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="relative flex gap-5"
        >
          <div className="grid size-24 shrink-0 place-items-center rounded-[1.4rem] border-[3px] border-cocoa-900 bg-butter-200 sm:size-28">
            <Icon className="w-[78%]" />
          </div>
          <div className="min-w-0">
            <p className="fraunces-soft font-serif text-sm font-semibold italic text-honey-700">{place.en}</p>
            <h3 className="font-display text-[1.7rem] leading-tight">{place.name}</h3>
            <p className="mt-1 inline-block rounded-full border-2 border-cocoa-900 bg-honey-300 px-3 py-0.5 font-display text-sm">{place.fact}</p>
            <p className="mt-3 text-cocoa-700">{place.desc}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="relative mt-5 flex justify-end">
        <HoneyButton size="sm" variant="butter" onClick={onNext} icon={<ArrowRight className="size-4" />} aria-label="다음 장소 보기">
          다음 방으로
        </HoneyButton>
      </div>
    </StickerCard>
  );
}

const ORDER = ['potato', 'hive', 'butter', 'basaki'];

export default function World() {
  const ref = useRef(null);
  const [selected, setSelected] = useState('potato');
  const { play } = useAppState();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const mapRotate = useFx(scrollYProgress, [0, 1], [-9, 9], { rest: 0, lite: [-3, 3] });
  const mapY = useFx(scrollYProgress, [0, 1], [60, -60], { rest: 0, lite: [20, -20] });

  const place = selected === 'basaki' ? BASAKI : PLACES.find((p) => p.id === selected);
  const select = (id) => {
    setSelected(id);
    play('pop');
  };
  const next = () => select(ORDER[(ORDER.indexOf(selected) + 1) % ORDER.length]);

  return (
    <section id="world" ref={ref} data-section="world" data-bg="#FFF3CC" aria-labelledby="world-title" className="relative overflow-x-clip py-section">
      <div className="container-honey grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
        <div>
          <SectionHeading
            eyebrow="Brand World"
            index="01"
            id="world-title"
            title={
              <>
                버터벌집 마을에
                <br />
                <Mark>오신 걸</Mark> 환영해요
              </>
            }
            desc="바삭이가 사는 버터벌집 마을에는 세 개의 방이 있어요. 감자 언덕, 아카시아 벌집, 버터 공방. 세 방이 맞닿는 한가운데에서 오늘도 황금빛 칩이 태어납니다. 벌집 칸을 눌러 마을을 둘러보세요."
          />
          <Reveal delay={0.15}>
            <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="브랜드 핵심 키워드">
              {KEYWORDS.map((k, i) => (
                <motion.li
                  key={k.ko}
                  whileHover={{ rotate: i % 2 ? 4 : -4, y: -3 }}
                  className="flex items-baseline gap-1.5 rounded-full border-[2.5px] border-cocoa-900 bg-cream px-4 py-2 shadow-sticker-sm"
                >
                  <span className="font-display text-lg leading-none">{k.ko}</span>
                  <span className="fraunces-soft font-serif text-xs italic text-honey-700">{k.en}</span>
                </motion.li>
              ))}
            </ul>
          </Reveal>
          <PlaceDetail place={place} onNext={next} />
        </div>
        <motion.div style={{ rotate: mapRotate, y: mapY }}>
          <HiveMap selected={selected} onSelect={select} />
        </motion.div>
      </div>
    </section>
  );
}
