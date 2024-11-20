import { createContext, useContext, useState } from "react";
import HeartAnimation from "./HeartAnimation";

interface HeartAnimationContextType {
  triggerHeart: () => void;
}

const HeartAnimationContext = createContext<
  HeartAnimationContextType | undefined
>(undefined);

export const HeartAnimationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [heartTrigger, setHeartTrigger] = useState(false);

  const triggerHeart = () => {
    setHeartTrigger(true);
    setTimeout(() => setHeartTrigger(false), 2000);
  };

  return (
    <HeartAnimationContext.Provider value={{ triggerHeart }}>
      {children}
      <HeartAnimation trigger={heartTrigger} />
    </HeartAnimationContext.Provider>
  );
};

export const useHeartAnimation = (): HeartAnimationContextType => {
  const context = useContext(HeartAnimationContext);
  if (!context) {
    throw new Error(
      "useHeartAnimation must be used within a HeartAnimationProvider",
    );
  }
  return context;
};
