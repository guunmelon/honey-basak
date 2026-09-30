import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BRAND, FOOTER_LINKS } from '../../data/content';
import { useAppState } from '../../context/AppState';
import { useMotionPrefs } from '../../context/MotionPrefs';
import { C } from '../../lib/tokens';
import HoneyDrips from '../motifs/HoneyDrips';
import LogoMark from '../motifs/LogoMark';
import Bee from '../motifs/Bee';
import HexIconButton from '../ui/HexIconButton';
import HoneyButton from '../ui/HoneyButton';
import { ArrowUp, Check, Instagram, Mail, Youtube } from '../ui/Icons';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Newsletter() {
  const { pushToast, play } = useAppState();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const submit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus('error');
      return;
    }
    setStatus('done');
    play('chime');
    pushToast('꿀소식 구독 완료! 첫 편지를 기다려 주세요 💌');
  };

  return (
    <form onSubmit={submit} noValidate className="rounded-card border-[3px] border-honey-400/60 bg-cocoa-900/70 p-5 sm:p-6" aria-labelledby="newsletter-title">
      <h3 id="newsletter-title" className="flex items-center gap-2 font-display text-2xl text-butter-100">
        <Mail className="size-6 text-honey-400" />
        꿀소식 받기
      </h3>
      <p className="mt-1 text-sm text-butter-100/70">신제품 · 한정 맛 · 실험실 쿠폰을 가장 먼저 보내 드려요.</p>
      <AnimatePresence mode="wait" initial={false}>
        {status === 'done' ? (
          <motion.p key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center gap-3 font-display text-lg text-honey-300" role="status">
            <Bee className="h-9 w-10" />
            구독해 주셔서 고마워요!
          </motion.p>
        ) : (
          <motion.div key="form" exit={{ opacity: 0, y: -10 }} className="mt-4">
            <label htmlFor="newsletter-email" className="sr-only">
              이메일 주소
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="newsletter-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="honey@basak.kr"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                aria-invalid={status === 'error'}
                aria-describedby="newsletter-help"
                className="h-14 min-w-0 flex-1 rounded-full border-[3px] border-cocoa-950 bg-cream px-5 font-body text-cocoa-900 placeholder:text-cocoa-400 focus:outline-[3px] focus:outline-honey-400"
              />
              <HoneyButton type="submit" aria-label="꿀소식 구독하기">
                구독
              </HoneyButton>
            </div>
            <p id="newsletter-help" className={`mt-2 text-sm ${status === 'error' ? 'text-berry-400' : 'text-butter-100/60'}`} role={status === 'error' ? 'alert' : undefined}>
              {status === 'error' ? '이메일 주소를 다시 확인해 주세요.' : '언제든 구독을 취소할 수 있어요.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

export default function Footer() {
  const { reduced, systemReduced, toggleReduced } = useMotionPrefs();
  const { pushToast } = useAppState();

  return (
    <footer data-section="footer" data-nav="buy" data-bg="#22150A" data-tone="dark" className="relative overflow-hidden bg-cocoa-950 text-butter-100" aria-labelledby="footer-title">
      <HoneyDrips className="pointer-events-none absolute inset-x-0 top-0 h-[130px] w-full" color={C.honey400} shade={C.honey700} count={20} seed={21} height={130} band={16} />
      <div className="absolute inset-0 bg-honeycomb-cream opacity-60" aria-hidden="true" />

      <div className="container-honey relative pb-8 pt-40">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.7fr_0.7fr_1.5fr]">
          <div>
            <a href="#top" className="inline-flex items-center gap-3" aria-label="허니바삭 홈, 맨 위로 이동">
              <LogoMark className="size-14" />
              <span id="footer-title" className="font-display text-4xl text-butter-100">
                {BRAND.name}
              </span>
            </a>
            <p className="mt-4 max-w-xs text-butter-100/75">
              {BRAND.promise}. 감자 언덕과 아카시아 벌집, 버터 공방이 함께 만듭니다.
            </p>
            <div className="mt-6 flex gap-2.5">
              <HexIconButton label="허니바삭 인스타그램 (데모)" onClick={() => pushToast('가상 브랜드라 실제 SNS 계정은 없어요 🐝')}>
                <Instagram className="size-5" />
              </HexIconButton>
              <HexIconButton label="허니바삭 유튜브 (데모)" onClick={() => pushToast('가상 브랜드라 실제 SNS 계정은 없어요 🐝')}>
                <Youtube className="size-5" />
              </HexIconButton>
            </div>
          </div>

          {FOOTER_LINKS.map((col) => (
            <nav key={col.title} aria-label={`${col.title} 링크`}>
              <h3 className="font-display text-base text-honey-400">{col.title}</h3>
              <ul className="mt-4 grid gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="group inline-flex items-center gap-2 font-display text-lg text-butter-100/85 transition-colors hover:text-honey-300">
                      <span className="h-0.5 w-0 rounded bg-honey-400 transition-all duration-300 group-hover:w-4" aria-hidden="true" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <Newsletter />
        </div>

        <p
          aria-hidden="true"
          className="fraunces-soft pointer-events-none mt-16 select-none whitespace-nowrap text-center font-serif text-[15.5vw] font-black italic leading-[0.8] tracking-tight text-transparent lg:text-[11.5rem]"
          style={{ WebkitTextStroke: `2px ${C.honey500}` }}
        >
          Honey Basak
        </p>

        <div className="mt-10 flex flex-col gap-4 border-t-2 border-dashed border-butter-100/15 pt-6 text-sm text-butter-100/60 md:flex-row md:items-center md:justify-between">
          <div>
            <p>
              © 2026 {BRAND.maker} {BRAND.makerEn} · 고객센터 080-000-0404 (평일 10:00–16:00)
            </p>
            <p className="mt-1">이 사이트는 디자인 포트폴리오를 위한 가상 브랜드이며, 실제 제품·회사와 관련이 없습니다.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleReduced}
              disabled={systemReduced}
              aria-pressed={reduced}
              className="inline-flex items-center gap-2 rounded-full border-2 border-butter-100/30 px-4 py-2 font-display text-butter-100 transition-colors hover:border-honey-400 hover:text-honey-300 disabled:opacity-50"
            >
              {reduced && <Check className="size-4" />}
              모션 줄이기
            </button>
            <HexIconButton label="맨 위로 이동" onClick={() => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })}>
              <ArrowUp className="size-5" />
            </HexIconButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
