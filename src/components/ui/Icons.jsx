// 굵은 라운드 스트로크 아이콘 — 일러스트의 코코아 외곽선 규칙과 동일한 두께감
const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: 'false',
};

export const ArrowRight = (p) => (
  <svg {...base} {...p}>
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);
export const ArrowDown = (p) => (
  <svg {...base} {...p}>
    <path d="M12 5v13M6 13l6 6 6-6" />
  </svg>
);
export const ArrowUp = (p) => (
  <svg {...base} {...p}>
    <path d="M12 19V6M6 11l6-6 6 6" />
  </svg>
);
export const Bag = (p) => (
  <svg {...base} {...p}>
    <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </svg>
);
export const SoundOn = (p) => (
  <svg {...base} {...p}>
    <path d="M4 10v4h3.5L12 18V6L7.5 10z" />
    <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
  </svg>
);
export const SoundOff = (p) => (
  <svg {...base} {...p}>
    <path d="M4 10v4h3.5L12 18V6L7.5 10z" />
    <path d="M16 9.5l5 5M21 9.5l-5 5" />
  </svg>
);
export const MotionIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M3 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0" />
  </svg>
);
export const MotionOffIcon = (p) => (
  <svg {...base} {...p}>
    <path d="M3 12h18" />
    <path d="M7 8v8M12 8v8M17 8v8" opacity="0.45" />
  </svg>
);
export const Menu = (p) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
);
export const Close = (p) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);
export const Plus = (p) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const Minus = (p) => (
  <svg {...base} {...p}>
    <path d="M5 12h14" />
  </svg>
);
export const Copy = (p) => (
  <svg {...base} {...p}>
    <rect x="8" y="8" width="12" height="12" rx="3" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </svg>
);
export const Lock = (p) => (
  <svg {...base} {...p}>
    <rect x="5" y="11" width="14" height="10" rx="3" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);
export const Unlock = (p) => (
  <svg {...base} {...p}>
    <rect x="5" y="11" width="14" height="10" rx="3" />
    <path d="M8 11V8a4 4 0 0 1 7.5-2" />
  </svg>
);
export const Check = (p) => (
  <svg {...base} {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);
export const Refresh = (p) => (
  <svg {...base} {...p}>
    <path d="M20 11a8 8 0 1 0-2.3 5.7" />
    <path d="M20 4v7h-7" />
  </svg>
);
export const Trash = (p) => (
  <svg {...base} {...p}>
    <path d="M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13" />
  </svg>
);
export const Pin = (p) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-6.1 7-12a7 7 0 0 0-14 0c0 5.9 7 12 7 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);
export const Shield = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3l7 3v5c0 5-3.2 8.3-7 10-3.8-1.7-7-5-7-10V6z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </svg>
);
export const Balance = (p) => (
  <svg {...base} {...p}>
    <path d="M12 4v16M7 20h10M5 7h14" />
    <path d="M5 7l-3 6a3 3 0 0 0 6 0zM19 7l-3 6a3 3 0 0 0 6 0z" />
  </svg>
);
export const Hand = (p) => (
  <svg {...base} {...p}>
    <path d="M8 13V6a1.5 1.5 0 0 1 3 0v5M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V6a1.5 1.5 0 0 1 3 0v7" />
    <path d="M17 13v1a7 7 0 0 1-7 7h-.5a6 6 0 0 1-4.6-2.2L3 16.5a1.6 1.6 0 0 1 2.4-2.1L8 16" />
  </svg>
);
export const Share = (p) => (
  <svg {...base} {...p}>
    <circle cx="8" cy="9" r="3" />
    <circle cx="17" cy="8" r="2.5" />
    <path d="M3 20a5 5 0 0 1 10 0M13.5 16.5A4.5 4.5 0 0 1 21 19" />
  </svg>
);
export const Instagram = (p) => (
  <svg {...base} {...p}>
    <rect x="4" y="4" width="16" height="16" rx="5" />
    <circle cx="12" cy="12" r="3.6" />
    <circle cx="17" cy="7" r="0.6" fill="currentColor" />
  </svg>
);
export const Youtube = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="6" width="18" height="12" rx="4" />
    <path d="M10.5 9.5v5l4-2.5z" fill="currentColor" />
  </svg>
);
export const Mail = (p) => (
  <svg {...base} {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="3" />
    <path d="M4 7.5l8 6 8-6" />
  </svg>
);
export const Crunch = (p) => (
  <svg {...base} {...p}>
    <path d="M4 14c0-5 3.5-9 8.5-9 4 0 7.5 3 7.5 7" />
    <path d="M20 12l-2.5 1.2 1 2.3-2.6.3.2 2.6-2.4-1-1.2 2.4-1.5-2.1-2 1.6-.5-2.5-2.5.4.8-2.4L4 14" />
  </svg>
);

export const ICONS = { shield: Shield, balance: Balance, hand: Hand, share: Share };
