
import React from 'react';
import { 
  BookText, // English
  Calculator, // Math
  Beaker, // Science (replacing Flask)
  Globe2, // Social Science
  Languages, // Hindi
  GraduationCap, // GK
} from 'lucide-react';

type SubjectCardProps = {
  subject: 'english' | 'math' | 'science' | 'social' | 'hindi' | 'gk';
  onClick: () => void;
};

const subjectConfigs = {
  english: {
    icon: <BookText className="w-12 h-12 text-kid-blue" />,
    name: 'English',
    color: 'bg-soft-blue border-kid-blue',
    image: '/subjects/english.png'
  },
  math: {
    icon: <Calculator className="w-12 h-12 text-kid-green" />,
    name: 'Math',
    color: 'bg-soft-green border-kid-green',
    image: '/subjects/math.png'
  },
  science: {
    icon: <Beaker className="w-12 h-12 text-kid-purple" />,
    name: 'Science',
    color: 'bg-soft-purple border-kid-purple',
    image: '/subjects/science.png'
  },
  social: {
    icon: <Globe2 className="w-12 h-12 text-kid-yellow" />,
    name: 'Social Science',
    color: 'bg-soft-yellow border-kid-yellow',
    image: '/subjects/social.png'
  },
  hindi: {
    icon: <Languages className="w-12 h-12 text-kid-orange" />,
    name: 'Hindi',
    color: 'bg-soft-orange border-kid-orange',
    image: '/subjects/hindi.png'
  },
  gk: {
    icon: <GraduationCap className="w-12 h-12 text-kid-pink" />,
    name: 'General Knowledge',
    color: 'bg-soft-peach border-kid-pink',
    image: '/subjects/gk.png'
  },
};

const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onClick }) => {
  const config = subjectConfigs[subject];
  
  return (
    <div 
      className={`subject-card ${config.color} border-2 hover:shadow-lg transition-all duration-300`}
      onClick={onClick}
    >
      <div className="relative w-16 h-16 mb-2">
        <div className="absolute inset-0 flex items-center justify-center animate-bounce-slight">
          {config.icon}
        </div>
        {config.image && (
          <img
            src={config.image}
            alt={config.name}
            className="absolute inset-0 w-full h-full object-contain opacity-20"
          />
        )}
      </div>
      <h3 className="text-lg font-bold mt-2">{config.name}</h3>
    </div>
  );
};

export default SubjectCard;
