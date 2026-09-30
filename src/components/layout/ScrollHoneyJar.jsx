import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import { useMotionPrefs } from '../../context/MotionPrefs';
import { C } from '../../lib/tokens';

const JAR = 'M14 24 C 7 28, 5 36, 5 46 C 5 62, 15 70, 32 70 C 49 70, 59 62, 59 46 C 59 36, 57 28, 50 24 Z';

/** 스크롤 진행률만큼 꿀이 차오르는 꿀단지 — 누르면 맨 위로 */
export default function ScrollHoneyJar() {
  const { reduced } = useMotionPrefs();
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  useMotionValueEvent(scrollYProgress, 'change', (v) => setVisible(v > 0.03));
  const level = useSpring(scrollYProgress, { stiffness: 110, damping: 22 });
  const honeyY = useTransform(level, [0, 1], [48, 0]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="맨 위로 이동"
          title="맨 위로"
          onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}
          className="fixed bottom-4 right-3 z-40 size-16 sm:bottom-6 sm:right-6 sm:size-[4.5rem]"
          initial={{ scale: 0, rotate: -40 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 30 }}
          whileHover={{ y: -5, rotate: -8 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 380, damping: 18 }}
        >
          <svg viewBox="0 0 64 76" className="size-full overflow-visible drop-shadow-[0_4px_0_rgba(51,32,15,0.9)]" aria-hidden="true">
            <defs>
              <clipPath id="jar-clip">
                <path d={JAR} />
              </clipPath>
            </defs>
            <path d={JAR} fill={C.cream} />
            <g clipPath="url(#jar-clip)">
              <motion.g style={{ y: honeyY }}>
                <path d="M-10 26 Q 6 20 22 26 T 54 26 T 86 26 V 90 H -10 Z" fill={C.honey400} />
                <path d="M-10 26 Q 6 20 22 26 T 54 26 T 86 26" fill="none" stroke={C.honey600} strokeWidth="2" />
              </motion.g>
              <path d="M12 36 C 10 44, 11 54, 16 61" stroke="#fff" strokeOpacity="0.75" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            </g>
            <path d={JAR} fill="none" stroke={C.cocoa900} strokeWidth="3.2" />
            <rect x="15" y="15" width="34" height="10" rx="4" fill={C.honey300} stroke={C.cocoa900} strokeWidth="3" />
            <path d="M12 16 C 11 8, 17 4, 24 4 H 40 C 47 4, 53 8, 52 16 C 47 19, 44 14, 40 17 C 36 20, 33 15, 29 18 C 25 20, 21 15, 17 18 C 15 19, 13 18, 12 16 Z" fill={C.berry500} stroke={C.cocoa900} strokeWidth="2.6" strokeLinejoin="round" />
            <path d="M32 58 V 40 M25 47 L32 40 L39 47" stroke={C.cocoa900} strokeWidth="3.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
