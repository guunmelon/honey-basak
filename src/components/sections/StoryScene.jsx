import { C } from '../../lib/tokens';
import { useSafeId } from '../../hooks/useSafeId';
import Basaki from '../motifs/Basaki';
import Bee from '../motifs/Bee';
import ButterCube from '../motifs/ButterCube';
import ChipBag from '../motifs/ChipBag';
import Potato from '../motifs/Potato';
import Sparkle from '../motifs/Sparkle';

const INK = { stroke: C.cocoa900, strokeWidth: 3.5, strokeLinejoin: 'round', strokeLinecap: 'round' };

function Cloud({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M10 40 C 0 40, 0 22, 14 22 C 14 8, 36 4, 44 16 C 52 4, 76 8, 74 26 C 88 24, 92 40, 80 40 Z" fill={C.cream} {...INK} />
      <path d="M22 24 C 26 16, 34 14, 40 18" stroke={C.butter200} strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  );
}

function Flower({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="0" cy="-9" rx="6" ry="9" fill={C.cream} transform={`rotate(${a})`} {...INK} strokeWidth="2.4" />
      ))}
      <circle r="5.5" fill={C.honey400} {...INK} strokeWidth="2.4" />
    </g>
  );
}

function Sky({ from, to }) {
  const id = useSafeId('sky');
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="400" height="400" fill={`url(#${id})`} />
    </>
  );
}

function Field() {
  return (
    <svg viewBox="0 0 400 400" className="size-full" role="img" aria-label="해가 뜨는 감자 언덕에서 바삭이가 태어나는 장면">
      <Sky from="#FFF7DC" to="#FDE7A3" />
      <g className="animate-spin-slow svg-origin-center">
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x="296" y="36" width="8" height="22" rx="4" fill={C.honey400} transform={`rotate(${i * 30} 300 110)`} />
        ))}
        <circle cx="300" cy="110" r="80" fill="none" />
      </g>
      <circle cx="300" cy="110" r="42" fill={C.honey300} {...INK} />
      <circle cx="288" cy="106" r="3.5" fill={C.cocoa900} />
      <circle cx="312" cy="106" r="3.5" fill={C.cocoa900} />
      <path d="M292 118 q 8 7 16 0" stroke={C.cocoa900} strokeWidth="3" fill="none" strokeLinecap="round" />
      <g className="animate-float-slow">
        <Cloud x={40} y={60} s={1.1} />
      </g>
      <Cloud x={170} y={36} s={0.7} />
      <path d="M0 250 C 80 214, 160 222, 220 244 S 340 222, 400 240 V 400 H 0 Z" fill={C.butter400} {...INK} />
      <path d="M0 300 C 100 270, 200 290, 260 300 S 360 282, 400 296 V 400 H 0 Z" fill={C.chipDark} {...INK} />
      <path d="M0 300 C 100 270, 200 290, 260 300" stroke="#fff" strokeOpacity="0.35" strokeWidth="4" fill="none" transform="translate(0 10)" />
      <Potato x="18" y="300" width="90" height="70" />
      <Potato x="300" y="310" width="80" height="62" />
      <g className="animate-bob">
        <Basaki x="118" y="160" width="170" height="177" mood="wow" withBee={false} dipper={false} />
      </g>
      <path d="M120 332 C 150 318, 250 318, 282 332" fill="#B98A5C" {...INK} />
    </svg>
  );
}

function BeeScene() {
  return (
    <svg viewBox="0 0 400 400" className="size-full" role="img" aria-label="꿀벌 비비가 바삭이 위로 꿀 한 방울을 떨어뜨리는 장면">
      <Sky from="#FFF3CC" to="#FAD978" />
      <path d="M-10 70 C 80 60, 150 90, 230 70 S 360 40, 420 60" stroke={C.cocoa700} strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M130 78 C 128 96, 124 108, 118 118" stroke={C.cocoa700} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M300 56 C 304 76, 300 92, 292 104" stroke={C.cocoa700} strokeWidth="5" fill="none" strokeLinecap="round" />
      {[
        [118, 122, 1], [104, 108, 0.8], [132, 138, 0.85], [292, 110, 1], [306, 96, 0.8], [280, 128, 0.75], [60, 70, 0.8], [210, 82, 0.7],
      ].map(([x, y, s], i) => (
        <Flower key={i} x={x} y={y} s={s} />
      ))}
      <path d="M40 210 C 90 160, 150 250, 200 180 S 280 150, 260 200" stroke={C.cocoa900} strokeOpacity="0.45" strokeWidth="3" strokeDasharray="4 10" fill="none" strokeLinecap="round" />
      <g className="animate-float">
        <Bee x="220" y="150" width="110" height="92" />
      </g>
      <g className="animate-drop" style={{ animationDuration: '2.6s' }}>
        <path d="M232 238 C 236 248, 243 253, 243 260 A 11 11 0 0 1 221 260 C 221 253, 228 248, 232 238 Z" fill={C.honey400} {...INK} strokeWidth="2.6" />
      </g>
      <path d="M0 330 C 120 300, 280 300, 400 330 V 400 H 0 Z" fill={C.butter400} {...INK} />
      <Basaki x="120" y="226" width="150" height="156" mood="yum" withBee={false} dipper={false} />
    </svg>
  );
}

