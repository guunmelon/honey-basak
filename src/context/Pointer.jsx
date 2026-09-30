import { createContext, useContext, useEffect } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useMotionPrefs } from './MotionPrefs';

const PointerContext = createContext(null);

/** 전역 마우스 위치(-1~1)를 스프링으로 부드럽게 — 리렌더 없이 MotionValue로만 전달 */
export function PointerProvider({ children }) {
  const { lite } = useMotionPrefs();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (lite) {
      rawX.set(0);
      rawY.set(0);
      return undefined;
    }
    let frame = 0;
    const onMove = (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        rawX.set((e.clientX / window.innerWidth) * 2 - 1);
        rawY.set((e.clientY / window.innerHeight) * 2 - 1);
      });
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, [lite, rawX, rawY]);

  return <PointerContext.Provider value={{ x, y }}>{children}</PointerContext.Provider>;
}

export const usePointer = () => useContext(PointerContext);

/** depth(px)만큼 마우스 반대/같은 방향으로 미세하게 이동 */
export function useParallax(depth = 20) {
  const { x, y } = usePointer();
  const px = useTransform(x, (v) => v * depth);
  const py = useTransform(y, (v) => v * depth);
  return { x: px, y: py };
}
