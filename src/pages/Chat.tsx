import { useState } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import mascotImage from "@/assets/matcha-mascot.png";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hello! I'm Sage, your personal journaling companion. How are you feeling today? Share your thoughts, and I'll help you reflect on them.",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
    },
    {
      id: "2",
      type: "user",
      content: "I had a really productive day at work today. Finished three major tasks and felt quite accomplished.",
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
    },
    {
      id: "3",
      type: "ai",
      content: "That sounds wonderful! Feeling accomplished after completing important tasks is such a positive experience. What made these tasks particularly meaningful to you? Was it the challenge, the impact, or perhaps the way you approached them?",
      timestamp: new Date(Date.now() - 1 * 60 * 1000),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: "Thank you for sharing that with me. It's important to acknowledge these moments. How do you think this experience might influence your approach to tomorrow?",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Chat with Your Journal</h1>
        <p className="text-muted-foreground">
          Have a conversation with your AI journaling companion. Share your thoughts, feelings, and experiences.
        </p>
      </div>

      <Card className="marble-card h-[600px] flex flex-col">
        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                {/* Avatar */}
                <div className="flex-shrink-0">
                  {message.type === "ai" ? (
                    <div className="w-8 h-8 rounded-full bg-gradient-primary p-1">
                      <img 
                        src={mascotImage} 
                        alt="AI" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <User size={16} className="text-secondary-foreground" />
                    </div>
                  )}
                </div>

                {/* Message Content */}
                <div className={`flex-1 max-w-xs sm:max-w-md ${
                  message.type === "user" ? "text-right" : ""
                }`}>
                  <div
                    className={`p-3 rounded-lg transition-smooth ${
                      message.type === "user"
                        ? "gradient-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 px-1">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border/20 p-4">
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Share your thoughts..."
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="gradient-primary text-primary-foreground hover:opacity-90"
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chat;