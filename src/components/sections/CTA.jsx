import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FLAVORS, GOLDEN, PACKS } from '../../data/content';
import { useAppState } from '../../context/AppState';
import { useMotionPrefs } from '../../context/MotionPrefs';
import { flyToCart } from '../../lib/flyToCart';
import { won } from '../../lib/format';
import { C } from '../../lib/tokens';
import { cx } from '../../lib/cx';
import ChipBag from '../motifs/ChipBag';
import Bee from '../motifs/Bee';
import Chip from '../motifs/Chip';
import Sparkle from '../motifs/Sparkle';
import SectionHeading from '../ui/SectionHeading';
import HexIconButton from '../ui/HexIconButton';
import HoneyButton from '../ui/HoneyButton';
import Mark from '../ui/Mark';
import { Bag, Check, Copy, Lock, Minus, Pin, Plus } from '../ui/Icons';

function CouponTicket({ unlocked }) {
  const { pushToast, play } = useAppState();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(GOLDEN.coupon);
      ok = true;
    } catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = GOLDEN.coupon;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand('copy');
        ta.remove();
      } catch {
        ok = false;
      }
    }
    setCopied(true);
    play('pop');
    pushToast(ok ? `쿠폰 코드 ${GOLDEN.coupon}를 복사했어요!` : `쿠폰 코드: ${GOLDEN.coupon}`);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mt-6">
      <div
        className={cx(
          'relative overflow-hidden rounded-sticker border-[3px] border-dashed px-5 py-4 transition-colors duration-500',
          unlocked ? 'border-cocoa-900 bg-honey-400' : 'border-butter-100/40 bg-cocoa-800/60',
        )}
      >
        {unlocked && <div className="absolute inset-0 bg-honeycomb-honey" aria-hidden="true" />}
        <AnimatePresence mode="wait" initial={false}>
          {unlocked ? (
            <motion.div key="on" initial={{ rotateX: 90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }} className="relative flex items-center justify-between gap-3">
              <div>
                <p className="font-display text-sm text-cocoa-800">황금 비율 달성 보상 · {GOLDEN.discount} 할인</p>
                <p className="font-serif text-3xl font-black tracking-wider text-cocoa-950">{GOLDEN.coupon}</p>
              </div>
              <HoneyButton size="sm" variant="cocoa" onClick={copy} iconLeft={copied ? <Check className="size-4" /> : <Copy className="size-4" />} aria-label={`쿠폰 코드 ${GOLDEN.coupon} 복사하기`}>
                {copied ? '복사됨' : '복사'}
              </HoneyButton>
            </motion.div>
          ) : (
            <motion.div key="off" exit={{ rotateX: -90, opacity: 0 }} className="relative flex items-center gap-3 text-butter-100">
              <Lock className="size-7 shrink-0 text-honey-400" />
              <p className="text-sm leading-relaxed">
                <span className="font-display text-base text-honey-300">잠긴 쿠폰 · {GOLDEN.discount} 할인</span>
                <br />
                <a href="#lab" className="underline decoration-honey-400 decoration-wavy underline-offset-4 hover:text-honey-300">
                  황금 비율 실험실
                </a>
                에서 꿀 3 : 버터 2를 찾으면 열려요.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function CTA() {
  const { addToCart, pushToast, play, golden } = useAppState();
  const { reduced } = useMotionPrefs();
  const [flavorId, setFlavorId] = useState('original');
  const [packId, setPackId] = useState('regular');
  const [qty, setQty] = useState(1);
  const addRef = useRef(null);

  const flavor = FLAVORS.find((f) => f.id === flavorId);
  const pack = PACKS.find((p) => p.id === packId);
  const total = pack.price * qty;

  const add = () => {
    addToCart({ flavorId, flavorName: flavor.name, packId, packName: pack.name, spec: pack.spec, price: pack.price, qty });
    play('pop');
    flyToCart(addRef.current, reduced);
    pushToast(`${flavor.short} ${pack.name} ${qty}개를 담았어요!`);
  };

  return (
    <section id="buy" data-section="buy" data-nav="buy" data-bg="#33200F" data-tone="dark" aria-labelledby="buy-title" className="relative py-section text-butter-100">
      <div className="container-honey">
        <SectionHeading
          tone="dark"
          align="center"
          eyebrow="Get your crunch"
          index="06"
          id="buy-title"
          title={
            <>
              오늘 오후 네 시,
              <br />
              <Mark tone="deep">한 봉지</Mark> 어때요?
            </>
          }
          desc="맛과 크기를 고르면 바삭이가 장바구니까지 날아가요. 전국 편의점과 온라인몰에서 만날 수 있어요(가상)."
        />

        <div className="mt-14" style={{ filter: `drop-shadow(0 12px 0 ${C.cocoa950})` }}>
          <div className="crimp-edges relative bg-butter-200 px-5 py-12 text-cocoa-900 sm:px-10 lg:px-14 lg:py-16">
            <div className="absolute inset-0 bg-honeycomb" aria-hidden="true" />
            <div className="absolute inset-x-0 top-[11px] h-6 bg-crimp opacity-60" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-[11px] h-6 bg-crimp opacity-60" aria-hidden="true" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
              {/* 봉지 미리보기 */}
              <div className="relative mx-auto w-full max-w-[380px]">
                <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle,#FFF8DE_0%,rgba(255,248,222,0)_70%)]" aria-hidden="true" />
                <div className="absolute -left-[4%] top-[8%] w-[24%] animate-float" aria-hidden="true">
                  <Chip seed={44} className="w-full" />
                </div>
                <div className="absolute -right-[2%] bottom-[14%] w-[20%] animate-float" style={{ animationDelay: '-2s' }} aria-hidden="true">
                  <Chip seed={51} className="w-full" />
                </div>
                <div className="absolute right-[4%] top-[2%] w-[18%]" aria-hidden="true">
                  <Bee className="w-full" />
                </div>
                <div className="absolute left-[8%] bottom-[6%] w-[8%] animate-twinkle" aria-hidden="true">
                  <Sparkle className="w-full" color={C.honey500} />
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={flavorId}
                    className="relative mx-auto w-[74%]"
                    initial={{ rotate: -18, y: 40, opacity: 0, scale: 0.9 }}
                    animate={{ rotate: -4, y: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 14, y: -30, opacity: 0, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                  >
                    <ChipBag flavor={flavor} className="w-full drop-shadow-[0_16px_0_rgba(51,32,15,0.22)]" />
                  </motion.div>
                </AnimatePresence>
                <AnimatePresence>
                  {packId === 'party' && (
                    <motion.span
                      initial={{ scale: 0, rotate: -40 }}
                      animate={{ scale: 1, rotate: 12 }}
                      exit={{ scale: 0 }}
                      className="absolute right-[6%] top-[40%] grid size-20 place-items-center rounded-full border-[3px] border-cocoa-900 bg-berry-500 text-center font-display text-lg leading-tight text-cream shadow-sticker-sm"
                    >
                      ×10
                      <br />
                      파티!
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* 옵션 */}
              <div>
                <fieldset>
                  <legend className="font-display text-xl">1. 맛 고르기</legend>
                  <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {FLAVORS.map((f) => {
                      const on = f.id === flavorId;
                      return (
                        <label key={f.id} className="relative cursor-pointer">
                          <input
                            type="radio"
                            name="flavor"
                            value={f.id}
                            checked={on}
                            onChange={() => {
                              setFlavorId(f.id);
                              play('pop');
                            }}
                            className="peer sr-only"
                          />
                          <span
                            className={cx(
                              'flex h-full flex-col items-center gap-1.5 rounded-sticker border-[3px] border-cocoa-900 px-2 py-3 text-center transition-all peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-berry-500',
                              on ? '-translate-y-1 bg-cream shadow-sticker-sm' : 'bg-butter-100/70 hover:bg-cream',
                            )}
                          >
                            <span className="size-8 rounded-full border-[2.5px] border-cocoa-900" style={{ background: `linear-gradient(145deg, ${f.tint.from}, ${f.tint.to} 60%, ${f.tint.window})` }} aria-hidden="true" />
                            <span className="font-display text-[0.95rem] leading-tight">{f.short}</span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset className="mt-6">
                  <legend className="font-display text-xl">2. 크기 고르기</legend>
                  <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
                    {PACKS.map((p) => {
                      const on = p.id === packId;
                      return (
                        <label key={p.id} className="relative cursor-pointer">
                          <input
                            type="radio"
                            name="pack"
                            value={p.id}
                            checked={on}
                            onChange={() => {
                              setPackId(p.id);
                              play('pop');
                            }}
                            className="peer sr-only"
                          />
                          <span
                            className={cx(
                              'flex h-full items-center justify-between gap-3 rounded-sticker border-[3px] border-cocoa-900 px-4 py-3 transition-all peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-berry-500 sm:flex-col sm:items-start sm:gap-1.5 sm:px-3.5',
                              on ? '-translate-y-1 bg-honey-400 shadow-sticker-sm' : 'bg-butter-100/70 hover:bg-cream',
                            )}
                          >
                            <span className="min-w-0">
                              <span className="flex items-baseline gap-1.5">
                                <span className="font-display text-lg leading-tight">{p.name}</span>
                                <span className="font-serif text-xs font-bold text-cocoa-700">{p.spec}</span>
                              </span>
                              <span className="block text-[0.8rem] leading-snug text-cocoa-700">{p.note}</span>
                            </span>
                            <span className="font-serif text-lg font-black">{won(p.price)}</span>
                          </span>
                          {p.best && (
                            <span className="absolute -right-2 -top-3 rotate-6 rounded-full border-2 border-cocoa-900 bg-berry-500 px-2 py-0.5 font-display text-xs text-cream">
                              추천
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-5 rounded-sticker border-[3px] border-cocoa-900 bg-cream px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="mr-1 font-display text-xl">3. 수량</span>
                    <HexIconButton label="수량 하나 줄이기" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} className="disabled:opacity-40">
                      <Minus className="size-5" />
                    </HexIconButton>
                    <output className="w-9 text-center font-serif text-2xl font-black tabular-nums" aria-live="polite" aria-label={`수량 ${qty}개`}>
                      {qty}
                    </output>
                    <HexIconButton label="수량 하나 늘리기" onClick={() => setQty((q) => Math.min(20, q + 1))} disabled={qty >= 20} className="disabled:opacity-40">
                      <Plus className="size-5" />
                    </HexIconButton>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-cocoa-600">합계</p>
                    <motion.p key={total} initial={{ y: -8, opacity: 0.4 }} animate={{ y: 0, opacity: 1 }} className="font-serif text-3xl font-black tabular-nums">
                      {won(total)}
                    </motion.p>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-4">
                  <HoneyButton ref={addRef} size="lg" onClick={add} icon={<Bag className="size-5" />} aria-label={`${flavor.name} ${pack.name} ${qty}개 장바구니에 담기`}>
                    장바구니 담기
                  </HoneyButton>
                  <HoneyButton
                    size="lg"
                    variant="butter"
                    iconLeft={<Pin className="size-5" />}
                    onClick={() => pushToast('가까운 편의점 찾기는 데모에서 지원하지 않아요 🐝')}
                    aria-label="가까운 판매처 찾기 (데모)"
                  >
                    판매처 찾기
                  </HoneyButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-xl">
          <CouponTicket unlocked={golden} />
        </div>
      </div>
    </section>
  );
}
