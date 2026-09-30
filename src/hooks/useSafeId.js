import { useId } from 'react';

/** SVG url(#id)에서 안전하게 쓸 수 있는 고유 id */
export function useSafeId(prefix = 'hb') {
  const id = useId();
  return `${prefix}-${id.replace(/[^a-zA-Z0-9_-]/g, '')}`;
}
