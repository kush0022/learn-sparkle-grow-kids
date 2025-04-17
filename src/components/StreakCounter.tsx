
import React from 'react';
import { Flame } from 'lucide-react';

type StreakCounterProps = {
  streak: number;
};

const StreakCounter: React.FC<StreakCounterProps> = ({ streak }) => {
  return (
    <div className="flex items-center gap-1 bg-soft-orange px-3 py-1 rounded-full">
      <Flame className="w-5 h-5 text-kid-orange" />
      <span className="font-bold">{streak}</span>
    </div>
  );
};

export default StreakCounter;
