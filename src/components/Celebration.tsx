import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Sparkles } from "lucide-react";

const Celebration = () => {
  useEffect(() => {
    // Fire confetti bursts
    const duration = 5000;
    const end = Date.now() + duration;

    const colors = ["#e11d48", "#f43f5e", "#fb7185", "#fda4af", "#ffd700", "#fff"];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    // Initial big burst
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: colors,
    });

    frame();

    // Heart shaped confetti
    const heartConfetti = () => {
      confetti({
        particleCount: 50,
        spread: 360,
        ticks: 200,
        gravity: 0.5,
        decay: 0.94,
        startVelocity: 20,
        colors: ["#e11d48", "#f43f5e", "#fb7185"],
        shapes: ["circle"],
        scalar: 1.2,
      });
    };

    const interval = setInterval(heartConfetti, 1000);
    return () => clearInterval(interval);
  }, []);

  const floatingHearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    size: 20 + Math.random() * 30,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-8"
    >
      {/* Floating hearts background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-rose"
            style={{ left: `${heart.left}%`, bottom: "-50px" }}
            animate={{
              y: [0, -window.innerHeight - 100],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              delay: heart.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Heart size={heart.size} fill="currentColor" strokeWidth={0} />
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.6, repeat: Infinity }}
        className="inline-block"
      >
        <Heart className="w-24 h-24 text-rose fill-rose mx-auto" strokeWidth={0} />
      </motion.div>

      <motion.h1
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="text-5xl md:text-7xl font-display font-bold text-gradient-rose"
      >
        Yay! 💕
      </motion.h1>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <p className="text-2xl md:text-3xl font-display text-foreground italic">
          I knew you'd say yes!
        </p>
        <p className="text-lg md:text-xl text-muted-foreground font-medium">
          You just made me the happiest person in the world 🥰
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: "spring" }}
        className="flex justify-center gap-2"
      >
        {["💖", "🌹", "💕", "✨", "💗"].map((emoji, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -10, 0] }}
            transition={{ delay: i * 0.1, repeat: Infinity, duration: 1.5 }}
            className="text-4xl"
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-lg text-muted-foreground mt-8"
      >
        <Sparkles className="inline w-5 h-5 text-gold mr-2" />
        Get ready for the most romantic Valentine's Day ever!
        <Sparkles className="inline w-5 h-5 text-gold ml-2" />
      </motion.p>
    </motion.div>
  );
};

export default Celebration;
