// ─────────────────────────────────────────────────────────────
// 허니바삭 HONEY BASAK — 가상 브랜드 콘텐츠
// (실제 상품명·로고를 사용하지 않은 포트폴리오용 가상 브랜드)
// ─────────────────────────────────────────────────────────────

export const BRAND = {
  name: '허니바삭',
  en: 'HONEY BASAK',
  maker: '벌집상회',
  makerEn: 'HIVE & CO.',
  promise: '오후 네 시의 황금빛 바삭함',
  hero: {
    sticker: '달콤~한 꿀이 사르르',
    sub: 'Honey Butter Crisps',
    body: '국내산 햇감자를 1.2mm로 얇게 저며, 아카시아 꿀과 고메버터를 사르르 입혔어요. 한 입에 바삭, 두 입에 달콤, 세 입이면 이미 한 봉지.',
  },
};

export const NAV_LINKS = [
  { id: 'world', label: '세계관', en: 'World' },
  { id: 'flavors', label: '맛 라인업', en: 'Flavors' },
  { id: 'lab', label: '황금비율 실험실', en: 'Lab' },
  { id: 'features', label: '바삭한 이유', en: 'Why' },
  { id: 'story', label: '스토리', en: 'Story' },
];

// 브랜드 핵심 키워드 5
export const KEYWORDS = [
  { ko: '달콤', en: 'Sweet' },
  { ko: '고소', en: 'Buttery' },
  { ko: '바삭', en: 'Crisp' },
  { ko: '다정', en: 'Warm' },
  { ko: '황금빛', en: 'Golden' },
];

export const MARQUEE_WORDS = ['바삭', 'HONEY', '달콤', 'BUTTER', '고소', 'CRISP', '국내산 감자 100%', '오후 네 시', 'GOLDEN HOUR'];

// 버터벌집 마을의 세 방 + 주인공
export const PLACES = [
  {
    id: 'potato',
    name: '감자 언덕',
    en: 'Potato Hill',
    fact: '고랭지 햇감자 100%',
    desc: '서늘한 언덕에서 천천히 자란 감자만 골라 1.2mm 두께로 얇게 저며요. 바삭함의 뼈대가 만들어지는 곳이에요.',
    hint: '바삭함의 뼈대',
  },
  {
    id: 'hive',
    name: '아카시아 벌집',
    en: 'Acacia Hive',
    fact: '저온 꿀 글레이즈',
    desc: '꿀벌 비비의 집. 아카시아 꿀을 낮은 온도로 입혀 꽃향은 살리고, 손에 묻는 끈적임은 덜었어요.',
    hint: '달콤함의 원천',
  },
  {
    id: 'butter',
    name: '버터 공방',
    en: 'Butter Atelier',
    fact: '프랑스산 고메버터',
    desc: '발효버터 특유의 깊은 고소함. 달콤함이 과하지 않도록 균형을 잡아 주는 비밀 재료예요.',
    hint: '고소함의 비밀',
  },
];

export const BASAKI = {
  id: 'basaki',
  name: '바삭이',
  en: 'Basaki',
  fact: '세 재료가 만나는 곳',
  desc: '감자 언덕, 아카시아 벌집, 버터 공방이 맞닿는 한가운데에서 태어난 우리의 주인공. 머리 위의 꿀벌 비비와 늘 붙어 다녀요.',
  hint: '마을의 주인공',
};

// 맛 라인업 (패키지 팔레트 안에서 톤만 변주)
export const FLAVORS = [
  {
    id: 'original',
    name: '오리지널 허니버터',
    short: '오리지널',
    en: 'Original Honey Butter',
    badge: 'BEST',
    badgeTone: 'berry',
    desc: '아카시아 꿀과 고메버터의 황금 비율 3:2. 모든 이야기가 시작된 첫 번째 맛.',
    long: '얇게 저민 햇감자 위에 아카시아 꿀을 한 겹, 고메버터 시즈닝을 한 겹. 달콤함이 먼저 인사하고 고소함이 오래 남는, 허니바삭의 기준이 되는 맛이에요.',
    sweet: 4,
    butter: 3,
    crunch: 4,
    notes: ['아카시아 꿀', '고메버터', '구운 감자'],
    pairing: ['아이스 아메리카노', '밀크티'],
    weight: '60g',
    kcal: 330,
    tint: { from: '#FFF3C6', to: '#F9D46E', window: '#F4AE2F', ribbon: '#E03A2C' },
  },
  {
    id: 'double-honey',
    name: '더블 허니',
    short: '더블 허니',
    en: 'Double Honey',
    badge: '달콤 MAX',
    badgeTone: 'honey',
    desc: '꿀을 두 번 입혀 한층 깊어진 단맛. 꿀벌 비비의 최애 맛이에요.',
    long: '저온 꿀 글레이즈를 두 번 입혀 한 입마다 꿀 향이 진하게 퍼져요. 달콤한 간식이 당기는 날, 가장 먼저 손이 가는 한 봉지.',
    sweet: 5,
    butter: 2,
    crunch: 3,
    notes: ['진한 꿀', '꽃향', '캐러멜 여운'],
    pairing: ['우유', '얼그레이'],
    weight: '60g',
    kcal: 340,
    tint: { from: '#FFE6A6', to: '#F2AE2E', window: '#C97A08', ribbon: '#9A5A06' },
  },
  {
    id: 'salty-butter',
    name: '솔티 고메버터',
    short: '솔티 버터',
    en: 'Salty Gourmet Butter',
    badge: '고소 MAX',
    badgeTone: 'cocoa',
    desc: '천일염 한 꼬집과 발효버터로 단짠의 끝을 찍은 맛.',
    long: '고메버터의 비율을 높이고 천일염을 한 꼬집 더했어요. 달콤함은 가볍게, 고소함과 짭짤함은 선명하게. 맥주와 함께라면 더 좋아요.',
    sweet: 2,
    butter: 5,
    crunch: 4,
    notes: ['발효버터', '천일염', '고소함'],
    pairing: ['라거 맥주', '탄산수'],
    weight: '60g',
    kcal: 335,
    tint: { from: '#FFFBEA', to: '#F6E1A0', window: '#F5C94F', ribbon: '#5E3A1D' },
  },
  {
    id: 'honey-caramel',
    name: '허니 캐러멜',
    short: '허니 캐러멜',
    en: 'Honey Caramel',
    badge: 'NEW',
    badgeTone: 'berry',
    desc: '꿀을 약불에 졸여 만든 캐러멜 글레이즈. 오후 네 시의 맛.',
    long: '꿀을 약불에서 천천히 졸여 쌉싸름한 캐러멜 향을 입혔어요. 더 단단하고 더 바삭한 식감으로, 해 질 녘처럼 진한 한 봉지.',
    sweet: 4,
    butter: 4,
    crunch: 5,
    notes: ['졸인 꿀', '캐러멜', '버터 토피'],
    pairing: ['라테', '바닐라 아이스크림'],
    weight: '60g',
    kcal: 345,
    tint: { from: '#F9DDAA', to: '#DC9C4E', window: '#9A5A06', ribbon: '#E03A2C' },
  },
];

