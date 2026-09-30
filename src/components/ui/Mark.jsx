import { cx } from '../../lib/cx';

/** 제목 속 강조어 — 꿀이 번진 듯한 블롭 하이라이트 */
export default function Mark({ children, className, tone = 'honey' }) {
  return (
    <span className="relative isolate inline-block">
      <span
        aria-hidden="true"
        className={cx(
          'absolute -inset-x-[0.12em] bottom-[0.02em] -z-10 h-[0.5em] rounded-blob',
          tone === 'honey' ? 'bg-honey-300' : tone === 'berry' ? 'bg-berry-400/40' : tone === 'cream' ? 'bg-cream' : 'bg-honey-500/70',
          className,
        )}
      />
      {children}
    </span>
  );
}
