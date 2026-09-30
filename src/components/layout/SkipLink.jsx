export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:border-[3px] focus:border-cocoa-900 focus:bg-honey-400 focus:px-5 focus:py-3 focus:font-display focus:text-cocoa-950 focus:shadow-sticker"
    >
      본문으로 건너뛰기
    </a>
  );
}
