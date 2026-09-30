import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { sfx } from '../lib/sound';
import { readStorage, writeStorage } from '../lib/storage';

const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartBump, setCartBump] = useState(0);
  const [golden, setGolden] = useState(false);
  const [soundOn, setSoundOn] = useState(() => readStorage('hb-sound', '1') === '1');
  const [toasts, setToasts] = useState([]);
  const toastId = useRef(0);

  const play = useCallback(
    (name) => {
      if (soundOn && sfx[name]) sfx[name]();
    },
    [soundOn],
  );

  const toggleSound = useCallback(() => {
    setSoundOn((v) => {
      writeStorage('hb-sound', v ? '0' : '1');
      if (!v) sfx.pop();
      return !v;
    });
  }, []);

  const dismissToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  const pushToast = useCallback(
    (message, icon = 'bee') => {
      toastId.current += 1;
      const id = toastId.current;
      setToasts((t) => [...t.slice(-2), { id, message, icon }]);
      window.setTimeout(() => dismissToast(id), 3200);
    },
    [dismissToast],
  );

  const addToCart = useCallback((item) => {
    setCart((prev) => {
      const key = `${item.flavorId}-${item.packId}`;
      const found = prev.find((p) => p.key === key);
      if (found) return prev.map((p) => (p.key === key ? { ...p, qty: Math.min(99, p.qty + item.qty) } : p));
      return [...prev, { ...item, key }];
    });
    setCartBump((b) => b + 1);
  }, []);

  const updateQty = useCallback((key, qty) => {
    setCart((prev) => (qty <= 0 ? prev.filter((p) => p.key !== key) : prev.map((p) => (p.key === key ? { ...p, qty: Math.min(99, qty) } : p))));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const unlockGolden = useCallback(() => setGolden(true), []);

  const cartCount = cart.reduce((s, p) => s + p.qty, 0);
  const cartTotal = cart.reduce((s, p) => s + p.qty * p.price, 0);

  const value = useMemo(
    () => ({
      cart, cartCount, cartTotal, cartOpen, setCartOpen, cartBump, addToCart, updateQty, clearCart,
      golden, unlockGolden,
      soundOn, toggleSound, play,
      toasts, pushToast, dismissToast,
    }),
    [cart, cartCount, cartTotal, cartOpen, cartBump, addToCart, updateQty, clearCart, golden, unlockGolden, soundOn, toggleSound, play, toasts, pushToast, dismissToast],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export const useAppState = () => useContext(AppStateContext);
