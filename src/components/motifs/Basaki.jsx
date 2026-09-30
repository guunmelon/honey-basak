import { C } from '../../lib/tokens';
import { useSafeId } from '../../hooks/useSafeId';
import Bee from './Bee';

const BODY = 'M36 132 C 28 88, 62 52, 112 48 C 162 44, 206 74, 206 124 C 206 172, 168 204, 116 206 C 66 208, 42 176, 36 132 Z';

function Face({ mood }) {
  if (mood === 'wow') {
    return (
      <g>
        <circle cx="98" cy="120" r="8.5" fill={C.cocoa900} />
        <circle cx="142" cy="120" r="8.5" fill={C.cocoa900} />
        <circle cx="101" cy="116.5" r="3" fill="#fff" />
        <circle cx="145" cy="116.5" r="3" fill="#fff" />
        <ellipse cx="120" cy="147" rx="7.5" ry="9.5" fill="#9E2A1B" stroke={C.cocoa900} strokeWidth="3" />
      </g>
    );
  }
  if (mood === 'yum') {
    return (
      <g fill="none" stroke={C.cocoa900} strokeLinecap="round">
        <path d="M88 124 Q 98 111 108 124" strokeWidth="4.8" />
        <path d="M132 124 Q 142 111 152 124" strokeWidth="4.8" />
        <path d="M107 138 Q 120 151 133 138" strokeWidth="3.6" />
        <path d="M121 145 q 6 11 13 0" fill="#F0706A" strokeWidth="2.6" />
      </g>
    );
  }
  return (
    <g>
      <ellipse cx="98" cy="121" rx="6.2" ry="7.8" fill={C.cocoa900} />
      <ellipse cx="142" cy="121" rx="6.2" ry="7.8" fill={C.cocoa900} />
      <circle cx="100.3" cy="117.8" r="2.3" fill="#fff" />
      <circle cx="144.3" cy="117.8" r="2.3" fill="#fff" />
      <path d="M107 137 C 109 152, 131 152, 133 137 Z" fill="#9E2A1B" stroke={C.cocoa900} strokeWidth="3" strokeLinejoin="round" />
      <path d="M112.5 145 C 116.5 150.5, 123.5 150.5, 127.5 145 C 123.5 142, 116.5 142, 112.5 145 Z" fill="#F0706A" />
    </g>
  );
}

/** 바삭이 — 꿀 디퍼를 든 감자칩 캐릭터 (+ 머리 위 꿀벌 비비) */
export default function Basaki({ mood = 'happy', withBee = true, dipper = true, title, ...rest }) {
  const id = useSafeId('bsk');
  return (
    <svg viewBox="0 0 240 250" overflow="visible" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} {...rest}>
      <defs>
        <radialGradient id={`${id}-g`} cx="40%" cy="34%" r="72%">
          <stop offset="0%" stopColor="#FFF2BF" />
          <stop offset="45%" stopColor="#F9D26C" />
          <stop offset="85%" stopColor="#EDB04A" />
          <stop offset="100%" stopColor="#D9953A" />
        </radialGradient>
        <linearGradient id={`${id}-h`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFCB4A" />
          <stop offset="100%" stopColor="#D98509" />
        </linearGradient>
        <clipPath id={`${id}-c`}>
          <path d={BODY} />
        </clipPath>
      </defs>

      {/* 발 */}
      <ellipse cx="98" cy="208" rx="16" ry="9" fill={C.cocoa800} />
      <ellipse cx="146" cy="208" rx="16" ry="9" fill={C.cocoa800} />

      {/* 몸통 = 감자칩 */}
      <path d={BODY} fill={`url(#${id}-g)`} />
      <g clipPath={`url(#${id}-c)`}>
        <path d="M30 104 C 86 88, 150 118, 212 98" stroke="#C4832C" strokeOpacity="0.26" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M30 176 C 86 160, 150 190, 212 170" stroke="#C4832C" strokeOpacity="0.26" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M30 98 C 86 82, 150 112, 212 92" stroke="#FFF7DA" strokeOpacity="0.5" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        {[[70, 170], [166, 92], [178, 160], [60, 110], [150, 184]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2" fill={i % 2 ? '#FFF6D2' : '#8E5A22'} opacity="0.6" />
        ))}
        <path d="M70 80 C 88 64, 112 58, 138 60" stroke="#fff" strokeOpacity="0.75" strokeWidth="8" fill="none" strokeLinecap="round" />
      </g>
      <path d={BODY} fill="none" stroke={C.cocoa900} strokeWidth="4" strokeLinejoin="round" />

      {/* 볼터치 + 얼굴 */}
      <ellipse cx="82" cy="141" rx="11" ry="6.5" fill={C.blush} opacity="0.62" />
      <ellipse cx="158" cy="141" rx="11" ry="6.5" fill={C.blush} opacity="0.62" />
      <Face mood={mood} />

      {/* 팔 */}
      <path d="M42 148 C 26 146, 16 136, 16 122" stroke={C.cocoa900} strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <circle cx="16" cy="116" r="8" fill={C.chipLight} stroke={C.cocoa900} strokeWidth="3" />
      {dipper && (
        <g transform="rotate(20 226 108)">
          <rect x="221" y="40" width="10" height="76" rx="5" fill="#D9A45A" stroke={C.cocoa900} strokeWidth="3" />
          <rect x="208" y="4" width="36" height="46" rx="16" fill={`url(#${id}-h)`} stroke={C.cocoa900} strokeWidth="3.2" />
          {[17, 27, 37].map((y) => (
            <path key={y} d={`M210 ${y} Q 226 ${y + 5} 242 ${y}`} stroke={C.honey700} strokeOpacity="0.55" strokeWidth="2.6" fill="none" />
          ))}
          <path d="M234 48 C 234 56, 231 60, 231 65 C 231 71, 240 71, 240 65 C 240 60, 237 56, 237 48 Z" fill="#F2A51E" stroke={C.cocoa900} strokeWidth="2.4" strokeLinejoin="round" />
        </g>
      )}
      <path d="M202 142 C 218 138, 226 128, 226 114" stroke={C.cocoa900} strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <circle cx="226" cy="108" r="8" fill={C.chipLight} stroke={C.cocoa900} strokeWidth="3" />

      {withBee && <Bee x="112" y="-2" width="84" height="70" />}
    </svg>
  );
}
