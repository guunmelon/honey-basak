/** 4각 반짝이 */
export default function Sparkle({ color = 'currentColor', ...rest }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...rest}>
      <path d="M12 0 C 13 7, 17 11, 24 12 C 17 13, 13 17, 12 24 C 11 17, 7 13, 0 12 C 7 11, 11 7, 12 0 Z" fill={color} />
    </svg>
  );
}
