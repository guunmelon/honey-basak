import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { useMedia } from '../hooks/useMedia';
import { readStorage, writeStorage } from '../lib/storage';

const MotionPrefsContext = createContext({
  reduced: false,
  systemReduced: false,
  userReduced: false,
  coarse: false,
  small: false,
  lite: false,
  toggleReduced: () => {},
});

/**
 * 모션 환경 설정
 * - reduced: OS의 prefers-reduced-motion 또는 사이트 내 "모션 줄이기" 토글
 * - coarse: 터치 기기 (hover 없음)
 * - lite: 모바일/터치/모션감소 → 패럴랙스·틸트·장식 개수 축소
 */
export function MotionPrefsProvider({ children }) {
  const systemReduced = useMedia('(prefers-reduced-motion: reduce)');
  const coarse = useMedia('(hover: none), (pointer: coarse)');
  const small = useMedia('(max-width: 767px)');
  const [userReduced, setUserReduced] = useState(() => readStorage('hb-reduce-motion') === '1');

  const reduced = systemReduced || userReduced;

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reduced);
  }, [reduced]);

  const toggleReduced = useCallback(() => {
    setUserReduced((v) => {
      writeStorage('hb-reduce-motion', v ? '0' : '1');
      return !v;
    });
  }, []);

  const value = useMemo(
    () => ({ reduced, systemReduced, userReduced, coarse, small, lite: reduced || coarse || small, toggleReduced }),
    [reduced, systemReduced, userReduced, coarse, small, toggleReduced],
  );

  return (
    <MotionPrefsContext.Provider value={value}>
      <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>{children}</MotionConfig>
    </MotionPrefsContext.Provider>
  );
}

export const useMotionPrefs = () => useContext(MotionPrefsContext);
