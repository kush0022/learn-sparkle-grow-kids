
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import SubjectCard from '@/components/SubjectCard';
import ProgressBar from '@/components/ProgressBar';
import { Button } from '@/components/ui/button';

type Subject = 'english' | 'math' | 'science' | 'social' | 'hindi' | 'gk';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [classLevel, setClassLevel] = useState<number | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [subjectProgress, setSubjectProgress] = useState<Record<Subject, number>>({
    english: 0,
    math: 0,
    science: 0,
    social: 0,
    hindi: 0,
    gk: 0
  });

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      setName(parsedData.name || '');
      setClassLevel(parsedData.classLevel || null);
    }

    // Load streak data
    const streakData = localStorage.getItem('streak');
    if (streakData) {
      setStreak(JSON.parse(streakData));
    }

    // Load progress data
    const progressData = localStorage.getItem('subjectProgress');
    if (progressData) {
      setSubjectProgress(JSON.parse(progressData));
    }
  }, []);

  const handleSubjectClick = (subject: Subject) => {
    navigate(`/learn/${subject}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        username={name} 
        streak={streak} 
      />

      <main className="px-6 py-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {name ? `Hi, ${name}!` : 'Welcome!'}
          </h1>
          <p className="text-xl">
            {classLevel !== null 
              ? `Class ${classLevel === 0 ? 'Nursery' : classLevel} • `
              : ''}
            What do you want to learn today?
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {(Object.keys(subjectProgress) as Subject[]).map(subject => (
            <SubjectCard 
              key={subject} 
              subject={subject} 
              onClick={() => handleSubjectClick(subject)} 
            />
          ))}
        </div>

        {Object.values(subjectProgress).some(progress => progress > 0) && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
            
            <div className="space-y-4">
              {(Object.keys(subjectProgress) as Subject[]).filter(subj => subjectProgress[subj] > 0).map(subject => (
                <div key={subject} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold capitalize">{subject}</h3>
                    <span>{subjectProgress[subject]}%</span>
                  </div>
                  <ProgressBar 
                    progress={subjectProgress[subject]} 
                    color={
                      subject === 'english' ? 'bg-kid-blue' :
                      subject === 'math' ? 'bg-kid-green' :
                      subject === 'science' ? 'bg-kid-purple' :
                      subject === 'social' ? 'bg-kid-yellow' :
                      subject === 'hindi' ? 'bg-kid-orange' :
                      'bg-kid-pink'
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <Button 
            className="kid-button bg-kid-purple"
            onClick={() => navigate('/practice')}
          >
            Daily Challenge
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
