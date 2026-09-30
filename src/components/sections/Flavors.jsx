import { useState } from 'react';
import { FLAVORS } from '../../data/content';
import SectionHeading from '../ui/SectionHeading';
import Mark from '../ui/Mark';
import Reveal from '../ui/Reveal';
import FlavorCard from './FlavorCard';
import FlavorModal from './FlavorModal';

export default function Flavors() {
  const [open, setOpen] = useState(null);

  return (
    <section id="flavors" data-section="flavors" data-bg="#FDE7A3" aria-labelledby="flavors-title" className="relative py-section">
      <div className="container-honey">
        <SectionHeading
          align="center"
          eyebrow="Flavor Lineup"
          index="02"
          id="flavors-title"
          title={
            <>
              오늘은 <Mark>어떤 바삭</Mark>?
            </>
          }
          desc="같은 황금빛 팔레트, 네 가지 기분. 카드에 마우스를 올리면 봉지 속 이야기가 흘러나와요. 눌러서 자세히 볼 수 있어요."
        />
        <ul
          className="no-scrollbar -mx-gutter mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-gutter pb-10 pt-4 md:mx-0 md:grid md:grid-cols-2 md:gap-7 md:overflow-visible md:px-0 xl:grid-cols-4"
          aria-label="허니바삭 맛 목록"
        >
          {FLAVORS.map((f, i) => (
            <li key={f.id} className="w-[78vw] max-w-[330px] shrink-0 snap-center md:w-auto md:max-w-none">
              <Reveal delay={i * 0.08} className="h-full">
                <FlavorCard flavor={f} index={i} onOpen={setOpen} />
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="text-center font-hand text-lg font-bold text-cocoa-700 md:hidden" aria-hidden="true">
          ← 옆으로 밀어서 더 보기 →
        </p>
      </div>
      <FlavorModal flavor={open} onClose={() => setOpen(null)} />
    </section>
  );
}
