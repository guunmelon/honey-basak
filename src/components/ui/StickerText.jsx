import { cx } from '../../lib/cx';

/** 패키지의 “흰 테두리 빨간 손글씨”를 재해석한 스티커 텍스트 */
export default function StickerText({ as: Tag = 'span', rotate = -6, className, children, ...props }) {
  return (
    <Tag className={cx('inline-block font-hand font-bold text-berry-500 sticker-text', className)} style={{ rotate: `${rotate}deg` }} {...props}>
      {children}
    </Tag>
  );
}
