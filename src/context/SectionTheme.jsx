import { createContext, useContext, useEffect, useState } from 'react';

const SectionThemeContext = createContext({ id: 'hero', bg: '#F8CF52', tone: 'light' });

/**
 * [data-section] 요소 중 화면 중앙선을 지나는 섹션을 추적
 * → 배경색(data-bg) / 톤(data-tone) / 내비 활성 링크에 사용
 */
export function SectionThemeProvider({ children }) {
  const [state, setState] = useState({ id: 'hero', bg: '#F8CF52', tone: 'light' });

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll('[data-section]'));
    if (!nodes.length || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!hit) return;
        const el = hit.target;
        setState((prev) => {
          const next = {
            id: el.dataset.nav || el.dataset.section,
            bg: el.dataset.bg || prev.bg,
            tone: el.dataset.tone || 'light',
          };
          return prev.id === next.id && prev.bg === next.bg && prev.tone === next.tone ? prev : next;
        });
      },
      { rootMargin: '-48% 0px -48% 0px', threshold: [0, 0.01] },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  return <SectionThemeContext.Provider value={state}>{children}</SectionThemeContext.Provider>;
}

export const useSectionTheme = () => useContext(SectionThemeContext);
