import { AnimatePresence, motion } from 'framer-motion';
import { useAppState } from '../../context/AppState';
import { FLAVORS } from '../../data/content';
import { won } from '../../lib/format';
import Modal from '../ui/Modal';
import HexIconButton from '../ui/HexIconButton';
import HoneyButton from '../ui/HoneyButton';
import ChipBag from '../motifs/ChipBag';
import Basaki from '../motifs/Basaki';
import { ArrowRight, Close, Minus, Plus, Trash } from '../ui/Icons';

const FREE_SHIP = 20000;

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, cartTotal, cartCount, pushToast, play } = useAppState();
  const close = () => setCartOpen(false);
  const remain = Math.max(0, FREE_SHIP - cartTotal);

  return (
    <Modal open={cartOpen} onClose={close} labelledBy="cart-title" variant="drawer" className="h-full w-full max-w-md">
      <div className="flex h-full flex-col border-l-[3px] border-cocoa-900 bg-butter-100">
        <div className="flex items-center justify-between border-b-[3px] border-cocoa-900 bg-honey-400 px-5 py-4">
          <div>
            <p className="font-serif text-xs font-bold uppercase italic tracking-[0.2em] text-cocoa-800">My Basket</p>
            <h2 id="cart-title" className="font-display text-3xl text-cocoa-950">
              장바구니 <span className="font-serif text-xl">({cartCount})</span>
            </h2>
          </div>
          <HexIconButton data-autofocus label="장바구니 닫기" onClick={close}>
            <Close className="size-5" />
          </HexIconButton>
        </div>

        <div className="flex-1 overflow-y-auto bg-honeycomb px-5 py-5">
          {cart.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <Basaki className="mx-auto w-40" mood="wow" />
                <p className="mt-4 font-display text-2xl">장바구니가 텅 비었어요</p>
                <p className="mt-1 text-cocoa-700">바삭이가 기다리고 있어요.</p>
                <HoneyButton
                  as="a"
                  href="#flavors"
                  className="mt-6"
                  onClick={close}
                  icon={<ArrowRight className="size-5" />}
                  aria-label="맛 라인업 섹션으로 이동"
                >
                  맛 고르러 가기
                </HoneyButton>
              </div>
            </div>
          ) : (
            <ul className="grid gap-4">
              <AnimatePresence initial={false}>
                {cart.map((item) => {
                  const flavor = FLAVORS.find((f) => f.id === item.flavorId) ?? FLAVORS[0];
                  return (
                    <motion.li
                      key={item.key}
                      layout
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 60 }}
                      className="flex gap-4 rounded-sticker border-[3px] border-cocoa-900 bg-cream p-3 shadow-sticker-sm"
                    >
                      <div className="grid w-16 shrink-0 place-items-center rounded-xl" style={{ background: `linear-gradient(160deg, ${flavor.tint.from}, ${flavor.tint.to})` }}>
                        <ChipBag flavor={flavor} detail={false} className="w-12" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-lg leading-tight">{item.flavorName}</p>
                        <p className="text-sm text-cocoa-600">
                          {item.packName} · {item.spec}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <HexIconButton size="sm" label={`${item.flavorName} 수량 하나 줄이기`} onClick={() => updateQty(item.key, item.qty - 1)}>
                              {item.qty === 1 ? <Trash className="size-4" /> : <Minus className="size-4" />}
                            </HexIconButton>
                            <output className="w-7 text-center font-serif text-lg font-bold" aria-label={`수량 ${item.qty}개`}>
                              {item.qty}
                            </output>
                            <HexIconButton size="sm" label={`${item.flavorName} 수량 하나 늘리기`} onClick={() => updateQty(item.key, item.qty + 1)}>
                              <Plus className="size-4" />
                            </HexIconButton>
                          </div>
                          <p className="font-serif text-lg font-bold">{won(item.price * item.qty)}</p>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t-[3px] border-cocoa-900 bg-cream px-5 pb-6 pt-4">
            <div className="h-3 overflow-hidden rounded-full border-2 border-cocoa-900 bg-butter-100">
              <motion.div className="h-full bg-honey-400" initial={false} animate={{ width: `${Math.min(100, (cartTotal / FREE_SHIP) * 100)}%` }} />
            </div>
            <p className="mt-2 text-sm text-cocoa-700">{remain > 0 ? `${won(remain)} 더 담으면 무료배송이에요` : '무료배송 달성! 🐝'}</p>
            <div className="mt-3 flex items-end justify-between">
              <span className="font-display text-lg">합계</span>
              <span className="font-serif text-3xl font-black">{won(cartTotal)}</span>
            </div>
            <HoneyButton
              size="lg"
              className="mt-4 w-full"
              onClick={() => {
                play('chime');
                pushToast('데모 사이트라 실제 결제는 진행되지 않아요 🍯');
              }}
              aria-label="주문하기 (데모)"
              icon={<ArrowRight className="size-5" />}
            >
              주문하기
            </HoneyButton>
          </div>
        )}
      </div>
    </Modal>
  );
}
