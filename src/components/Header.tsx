
import React from 'react';
import { Menu, Bell, User, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = React.useState<number>(0);

  // Check for daily notification on component mount
  React.useEffect(() => {
    const lastNotificationDate = localStorage.getItem('lastNotificationDate');
    const today = new Date().toDateString();
    
    if (lastNotificationDate !== today) {
      setNotificationCount(prev => prev + 1);
      localStorage.setItem('lastNotificationDate', today);
    }
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-4 backdrop-blur-sm bg-white/30">
      <div className="flex items-center gap-4">
        <button 
          className="rounded-full p-2 hover:bg-soft-gray"
          onClick={() => navigate('/')}
          aria-label="Go to home"
        >
          <Home className="w-6 h-6 text-kid-blue" />
        </button>
        
        <button 
          className="rounded-full p-2 hover:bg-soft-gray"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      
      <div className="flex items-center gap-3">
        {streak > 0 && <StreakCounter streak={streak} />}
        
        <button className="rounded-full p-2 hover:bg-soft-gray relative">
          <Bell className="w-6 h-6" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-kid-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
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
