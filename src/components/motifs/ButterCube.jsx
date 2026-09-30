import { C } from '../../lib/tokens';

/** 고메버터 큐브 — flag: 원산지 태그(유일한 블루 마이크로 액센트) */
export default function ButterCube({ flag = true, title, ...rest }) {
  return (
    <svg viewBox="0 0 200 180" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} {...rest}>
      {flag && (
        <g>
          <line x1="138" y1="64" x2="152" y2="12" stroke={C.cocoa900} strokeWidth="3.2" strokeLinecap="round" />
          <g transform="rotate(-8 168 22)">
            <rect x="152" y="8" width="36" height="24" rx="3" fill="#fff" />
            <rect x="152" y="8" width="12" height="24" rx="2" fill={C.french} />
            <rect x="176" y="8" width="12" height="24" rx="2" fill={C.berry500} />
            <rect x="152" y="8" width="36" height="24" rx="3" fill="none" stroke={C.cocoa900} strokeWidth="2.6" />
          </g>
        </g>
      )}
      <path d="M100 30 L178 66 L100 102 L22 66 Z" fill="#FFF4C4" />
      <path d="M22 66 L100 102 L100 160 L22 124 Z" fill="#FBE08E" />
      <path d="M100 102 L178 66 L178 124 L100 160 Z" fill="#F0C85F" />
      <path d="M58 66 L100 46" stroke="#F3D682" strokeWidth="4" strokeLinecap="round" />
      <path d="M74 74 L120 52" stroke="#F3D682" strokeWidth="4" strokeLinecap="round" />
      <path d="M38 66 L98 38" stroke="#fff" strokeOpacity="0.85" strokeWidth="4" strokeLinecap="round" />
      <path d="M30 76 L30 112" stroke="#fff" strokeOpacity="0.55" strokeWidth="4" strokeLinecap="round" />
      <path d="M140 84 C 140 96, 136 104, 136 113 C 136 121, 148 121, 148 113 C 148 104, 144 96, 144 82 Z" fill="#FFF4C4" stroke={C.cocoa900} strokeWidth="2.8" strokeLinejoin="round" />
      <path
        d="M100 30 L178 66 L178 124 L100 160 L22 124 L22 66 Z M22 66 L100 102 L178 66 M100 102 L100 160"
        fill="none"
        stroke={C.cocoa900}
        strokeWidth="3.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
