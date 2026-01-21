import { useItems } from "@/hooks/use-items";
import { ImageSection } from "@/components/ImageSection";
import { ProgressBar } from "@/components/ProgressBar";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { data: items, isLoading } = useItems();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background text-primary">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-8 h-8 md:w-12 md:h-12" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground selection:bg-primary selection:text-background overflow-x-hidden">
      <ProgressBar />
      {/* Main Snap Container */}
      <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
        
        {/* Intro Section */}
        <section className="h-screen w-full flex flex-col items-center justify-center snap-start relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center z-10"
          >
            <h1 className="font-mono tracking-[-3px] text-primary text-[96px] font-black uppercase">
              José Sabino
            </h1>
            <p className="font-sans text-muted-foreground max-w-md mx-auto mt-6 text-sm md:text-base px-4">
              Hey! 😄 I'm José Sabino, a visual designer focus on interactions that feel simple and enjoyable to use
            </p>
          </motion.div>
          
          <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_50%)] blur-[120px]" />
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
        </section>

        {/* Dynamic Image Sections */}
        <AnimatePresence>
          {items?.map((item) => (
            <ImageSection key={item.id} item={item} />
          ))}
        </AnimatePresence>

        {/* Outro Section */}
        <section className="h-screen w-full flex items-center justify-center snap-start bg-foreground text-background relative overflow-hidden">
          <div className="text-center z-10 relative">
            <h2 className="font-mono text-5xl md:text-9xl font-black tracking-tighter mb-8 opacity-10">
              FIN
            </h2>
            <div className="absolute inset-0 flex items-center justify-center">
               <a 
                 href="#" 
                 className="font-sans text-xl font-medium hover:text-primary transition-colors hover:underline decoration-primary underline-offset-4"
               >
                 Back to Top
               </a>
            </div>
          </div>
          <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat invert" />
        </section>
      </main>
      <ScrollIndicator />
    </div>
  );
}
