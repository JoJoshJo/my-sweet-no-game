import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const FloatingHearts = () => {
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 5 + Math.random() * 5,
    size: 12 + Math.random() * 20,
    opacity: 0.2 + Math.random() * 0.3,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-rose"
          style={{
            left: `${heart.left}%`,
            bottom: "-50px",
            opacity: heart.opacity,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            rotate: [0, 360],
            x: [0, Math.sin(heart.id) * 50],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Heart
            size={heart.size}
            fill="currentColor"
            strokeWidth={0}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
