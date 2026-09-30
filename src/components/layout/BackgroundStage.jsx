import { motion, useScroll, useTransform } from 'framer-motion';
import { useMotionPrefs } from '../../context/MotionPrefs';
import { usePointer } from '../../context/Pointer';
import { useSectionTheme } from '../../context/SectionTheme';
import { useFx } from '../../hooks/useFx';
import { C } from '../../lib/tokens';
import { HEX_D } from '../motifs/Hex';
import Chip from '../motifs/Chip';
import Bee from '../motifs/Bee';
import Sparkle from '../motifs/Sparkle';

// 떠다니는 배경 오브젝트: depth가 클수록 마우스·스크롤에 더 크게 반응
const DECOR = [
  { type: 'hex', x: 2.5, y: 16, s: 70, depth: 1.2, rot: 12, core: true },
  { type: 'chip', x: 92, y: 22, s: 92, depth: 2.2, rot: -24, seed: 12 },
  { type: 'drop', x: 4, y: 70, s: 34, depth: 1.6 },
  { type: 'spark', x: 95, y: 58, s: 22, depth: 0.8, core: true },
  { type: 'hexFill', x: 94, y: 82, s: 52, depth: 1.4, rot: 20, core: true },
  { type: 'chip', x: 0.5, y: 44, s: 72, depth: 2.6, rot: 30, seed: 5 },
  { type: 'bee', x: 62, y: 9, s: 58, depth: 3 },
  { type: 'hex', x: 3.5, y: 92, s: 42, depth: 1, rot: 0 },
  { type: 'spark', x: 5, y: 30, s: 16, depth: 0.6, core: true },
  { type: 'drop', x: 96, y: 92, s: 26, depth: 1.2 },
  { type: 'hexFill', x: 1.5, y: 97, s: 32, depth: 0.9 },
  { type: 'spark', x: 97, y: 40, s: 18, depth: 0.7 },
];

function DecorShape({ item, tone }) {
  const dark = tone === 'dark';
  switch (item.type) {
    case 'hex':
      return (
        <svg viewBox="0 0 100 100" className="size-full overflow-visible">
          <path d={HEX_D} fill="none" stroke={dark ? C.honey400 : C.cocoa900} strokeOpacity={dark ? 0.35 : 0.16} strokeWidth="5" />
        </svg>
      );
    case 'hexFill':
      return (
        <svg viewBox="0 0 100 100" className="size-full overflow-visible">
          <path d={HEX_D} fill={dark ? C.honey500 : C.honey300} fillOpacity={dark ? 0.35 : 0.7} stroke={C.cocoa900} strokeOpacity={dark ? 0 : 0.5} strokeWidth="5" />
          <path d="M30 28 L50 18" stroke="#fff" strokeOpacity="0.7" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );
    case 'drop':
      return (
        <svg viewBox="0 0 40 52" className="size-full overflow-visible">
          <path d="M20 2 C 26 16, 36 24, 36 34 A 16 16 0 0 1 4 34 C 4 24, 14 16, 20 2 Z" fill={C.honey400} fillOpacity={dark ? 0.6 : 0.85} stroke={C.cocoa900} strokeOpacity={dark ? 0 : 0.7} strokeWidth="3" />
          <ellipse cx="13" cy="33" rx="3" ry="5" fill="#fff" opacity="0.7" />
        </svg>
      );
    case 'spark':
      return <Sparkle className="size-full" color={dark ? C.honey300 : C.cream} />;
    case 'chip':
      return <Chip seed={item.seed} className={dark ? 'size-full opacity-50' : 'size-full opacity-90'} />;
    case 'bee':
      return <Bee className="size-full" />;
    default:
      return null;
  }
}

function Floater({ item, index, progress, tone }) {
  const { x, y } = usePointer();
  const drift = useFx(progress, [0, 1], [0, -260 * item.depth]);
  const spin = useFx(progress, [0, 1], [item.rot ?? 0, (item.rot ?? 0) + (index % 2 ? 160 : -160)]);
  const px = useTransform(x, (v) => v * item.depth * -16);
  const py = useTransform(y, (v) => v * item.depth * -12);
  return (
    <motion.div
      className="absolute"
      style={{ left: `${item.x}%`, top: `${item.y}%`, width: item.s, height: item.s, y: drift, rotate: spin }}
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6 + index * 0.06, type: 'spring', stiffness: 160, damping: 14 }}
    >
      <motion.div className="size-full" style={{ x: px, y: py }}>
        <div className={item.type === 'spark' ? 'size-full animate-twinkle' : 'size-full animate-float'} style={{ animationDelay: `${-index * 0.7}s` }}>
          <DecorShape item={item} tone={tone} />
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * 고정 배경 무대
 * - 현재 섹션의 data-bg로 배경색이 부드럽게 전환 (아침 버터 → 오후 꿀 → 밤 코코아)
 * - 꿀빛 태양이 스크롤에 따라 하늘을 가로질러 “지는” 연출
 * - 벌집 패턴 + 종이 그레인 질감
 */
export default function BackgroundStage() {
  const { bg, tone } = useSectionTheme();
  const { lite } = useMotionPrefs();
  const { scrollYProgress } = useScroll();
  const sunY = useFx(scrollYProgress, [0, 1], ['-18vh', '70vh'], { rest: '-10vh' });
  const sunX = useFx(scrollYProgress, [0, 1], ['58vw', '-8vw'], { rest: '58vw' });
  const items = lite ? DECOR.filter((d) => d.core) : DECOR;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div className="absolute inset-0" initial={false} animate={{ backgroundColor: bg }} transition={{ duration: 1, ease: 'easeInOut' }} />
      <motion.div
        className="absolute size-[75vmax] rounded-full"
        style={{
          x: sunX,
          y: sunY,
          background: `radial-gradient(circle, ${tone === 'dark' ? 'rgba(244,174,47,0.28)' : 'rgba(255,248,222,0.75)'} 0%, rgba(255,248,222,0) 62%)`,
        }}
      />
      <div className={`absolute inset-0 transition-opacity duration-1000 ${tone === 'dark' ? 'bg-honeycomb-cream opacity-100' : 'bg-honeycomb opacity-60'}`} />
      <div className="absolute inset-0">
        {items.map((item, i) => (
          <Floater key={i} item={item} index={i} progress={scrollYProgress} tone={tone} />
        ))}
      </div>
      <div className="grain absolute inset-0 opacity-[0.07] mix-blend-multiply" />
    </div>
  );
}
