import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import type { Item } from "@shared/schema";

interface ImageSectionProps {
  item: Item;
}

export function ImageSection({ item }: ImageSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  return (
    <section 
      ref={ref}
      className="h-[100vh] w-full flex items-center justify-center snap-start relative perspective-1000 overflow-hidden"
    >
      <div className="relative z-10 group">
        {/* Parallax Image Container */}
        <motion.div 
          style={{ y }}
          className="relative w-[300px] md:w-[400px] aspect-[3/4] overflow-hidden rounded-sm"
        >
          <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none" />
          <motion.img
            src={item.imageUrl}
            alt={item.altText}
            className="w-full h-full object-cover filter grayscale contrast-125 transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          
          {/* Decorative Border */}
          <div className="absolute inset-4 border border-white/20 z-20 pointer-events-none" />
        </motion.div>

        {/* Floating Number */}
        <motion.h2 
          className="absolute -top-12 -left-12 md:-left-24 text-6xl md:text-9xl font-mono font-black text-primary mix-blend-difference tracking-tighter select-none pointer-events-none z-30"
          style={{ y: useTransform(scrollYProgress, [0, 1], [100, -100]) }}
        >
          {item.displayNumber}
        </motion.h2>

        {/* Description Label - fades in/out */}
        <motion.div 
          style={{ opacity }}
          className="absolute -bottom-8 -right-8 md:-right-16 text-right z-30"
        >
          <p className="font-mono text-xs text-primary/80 uppercase tracking-widest mb-1">Collection</p>
          <p className="font-sans text-sm text-white/90 font-light max-w-[150px]">{item.altText}</p>
        </motion.div>
      </div>

      {/* Background grain texture */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
    </section>
  );
}
