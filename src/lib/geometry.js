const f = (n) => Math.round(n * 100) / 100;

/** 정다각형 꼭짓점 (flat-top 헥사곤: rotation 0) */
export function polygonPoints(cx, cy, r, sides = 6, rotationDeg = 0) {
  return Array.from({ length: sides }, (_, i) => {
    const a = (((360 / sides) * i + rotationDeg) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
}

/** 모서리를 둥글린 다각형 path */
export function roundedPath(points, radius) {
  const n = points.length;
  let d = '';
  for (let i = 0; i < n; i++) {
    const prev = points[(i - 1 + n) % n];
    const curr = points[i];
    const next = points[(i + 1) % n];
    const l1 = Math.hypot(prev[0] - curr[0], prev[1] - curr[1]);
    const l2 = Math.hypot(next[0] - curr[0], next[1] - curr[1]);
    const r = Math.min(radius, l1 / 2, l2 / 2);
    const a = [curr[0] + ((prev[0] - curr[0]) / l1) * r, curr[1] + ((prev[1] - curr[1]) / l1) * r];
    const b = [curr[0] + ((next[0] - curr[0]) / l2) * r, curr[1] + ((next[1] - curr[1]) / l2) * r];
    d += `${i === 0 ? 'M' : 'L'}${f(a[0])} ${f(a[1])} Q${f(curr[0])} ${f(curr[1])} ${f(b[0])} ${f(b[1])} `;
  }
  return `${d}Z`;
}

export const hexPath = (cx, cy, r, radius = r * 0.16, flat = true) =>
  roundedPath(polygonPoints(cx, cy, r, 6, flat ? 0 : 30), radius);

/** 메달 로제트: 물결 모양 원 */
export function scallopPath(cx, cy, r, bumps = 20, depth = 0.07) {
  let d = '';
  for (let i = 0; i <= bumps; i++) {
    const a = (i / bumps) * Math.PI * 2;
    const p = [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    if (i === 0) {
      d += `M${f(p[0])} ${f(p[1])}`;
      continue;
    }
    const am = ((i - 0.5) / bumps) * Math.PI * 2;
    const k = 1 + depth * 2;
    d += ` Q${f(cx + r * k * Math.cos(am))} ${f(cy + r * k * Math.sin(am))} ${f(p[0])} ${f(p[1])}`;
  }
  return `${d}Z`;
}

/** 시드 기반 난수 */
export function rng(seed = 1) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

/** Catmull-Rom → Bezier 닫힌 부드러운 곡선 */
export function smoothClosedPath(pts) {
  const n = pts.length;
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
  }
  return `${d}Z`;
}

/** 감자칩 실루엣: 살짝 울퉁불퉁한 타원 */
export function chipBlob(seed, cx = 100, cy = 80, rx = 82, ry = 62, count = 11, variance = 0.1) {
  const rand = rng(seed);
  const pts = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + (rand() - 0.5) * 0.25;
    const k = 1 - variance / 2 + rand() * variance;
    pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
  }
  return smoothClosedPath(pts);
}

/** 꿀 드립 한 줄기 (위쪽 band에서 떨어지는 물방울) */
export function dripPath(x, base, len, w) {
  const fl = w * 0.9;
  const b = w * 1.08;
  const yb = base + len - b;
  return [
    `M${f(x + w + fl)} ${f(base - 2)}`,
    `Q${f(x + w)} ${f(base - 2)} ${f(x + w)} ${f(base + fl)}`,
    `L${f(x + w * 0.66)} ${f(yb - b * 0.55)}`,
    `C${f(x + b * 1.08)} ${f(yb - b * 0.1)} ${f(x + b)} ${f(yb + b * 0.92)} ${f(x)} ${f(yb + b)}`,
    `C${f(x - b)} ${f(yb + b * 0.92)} ${f(x - b * 1.08)} ${f(yb - b * 0.1)} ${f(x - w * 0.66)} ${f(yb - b * 0.55)}`,
    `L${f(x - w)} ${f(base + fl)}`,
    `Q${f(x - w)} ${f(base - 2)} ${f(x - w - fl)} ${f(base - 2)}`,
    'Z',
  ].join(' ');
}
