import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Plus, CheckCircle, Circle, Clock, Coffee, Droplets, Brain, Target, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Complete morning meditation", completed: true, createdAt: new Date() },
    { id: "2", title: "Write in journal for 15 minutes", completed: false, createdAt: new Date() },
    { id: "3", title: "Read 20 pages of current book", completed: false, createdAt: new Date() },
    { id: "4", title: "Practice gratitude exercises", completed: true, createdAt: new Date() },
  ]);
  
  const [newTask, setNewTask] = useState("");
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroPhase, setPomodoroPhase] = useState<"work" | "break">("work");
  const [currentSession, setCurrentSession] = useState(1);
  const [totalSessions, setTotalSessions] = useState(3);
  
  const breakMessages = [
    "🚶‍♀️ Time to stretch and move around!",
    "💧 Drink some water and hydrate yourself",
    "🌱 Take deep breaths and relax your mind",
    "👀 Look away from the screen and rest your eyes", 
    "☕ Maybe grab a healthy snack or tea",
    "🧘‍♂️ Do a quick mindfulness exercise",
    "📱 Step away from devices for a moment",
    "🌿 'Progress, not perfection' - you're doing great!"
  ];

  const [currentBreakMessage, setCurrentBreakMessage] = useState(breakMessages[0]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(time => time - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setIsRunning(false);
      // Switch phase when timer completes
      if (pomodoroPhase === "work") {
        setPomodoroTime(breakMinutes * 60);
        setPomodoroPhase("break");
        // Set a random break message
        setCurrentBreakMessage(breakMessages[Math.floor(Math.random() * breakMessages.length)]);
      } else {
        if (currentSession < totalSessions) {
          setCurrentSession(prev => prev + 1);
          setPomodoroTime(focusMinutes * 60);
          setPomodoroPhase("work");
        } else {
          // All sessions complete
          resetPomodoro();
        }
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, pomodoroTime, pomodoroPhase, focusMinutes, breakMinutes, currentSession, totalSessions, breakMessages]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    
    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      createdAt: new Date(),
    };
    
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const resetPomodoro = () => {
    setIsRunning(false);
    setPomodoroTime(focusMinutes * 60);
    setPomodoroPhase("work");
    setCurrentSession(1);
  };

  const updateFocusTime = (minutes: string) => {
    const mins = parseInt(minutes);
    setFocusMinutes(mins);
    if (pomodoroPhase === "work" && !isRunning) {
      setPomodoroTime(mins * 60);
    }
  };

  const updateBreakTime = (minutes: string) => {
    const mins = parseInt(minutes);
    setBreakMinutes(mins);
    if (pomodoroPhase === "break" && !isRunning) {
      setPomodoroTime(mins * 60);
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your daily tasks and stay focused with the Pomodoro technique.
        </p>
      </div>

      {/* Weekly Status - Horizontal Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glass-effect p-6 border-primary/20 hover:border-primary/40 transition-all duration-300">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">12</div>
              <div className="text-sm text-muted-foreground">Goals Completed</div>
            </div>
            <Badge variant="secondary" className="gradient-primary text-white border-0">
              This Week
            </Badge>
          </div>
        </Card>

        <Card className="glass-effect p-6 border-primary/20 hover:border-primary/40 transition-all duration-300">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">18</div>
              <div className="text-sm text-muted-foreground">Pomodoro Sessions</div>
            </div>
            <Badge variant="secondary" className="gradient-primary text-white border-0">
              7 Days
            </Badge>
          </div>
        </Card>

        <Card className="glass-effect p-6 border-primary/20 hover:border-primary/40 transition-all duration-300">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">85%</div>
              <div className="text-sm text-muted-foreground">Productivity Score</div>
            </div>
            <Badge variant="secondary" className="gradient-primary text-white border-0">
              Improving
            </Badge>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tasks Section */}
        <div className="space-y-6">
          <Card className="marble-card p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Today's Tasks</h2>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Progress</span>
                <span>{completedTasks}/{totalTasks} completed</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            {/* Add New Task */}
            <div className="flex space-x-2 mb-4">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task..."
                onKeyPress={(e) => e.key === "Enter" && addTask()}
                className="flex-1"
              />
              <Button 
                onClick={addTask}
                className="gradient-primary text-primary-foreground hover:opacity-90"
              >
                <Plus size={16} />
              </Button>
            </div>

            {/* Task List */}
            <div className="space-y-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-smooth hover:bg-accent/30 ${
                    task.completed ? "opacity-60" : ""
                  }`}
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="flex-shrink-0 text-primary hover:text-primary/80 transition-smooth"
                  >
                    {task.completed ? (
                      <CheckCircle size={20} className="text-green-600" />
                    ) : (
                      <Circle size={20} />
                    )}
                  </button>
                  <span
                    className={`flex-1 text-sm ${
                      task.completed ? "line-through text-muted-foreground" : "text-foreground"
                    }`}
                  >
                    {task.title}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Enhanced Pomodoro Timer Section */}
        <div className="space-y-6">
          <Card className="marble-card p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Pomodoro Timer</h2>
            
            {/* Custom Time Settings */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Focus Time</label>
                <Select value={focusMinutes.toString()} onValueChange={updateFocusTime}>
                  <SelectTrigger className="glass-effect">
                    <SelectValue placeholder="Focus time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="20">20 minutes</SelectItem>
                    <SelectItem value="25">25 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Break Time</label>
                <Select value={breakMinutes.toString()} onValueChange={updateBreakTime}>
                  <SelectTrigger className="glass-effect">
                    <SelectValue placeholder="Break time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="20">20 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Session Info */}
            <div className="text-center mb-6 p-4 glass-effect rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">
                {totalSessions} sessions of {focusMinutes} mins with {breakMinutes} mins breaks
              </div>
              <div className="text-xs text-primary font-medium">
                Session {currentSession} of {totalSessions}
              </div>
            </div>
            
            <div className="text-center space-y-6">
              {/* Timer Display */}
              <div className="relative">
                <div className="w-48 h-48 mx-auto rounded-full gradient-subtle flex items-center justify-center shadow-marble">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-foreground mb-2">
                      {formatTime(pomodoroTime)}
                    </div>
                    <div className="text-sm text-muted-foreground uppercase tracking-wider">
                      {pomodoroPhase === "work" ? "Focus Time" : "Break Time"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Break Message */}
              {pomodoroPhase === "break" && (
                <Card className="glass-effect p-4 border-primary/20">
                  <div className="flex items-center justify-center space-x-2">
                    <Coffee className="w-5 h-5 text-primary" />
                    <p className="text-sm text-foreground">{currentBreakMessage}</p>
                  </div>
                </Card>
              )}

              {/* Controls */}
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => setIsRunning(!isRunning)}
                  className="gradient-primary text-primary-foreground hover:opacity-90"
                  size="lg"
                >
                  {isRunning ? <Pause size={20} /> : <Play size={20} />}
                  <span className="ml-2">{isRunning ? "Pause" : "Start"}</span>
                </Button>
                <Button
                  onClick={resetPomodoro}
                  variant="outline"
                  size="lg"
                  className="border-border hover:bg-accent/30"
                >
                  <RotateCcw size={20} />
                  <span className="ml-2">Reset</span>
                </Button>
              </div>

              {/* Session Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Session Progress</span>
                  <span>{currentSession}/{totalSessions}</span>
                </div>
                <Progress value={(currentSession / totalSessions) * 100} className="h-2" />
              </div>

              {/* Status Message */}
              <div className="text-xs text-muted-foreground">
                {pomodoroPhase === "work" 
                  ? "Focus on your current task without distractions"
                  : "Take a break and recharge your energy"
                }
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;