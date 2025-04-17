
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

type AgeSelectorProps = {
  onSelect: (age: number) => void;
  onClassSelect: (classLevel: number) => void;
  onClose: () => void;
};

const AgeSelector: React.FC<AgeSelectorProps> = ({ onSelect, onClassSelect, onClose }) => {
  const ages = Array.from({ length: 13 }, (_, i) => i + 3); // Ages 3-15
  const classes = Array.from({ length: 11 }, (_, i) => i); // Nursery (0) to Class 10
  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);

  const handleAgeSelect = (age: number) => {
    setSelectedAge(age);
    onSelect(age);
  };

  const handleClassSelect = (classLevel: number) => {
    setSelectedClass(classLevel);
    onClassSelect(classLevel);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 max-w-md w-full animate-scale-in border border-white/20 shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">Tell us about yourself</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-4">How old are you?</h3>
          <div className="grid grid-cols-4 gap-3">
            {ages.map(age => (
              <Button
                key={age}
                className={`rounded-xl h-12 ${
                  selectedAge === age 
                    ? 'bg-kid-blue text-white'
                    : 'bg-soft-blue hover:bg-kid-blue'
                }`}
                onClick={() => handleAgeSelect(age)}
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
                className={`rounded-xl h-12 ${
                  selectedClass === classLevel 
                    ? 'bg-kid-purple text-white'
                    : 'bg-soft-purple hover:bg-kid-purple'
                }`}
                onClick={() => handleClassSelect(classLevel)}
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
            disabled={selectedAge === null || selectedClass === null}
          >
            Let's Learn!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgeSelector;
