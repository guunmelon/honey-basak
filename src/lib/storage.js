// 샌드박스 iframe 등에서 localStorage 접근이 막혀도 안전하게
export function readStorage(key, fallback = null) {
  try {
    const v = window.localStorage.getItem(key);
    return v === null ? fallback : v;
  } catch {
    return fallback;
  }
}
export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* noop */
  }
}
