import { C } from '../../lib/tokens';
import { useSafeId } from '../../hooks/useSafeId';

/** 꿀 디퍼 — 버튼 아이콘·실험실 연출용 */
export default function HoneyDipper({ title, ...rest }) {
  const id = useSafeId('dip');
  return (
    <svg viewBox="0 0 60 200" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} {...rest}>
      <defs>
        <linearGradient id={`${id}-h`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFCB4A" />
          <stop offset="60%" stopColor="#F0A01C" />
          <stop offset="100%" stopColor="#C97506" />
        </linearGradient>
      </defs>
      <rect x="24" y="4" width="12" height="112" rx="6" fill="#D9A45A" stroke={C.cocoa900} strokeWidth="3" />
      <line x1="28.5" y1="14" x2="28.5" y2="100" stroke="#F2CD8C" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="10" y="106" width="40" height="66" rx="18" fill={`url(#${id}-h)`} stroke={C.cocoa900} strokeWidth="3.2" />
      {[124, 139, 154].map((y) => (
        <path key={y} d={`M12 ${y} Q 30 ${y + 6} 48 ${y}`} stroke={C.honey700} strokeOpacity="0.55" strokeWidth="3" fill="none" strokeLinecap="round" />
      ))}
      <path d="M18 116 L18 160" stroke="#fff" strokeOpacity="0.6" strokeWidth="4" strokeLinecap="round" />
      <path d="M27 170 C 27 180, 23 186, 23 192 C 23 199, 36 199, 36 192 C 36 186, 32 180, 32 170 Z" fill="#F2A51E" stroke={C.cocoa900} strokeWidth="2.6" strokeLinejoin="round" />
    </svg>
  );
}
