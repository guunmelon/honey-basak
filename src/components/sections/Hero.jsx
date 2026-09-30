import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BRAND } from '../../data/content';
import { useMotionPrefs } from '../../context/MotionPrefs';
import { useParallax, usePointer } from '../../context/Pointer';
import { useFx } from '../../hooks/useFx';
import { C } from '../../lib/tokens';
import { hexPath } from '../../lib/geometry';
import ChipBag from '../motifs/ChipBag';
import Chip from '../motifs/Chip';
import HoneyJar from '../motifs/HoneyJar';
import ButterCube from '../motifs/ButterCube';
import Bee from '../motifs/Bee';
import MedalBadge from '../motifs/MedalBadge';
import Sparkle from '../motifs/Sparkle';
import HoneyDrips from '../motifs/HoneyDrips';
import HoneyButton from '../ui/HoneyButton';
import RibbonBanner from '../motifs/RibbonBanner';
import Wordmark from '../ui/Wordmark';
import { ArrowDown, ArrowRight } from '../ui/Icons';

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
});
const pop = (delay, rotate = 0) => ({
  initial: { opacity: 0, scale: 0.2, rotate: rotate - 40 },
  animate: { opacity: 1, scale: 1, rotate },
  transition: { delay, type: 'spring', stiffness: 240, damping: 13 },
});

const HALO = hexPath(250, 250, 236, 36);