function ButterScene() {
  return (
    <svg viewBox="0 0 400 400" className="size-full" role="img" aria-label="버터 공방에서 온 편지 봉투에서 고메버터가 나오는 장면">
      <Sky from="#FFE9AA" to="#F5C458" />
      <path d="M30 120 C 90 60, 160 150, 240 80 S 340 70, 380 40" stroke={C.cocoa900} strokeOpacity="0.4" strokeWidth="3" strokeDasharray="4 10" fill="none" strokeLinecap="round" />
      <g transform="translate(346 24) rotate(18)">
        <path d="M0 20 L44 0 L30 40 L22 26 Z" fill={C.cream} {...INK} strokeWidth="3" />
        <path d="M22 26 L44 0" stroke={C.cocoa900} strokeWidth="2.5" />
      </g>
      {[[70, 70], [330, 150], [60, 250], [320, 290]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`} className="animate-twinkle" style={{ animationDelay: `${i * 0.5}s` }}>
          <Sparkle x="-10" y="-10" width="20" height="20" color={i % 2 ? C.cream : C.berry500} />
        </g>
      ))}
      <g className="animate-float">
        <ButterCube x="118" y="70" width="170" height="153" />
      </g>
      <path d="M70 230 L200 312 L330 230 V 350 H 70 Z" fill={C.cream} {...INK} />
      <path d="M70 350 L170 280 M330 350 L230 280" stroke={C.cocoa900} strokeWidth="3" strokeLinecap="round" />
      <path d="M70 230 L200 170 L330 230" fill={C.butter100} {...INK} />
      <circle cx="200" cy="300" r="20" fill={C.berry500} {...INK} />
      <path d="M192 300 h16 M200 292 v16" stroke={C.cream} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function BagScene() {
  const glow = useSafeId('glow');
  return (
    <svg viewBox="0 0 400 400" className="size-full" role="img" aria-label="황금빛 허니바삭 한 봉지가 완성된 장면">
      <defs>
        <radialGradient id={glow} cx="50%" cy="46%" r="60%">
          <stop offset="0%" stopColor="#FFF4CC" />
          <stop offset="100%" stopColor="#F2AE4A" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill={`url(#${glow})`} />
      <g className="animate-spin-slow svg-origin-center">
        {Array.from({ length: 16 }, (_, i) => (
          <path key={i} d="M200 200 L188 -40 L212 -40 Z" fill="#fff" opacity="0.28" transform={`rotate(${i * 22.5} 200 200)`} />
        ))}
        <circle cx="200" cy="200" r="250" fill="none" />
      </g>
      <g className="animate-float-slow">
        <ChipBag x="116" y="50" width="168" height="243" title="" aria-hidden="true" />
      </g>
      <Basaki x="10" y="220" width="140" height="146" mood="yum" />
      <g className="animate-float">
        <Bee x="290" y="90" width="90" height="75" />
      </g>
      {[[70, 90], [330, 250], [290, 40], [150, 340]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`} className="animate-twinkle" style={{ animationDelay: `${i * 0.4}s` }}>
          <Sparkle x="-12" y="-12" width="24" height="24" color={C.cream} />
        </g>
      ))}
      <path d="M0 360 C 120 340, 280 340, 400 360 V 400 H 0 Z" fill={C.honey500} {...INK} />
    </svg>
  );
}

const SCENES = { field: Field, bee: BeeScene, butter: ButterScene, bag: BagScene };

export default function StoryScene({ scene }) {
  const Scene = SCENES[scene] ?? Field;
  return <Scene />;
}
