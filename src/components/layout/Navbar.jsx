import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_LINKS } from '../../data/content';
import { useAppState } from '../../context/AppState';
import { useMotionPrefs } from '../../context/MotionPrefs';
import { useSectionTheme } from '../../context/SectionTheme';
import { cx } from '../../lib/cx';
import LogoMark from '../motifs/LogoMark';
import HexIconButton from '../ui/HexIconButton';
import HoneyButton from '../ui/HoneyButton';
import { Bag, Menu, MotionIcon, MotionOffIcon, SoundOff, SoundOn } from '../ui/Icons';
import MobileMenu from './MobileMenu';

function CartBadge({ count, bump }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.span
          key={bump}
          aria-hidden="true"
          initial={{ scale: 1.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 12 }}
          className="absolute -right-1.5 -top-1.5 z-20 grid h-5 min-w-5 place-items-center rounded-full border-2 border-cocoa-900 bg-berry-500 px-1 font-serif text-[0.7rem] font-bold leading-none text-cream"
        >
          {count > 99 ? '99+' : count}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const { id: active } = useSectionTheme();
  const { cartCount, cartBump, setCartOpen, soundOn, toggleSound } = useAppState();
  const { reduced, systemReduced, toggleReduced } = useMotionPrefs();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <motion.nav
        aria-label="주요 메뉴"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 180, damping: 22 }}
        className={cx(
          'mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-full border-[3px] border-cocoa-900 bg-cream/95 pl-2.5 pr-2 backdrop-blur-md transition-[padding,box-shadow] duration-300',
          scrolled ? 'py-1.5 shadow-sticker-sm' : 'py-2 shadow-sticker',
        )}
      >
        <a href="#top" className="group flex items-center gap-2.5 rounded-full pr-2" aria-label="허니바삭 홈, 맨 위로 이동">
          <motion.span className="inline-flex" whileHover={{ rotate: 30 }} transition={{ type: 'spring', stiffness: 400, damping: 12 }}>
            <LogoMark className="size-10" />
          </motion.span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.35rem] text-cocoa-900">허니바삭</span>
            <span className="mt-0.5 hidden font-serif text-[0.58rem] font-bold tracking-[0.32em] text-honey-700 sm:block">HONEY BASAK</span>
          </span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className="relative block rounded-full px-3.5 py-2 font-display text-[1.02rem] text-cocoa-800 transition-colors hover:text-cocoa-950"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full border-2 border-cocoa-900 bg-honey-300"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <HexIconButton
            size="sm"
            className="hidden sm:grid"
            label={systemReduced ? '모션 줄이기 (기기 설정으로 켜져 있음)' : '모션 줄이기'}
            pressed={reduced}
            disabled={systemReduced}
            onClick={toggleReduced}
          >
            {reduced ? <MotionOffIcon className="size-5" /> : <MotionIcon className="size-5" />}
          </HexIconButton>
          <HexIconButton size="sm" label="효과음" pressed={soundOn} onClick={toggleSound}>
            {soundOn ? <SoundOn className="size-5" /> : <SoundOff className="size-5" />}
          </HexIconButton>
          <HexIconButton
            id="cart-button"
            size="sm"
            label={`장바구니 열기 (${cartCount}개 담김)`}
            aria-haspopup="dialog"
            onClick={() => setCartOpen(true)}
            badge={<CartBadge count={cartCount} bump={cartBump} />}
          >
            <Bag className="size-5" />
          </HexIconButton>
          <HoneyButton as="a" href="#buy" size="sm" className="ml-1 hidden md:inline-flex" aria-label="구매 섹션으로 이동">
            구매하기
          </HoneyButton>
          <HexIconButton
            size="sm"
            className="lg:hidden"
            label="전체 메뉴 열기"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-haspopup="dialog"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="size-5" />
          </HexIconButton>
        </div>
      </motion.nav>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} active={active} />
    </header>
  );
}
