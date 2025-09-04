import { Github, Mail, Shield, Book, Heart, Leaf } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import mascotImage from "@/assets/matcha-mascot.png";

const Info = () => {
  const features = [
    {
      title: "AI-Powered Conversations",
      description: "Chat naturally with your journal using advanced AI that understands context and emotions.",
      icon: "🤖",
    },
    {
      title: "Task Management",
      description: "Organize your daily tasks and boost productivity with integrated planning tools.",
      icon: "✅",
    },
    {
      title: "Pomodoro Timer",
      description: "Stay focused with built-in Pomodoro technique timer for better time management.",
      icon: "⏰",
    },
    {
      title: "Analytics & Insights",
      description: "Track your mood, habits, and life balance with beautiful, intuitive charts.",
      icon: "📊",
    },
    {
      title: "Privacy First",
      description: "Your thoughts and data are encrypted and stored securely with complete privacy.",
      icon: "🔒",
    },
    {
      title: "Mindful Design",
      description: "Calming matcha-inspired design promotes mindfulness and reduces digital stress.",
      icon: "🧘",
    },
  ];

  const demoSteps = [
    {
      step: 1,
      title: "Start Chatting",
      description: "Click on the Chat tab and start a conversation with your AI journal companion. Share your thoughts, feelings, or daily experiences.",
    },
    {
      step: 2,
      title: "Manage Tasks",
      description: "Use the Dashboard to add daily tasks and try the Pomodoro timer for focused work sessions.",
    },
    {
      step: 3,
      title: "Review Insights",
      description: "Check the Summary tab to see your mood trends, life balance, and journaling streaks.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">About MatchaJournal</h1>
        <p className="text-muted-foreground">
          Your mindful AI-powered journaling companion for personal growth and self-reflection.
        </p>
      </div>

      {/* Hero Section */}
      <Card className="marble-card p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-primary p-2 shadow-marble">
            <img 
              src={mascotImage} 
              alt="Matcha mascot" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Welcome to Your Digital Mindfulness Space
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          MatchaJournal combines the tranquility of traditional journaling with the power of AI to create 
          a personalized space for reflection, growth, and mindful productivity.
        </p>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="marble-card p-6 hover:shadow-glow transition-smooth">
            <div className="text-3xl mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </Card>
        ))}
      </div>

      {/* Demo Section */}
      <Card className="marble-card p-8">
        <div className="flex items-center mb-6">
          <Book className="text-primary mr-3" size={24} />
          <h2 className="text-2xl font-bold text-foreground">How to Get Started</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demoSteps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 rounded-full gradient-primary text-primary-foreground flex items-center justify-center text-lg font-bold mx-auto mb-4">
                {step.step}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Privacy & Developer Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Privacy Card */}
        <Card className="marble-card p-6">
          <div className="flex items-center mb-4">
            <Shield className="text-green-500 mr-3" size={24} />
            <h3 className="text-xl font-semibold text-foreground">Privacy & Security</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-sm text-foreground font-medium">End-to-End Encryption</p>
                <p className="text-xs text-muted-foreground">All your journal entries are encrypted before storage</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-sm text-foreground font-medium">No Data Sharing</p>
                <p className="text-xs text-muted-foreground">Your personal data is never shared with third parties</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-sm text-foreground font-medium">Local Storage Priority</p>
                <p className="text-xs text-muted-foreground">Data is stored locally when possible for maximum privacy</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Developer Info Card */}
        <Card className="marble-card p-6">
          <div className="flex items-center mb-4">
            <Heart className="text-red-500 mr-3" size={24} />
            <h3 className="text-xl font-semibold text-foreground">Made with Care</h3>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              MatchaJournal was created with love for mindfulness and personal growth. 
              Built using modern web technologies for a smooth, accessible experience.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Tailwind CSS</Badge>
              <Badge variant="secondary">AI Integration</Badge>
            </div>
            
            <div className="flex space-x-3">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Github size={16} />
                <span>GitHub</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Mail size={16} />
                <span>Contact</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <Card className="marble-card p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <Leaf className="text-green-500 mr-2" size={20} />
          <p className="text-sm text-muted-foreground">
            Thank you for choosing MatchaJournal for your mindfulness journey
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          Version 1.0.0 • Built with mindfulness in mind
        </p>
      </Card>
    </div>
  );
};

export default Info;