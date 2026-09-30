import { C } from '../../lib/tokens';
import { hexPath } from '../../lib/geometry';

/** 허니바삭 심볼: 꿀 헥사곤 안의 웃는 칩 */
export default function LogoMark({ title, ...rest }) {
  return (
    <svg viewBox="0 0 64 64" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} {...rest}>
      <path d={hexPath(32, 32, 29, 7)} fill={C.honey400} stroke={C.cocoa900} strokeWidth="4" strokeLinejoin="round" />
      <path d="M15 34 C 14 24, 22 17, 32 17 C 42 17, 50 23, 49 33 C 48 43, 41 48, 32 48 C 22 48, 16 42, 15 34 Z" fill={C.chipLight} stroke={C.cocoa900} strokeWidth="3" />
      <circle cx="26" cy="31" r="2.6" fill={C.cocoa900} />
      <circle cx="38" cy="31" r="2.6" fill={C.cocoa900} />
      <path d="M27.5 37.5 q 4.5 4.5 9 0" stroke={C.cocoa900} strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <ellipse cx="22" cy="37" rx="3" ry="1.8" fill={C.blush} opacity="0.8" />
      <ellipse cx="42" cy="37" rx="3" ry="1.8" fill={C.blush} opacity="0.8" />
      <path d="M22 22 C 26 19, 30 18, 34 18.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" fill="none" />
    </svg>
  );
}
