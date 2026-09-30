export function cx(...args) {
  return args.flat().filter(Boolean).join(' ');
}

// 기본 클래스와 충돌하는 오버라이드(display·position)가 들어오면 기본값을 제거
const GROUPS = [
  ['hidden', 'block', 'inline-block', 'flex', 'inline-flex', 'grid', 'inline-grid', 'contents'],
  ['static', 'relative', 'absolute', 'fixed', 'sticky'],
];
export function mergeClasses(base, extra = '') {
  const ex = String(extra || '').split(/\s+/).filter(Boolean);
  let b = String(base).split(/\s+/).filter(Boolean);
  for (const g of GROUPS) {
    if (ex.some((c) => g.includes(c))) b = b.filter((c) => !g.includes(c));
  }
  return [...b, ...ex].join(' ');
}
