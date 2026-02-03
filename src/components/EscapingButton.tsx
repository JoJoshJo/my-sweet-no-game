import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface EscapingButtonProps {
  children: React.ReactNode;
}

const EscapingButton = ({ children }: EscapingButtonProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [escapeCount, setEscapeCount] = useState(0);
  const [showBear, setShowBear] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const messages = [
    "Nice try! 😏",
    "Nope! 💕",
    "Can't catch me! 🏃‍♀️",
    "Just say yes! 💖",
    "Come on! 🌹",
    "You know you want to! 😘",
    "Almost! 😜",
    "Keep trying... or just click Yes! 💝",
  ];

  const escape = useCallback(() => {
    if (!buttonRef.current || !containerRef.current) return;

    const button = buttonRef.current.getBoundingClientRect();
    const container = containerRef.current.getBoundingClientRect();

    const maxX = container.width - button.width - 20;
    const maxY = container.height - button.height - 20;

    let newX = Math.random() * maxX - maxX / 2;
    let newY = Math.random() * maxY - maxY / 2;

    // Make sure it doesn't go too far
    newX = Math.max(-150, Math.min(150, newX));
    newY = Math.max(-100, Math.min(100, newY));

    setPosition({ x: newX, y: newY });
    setEscapeCount((prev) => prev + 1);
    
    // Show crying bear
    setShowBear(true);
    setTimeout(() => setShowBear(false), 2000);
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block min-w-[200px] min-h-[100px]">
      {escapeCount > 0 && (
        <motion.p
          key={escapeCount}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm text-muted-foreground font-medium"
        >
          {messages[escapeCount % messages.length]}
        </motion.p>
      )}
      
      {/* Crying Bear */}
      <AnimatePresence>
        {showBear && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: -20 }}
            className="absolute -left-20 top-1/2 -translate-y-1/2 text-4xl"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.5, repeat: 3 }}
              className="relative"
            >
              <span className="text-5xl">🧸</span>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: 2 }}
                className="absolute -top-1 -right-1 text-xl"
              >
                💧
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: 2, delay: 0.3 }}
                className="absolute top-0 left-0 text-lg"
              >
                💧
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <Button
          ref={buttonRef}
          variant="no"
          size="lg"
          onMouseEnter={escape}
          onTouchStart={escape}
          onClick={(e) => e.preventDefault()}
          className="cursor-not-allowed"
        >
          {children}
        </Button>
      </motion.div>
    </div>
  );
};

export default EscapingButton;
