
import React from 'react';
import { Menu, Bell, User } from 'lucide-react';
import StreakCounter from './StreakCounter';

type HeaderProps = {
  username?: string;
  streak?: number;
  onMenuClick?: () => void;
  onProfileClick?: () => void;
};

const Header: React.FC<HeaderProps> = ({ 
  username, 
  streak = 0, 
  onMenuClick, 
  onProfileClick 
}) => {
  return (
    <header className="flex items-center justify-between px-6 py-4">
      <button 
        className="rounded-full p-2 hover:bg-soft-gray"
        onClick={onMenuClick}
      >
        <Menu className="w-6 h-6" />
      </button>
      
      <div className="flex items-center gap-3">
        {streak > 0 && <StreakCounter streak={streak} />}
        
        <button className="rounded-full p-2 hover:bg-soft-gray">
          <Bell className="w-6 h-6" />
        </button>
        
        <button 
          className="rounded-full p-2 hover:bg-soft-gray"
          onClick={onProfileClick}
        >
          {username ? (
            <div className="w-8 h-8 rounded-full bg-kid-purple text-white flex items-center justify-center font-bold">
              {username[0].toUpperCase()}
            </div>
          ) : (
            <User className="w-6 h-6" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
