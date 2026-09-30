import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useScroll, useSpring } from 'framer-motion';
import { STORY } from '../../data/content';
import { useMotionPrefs } from '../../context/MotionPrefs';
import { useMedia } from '../../hooks/useMedia';
import { C } from '../../lib/tokens';
import { cx } from '../../lib/cx';
import { HEX_D } from '../motifs/Hex';
import SectionHeading from '../ui/SectionHeading';
import StickerCard from '../ui/StickerCard';
import Mark from '../ui/Mark';
import StoryScene from './StoryScene';

function Chapter({ chapter, index, active, onActive, inline }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.55 });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li
      ref={ref}
      id={`chapter-${chapter.no}`}
      data-section={chapter.id}
      data-nav="story"
      data-bg={chapter.bg}
      className="relative flex min-h-[62vh] items-center py-10 pl-14 sm:pl-20 lg:min-h-[78vh]"
    >
      <span className="absolute left-0 top-12 grid size-11 place-items-center sm:size-14 lg:top-1/2 lg:-translate-y-1/2" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
          <path d={HEX_D} fill={active ? C.honey400 : C.cream} stroke={C.cocoa900} strokeWidth="7" className="transition-[fill] duration-500" />
        </svg>
        <span className="relative font-serif text-sm font-black">{chapter.no}</span>
      </span>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        {inline && (
          <div className="mb-6 aspect-square w-full max-w-[380px] overflow-hidden rounded-card border-[3px] border-cocoa-900 shadow-sticker">
            <StoryScene scene={chapter.scene} />
          </div>
        )}
        <p className="inline-flex items-center gap-2 rounded-full border-2 border-cocoa-900 bg-cream px-3 py-1 font-serif text-sm font-bold tabular-nums">
          <span className="size-2 rounded-full bg-berry-500" aria-hidden="true" />
          {chapter.time}
        </p>
        <p
          className="fraunces-soft mt-3 font-serif text-[4.5rem] font-black italic leading-none text-transparent sm:text-[5.5rem]"
          style={{ WebkitTextStroke: `2px ${C.cocoa900}` }}
          aria-hidden="true"
        >
          {chapter.no}
        </p>
        <h3 className="mt-1 font-display text-display-md">{chapter.title}</h3>
        <p className="mt-4 max-w-lg text-body-lg text-cocoa-800">{chapter.body}</p>
      </motion.div>
    </li>
  );
}

/**
 * 브랜드 스토리: 스크롤 스토리텔링
 * - 챕터마다 배경색이 아침 버터빛 → 오후 꿀빛으로 “해가 기우는” 전환
 * - 데스크톱: 좌측 스티키 무대의 장면이 교체 / 모바일: 챕터마다 인라인 장면
 */
export default function Story() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { reduced } = useMotionPrefs();
  const wide = useMedia('(min-width: 1024px)');
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 60%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const jump = (i) => document.getElementById(`chapter-${STORY[i].no}`)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });
  const ch = STORY[active];

  return (
    <section id="story" data-section="story" data-nav="story" data-bg={STORY[0].bg} aria-labelledby="story-title" className="relative overflow-x-clip py-section">
      <div className="container-honey">
        <SectionHeading
          eyebrow="Brand Story"
          index="05"
          id="story-title"
          title={
            <>
              바삭이의 <Mark tone="cream">하루</Mark>
            </>
          }
          desc="새벽 감자 언덕에서 오후 네 시의 한 봉지가 되기까지. 스크롤을 내리면 해가 천천히 기울어요."
        />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          {wide && (
            <div>
              <div className="sticky top-28">
                <StickerCard className="overflow-hidden p-3" shadow="shadow-sticker-lg">
                  <div className="relative aspect-square overflow-hidden rounded-[1.4rem] border-[3px] border-cocoa-900">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={ch.scene}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.08, rotate: 2 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.96, rotate: -2 }}
                        transition={{ duration: 0.45 }}
                      >
                        <StoryScene scene={ch.scene} />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <div className="flex items-center justify-between px-2 pb-1 pt-3">
                    <p className="font-display text-lg" aria-live="polite">
                      <span className="font-serif font-black">CH.{ch.no}</span> · {ch.title}
                    </p>
                    <div className="flex gap-1.5">
                      {STORY.map((s, i) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => jump(i)}
                          aria-label={`챕터 ${s.no} ${s.title}로 이동`}
                          aria-current={i === active ? 'step' : undefined}
                          className="grid size-8 place-items-center"
                        >
                          <svg viewBox="0 0 100 100" className={cx('size-6 transition-transform', i === active && 'scale-125')} aria-hidden="true">
                            <path d={HEX_D} fill={i === active ? C.honey400 : C.cream} stroke={C.cocoa900} strokeWidth="9" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>
                </StickerCard>
              </div>
            </div>
          )}
          <ol ref={ref} className="relative">
            <div className="absolute bottom-0 left-[1.3rem] top-0 w-1.5 rounded-full bg-cocoa-900/10 sm:left-[1.65rem]" aria-hidden="true">
              <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top rounded-full bg-honey-600" />
            </div>
            {STORY.map((c, i) => (
              <Chapter key={c.id} chapter={c} index={i} active={i === active} onActive={setActive} inline={!wide} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
