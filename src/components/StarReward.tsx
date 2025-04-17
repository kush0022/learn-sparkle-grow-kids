
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

type StarRewardProps = {
  stars: number;
  total?: number;
  animate?: boolean;
};

const StarReward: React.FC<StarRewardProps> = ({ 
  stars, 
  total = 3,
  animate = false 
}) => {
  const [animationIndex, setAnimationIndex] = useState<number | null>(null);

  useEffect(() => {
    if (animate) {
      setAnimationIndex(stars - 1);
      const timer = setTimeout(() => {
        setAnimationIndex(null);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [stars, animate]);

  return (
    <div className="flex gap-1">
      {Array.from({ length: total }).map((_, index) => (
        <Star
          key={index}
          className={`
            w-6 h-6 
            ${index < stars ? 'text-kid-yellow fill-kid-yellow' : 'text-gray-300'} 
            ${animationIndex === index ? 'animate-pop' : ''}
          `}
        />
      ))}
    </div>
  );
};

export default StarReward;
