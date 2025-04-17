
import React from 'react';
import { Button } from '@/components/ui/button';

type AgeSelectorProps = {
  onSelect: (age: number) => void;
  onClassSelect: (classLevel: number) => void;
  onClose: () => void;
};

const AgeSelector: React.FC<AgeSelectorProps> = ({ onSelect, onClassSelect, onClose }) => {
  const ages = Array.from({ length: 13 }, (_, i) => i + 3); // Ages 3-15
  const classes = Array.from({ length: 11 }, (_, i) => i); // Nursery (0) to Class 10

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full animate-scale-in">
        <h2 className="text-2xl font-bold text-center mb-6">Tell us about yourself</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">How old are you?</h3>
          <div className="grid grid-cols-4 gap-3">
            {ages.map(age => (
              <Button
                key={age}
                className="bg-soft-blue hover:bg-kid-blue rounded-xl h-12"
                onClick={() => onSelect(age)}
              >
                {age}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">Which class are you in?</h3>
          <div className="grid grid-cols-4 gap-3">
            {classes.map(classLevel => (
              <Button
                key={classLevel}
                className="bg-soft-purple hover:bg-kid-purple rounded-xl h-12"
                onClick={() => onClassSelect(classLevel)}
              >
                {classLevel === 0 ? 'Nursery' : `Class ${classLevel}`}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-4">
          <Button 
            className="bg-kid-green hover:bg-green-600 rounded-full py-6 px-8 text-lg"
            onClick={onClose}
          >
            Let's Learn!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgeSelector;
