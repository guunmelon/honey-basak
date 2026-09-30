import { useMotionValue, useTransform } from 'framer-motion';
import { useMotionPrefs } from '../context/MotionPrefs';

/**
 * 스크롤 연동 transform — 모션 감소 시 고정값(rest)으로 대체
 * (MotionConfig는 스크롤 연동 style 값까지 막지 못하므로 직접 처리)
 */
export function useFx(source, input, output, { rest, lite: liteOutput, clamp = true } = {}) {
  const { reduced, lite } = useMotionPrefs();
  const out = lite && liteOutput ? liteOutput : output;
  const t = useTransform(source, input, out, { clamp });
  const still = useMotionValue(rest ?? out[0]);
  return reduced ? still : t;
}
