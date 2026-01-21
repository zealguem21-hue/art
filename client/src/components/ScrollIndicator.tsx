import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <motion.div 
      className="fixed bottom-8 right-8 z-40 hidden md:flex flex-col items-center gap-2 mix-blend-difference"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      <span className="font-mono text-xs text-primary uppercase tracking-[0.2em] rotate-90 origin-right translate-x-4 mb-8">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="w-5 h-5 text-primary" />
      </motion.div>
    </motion.div>
  );
}
