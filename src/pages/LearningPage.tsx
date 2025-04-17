
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Header from '@/components/Header';
import Flashcard from '@/components/Flashcard';
import ProgressBar from '@/components/ProgressBar';
import StarReward from '@/components/StarReward';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

// Mock data - in a real app, this would come from an API or database
const mockFlashcards = {
  english: [
    { 
      id: 1, 
      question: "What is the past tense of 'run'?", 
      answer: "ran", 
      type: "input" as const 
    },
    { 
      id: 2, 
      question: "Which word is a noun?", 
      answer: "House", 
      options: ["Jump", "House", "Fast", "Quickly"], 
      type: "quiz" as const 
    },
    { 
      id: 3, 
      question: "What is an adjective?", 
      answer: "A word that describes a noun", 
      type: "flip" as const 
    },
  ],
  math: [
    { 
      id: 1, 
      question: "What is 5 + 7?", 
      answer: "12", 
      type: "input" as const 
    },
    { 
      id: 2, 
      question: "Which shape has 4 equal sides?", 
      answer: "Square", 
      options: ["Rectangle", "Triangle", "Square", "Circle"], 
      type: "quiz" as const 
    },
    { 
      id: 3, 
      question: "What is the formula for the area of a rectangle?", 
      answer: "Length × Width", 
      type: "flip" as const 
    },
  ],
  science: [
    { 
      id: 1, 
      question: "Which gas do plants absorb from the atmosphere?", 
      answer: "Carbon Dioxide", 
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], 
      type: "quiz" as const 
    },
    { 
      id: 2, 
      question: "What is the closest planet to the Sun?", 
      answer: "Mercury", 
      type: "input" as const 
    },
    { 
      id: 3, 
      question: "What is photosynthesis?", 
      answer: "The process by which plants make food using sunlight", 
      type: "flip" as const 
    },
  ],
  social: [
    { 
      id: 1, 
      question: "What is the capital of India?", 
      answer: "New Delhi", 
      type: "input" as const 
    },
    { 
      id: 2, 
      question: "Who was the first Prime Minister of India?", 
      answer: "Jawaharlal Nehru", 
      options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel", "B.R. Ambedkar"], 
      type: "quiz" as const 
    },
    { 
      id: 3, 
      question: "What are the major seasons in India?", 
      answer: "Summer, Monsoon, Winter", 
      type: "flip" as const 
    },
  ],
  hindi: [
    { 
      id: 1, 
      question: "'बिल्ली' का बहुवचन क्या है?", 
      answer: "बिल्लियाँ", 
      type: "input" as const 
    },
    { 
      id: 2, 
      question: "निम्न में से कौन सा शब्द पुल्लिंग है?", 
      answer: "घोड़ा", 
      options: ["घोड़ा", "लड़की", "किताब", "कुर्सी"], 
      type: "quiz" as const 
    },
    { 
      id: 3, 
      question: "'दिन' का विलोम शब्द क्या है?", 
      answer: "रात", 
      type: "flip" as const 
    },
  ],
  gk: [
    { 
      id: 1, 
      question: "Which is the largest animal on Earth?", 
      answer: "Blue Whale", 
      type: "input" as const 
    },
    { 
      id: 2, 
      question: "How many continents are there in the world?", 
      answer: "7", 
      options: ["5", "6", "7", "8"], 
      type: "quiz" as const 
    },
    { 
      id: 3, 
      question: "Which is the national bird of India?", 
      answer: "Peacock", 
      type: "flip" as const 
    },
  ]
};

const LearningPage: React.FC = () => {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();
  
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [stars, setStars] = useState(0);
  
  const validSubject = subject as keyof typeof mockFlashcards;
  const cards = mockFlashcards[validSubject] || [];
  
  useEffect(() => {
    if (!validSubject || !mockFlashcards[validSubject]) {
      navigate('/');
      toast({
        title: "Subject not found",
        description: "Please select a valid subject",
        variant: "destructive",
      });
    }
  }, [validSubject, navigate]);

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    } else {
      // Calculate stars based on performance
      const newStars = Math.ceil((correctAnswers / cards.length) * 3);
      setStars(newStars);
      setShowResults(true);
      
      // Update progress in localStorage
      const progressData = localStorage.getItem('subjectProgress') || '{}';
      const progress = JSON.parse(progressData);
      
      // Calculate new progress as percentage of cards mastered
      const newProgress = Math.min(100, (progress[validSubject] || 0) + Math.ceil((correctAnswers / cards.length) * 30));
      
      localStorage.setItem('subjectProgress', JSON.stringify({
        ...progress,
        [validSubject]: newProgress
      }));
    }
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  const handleRetry = () => {
    setCurrentCardIndex(0);
    setCorrectAnswers(0);
    setShowResults(false);
  };

  // Calculate progress percentage through the lesson
  const progressPercentage = ((currentCardIndex + 1) / cards.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="px-6 py-4">
        <button 
          className="flex items-center text-lg font-medium mb-4"
          onClick={handleBackToDashboard}
        >
          <ChevronLeft className="w-5 h-5 mr-1" /> Back
        </button>

        {!showResults ? (
          <>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl font-bold capitalize">{validSubject}</h1>
                <span>{currentCardIndex + 1}/{cards.length}</span>
              </div>
              <ProgressBar progress={progressPercentage} color={
                validSubject === 'english' ? 'bg-kid-blue' :
                validSubject === 'math' ? 'bg-kid-green' :
                validSubject === 'science' ? 'bg-kid-purple' :
                validSubject === 'social' ? 'bg-kid-yellow' :
                validSubject === 'hindi' ? 'bg-kid-orange' :
                'bg-kid-pink'
              } />
            </div>

            {cards.length > 0 && (
              <Flashcard
                question={cards[currentCardIndex].question}
                answer={cards[currentCardIndex].answer}
                options={cards[currentCardIndex].options}
                type={cards[currentCardIndex].type}
                onAnswer={handleAnswer}
                onNext={handleNext}
              />
            )}
          </>
        ) : (
          <div className="bg-white rounded-3xl p-8 shadow-md text-center animate-scale-in">
            <h2 className="text-2xl font-bold mb-4">Lesson Complete!</h2>
            
            <div className="mb-6">
              <p className="text-lg mb-2">You got {correctAnswers} out of {cards.length} correct</p>
              <StarReward stars={stars} animate />
            </div>
            
            <div className="flex flex-col gap-3 mt-8">
              <Button 
                className="kid-button bg-kid-purple"
                onClick={handleBackToDashboard}
              >
                Back to Dashboard
              </Button>
              <Button 
                className="kid-button bg-kid-orange"
                onClick={handleRetry}
              >
                Try Again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningPage;
