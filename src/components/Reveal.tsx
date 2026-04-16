import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  id?: string;
  className?: string;
}

export const Reveal = ({ children, width = "100%", delay = 0.2, id, className = "" }: RevealProps) => {
  return (
    <div id={id} className={className} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        viewport={{ once: true, amount: 0.01 }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
