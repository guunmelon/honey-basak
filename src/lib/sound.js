// Web Audio로 합성하는 효과음 — 외부 오디오 파일 없음
let ctx = null;

function getCtx() {
  if (typeof window === 'undefined') return null;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function noiseBurst(ac, t, dur, freq, gain) {
  const len = Math.max(1, Math.ceil(ac.sampleRate * dur));
  const buffer = ac.createBuffer(1, len, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let j = 0; j < len; j++) data[j] = (Math.random() * 2 - 1) * (1 - j / len) ** 2;
  const src = ac.createBufferSource();
  src.buffer = buffer;
  const bp = ac.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = freq;
  bp.Q.value = 0.9;
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.004);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(bp).connect(g).connect(ac.destination);
  src.start(t);
  src.stop(t + dur + 0.02);
}

function tone(ac, t, { from, to, dur, type = 'sine', gain = 0.18 }) {
  const osc = ac.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(from, t);
  osc.frequency.exponentialRampToValueAtTime(to, t + dur);
  const g = ac.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(ac.destination);
  osc.start(t);
  osc.stop(t + dur + 0.03);
}

export const sfx = {
  /** 바삭! — 짧은 노이즈 그레인 여러 개 */
  crunch() {
    const ac = getCtx();
    if (!ac) return;
    const now = ac.currentTime;
    const grains = 6 + Math.floor(Math.random() * 4);
    for (let i = 0; i < grains; i++) {
      const t = now + i * 0.016 + Math.random() * 0.018;
      noiseBurst(ac, t, 0.025 + Math.random() * 0.05, 1600 + Math.random() * 3200, 0.5 * (1 - (i / grains) * 0.6));
    }
  },
  /** 꿀 한 방울 — 톡 */
  drip() {
    const ac = getCtx();
    if (!ac) return;
    tone(ac, ac.currentTime, { from: 900, to: 260, dur: 0.16, gain: 0.16 });
  },
  /** 버터 퐁당 */
  plop() {
    const ac = getCtx();
    if (!ac) return;
    tone(ac, ac.currentTime, { from: 320, to: 110, dur: 0.18, type: 'triangle', gain: 0.22 });
  },
  /** 황금 비율 달성 차임 */
  chime() {
    const ac = getCtx();
    if (!ac) return;
    const now = ac.currentTime;
    [659.25, 830.61, 987.77, 1318.5].forEach((hz, i) => {
      tone(ac, now + i * 0.09, { from: hz, to: hz * 1.001, dur: 0.5, type: 'sine', gain: 0.12 });
    });
  },
  /** UI 클릭 팝 */
  pop() {
    const ac = getCtx();
    if (!ac) return;
    tone(ac, ac.currentTime, { from: 520, to: 780, dur: 0.08, type: 'sine', gain: 0.1 });
  },
};
