
import React from 'react';

type ProgressBarProps = {
  progress: number; // 0 to 100
  color?: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  color = 'bg-kid-purple' 
}) => {
  return (
    <div className="progress-bar">
      <div 
        className={`progress-fill ${color}`} 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
