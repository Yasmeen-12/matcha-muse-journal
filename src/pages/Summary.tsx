import { BarChart3, Droplets, Home, Briefcase, Heart, Brain, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Summary = () => {
  // Mock data for demonstration
  const waterIntake = {
    today: 6,
    goal: 8,
    lastWeek: [5, 7, 6, 8, 4, 6, 7],
  };

  const lifeAspects = [
    { category: "Work", percentage: 35, icon: Briefcase, color: "bg-blue-500" },
    { category: "Home", percentage: 28, icon: Home, color: "bg-green-500" },
    { category: "Health", percentage: 20, icon: Heart, color: "bg-red-500" },
    { category: "Personal Growth", percentage: 17, icon: Brain, color: "bg-purple-500" },
  ];

  const moodLevels = {
    current: 7.2,
    trend: "up",
    weekAverage: 6.8,
    monthAverage: 6.5,
    recentMoods: [
      { date: "Today", mood: 7.2, color: "bg-green-400" },
      { date: "Yesterday", mood: 6.8, color: "bg-green-400" },
      { date: "2 days ago", mood: 8.1, color: "bg-green-500" },
      { date: "3 days ago", mood: 5.9, color: "bg-yellow-400" },
      { date: "4 days ago", mood: 7.5, color: "bg-green-400" },
    ],
  };

  const getMoodColor = (mood: number) => {
    if (mood >= 8) return "bg-green-500";
    if (mood >= 7) return "bg-green-400";
    if (mood >= 6) return "bg-yellow-400";
    if (mood >= 5) return "bg-orange-400";
    return "bg-red-400";
  };

  return (
    <div className="min-h-screen marble-bg p-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold gradient-primary bg-clip-text text-transparent mb-4">
            Your Journey Summary
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Beautiful insights into your daily patterns, mood trends, and life balance
          </p>
        </div>

        {/* Creative Masonry Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 auto-rows-max">
          
          {/* Mood Levels - Large Featured Card */}
          <div className="lg:col-span-2 lg:row-span-2">
            <Card className="glass-effect h-full p-8 border-primary/20 hover:border-primary/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground">Mood Journey</h3>
                <div className="flex items-center space-x-2 px-3 py-1 gradient-primary rounded-full">
                  <TrendingUp className="text-white" size={16} />
                  <span className="text-sm text-white font-medium">+{(moodLevels.current - moodLevels.weekAverage).toFixed(1)}</span>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold gradient-primary bg-clip-text text-transparent mb-2">
                    {moodLevels.current}
                  </div>
                  <div className="text-muted-foreground">out of 10</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 glass-effect rounded-lg">
                    <div className="text-2xl font-bold text-foreground">{moodLevels.weekAverage}</div>
                    <div className="text-sm text-muted-foreground">Week Average</div>
                  </div>
                  <div className="text-center p-4 glass-effect rounded-lg">
                    <div className="text-2xl font-bold text-foreground">{moodLevels.monthAverage}</div>
                    <div className="text-sm text-muted-foreground">Month Average</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {moodLevels.recentMoods.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-3 glass-effect rounded-lg">
                      <span className="text-sm text-muted-foreground">{entry.date}</span>
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${getMoodColor(entry.mood)} shadow-lg`}></div>
                        <span className="text-lg font-semibold text-foreground">{entry.mood}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Water Intake - Circular Design */}
          <Card className="glass-effect p-6 border-primary/20 hover:scale-105 transition-all duration-300">
            <div className="text-center">
              <Droplets className="text-primary mx-auto mb-4" size={32} />
              <h3 className="text-lg font-semibold text-foreground mb-4">Hydration</h3>
              
              <div className="relative w-24 h-24 mx-auto mb-4">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-muted/20"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - (waterIntake.today / waterIntake.goal))}`}
                    className="text-primary transition-all duration-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-foreground">{waterIntake.today}</span>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                / {waterIntake.goal} glasses
              </div>
              
              <div className="flex justify-between mt-4 text-xs">
                {waterIntake.lastWeek.map((glasses, index) => (
                  <div key={index} className="flex flex-col items-center space-y-1">
                    <div className="text-muted-foreground">
                      {["M", "T", "W", "T", "F", "S", "S"][index]}
                    </div>
                    <div className={`w-2 h-6 rounded-full ${getMoodColor(glasses)} opacity-70`}></div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Journal Streak - Minimalist */}
          <Card className="glass-effect p-6 border-primary/20 hover:border-primary/40 transition-all duration-300">
            <div className="text-center">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">🔥</span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Journal Streak</h3>
              <div className="text-3xl font-bold text-primary mb-1">12</div>
              <div className="text-sm text-muted-foreground mb-4">days</div>
              <div className="text-xs text-muted-foreground">
                Best: <span className="text-foreground font-medium">28 days</span>
              </div>
            </div>
          </Card>

          {/* Life Balance - Hexagon Layout */}
          <div className="lg:col-span-2">
            <Card className="glass-effect p-6 border-primary/20 hover:border-primary/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">Life Balance</h3>
                <BarChart3 className="text-primary" size={24} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {lifeAspects.map((aspect, index) => {
                  const Icon = aspect.icon;
                  return (
                    <div key={index} className="relative p-4 glass-effect rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <Icon className="text-primary" size={20} />
                        <Badge variant="secondary" className="text-xs gradient-primary text-white border-0">
                          {aspect.percentage}%
                        </Badge>
                      </div>
                      <div className="text-sm font-medium text-foreground mb-2">{aspect.category}</div>
                      <Progress value={aspect.percentage} className="h-2" />
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 p-4 gradient-subtle rounded-xl">
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
                  <Brain className="w-4 h-4 mr-2 text-primary" />
                  This Week's Focus
                </h4>
                <p className="text-xs text-muted-foreground">
                  You've been spending balanced time across different life areas. Consider dedicating more time to personal growth activities.
                </p>
              </div>
            </Card>
          </div>

          {/* Weekly Insights - Stats Grid */}
          <Card className="glass-effect p-6 border-primary/20 hover:scale-105 transition-all duration-300">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary" />
              Weekly Stats
            </h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">18</div>
                <div className="text-xs text-muted-foreground">Entries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">2,847</div>
                <div className="text-xs text-muted-foreground">Words</div>
              </div>
              <div className="text-center p-2 gradient-subtle rounded-lg">
                <div className="text-sm font-medium text-foreground">Evening</div>
                <div className="text-xs text-muted-foreground">Most Active</div>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default Summary;