export const PACKS = [
  { id: 'mini', name: '미니팩', spec: '44g', price: 1700, note: '가방 속 간식' },
  { id: 'regular', name: '레귤러', spec: '60g', price: 2400, note: '가장 많이 골라요', best: true },
  { id: 'party', name: '파티 박스', spec: '60g × 10', price: 21900, note: '나눠 먹는 행복' },
];

export const STATS = [
  { value: 1.2, decimals: 1, suffix: 'mm', label: '슬라이스 두께', caption: '얇을수록 더 바삭하게' },
  { value: 100, suffix: '%', label: '국내산 감자', caption: '고랭지 햇감자만' },
  { value: 3, suffix: ' : 2', label: '꿀과 버터의 황금 비율', caption: '실험실에서 직접 찾아보세요' },
  { value: 2, suffix: '번', label: '저온에서 두 번 튀김', caption: '오래가는 바삭함' },
];

export const BENEFITS = [
  {
    id: 'fresh',
    icon: 'shield',
    title: '끝까지 바삭',
    desc: '질소 충전 이중 포장으로 마지막 한 조각까지 눅눅함 없이.',
  },
  {
    id: 'balance',
    icon: 'balance',
    title: '단짠의 황금비',
    desc: '꿀 3 : 버터 2. 달콤함이 먼저, 고소함이 오래 남도록.',
  },
  {
    id: 'clean',
    icon: 'hand',
    title: '손에 덜 묻는 글레이즈',
    desc: '저온 코팅으로 끈적임은 줄이고 꿀 향은 그대로.',
  },
  {
    id: 'share',
    icon: 'share',
    title: '나눔 사이즈',
    desc: '가방 속 44g 미니팩부터 모두의 파티 박스까지.',
  },
];

export const LAYERS = [
  { id: 'glaze', no: '03', title: '아카시아 꿀 글레이즈', desc: '저온으로 얇게 한 겹' },
  { id: 'season', no: '02', title: '고메버터 시즈닝', desc: '발효버터 · 천일염 한 꼬집' },
  { id: 'slice', no: '01', title: '1.2mm 고랭지 감자', desc: '두 번 튀겨 단단하게' },
];

export const STORY = [
  {
    id: 'ch1',
    no: '01',
    time: 'AM 06:00',
    title: '감자 언덕의 아침',
    body: '강원도 고랭지 언덕, 서늘한 바람을 맞고 자란 햇감자가 1.2mm로 얇게 저며지던 날. 바삭이가 태어났어요.',
    scene: 'field',
    bg: '#FEEDB6',
  },
  {
    id: 'ch2',
    no: '02',
    time: 'AM 11:00',
    title: '길 잃은 꿀벌 비비',
    body: '아카시아 꽃을 찾던 꿀벌 비비가 바삭이 위로 톡— 꿀 한 방울을 떨어뜨렸죠. “어, 이거… 맛있잖아?”',
    scene: 'bee',
    bg: '#FBDF83',
  },
  {
    id: 'ch3',
    no: '03',
    time: 'PM 02:00',
    title: '버터 공방에서 온 편지',
    body: '소문을 들은 버터 공방이 고소한 고메버터를 보내왔어요. 달콤함 위로 고소함이 사르르 녹아들었습니다.',
    scene: 'butter',
    bg: '#F6C95E',
  },
  {
    id: 'ch4',
    no: '04',
    time: 'PM 04:00',
    title: '황금빛 한 봉지',
    body: '그렇게 완성된 허니바삭. 오늘도 누군가의 오후 네 시를 바삭하고 다정하게 채우고 있어요.',
    scene: 'bag',
    bg: '#EFB04C',
  },
];

export const FOOTER_LINKS = [
  {
    title: '제품',
    links: [
      { label: '맛 라인업', href: '#flavors' },
      { label: '황금비율 실험실', href: '#lab' },
      { label: '구매하기', href: '#buy' },
    ],
  },
  {
    title: '브랜드',
    links: [
      { label: '버터벌집 마을', href: '#world' },
      { label: '바삭한 이유', href: '#features' },
      { label: '브랜드 스토리', href: '#story' },
    ],
  },
];

export const GOLDEN = { honey: 3, butter: 2, coupon: 'GOLDEN32', discount: '32%' };
