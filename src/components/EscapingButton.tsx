import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface EscapingButtonProps {
  children: React.ReactNode;
  onEscape?: () => void;
}

const EscapingButton = ({ children, onEscape }: EscapingButtonProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [escapeCount, setEscapeCount] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

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

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const escape = useCallback(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current.getBoundingClientRect();
    const padding = 20;

    // Calculate max bounds based on window size
    const maxX = windowSize.width - button.width - padding;
    const maxY = windowSize.height - button.height - padding;

    // Generate random position anywhere on the screen
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Convert to offset from current position
    const currentCenterX = button.left + button.width / 2;
    const currentCenterY = button.top + button.height / 2;

    const newX = randomX - currentCenterX + button.width / 2 + position.x;
    const newY = randomY - currentCenterY + button.height / 2 + position.y;

    setPosition({ x: newX, y: newY });
    setEscapeCount((prev) => prev + 1);

    // Trigger parent callback
    onEscape?.();
  }, [onEscape, windowSize, position]);

  return (
    <div className="relative inline-block">
      {escapeCount > 0 && (
        <motion.p
          key={escapeCount}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm text-muted-foreground font-medium z-50"
        >
          {messages[escapeCount % messages.length]}
        </motion.p>
      )}

      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="relative z-40"
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
