import { motion } from 'framer-motion';

/** 스크롤 진입 시 떠오르는 공용 래퍼 (모션 감소 시 opacity만) */
export default function Reveal({ as = 'div', delay = 0, y = 36, amount = 0.25, className, children, ...rest }) {
  const Comp = motion[as] ?? motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
