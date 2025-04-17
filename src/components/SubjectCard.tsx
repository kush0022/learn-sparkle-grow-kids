
import React from 'react';
import { Book, Calculator, Beaker, Globe, Languages, Award } from 'lucide-react';

type SubjectCardProps = {
  subject: 'english' | 'math' | 'science' | 'social' | 'hindi' | 'gk';
  onClick: () => void;
};

const subjectColors = {
  english: 'bg-soft-blue border-kid-blue',
  math: 'bg-soft-green border-kid-green',
  science: 'bg-soft-purple border-kid-purple',
  social: 'bg-soft-yellow border-kid-yellow',
  hindi: 'bg-soft-orange border-kid-orange',
  gk: 'bg-soft-peach border-kid-pink',
};

const subjectIcons = {
  english: <Book className="w-12 h-12 text-kid-blue" />,
  math: <Calculator className="w-12 h-12 text-kid-green" />,
  science: <Beaker className="w-12 h-12 text-kid-purple" />,
  social: <Globe className="w-12 h-12 text-kid-yellow" />,
  hindi: <Languages className="w-12 h-12 text-kid-orange" />,
  gk: <Award className="w-12 h-12 text-kid-pink" />,
};

const subjectNames = {
  english: 'English',
  math: 'Math',
  science: 'Science',
  social: 'Social Science',
  hindi: 'Hindi',
  gk: 'General Knowledge',
};

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onClick }) => {
  return (
    <div 
      className={`subject-card ${subjectColors[subject]} border-2`}
      onClick={onClick}
    >
      <div className="animate-bounce-slight">
        {subjectIcons[subject]}
      </div>
      <h3 className="text-lg font-bold mt-2">{subjectNames[subject]}</h3>
    </div>
  );
};

export default SubjectCard;
