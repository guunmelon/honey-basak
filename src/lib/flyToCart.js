import { animate } from 'framer-motion';

const MINI_BAG = `<svg viewBox="0 0 44 52" width="44" height="52" xmlns="http://www.w3.org/2000/svg"><path d="M4 8 L7 3 L10 8 L13 3 L16 8 L19 3 L22 8 L25 3 L28 8 L31 3 L34 8 L37 3 L40 8 L40 44 L37 49 L34 44 L31 49 L28 44 L25 49 L22 44 L19 49 L16 44 L13 49 L10 44 L7 49 L4 44 Z" fill="#FAD978" stroke="#33200F" stroke-width="2.6" stroke-linejoin="round"/><path d="M12 20 L32 20 L36 27 L32 34 L12 34 L8 27 Z" fill="#F4AE2F" stroke="#33200F" stroke-width="2.2" stroke-linejoin="round"/><circle cx="18" cy="26" r="1.8" fill="#33200F"/><circle cx="26" cy="26" r="1.8" fill="#33200F"/><path d="M19 29.5 q3 2.6 6 0" stroke="#33200F" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>`;

/** 버튼 위치에서 내비의 장바구니 버튼까지 미니 봉지가 포물선으로 날아감 */
export function flyToCart(fromEl, reduced) {
  const target = document.getElementById('cart-button');
  if (!fromEl || !target || reduced) return Promise.resolve();
  const a = fromEl.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const node = document.createElement('div');
  node.setAttribute('aria-hidden', 'true');
  node.style.cssText = `position:fixed;left:${a.left + a.width / 2 - 22}px;top:${a.top + a.height / 2 - 26}px;width:44px;height:52px;z-index:95;pointer-events:none;filter:drop-shadow(0 4px 0 rgba(51,32,15,.35));`;
  node.innerHTML = MINI_BAG;
  document.body.appendChild(node);
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  return animate(
    node,
    { x: [0, dx * 0.45, dx], y: [0, Math.min(dy, 0) - 140, dy], rotate: [0, -28, 12], scale: [1, 1.35, 0.35] },
    { duration: 0.9, ease: 'easeInOut' },
  ).then(() => node.remove());
}
