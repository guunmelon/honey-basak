import { cx } from '../../lib/cx';
import { C } from '../../lib/tokens';
import { HEX_D } from '../motifs/Hex';
import Reveal from './Reveal';

export function HexDot({ className, color = C.honey500 }) {
  return (
    <svg viewBox="0 0 100 100" className={cx('size-3.5', className)} aria-hidden="true">
      <path d={HEX_D} fill={color} stroke={C.cocoa900} strokeWidth="10" />
    </svg>
  );
}

/** 섹션 제목 세트: 아이브로(세리프 이탤릭) + 디스플레이 제목 + 본문 */
export default function SectionHeading({ eyebrow, index, title, desc, align = 'left', tone = 'light', id, className, children }) {
  const dark = tone === 'dark';
  return (
    <div className={cx('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      <Reveal>
        <p
          className={cx(
            'fraunces-soft inline-flex items-center gap-2.5 font-serif text-[0.8rem] font-semibold uppercase italic tracking-[0.18em]',
            dark ? 'text-honey-300' : 'text-honey-700',
          )}
        >
          <HexDot />
          {eyebrow}
          {index && <span className="not-italic">· {index}</span>}
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 id={id} className={cx('mt-4 font-display text-display-lg', dark ? 'text-butter-100' : 'text-cocoa-900')}>
          {title}
        </h2>
      </Reveal>
      {desc && (
        <Reveal delay={0.12}>
          <p className={cx('mt-5 text-body-lg', dark ? 'text-butter-100/80' : 'text-cocoa-700', align === 'center' && 'mx-auto max-w-xl')}>{desc}</p>
        </Reveal>
      )}
      {children}
    </div>
  );
}
