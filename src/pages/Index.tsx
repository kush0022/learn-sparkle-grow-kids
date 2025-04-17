
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Book, Sparkles } from 'lucide-react';
import AgeSelector from '@/components/AgeSelector';

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-soft-purple to-soft-blue px-6 py-12">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="w-20 h-20 rounded-full bg-kid-purple flex items-center justify-center mb-6">
          <Book className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4 text-center">Learn, Sparkle, Grow</h1>
        <p className="text-lg mb-8 max-w-md">
          A fun learning platform for young minds to explore academic subjects through interactive flashcards
        </p>
      </div>
      
      {!userData.name ? (
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 animate-scale-in">
          <h2 className="text-2xl font-bold mb-6 text-center">Welcome!</h2>
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-lg font-medium mb-2">
                What's your name?
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full rounded-xl border-2 border-soft-purple py-3 px-4 focus:border-kid-purple outline-none"
                placeholder="Enter your name"
                required
              />
            </div>
            <Button 
              type="submit"
              className="kid-button bg-kid-purple w-full"
            >
              Continue
            </Button>
          </form>
        </div>
      ) : (
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 animate-scale-in">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Welcome back, {userData.name}!
          </h2>
          <p className="text-lg text-center mb-8">
            Ready to continue your learning adventure?
          </p>
          <div className="space-y-4">
            <Button 
              className="kid-button bg-kid-purple w-full flex items-center justify-center gap-2"
              onClick={handleStartLearning}
            >
              Continue Learning <Sparkles className="w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline"
              className="w-full"
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
