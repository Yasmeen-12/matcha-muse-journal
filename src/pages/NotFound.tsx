import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen marble-bg flex items-center justify-center px-4">
      <Card className="marble-card p-8 text-center max-w-md mx-auto">
        <div className="text-6xl font-bold text-primary mb-4">404</div>
        <h1 className="text-2xl font-bold text-foreground mb-4">Page Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The page you're looking for doesn't exist. Let's get you back to your journaling journey.
        </p>
        <Button 
          asChild 
          className="gradient-primary text-primary-foreground hover:opacity-90"
        >
          <a href="/">Return to MatchaJournal</a>
        </Button>
      </Card>
    </div>
  );
};

export default NotFound;
