import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { cx } from '../../lib/cx';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

function trapTab(e, root) {
  if (!root) return;
  const nodes = Array.from(root.querySelectorAll(FOCUSABLE)).filter((n) => n.offsetParent !== null);
  if (!nodes.length) return;
  const first = nodes[0];
  const last = nodes[nodes.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

/**
 * 접근성 다이얼로그: role=dialog + aria-modal, ESC 닫기, 포커스 트랩, 닫힐 때 포커스 복귀
 * variant: 'center' | 'drawer'
 */
export default function Modal({ open, onClose, labelledBy, variant = 'center', className, children }) {
  const panelRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;
    const lastFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => {
      const target = panelRef.current?.querySelector('[data-autofocus]') || panelRef.current;
      target?.focus({ preventScroll: true });
    }, 40);
    const onKey = (e) => {
      if (e.key === 'Escape') closeRef.current?.();
      if (e.key === 'Tab') trapTab(e, panelRef.current);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
      if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus({ preventScroll: true });
    };
  }, [open]);

  const drawer = variant === 'drawer';

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={cx('fixed inset-0 z-[80] flex', drawer ? 'justify-end' : 'items-center justify-center p-3 sm:p-6')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-cocoa-950/55 backdrop-blur-[3px]" onClick={() => closeRef.current?.()} aria-hidden="true" />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            tabIndex={-1}
            className={cx('relative outline-none', className)}
            initial={drawer ? { x: '105%' } : { y: 70, scale: 0.9, rotate: -2.5, opacity: 0 }}
            animate={drawer ? { x: 0 } : { y: 0, scale: 1, rotate: 0, opacity: 1 }}
            exit={drawer ? { x: '105%' } : { y: 40, scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
