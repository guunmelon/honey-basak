import { hexPath } from '../../lib/geometry';

/** 둥근 헥사곤 — 배지·아이콘 버튼·벌집 셀 공용 */
export default function Hex({ fill = 'currentColor', stroke, strokeWidth = 6, radius = 14, flat = true, children, ...rest }) {
  const d = hexPath(50, 50, 50 - strokeWidth / 2 - 1, radius, flat);
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" {...rest}>
      <path d={d} fill={fill} stroke={stroke} strokeWidth={stroke ? strokeWidth : 0} strokeLinejoin="round" />
      {children}
    </svg>
  );
}

export const HEX_D = hexPath(50, 50, 46, 12, true);
