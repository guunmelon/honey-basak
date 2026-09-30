import { C } from '../../lib/tokens';
import { useSafeId } from '../../hooks/useSafeId';

/** 꿀벌 비비 — 날개는 CSS 키프레임으로 파닥 (모션 감소 시 자동 정지) */
export default function Bee({ flap = true, title, ...rest }) {
  const id = useSafeId('bee');
  const wing = flap ? 'animate-wing svg-origin-bottom' : undefined;
  return (
    <svg viewBox="0 0 120 100" role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true} {...rest}>
      <defs>
        <clipPath id={`${id}-b`}>
          <ellipse cx="62" cy="62" rx="36" ry="28" />
        </clipPath>
        <radialGradient id={`${id}-g`} cx="36%" cy="34%" r="72%">
          <stop offset="0%" stopColor="#FFE992" />
          <stop offset="68%" stopColor="#FBC531" />
          <stop offset="100%" stopColor="#EFA51A" />
        </radialGradient>
      </defs>
      <g className={wing}>
        <ellipse cx="72" cy="27" rx="15" ry="22" transform="rotate(26 72 27)" fill="#FFFFFF" fillOpacity="0.92" stroke={C.cocoa900} strokeWidth="3" />
      </g>
      <g className={wing} style={{ animationDelay: '-0.07s' }}>
        <ellipse cx="53" cy="29" rx="14" ry="21" transform="rotate(-16 53 29)" fill="#FFFFFF" fillOpacity="0.95" stroke={C.cocoa900} strokeWidth="3" />
        <path d="M50 18 q 4 9 2 18" stroke={C.butter200} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </g>
      <path d="M96 60 L111 57 L97 70 Z" fill={C.cocoa900} stroke={C.cocoa900} strokeWidth="2.4" strokeLinejoin="round" />
      <ellipse cx="62" cy="62" rx="36" ry="28" fill={`url(#${id}-g)`} />
      <g clipPath={`url(#${id}-b)`}>
        <path d="M67 30 C 61 48, 61 76, 67 94" stroke={C.cocoa900} strokeWidth="10" fill="none" />
        <path d="M87 32 C 81 48, 81 76, 87 92" stroke={C.cocoa900} strokeWidth="9" fill="none" />
        <ellipse cx="46" cy="47" rx="12" ry="5.5" fill="#fff" opacity="0.5" transform="rotate(-18 46 47)" />
      </g>
      <ellipse cx="62" cy="62" rx="36" ry="28" fill="none" stroke={C.cocoa900} strokeWidth="3.5" />
      <path d="M40 40 C 36 28, 30 24, 25 22" stroke={C.cocoa900} strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="24" cy="21" r="4.4" fill={C.cocoa900} />
      <path d="M50 36 C 50 25, 53 19, 58 15" stroke={C.cocoa900} strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="59" cy="14" r="4.4" fill={C.cocoa900} />
      <ellipse cx="38" cy="60" rx="3.8" ry="5" fill={C.cocoa900} />
      <ellipse cx="52" cy="60" rx="3.8" ry="5" fill={C.cocoa900} />
      <circle cx="39.4" cy="58" r="1.4" fill="#fff" />
      <circle cx="53.4" cy="58" r="1.4" fill="#fff" />
      <ellipse cx="32" cy="70" rx="5" ry="3" fill={C.blush} opacity="0.75" />
      <ellipse cx="57.5" cy="70" rx="5" ry="3" fill={C.blush} opacity="0.75" />
      <path d="M40.5 69 Q 45 74 49.5 69" stroke={C.cocoa900} strokeWidth="2.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}
