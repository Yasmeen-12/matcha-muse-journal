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
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Summary</h1>
        <p className="text-muted-foreground">
          Get insights into your daily patterns, mood trends, and life balance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Water Intake Card */}
        <Card className="marble-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Water Intake</h3>
            <Droplets className="text-blue-500" size={24} />
          </div>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">{waterIntake.today}</div>
              <div className="text-sm text-muted-foreground">/ {waterIntake.goal} glasses today</div>
            </div>
            
            <Progress 
              value={(waterIntake.today / waterIntake.goal) * 100} 
              className="h-2"
            />
            
            <div className="grid grid-cols-7 gap-1 mt-4">
              {waterIntake.lastWeek.map((glasses, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">
                    {["M", "T", "W", "T", "F", "S", "S"][index]}
                  </div>
                  <div className={`h-8 rounded ${getMoodColor(glasses)} opacity-70 flex items-end justify-center pb-1`}>
                    <span className="text-xs text-white font-medium">{glasses}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Mood Levels Card */}
        <Card className="marble-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Mood Levels</h3>
            <div className="flex items-center space-x-1">
              <TrendingUp className="text-green-500" size={16} />
              <span className="text-sm text-green-500">+{moodLevels.current - moodLevels.weekAverage}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground">{moodLevels.current}</div>
              <div className="text-sm text-muted-foreground">out of 10</div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Week avg</span>
                <span className="text-foreground">{moodLevels.weekAverage}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Month avg</span>
                <span className="text-foreground">{moodLevels.monthAverage}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              {moodLevels.recentMoods.slice(0, 3).map((entry, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{entry.date}</span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getMoodColor(entry.mood)}`}></div>
                    <span className="text-sm text-foreground">{entry.mood}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Life Aspects Card */}
        <Card className="marble-card p-6 lg:row-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Life Balance</h3>
            <BarChart3 className="text-primary" size={24} />
          </div>
          
          <div className="space-y-6">
            {lifeAspects.map((aspect, index) => {
              const Icon = aspect.icon;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className="text-muted-foreground" size={16} />
                      <span className="text-sm font-medium text-foreground">{aspect.category}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {aspect.percentage}%
                    </Badge>
                  </div>
                  <Progress value={aspect.percentage} className="h-2" />
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 p-4 gradient-subtle rounded-lg">
            <h4 className="text-sm font-medium text-foreground mb-2">This Week's Focus</h4>
            <p className="text-xs text-muted-foreground">
              You've been spending balanced time across different life areas. Consider dedicating more time to personal growth activities.
            </p>
          </div>
        </Card>
      </div>

      {/* Additional Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Journal Streak Card */}
        <Card className="marble-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Journal Streak</h3>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-foreground">12 days</div>
              <div className="text-sm text-muted-foreground">Current streak</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-muted-foreground">28 days</div>
              <div className="text-sm text-muted-foreground">Best streak</div>
            </div>
          </div>
        </Card>

        {/* Weekly Insights Card */}
        <Card className="marble-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Insights</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Entries written</span>
              <span className="text-foreground">18</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Words written</span>
              <span className="text-foreground">2,847</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Most active time</span>
              <span className="text-foreground">Evening</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Summary;