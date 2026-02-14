import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingHearts from "@/components/FloatingHearts";
import EscapingButton from "@/components/EscapingButton";
import Celebration from "@/components/Celebration";
import romanticRoses from "@/assets/romantic-roses.jpg";
import cryingBear from "@/assets/crying-bear.png";

const Index = () => {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [showBear, setShowBear] = useState(false);

  const handleNoEscape = () => {
    setShowBear(true);
    setTimeout(() => setShowBear(false), 2500);
  };

  return (
    <div className="min-h-screen bg-romantic relative overflow-hidden">
      {/* Background floating hearts */}
      <FloatingHearts />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-rose-light/30 rounded-full blur-3xl" />
        <div className="absolute top-20 right-20 w-40 h-40 bg-gold-light/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-rose-light/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <AnimatePresence mode="wait">
          {!hasAccepted ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-8 max-w-2xl mx-auto"
            >
              {/* Romantic image */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative mx-auto w-64 h-64 md:w-80 md:h-80"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rose/20 to-gold/20 rounded-full blur-2xl" />
                <img
                  src={romanticRoses}
                  alt="Romantic roses"
                  className="relative w-full h-full object-cover rounded-full border-4 border-rose-light/50 shadow-romantic"
                />
                {/* Sparkle decorations */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles className="w-8 h-8 text-gold" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="absolute -bottom-2 -left-2"
                >
                  <Sparkles className="w-6 h-6 text-gold" />
                </motion.div>
              </motion.div>

              {/* Main question with crying bear */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4 relative"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-block"
                >
                  <Heart className="w-12 h-12 text-rose fill-rose mx-auto animate-heart-beat" strokeWidth={0} />
                </motion.div>

                <div className="relative inline-block">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-gradient-rose leading-tight">
                    Hey{" "}
                    <span
                      className="inline-block italic relative"
                      style={{
                        textShadow: '0 0 20px hsl(var(--rose) / 0.5), 0 0 40px hsl(var(--rose) / 0.3)',
                      }}
                    >
                      Grace
                      <span className="absolute bottom-0 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-transparent via-rose to-transparent opacity-80" />
                    </span>
                    ,<br />Will You Be My Valentine?
                  </h1>
                  
                  {/* Crying Bear - positioned next to the title */}
                  <AnimatePresence>
                    {showBear && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.3, x: 20, rotate: 10 }}
                        animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.3, x: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="absolute -right-4 md:-right-28 top-1/2 -translate-y-1/2"
                      >
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 0.6, repeat: 3 }}
                          className="relative"
                        >
                          {/* Soft background glow for blending */}
                          <div className="absolute inset-0 bg-rose-light/50 rounded-full blur-2xl scale-90" />
                          <img 
                            src={cryingBear} 
                            alt="Crying bear" 
                            className="relative w-40 h-40 md:w-56 md:h-56 object-contain drop-shadow-lg"
                          />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-md mx-auto">
                  There's something about you that just makes everything better
                  <span className="text-rose"> 💕</span>
                </p>
              </motion.div>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
              >
                <Button
                  variant="yes"
                  size="lg"
                  onClick={() => setHasAccepted(true)}
                  className="min-w-[160px]"
                >
                  <Heart className="w-5 h-5 fill-current" />
                  Yes! 💕
                </Button>

                <EscapingButton onEscape={handleNoEscape}>
                  No 😢
                </EscapingButton>
              </motion.div>

              {/* Hint text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-sm text-muted-foreground/60 italic mt-8"
              >
                (Hint: The "No" button might be a little... shy 😏)
              </motion.p>
            </motion.div>
          ) : (
            <Celebration />
          )}
        </AnimatePresence>
      </div>

      {/* Bottom decorative roses */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-rose-light/30 to-transparent pointer-events-none" />
    </div>
  );
};

export default Index;
