import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import cryingBear from "@/assets/crying-bear.png";

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
    setTimeout(() => setShowBear(false), 2500);
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
            initial={{ opacity: 0, scale: 0.3, x: -30, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.3, x: -30 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute -left-32 top-1/2 -translate-y-1/2"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 0.6, repeat: 3 }}
              className="relative"
            >
              <img 
                src={cryingBear} 
                alt="Crying bear" 
                className="w-28 h-28 object-contain drop-shadow-lg"
              />
              {/* Animated tears */}
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], y: [0, 20, 40] }}
                transition={{ duration: 1, repeat: 2, delay: 0.2 }}
                className="absolute top-8 left-4 text-2xl"
              >
                💧
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], y: [0, 20, 40] }}
                transition={{ duration: 1, repeat: 2, delay: 0.5 }}
                className="absolute top-8 right-4 text-2xl"
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
