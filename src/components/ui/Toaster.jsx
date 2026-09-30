import { AnimatePresence, motion } from 'framer-motion';
import { useAppState } from '../../context/AppState';
import Bee from '../motifs/Bee';
import { Close } from './Icons';

/** 꿀벌이 전해 주는 토스트 알림 (aria-live) */
export default function Toaster() {
  const { toasts, dismissToast } = useAppState();
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-5 z-[90] flex flex-col items-center gap-2 px-4">
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ y: 30, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            className="pointer-events-auto flex max-w-[92vw] items-center gap-2 rounded-full border-[3px] border-cocoa-900 bg-cream py-1.5 pl-2 pr-2 font-display text-[1.02rem] text-cocoa-900 shadow-sticker"
          >
            <Bee className="h-8 w-9 shrink-0" />
            <span className="px-1">{t.message}</span>
            <button
              type="button"
              onClick={() => dismissToast(t.id)}
              aria-label="알림 닫기"
              className="grid size-8 shrink-0 place-items-center rounded-full hover:bg-butter-200"
            >
              <Close className="size-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
