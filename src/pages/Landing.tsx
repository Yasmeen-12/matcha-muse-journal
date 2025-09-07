import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Sparkles, Heart, Brain, Leaf } from "lucide-react";
import mascotImage from "@/assets/matcha-mascot.png";

const Landing = () => {
  const navigate = useNavigate();
  
  const quotes = [
    {
      text: "The unexamined life is not worth living.",
      author: "Socrates",
      icon: Brain
    },
    {
      text: "What we plant in the soil of contemplation, we shall reap in the harvest of action.",
      author: "Meister Eckhart", 
      icon: Sparkles
    },
    {
      text: "Knowing yourself is the beginning of all wisdom.",
      author: "Aristotle",
      icon: Heart
    }
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  const handleStartJourney = () => {
    navigate("/chat");
  };

  return (
    <div className="min-h-screen marble-bg flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          {/* Hero Content */}
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-4 gradient-primary bg-clip-text text-transparent">
              Welcome to
            </h1>
            <h2 className="text-4xl lg:text-6xl font-bold text-primary mb-6">
              Matcha Journal
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Your personal space for reflection, growth, and mindful living. 
              Let Sage guide you through your journey of self-discovery.
            </p>
          </div>

          {/* Mascot and Greeting */}
          <div className="flex justify-center my-12">
            <Card className="glass-effect p-8 border-primary/20 max-w-md">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto gradient-primary rounded-full p-2 shadow-lg">
                  <img 
                    src={mascotImage} 
                    alt="Sage - Your journaling companion" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Meet Sage</h3>
                  <p className="text-muted-foreground">
                    Your friendly journaling companion, ready to help you explore your thoughts and feelings.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Rotating Quotes */}
          <Card className="glass-effect p-8 border-primary/20 max-w-2xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-3 mb-6">
                {quotes.map((quote, index) => {
                  const Icon = quote.icon;
                  return (
                    <Icon 
                      key={index}
                      className={`w-8 h-8 cursor-pointer transition-all duration-300 ${
                        index === currentQuote ? 'text-primary scale-125' : 'text-muted-foreground hover:text-primary/70'
                      }`}
                      onClick={() => setCurrentQuote(index)}
                    />
                  );
                })}
              </div>
              <blockquote className="text-xl lg:text-2xl italic text-foreground leading-relaxed text-center">
                "{quotes[currentQuote].text}"
              </blockquote>
              <cite className="text-lg text-primary font-medium text-center block">
                — {quotes[currentQuote].author}
              </cite>
            </div>
          </Card>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Button 
              onClick={handleStartJourney}
              size="lg" 
              className="text-xl px-12 py-8 gradient-primary hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Start Your Journey
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-xl px-12 py-8 glass-effect border-primary/30 hover:bg-primary/10 transition-all duration-300"
              onClick={() => navigate("/dashboard")}
            >
              <Leaf className="w-6 h-6 mr-3" />
              Explore Features
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;