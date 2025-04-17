
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X, ChevronRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

type FlashcardProps = {
  question: string;
  answer: string;
  options?: string[];
  image?: string;
  type: 'flip' | 'quiz' | 'input';
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
};

const Flashcard: React.FC<FlashcardProps> = ({
  question,
  answer,
  options = [],
  image,
  type,
  onAnswer,
  onNext
}) => {
  const [flipped, setFlipped] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [userInput, setUserInput] = useState('');

  const handleFlip = () => {
    if (type === 'flip') {
      setFlipped(!flipped);
    }
  };

  const handleOptionSelect = (option: string) => {
    if (answered) return;
    setSelectedOption(option);
    const isCorrect = option === answer;
    setAnswered(true);
    onAnswer(isCorrect);
    
    if (isCorrect) {
      toast({
        title: "Correct!",
        description: "Great job! 🎉",
        variant: "default",
      });
    } else {
      toast({
        title: "Not quite right",
        description: `The correct answer is: ${answer}`,
        variant: "destructive",
      });
    }
  };

  const handleInputSubmit = () => {
    if (answered) return;
    const isCorrect = userInput.toLowerCase().trim() === answer.toLowerCase().trim();
    setAnswered(true);
    onAnswer(isCorrect);
    
    if (isCorrect) {
      toast({
        title: "Correct!",
        description: "Great job! 🎉",
        variant: "default",
      });
    } else {
      toast({
        title: "Not quite right",
        description: `The correct answer is: ${answer}`,
        variant: "destructive",
      });
    }
  };

  const handleNext = () => {
    setFlipped(false);
    setSelectedOption(null);
    setAnswered(false);
    setUserInput('');
    onNext();
  };

  return (
    <div className={`flashcard ${flipped ? 'rotate-y-180' : ''}`}>
      <div className={`w-full ${answered ? 'opacity-50' : ''}`}>
        {image && (
          <div className="mb-4 w-full max-h-48 overflow-hidden rounded-xl">
            <img src={image} alt={question} className="w-full h-full object-cover" />
          </div>
        )}
        
        <h3 className="text-xl font-bold text-center mb-4">{question}</h3>
        
        {type === 'flip' && (
          <Button 
            className="kid-button bg-kid-blue w-full"
            onClick={handleFlip}
          >
            {flipped ? 'Hide Answer' : 'Show Answer'}
          </Button>
        )}
        
        {type === 'quiz' && options.length > 0 && (
          <div className="grid grid-cols-1 gap-3 w-full">
            {options.map((option, index) => (
              <Button
                key={index}
                className={`rounded-xl py-4 ${
                  selectedOption === option 
                    ? option === answer 
                      ? 'bg-kid-green' 
                      : 'bg-kid-red' 
                    : answered && option === answer 
                    ? 'bg-kid-green' 
                    : 'bg-soft-blue hover:bg-kid-blue'
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
                {answered && option === answer && <Check className="ml-2" />}
                {answered && selectedOption === option && option !== answer && <X className="ml-2" />}
              </Button>
            ))}
          </div>
        )}
        
        {type === 'input' && (
          <div className="w-full">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your answer..."
              disabled={answered}
              className="w-full rounded-xl border-2 border-soft-blue py-3 px-4 mb-3 focus:border-kid-blue outline-none"
            />
            <Button 
              className="kid-button bg-kid-blue w-full"
              onClick={handleInputSubmit}
              disabled={answered}
            >
              Check Answer
            </Button>
            {answered && (
              <div className={`mt-3 text-center font-bold ${userInput.toLowerCase().trim() === answer.toLowerCase().trim() ? 'text-kid-green' : 'text-kid-red'}`}>
                {userInput.toLowerCase().trim() === answer.toLowerCase().trim() 
                  ? 'Correct! 🎉' 
                  : `The correct answer is: ${answer}`}
              </div>
            )}
          </div>
        )}
        
        {flipped && (
          <div className="mt-4 p-4 bg-soft-green rounded-xl animate-scale-in">
            <p className="text-center font-bold">{answer}</p>
          </div>
        )}
      </div>
      
      {answered && (
        <Button 
          className="kid-button bg-kid-green mt-4"
          onClick={handleNext}
        >
          Next <ChevronRight className="ml-1" />
        </Button>
      )}
    </div>
  );
};

export default Flashcard;
