
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-purple px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 text-center">
        <h1 className="text-6xl font-bold mb-6 text-kid-purple">404</h1>
        <p className="text-xl mb-8">Oops! This page has gone on an adventure!</p>
        <Button 
          className="kid-button bg-kid-purple flex items-center justify-center gap-2"
          onClick={() => navigate('/')}
        >
          <Home className="w-5 h-5" /> Go Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
