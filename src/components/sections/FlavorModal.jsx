import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppState } from '../../context/AppState';
import { useMotionPrefs } from '../../context/MotionPrefs';
import { PACKS } from '../../data/content';
import { flyToCart } from '../../lib/flyToCart';
import { won } from '../../lib/format';
import Modal from '../ui/Modal';
import HexIconButton from '../ui/HexIconButton';
import HoneyButton from '../ui/HoneyButton';
import ChipBag from '../motifs/ChipBag';
import Chip from '../motifs/Chip';
import Bee from '../motifs/Bee';
import { FlavorMeters } from './FlavorCard';
import { Bag, Close } from '../ui/Icons';

/** 맛 상세 다이얼로그 */
export default function FlavorModal({ flavor, onClose }) {
  const { addToCart, pushToast, play } = useAppState();
  const { reduced } = useMotionPrefs();
  const [shown, setShown] = useState(flavor);
  const addRef = useRef(null);
  useEffect(() => {
    if (flavor) setShown(flavor);
  }, [flavor]);

  const f = flavor ?? shown;
  const pack = PACKS.find((p) => p.id === 'regular');

  const add = () => {
    addToCart({ flavorId: f.id, flavorName: f.name, packId: pack.id, packName: pack.name, spec: pack.spec, price: pack.price, qty: 1 });
    play('pop');
    flyToCart(addRef.current, reduced);
    pushToast(`${f.short} 한 봉지를 담았어요!`);
  };

  return (
    <Modal open={!!flavor} onClose={onClose} labelledBy="flavor-modal-title" className="w-full max-w-4xl">
      {f && (
        <div className="relative max-h-[88svh] overflow-y-auto rounded-card border-[3px] border-cocoa-900 bg-cream shadow-sticker-xl">
          <div className="grid md:grid-cols-[0.9fr_1.1fr]">
            <div
              className="relative flex min-h-[300px] items-center justify-center overflow-hidden border-b-[3px] border-cocoa-900 p-8 md:border-b-0 md:border-r-[3px]"
              style={{ background: `radial-gradient(circle at 50% 40%, ${f.tint.from}, ${f.tint.to})` }}
            >
              <div className="absolute inset-0 bg-honeycomb-honey opacity-70" aria-hidden="true" />
              <motion.div className="absolute left-[6%] top-[10%] w-[26%]" animate={reduced ? undefined : { rotate: [0, 12, 0], y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }} aria-hidden="true">
                <Chip seed={31} className="w-full" />
              </motion.div>
              <motion.div className="absolute bottom-[10%] right-[6%] w-[22%]" animate={reduced ? undefined : { rotate: [0, -14, 0], y: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity }} aria-hidden="true">
                <Chip seed={37} className="w-full" />
              </motion.div>
              <motion.div className="absolute right-[10%] top-[12%] w-[18%]" animate={reduced ? undefined : { x: [0, -16, 0], y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }} aria-hidden="true">
                <Bee className="w-full" />
              </motion.div>
              <motion.div initial={{ rotate: -12, y: 30 }} animate={{ rotate: -4, y: 0 }} transition={{ type: 'spring', stiffness: 140, damping: 12 }} className="relative w-[62%] max-w-[260px]">
                <ChipBag flavor={f} className="w-full drop-shadow-[0_16px_0_rgba(51,32,15,0.2)]" />
              </motion.div>
            </div>

            <div className="relative p-6 sm:p-8">
              <HexIconButton data-autofocus label="상세 정보 닫기" onClick={onClose} className="absolute right-4 top-4">
                <Close className="size-5" />
              </HexIconButton>
              <p className="fraunces-soft font-serif text-sm font-semibold italic text-honey-700">{f.en}</p>
              <h2 id="flavor-modal-title" className="pr-14 font-display text-[2.2rem] leading-tight">
                {f.name}
              </h2>
              <p className="mt-3 text-body text-cocoa-700">{f.long}</p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="font-serif text-xs font-bold uppercase italic tracking-[0.2em] text-honey-700">Taste</h3>
                  <div className="mt-2">
                    <FlavorMeters flavor={f} size={18} />
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-xs font-bold uppercase italic tracking-[0.2em] text-honey-700">Notes</h3>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {f.notes.map((n) => (
                      <li key={n} className="rounded-full border-2 border-cocoa-900 bg-butter-100 px-3 py-1 font-display text-sm">
                        {n}
                      </li>
                    ))}
                  </ul>
                  <h3 className="mt-4 font-serif text-xs font-bold uppercase italic tracking-[0.2em] text-honey-700">Pairing</h3>
                  <p className="mt-1 font-display">{f.pairing.join(' · ')}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-sticker border-2 border-dashed border-cocoa-900/30 bg-butter-50 px-4 py-3">
                <span className="font-serif text-sm font-semibold text-cocoa-700">
                  {pack.name} {pack.spec} · {f.kcal}kcal
                </span>
                <span className="font-serif text-2xl font-black">{won(pack.price)}</span>
              </div>

              <div className="mt-7 flex flex-wrap gap-4">
                <HoneyButton ref={addRef} onClick={add} icon={<Bag className="size-5" />} aria-label={`${f.name} 한 봉지 장바구니에 담기`}>
                  장바구니 담기
                </HoneyButton>
                <HoneyButton variant="butter" onClick={onClose} aria-label="상세 정보 닫기">
                  다른 맛 볼래요
                </HoneyButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
