// CSS @theme 토큰과 동일한 값 — SVG 일러스트에서 사용 (index.css와 동기화)
export const C = {
  butter50: '#FFFBEF',
  butter100: '#FFF3CC',
  butter200: '#FDE7A3',
  butter300: '#FAD978',
  butter400: '#F5C94F',
  honey300: '#F9C255',
  honey400: '#F4AE2F',
  honey500: '#E8950F',
  honey600: '#C97A08',
  honey700: '#9A5A06',
  cocoa400: '#B98A5C',
  cocoa500: '#9B6B40',
  cocoa600: '#7A4E2A',
  cocoa700: '#5E3A1D',
  cocoa800: '#4A2C14',
  cocoa900: '#33200F',
  cocoa950: '#22150A',
  berry400: '#F0594A',
  berry500: '#E03A2C',
  berry600: '#BF2A1E',
  cream: '#FFFDF4',
  chipLight: '#FFE7A0',
  chip: '#F4C457',
  chipDark: '#D9953A',
  french: '#2A55B0',
  blush: '#F28B6E',
};

// 일러스트 공통 규칙: 코코아 외곽선 3.5px, 둥근 조인
export const INK = { stroke: C.cocoa900, strokeWidth: 3.5, strokeLinejoin: 'round', strokeLinecap: 'round' };
