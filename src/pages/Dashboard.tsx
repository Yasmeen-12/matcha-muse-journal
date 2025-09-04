import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Plus, CheckCircle, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

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
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroPhase, setPomodoroPhase] = useState<"work" | "break">("work");

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
        setPomodoroTime(5 * 60); // 5 minute break
        setPomodoroPhase("break");
      } else {
        setPomodoroTime(25 * 60); // 25 minute work session
        setPomodoroPhase("work");
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, pomodoroTime, pomodoroPhase]);

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
    setPomodoroTime(25 * 60);
    setPomodoroPhase("work");
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your daily tasks and stay focused with the Pomodoro technique.
        </p>
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

        {/* Pomodoro Timer Section */}
        <div className="space-y-6">
          <Card className="marble-card p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Pomodoro Timer</h2>
            
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

              {/* Progress Ring */}
              <div className="text-xs text-muted-foreground">
                {pomodoroPhase === "work" 
                  ? "Focus on your current task without distractions"
                  : "Take a short break and relax"
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