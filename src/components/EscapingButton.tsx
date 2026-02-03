import { useState, useRef, useCallback } from "react";
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
    
    // Trigger parent callback
    onEscape?.();
  }, [onEscape]);

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
