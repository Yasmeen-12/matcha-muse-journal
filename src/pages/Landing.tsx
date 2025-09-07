import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle, Sparkles, Heart, Brain } from "lucide-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Sphere } from "@react-three/drei";
import { Suspense } from "react";

const FloatingChatbot = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <group>
      <Sphere
        args={[1, 32, 32]}
        position={[0, 0, 0]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        <meshStandardMaterial color={hovered ? "#4ade80" : "#22c55e"} />
      </Sphere>
      
      {/* Eyes */}
      <Sphere args={[0.15, 16, 16]} position={[-0.3, 0.2, 0.8]}>
        <meshStandardMaterial color="#1f2937" />
      </Sphere>
      <Sphere args={[0.15, 16, 16]} position={[0.3, 0.2, 0.8]}>
        <meshStandardMaterial color="#1f2937" />
      </Sphere>
      
      {/* Mouth */}
      <Sphere args={[0.1, 16, 16]} position={[0, -0.2, 0.8]} scale={[1.5, 0.8, 1]}>
        <meshStandardMaterial color="#1f2937" />
      </Sphere>
      
      <Text
        position={[0, -2, 0]}
        fontSize={0.3}
        color="#4ade80"
        anchorX="center"
        anchorY="middle"
      >
        Hi! I'm Sage
      </Text>
    </group>
  );
};

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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-4 gradient-primary bg-clip-text text-transparent">
                Welcome to
              </h1>
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
                Matcha Journal
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Your personal space for reflection, growth, and mindful living. 
                Let Sage guide you through your journey of self-discovery.
              </p>
            </div>

            {/* Rotating Quotes */}
            <Card className="glass-effect p-8 border-primary/20">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  {quotes.map((quote, index) => {
                    const Icon = quote.icon;
                    return (
                      <Icon 
                        key={index}
                        className={`w-6 h-6 cursor-pointer transition-all duration-300 ${
                          index === currentQuote ? 'text-primary scale-125' : 'text-muted-foreground hover:text-primary/70'
                        }`}
                        onClick={() => setCurrentQuote(index)}
                      />
                    );
                  })}
                </div>
                <blockquote className="text-lg italic text-foreground leading-relaxed">
                  "{quotes[currentQuote].text}"
                </blockquote>
                <cite className="text-sm text-primary font-medium">
                  — {quotes[currentQuote].author}
                </cite>
              </div>
            </Card>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={handleStartJourney}
                size="lg" 
                className="text-lg px-8 py-6 gradient-primary hover:scale-105 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Your Journey
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-6 glass-effect border-primary/30 hover:bg-primary/10"
                onClick={() => navigate("/dashboard")}
              >
                Explore Features
              </Button>
            </div>
          </div>

          {/* Right Column - 3D Chatbot */}
          <div className="h-[500px] w-full">
            <Card className="h-full glass-effect border-primary/20 overflow-hidden">
              <Suspense fallback={
                <div className="h-full flex items-center justify-center">
                  <div className="animate-pulse text-muted-foreground">Loading Sage...</div>
                </div>
              }>
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <pointLight position={[-10, -10, -5]} color="#4ade80" intensity={0.5} />
                  <FloatingChatbot />
                  <OrbitControls 
                    enableZoom={true} 
                    enablePan={false} 
                    enableRotate={true}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                  />
                </Canvas>
              </Suspense>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;