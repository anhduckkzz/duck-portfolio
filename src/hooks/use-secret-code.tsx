
import { useState, useEffect } from 'react';

export function useSecretCode(secretKeyword: string, onActivate: () => void) {
  const [secretCode, setSecretCode] = useState("");
  const [isActivated, setIsActivated] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      setSecretCode(prev => {
        const newCode = prev + e.key;
        if (newCode.includes(secretKeyword)) {
          setIsActivated(true);
          setShowAnimation(true);
          onActivate();
          setTimeout(() => setShowAnimation(false), 3000);
          return "";
        }
        return newCode.slice(-secretKeyword.length);
      });
    };

    window.addEventListener("keypress", handleKeyPress);
    
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [secretKeyword, onActivate]);

  return {
    isActivated,
    showAnimation
  };
}
