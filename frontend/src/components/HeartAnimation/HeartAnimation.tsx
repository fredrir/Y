import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HeartIcon } from "lucide-react";
import "./HeartAnimation.css";

interface HeartAnimationProps {
  trigger: boolean;
}

const HeartAnimation: React.FC<HeartAnimationProps> = ({ trigger }) => {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>(
    [],
  );

  useEffect(() => {
    if (trigger) {
      const heartCount = 20;
      const newHearts = Array.from({ length: heartCount }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: 100,
      }));
      setHearts(newHearts);

      const timer = setTimeout(() => {
        setHearts([]);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (!hearts.length) return null;

  return createPortal(
    <div className="heart-animation-container">
      {hearts.map((heart) => (
        <HeartIcon
          key={heart.id}
          className="heart-icon"
          style={{
            left: `${heart.x}%`,
            bottom: `${heart.y}%`,
            animationDelay: `${Math.random() * 0.5}s`,
            color: "rgba(255, 0, 0, 0.7)",
          }}
          size={24}
        />
      ))}
    </div>,
    document.body,
  );
};

export default HeartAnimation;
