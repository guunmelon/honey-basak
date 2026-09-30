import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_LINKS } from '../../data/content';
import { useMotionPrefs } from '../../context/MotionPrefs';
import { C } from '../../lib/tokens';
import HoneyDrips from '../motifs/HoneyDrips';
import Basaki from '../motifs/Basaki';
import HexIconButton from '../ui/HexIconButton';
import HoneyButton from '../ui/HoneyButton';
import { HexDot } from '../ui/SectionHeading';
import { Close, MotionIcon, MotionOffIcon } from '../ui/Icons';

/** 모바일 전체 메뉴 — 위에서 꿀 커튼이 흘러내리는 패널 */
export default function MobileMenu({ open, onClose, active }) {
  const panelRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const { reduced, systemReduced, toggleReduced } = useMotionPrefs();

  useEffect(() => {
    if (!open) return undefined;
    const last = document.activeElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => panelRef.current?.querySelector('[data-autofocus]')?.focus(), 50);
    const onKey = (e) => {
      if (e.key === 'Escape') closeRef.current?.();
      if (e.key === 'Tab' && panelRef.current) {
        const f = panelRef.current.querySelectorAll('a[href], button:not([disabled])');
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) {
          e.preventDefault();
          f[f.length - 1].focus();
        } else if (!e.shiftKey && document.activeElement === f[f.length - 1]) {
          e.preventDefault();
          f[0].focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
      last?.focus?.({ preventScroll: true });
    };
  }, [open]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-cocoa-950/50" onClick={() => closeRef.current?.()} aria-hidden="true" />
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="전체 메뉴"
            className="relative"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', stiffness: 210, damping: 28 }}
          >
            <div className="relative overflow-hidden border-b-[3px] border-cocoa-900 bg-honey-400 px-6 pb-8 pt-5">
              <div className="absolute inset-0 bg-honeycomb-honey opacity-60" aria-hidden="true" />
              <div className="relative flex items-center justify-between">
                <span className="font-display text-2xl text-cocoa-950">메뉴</span>
                <HexIconButton data-autofocus label="메뉴 닫기" onClick={() => closeRef.current?.()}>
                  <Close className="size-5" />
                </HexIconButton>
              </div>
              <nav aria-label="모바일 메뉴" className="relative mt-6">
                <ul className="grid gap-1">
                  {NAV_LINKS.map((l, i) => (
                    <motion.li key={l.id} initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.12 + i * 0.05 }}>
                      <a
                        href={`#${l.id}`}
                        onClick={() => closeRef.current?.()}
                        aria-current={active === l.id ? 'location' : undefined}
                        className="flex items-center gap-3 rounded-2xl px-3 py-3 font-display text-[1.9rem] leading-none text-cocoa-950 hover:bg-butter-200/60 aria-[current]:bg-cream/70"
                      >
                        <HexDot className="size-5" color={active === l.id ? C.berry500 : C.cream} />
                        {l.label}
                        <span className="ml-auto font-serif text-sm italic text-cocoa-700">{l.en}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div className="relative z-10 mt-6 flex flex-wrap items-center gap-3">
                <HoneyButton as="a" href="#buy" variant="cocoa" onClick={() => closeRef.current?.()} aria-label="구매 섹션으로 이동">
                  구매하기
                </HoneyButton>
                <button
                  type="button"
                  onClick={toggleReduced}
                  disabled={systemReduced}
                  aria-pressed={reduced}
                  className="inline-flex h-14 items-center gap-2 rounded-full border-[3px] border-cocoa-900 bg-cream px-5 font-display text-lg text-cocoa-900 disabled:opacity-60"
                >
                  {reduced ? <MotionOffIcon className="size-5" /> : <MotionIcon className="size-5" />}
                  모션 줄이기 {reduced ? 'ON' : 'OFF'}
                </button>
              </div>
              <Basaki className="pointer-events-none absolute -bottom-10 -right-6 w-28 rotate-[-10deg]" mood="yum" />
            </div>
            <HoneyDrips className="pointer-events-none absolute inset-x-0 top-full -mt-1 h-20 w-full" count={10} seed={9} height={80} band={6} pour={!reduced} idle={false} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
