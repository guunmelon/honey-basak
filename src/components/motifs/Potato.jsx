import { C } from '../../lib/tokens';
import { useSafeId } from '../../hooks/useSafeId';

/** 감자 + 얇은 슬라이스 */
export default function Potato({ title, ...rest }) {
  const id = useSafeId('pot');
  return (
    <svg viewBox="0 0 140 110" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} {...rest}>
      <defs>
        <radialGradient id={`${id}-g`} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#F3D6A2" />
          <stop offset="70%" stopColor="#D8A868" />
          <stop offset="100%" stopColor="#B98A5C" />
        </radialGradient>
      </defs>
      <path d="M16 60 C 14 32, 46 16, 74 20 C 102 24, 114 44, 106 66 C 98 88, 64 94, 40 88 C 24 84, 17 74, 16 60 Z" fill={`url(#${id}-g)`} stroke={C.cocoa900} strokeWidth="3.5" />
      <ellipse cx="46" cy="48" rx="4" ry="2.6" fill={C.cocoa500} opacity="0.7" />
      <ellipse cx="72" cy="66" rx="4.5" ry="2.8" fill={C.cocoa500} opacity="0.7" />
      <ellipse cx="88" cy="42" rx="3.4" ry="2.2" fill={C.cocoa500} opacity="0.7" />
      <path d="M32 40 C 40 30, 54 26, 64 27" stroke="#fff" strokeOpacity="0.6" strokeWidth="5" fill="none" strokeLinecap="round" />
      <g transform="rotate(18 112 70)">
        <ellipse cx="112" cy="70" rx="12" ry="30" fill={C.chipLight} stroke={C.cocoa900} strokeWidth="3" />
        <ellipse cx="112" cy="70" rx="6" ry="20" fill="none" stroke={C.chipDark} strokeOpacity="0.5" strokeWidth="2.4" />
      </g>
    </svg>
  );
}
