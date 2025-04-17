
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Book, Sparkles } from 'lucide-react';
import AgeSelector from '@/components/AgeSelector';
import FloatingSymbols from '@/components/FloatingSymbols';

const Index = () => {
  const navigate = useNavigate();
  const [showAgeSelector, setShowAgeSelector] = useState(false);
  const [userData, setUserData] = useState<{
    name: string;
    age: number | null;
    classLevel: number | null;
  }>({
    name: '',
    age: null,
    classLevel: null
  });

  useEffect(() => {
    // Check if user data exists
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);
      
      // If we have complete user data, don't automatically navigate to dashboard
      // This allows users to reset their information or switch profiles if desired
    }
  }, []);

  const handleStartLearning = () => {
    if (userData.name && userData.classLevel !== null) {
      navigate('/dashboard');
    } else {
      // If no user data, show the age selector
      setShowAgeSelector(true);
    }
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const nameInput = form.elements.namedItem('name') as HTMLInputElement;
    
    const name = nameInput.value.trim();
    if (name) {
      const updatedUserData = { ...userData, name };
      setUserData(updatedUserData);
      localStorage.setItem('userData', JSON.stringify(updatedUserData));
      
      // If we have all the necessary data, navigate to dashboard
      if (updatedUserData.classLevel !== null) {
        navigate('/dashboard');
      } else {
        setShowAgeSelector(true);
      }
    }
  };

  const handleAgeSelect = (age: number) => {
    const updatedUserData = { ...userData, age };
    setUserData(updatedUserData);
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
  };

  const handleClassSelect = (classLevel: number) => {
    const updatedUserData = { ...userData, classLevel };
    setUserData(updatedUserData);
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
  };

  const handleAgeSelectorClose = () => {
    setShowAgeSelector(false);
    
    // If we have all the necessary data, navigate to dashboard
    if (userData.name && userData.classLevel !== null) {
      navigate('/dashboard');
    }
  };

  const handleResetProfile = () => {
    localStorage.removeItem('userData');
    setUserData({
      name: '',
      age: null,
      classLevel: null
    });
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-gradient-to-br from-soft-purple via-soft-blue to-soft-peach px-6 py-12 overflow-hidden">
      <FloatingSymbols />
      
      <div className="flex flex-col items-center text-center mb-12 relative z-10">
        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-lg flex items-center justify-center mb-6 border border-white/30">
          <Book className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-center text-white">
          Learn, Sparkle, Grow
        </h1>
        <p className="text-lg mb-8 max-w-md text-white/90">
          A fun learning platform for young minds to explore academic subjects through interactive flashcards
        </p>
      </div>
      
      {!userData.name ? (
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg border border-white/30 p-8 animate-scale-in relative z-10">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Welcome!</h2>
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-lg font-medium mb-2 text-white/90">
                What's your name?
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full rounded-xl border-2 border-white/30 bg-white/10 backdrop-blur-sm py-3 px-4 text-white placeholder-white/50 focus:border-white outline-none"
                placeholder="Enter your name"
                required
              />
            </div>
            <Button 
              type="submit"
              className="kid-button bg-white/20 hover:bg-white/30 backdrop-blur-lg w-full text-white border border-white/30"
            >
              Continue
            </Button>
          </form>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl shadow-lg border border-white/30 p-8 animate-scale-in relative z-10">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Welcome back, {userData.name}!
          </h2>
          <p className="text-lg text-center mb-8 text-white/90">
            Ready to continue your learning adventure?
          </p>
          <div className="space-y-4">
            <Button 
              className="kid-button bg-white/20 hover:bg-white/30 backdrop-blur-lg w-full text-white border border-white/30 flex items-center justify-center gap-2"
              onClick={handleStartLearning}
            >
              Continue Learning <Sparkles className="w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline"
              className="w-full bg-white/10 hover:bg-white/20 text-white border-white/30"
              onClick={handleResetProfile}
            >
              Reset Profile
            </Button>
          </div>
        </div>
      )}
      
      {showAgeSelector && (
        <AgeSelector 
          onSelect={handleAgeSelect}
          onClassSelect={handleClassSelect}
          onClose={handleAgeSelectorClose}
        />
      )}
    </div>
  );
};

export default Index;