function HeroStage({ progress }) {
  const { lite, reduced } = useMotionPrefs();
  const { x, y } = usePointer();

  // 스크롤: 봉지는 기울며 내려앉고, 재료들은 사방으로 흩어짐
  const bagY = useFx(progress, [0, 1], [0, 170], { lite: [0, 60] });
  const bagRotate = useFx(progress, [0, 1], [-4, 14], { rest: -4, lite: [-4, 4] });
  const bagScale = useFx(progress, [0, 1], [1, 0.84], { lite: [1, 0.95] });
  const jarX = useFx(progress, [0, 1], [0, -130], { lite: [0, -30] });
  const jarRotate = useFx(progress, [0, 1], [-8, -48], { rest: -8, lite: [-8, -16] });
  const butterX = useFx(progress, [0, 1], [0, 150], { lite: [0, 30] });
  const butterRotate = useFx(progress, [0, 1], [6, 40], { rest: 6, lite: [6, 14] });
  const chipsY = useFx(progress, [0, 1], [0, -260], { lite: [0, -80] });
  const chipsRotate = useFx(progress, [0, 1], [0, 220], { lite: [0, 60] });
  const ring = useFx(progress, [0, 1], [0, 300], { lite: [0, 120] });
  const haloRotate = useFx(progress, [0, 1], [0, 60]);

  // 마우스: 봉지 3D 틸트 + 레이어별 패럴랙스
  const tiltY = useTransform(x, (v) => v * 16);
  const tiltX = useTransform(y, (v) => v * -12);
  const far = useParallax(-10);
  const mid = useParallax(22);
  const near = useParallax(38);

  return (
    <div className="relative mx-auto aspect-[5/6] w-full max-w-[250px] sm:max-w-[340px] lg:max-w-[520px]" style={{ perspective: 1200 }}>
      {/* 황금빛 후광 + 벌집 링 */}
      <motion.div style={far} className="absolute inset-[4%]">
        <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle,#FFF7DA_0%,rgba(255,247,218,0.6)_38%,rgba(255,247,218,0)_70%)]" />
        <motion.svg viewBox="0 0 500 500" className="absolute inset-0 size-full" style={{ rotate: haloRotate }} aria-hidden="true">
          <path d={HALO} fill="none" stroke={C.cocoa900} strokeOpacity="0.22" strokeWidth="3" strokeDasharray="2 14" strokeLinecap="round" />
          <path d={hexPath(250, 250, 200, 30)} fill="none" stroke={C.honey500} strokeOpacity="0.5" strokeWidth="2.5" />
        </motion.svg>
      </motion.div>

      {/* 날아가는 칩들 */}
      <motion.div style={{ y: chipsY, rotate: chipsRotate }} className="absolute -left-[6%] top-[4%] w-[27%]">
        <motion.div {...pop(1.05, -18)}>
          <motion.div style={near}>
            <Chip seed={4} className="w-full drop-shadow-[0_8px_0_rgba(51,32,15,0.15)]" />
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div style={{ y: chipsY, rotate: chipsRotate }} className="absolute -right-[4%] top-[34%] w-[22%]">
        <motion.div {...pop(1.15, 24)}>
          <motion.div style={mid}>
            <Chip seed={9} className="w-full" />
          </motion.div>
        </motion.div>
      </motion.div>
      {!lite && (
        <motion.div style={{ y: chipsY }} className="absolute left-[2%] top-[46%] w-[15%]">
          <motion.div {...pop(1.25, 40)}>
            <motion.div style={near}>
              <Chip seed={15} className="w-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* 제품 봉지: 진입 낙하 → 스크롤 연동 → 마우스 틸트 → 둥실 */}
      <motion.div
        className="absolute left-[17%] top-[3%] w-[66%]"
        initial={{ y: -320, opacity: 0, rotate: -28 }}
        animate={{ y: 0, opacity: 1, rotate: 0 }}
        transition={{ delay: 0.55, type: 'spring', stiffness: 110, damping: 13 }}
      >
        <motion.div style={{ y: bagY, rotate: bagRotate, scale: bagScale }}>
          <motion.div style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}>
            <div className={reduced ? '' : 'animate-float-slow'}>
              <ChipBag medal={false} className="w-full drop-shadow-[0_22px_0_rgba(51,32,15,0.16)]" title="허니바삭 오리지널 허니버터 봉지" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 메달: 스크롤할수록 테두리 문구가 회전 */}
      <motion.div className="absolute right-[1%] top-[-2%] w-[30%]" {...pop(1.35, 12)}>
        <motion.div style={mid}>
          <MedalBadge ringRotate={ring} className="w-full drop-shadow-[0_6px_0_rgba(51,32,15,0.2)]" title="국내산 감자 100% 배지" />
        </motion.div>
      </motion.div>

      {/* 꿀단지 */}
      <motion.div style={{ x: jarX, rotate: jarRotate }} className="absolute -left-[4%] bottom-[4%] w-[34%]">
        <motion.div {...pop(1.2, 0)}>
          <motion.div style={near}>
            <HoneyJar className="w-full drop-shadow-[0_10px_0_rgba(51,32,15,0.16)]" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 버터 */}
      <motion.div style={{ x: butterX, rotate: butterRotate }} className="absolute -right-[6%] bottom-[2%] w-[38%]">
        <motion.div {...pop(1.3, 0)}>
          <motion.div style={mid}>
            <ButterCube className="w-full drop-shadow-[0_10px_0_rgba(51,32,15,0.16)]" title="프랑스산 고메버터" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 꿀벌 비비: 봉지 주위를 맴돎 */}
      <motion.div className="absolute left-[4%] top-[24%] w-[17%]" {...pop(1.5, 0)}>
        <motion.div
          animate={reduced ? undefined : { x: [0, 40, 90, 50, 0], y: [0, -30, 10, 40, 0], rotate: [0, 8, -6, 4, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Bee className="w-full" />
        </motion.div>
      </motion.div>

      {/* 반짝이 */}
      {[
        ['left-[20%] top-[1%] w-6', 0],
        ['right-[30%] bottom-[18%] w-5', 0.8],
        ['left-[40%] bottom-[2%] w-7', 1.6],
        ['right-[2%] top-[28%] w-4', 0.4],
      ].map(([cls, d], i) => (
        <div key={i} className={`absolute ${cls} animate-twinkle`} style={{ animationDelay: `${d}s` }}>
          <Sparkle color={i % 2 ? C.cream : C.honey500} className="w-full" />
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const textY = useFx(scrollYProgress, [0, 1], [0, 90], { lite: [0, 20] });
  const textOpacity = useFx(scrollYProgress, [0, 0.85], [1, 0.25], { rest: 1 });

  return (
    <section
      id="top"
      ref={ref}
      data-section="hero"
      data-nav="hero"
      data-bg="#F8CF52"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-24 sm:pt-28 lg:pb-24"
    >
      <HoneyDrips pour className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[150px] w-full" seed={5} count={18} height={150} />
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_68%_48%,#FFF4CC_0%,rgba(255,244,204,0)_58%)]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-honeycomb opacity-80"
        style={{ maskImage: 'radial-gradient(ellipse at 70% 50%, black 10%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at 70% 50%, black 10%, transparent 70%)' }}
      />

      <div className="container-honey relative z-[2] grid items-center gap-8 lg:grid-cols-12 lg:gap-4">
        <motion.div style={{ y: textY, opacity: textOpacity }} className="text-center lg:col-span-7 lg:text-left">
          <motion.div {...pop(0.25, -5)} className="inline-block origin-left">
            <RibbonBanner className="w-[250px] sm:w-[320px] lg:w-[350px]" title={BRAND.hero.sticker} />
          </motion.div>
          <Wordmark id="hero-title" delay={0.4} label="허니바삭 HONEY BASAK" className="mt-1 -ml-1 lg:-ml-2" />
          <motion.p {...fadeUp(0.85)} className="mt-4 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 lg:justify-start">
            <span className="fraunces-soft font-serif text-2xl font-bold italic text-honey-700 sm:text-[1.7rem]">Honey Butter Crisps</span>
            <span className="font-display text-xl text-cocoa-800 sm:text-2xl">오후 네 시의 황금빛 바삭함</span>
          </motion.p>
          <motion.p {...fadeUp(0.95)} className="mx-auto mt-4 max-w-xl text-body text-cocoa-700 sm:text-body-lg lg:mx-0 lg:mt-5">
            {BRAND.hero.body}
          </motion.p>
          <motion.div {...fadeUp(1.05)} className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:mt-9 lg:justify-start">
            <HoneyButton as="a" href="#flavors" size="lg" className="max-sm:h-14 max-sm:px-6 max-sm:text-lg" icon={<ArrowRight className="size-5" />} aria-label="맛 라인업 섹션으로 이동">
              꿀맛 보러 가기
            </HoneyButton>
            <HoneyButton as="a" href="#lab" variant="butter" size="lg" className="max-sm:h-14 max-sm:px-6 max-sm:text-lg" aria-label="황금비율 실험실 섹션으로 이동">
              실험실 입장
            </HoneyButton>
          </motion.div>
          <motion.ul {...fadeUp(1.15)} className="mt-8 hidden flex-wrap justify-center gap-2 sm:flex lg:justify-start" aria-label="핵심 재료">
            {['국내산 감자 100%', '아카시아 꿀', '프랑스산 고메버터'].map((t) => (
              <li key={t} className="rounded-full border-2 border-cocoa-900/80 bg-cream/70 px-3.5 py-1.5 font-display text-[0.95rem] text-cocoa-800">
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <div className="relative order-first lg:order-none lg:col-span-5">
          <HeroStage progress={scrollYProgress} />
        </div>
      </div>

      <motion.a
        href="#world"
        {...fadeUp(1.6)}
        className="group absolute bottom-6 left-1/2 z-[3] hidden -translate-x-1/2 flex-col items-center gap-1 font-display text-cocoa-800 lg:flex"
        aria-label="브랜드 세계관 섹션으로 스크롤"
      >
        <span className="text-sm">꿀 따라 내려가기</span>
        <span className="relative grid h-10 w-7 place-items-start justify-center rounded-full border-[3px] border-cocoa-900 bg-cream">
          <span className="mt-1 block h-3 w-3 rounded-full bg-honey-400 animate-drop" style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }} />
        </span>
        <ArrowDown className="size-4 transition-transform group-hover:translate-y-1" />
      </motion.a>
    </section>
  );
}
