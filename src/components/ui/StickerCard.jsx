import { cx, mergeClasses } from '../../lib/cx';

const TONE = {
  cream: 'bg-cream text-cocoa-900',
  butter: 'bg-butter-100 text-cocoa-900',
  honey: 'bg-honey-300 text-cocoa-900',
  cocoa: 'bg-cocoa-900 text-butter-100',
};

/** 스티커 카드: 코코아 3px 외곽선 + 하드 섀도 + 32px 곡률 */
export default function StickerCard({ as: Tag = 'div', tone = 'cream', shadow = 'shadow-sticker', className, children, ...props }) {
  return (
    <Tag className={mergeClasses(cx('relative rounded-card border-[3px] border-cocoa-900', TONE[tone], shadow), className)} {...props}>
      {children}
    </Tag>
  );
}
