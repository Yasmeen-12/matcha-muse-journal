import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { MessageCircle, LayoutDashboard, BarChart3, Info } from "lucide-react";
import mascotImage from "@/assets/matcha-mascot.png";

const Layout = () => {
  const location = useLocation();
  const [appName] = useState("MatchaJournal");

  const navItems = [
    { path: "/", label: "Chat", icon: MessageCircle },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/summary", label: "Summary", icon: BarChart3 },
    { path: "/info", label: "Info", icon: Info },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="min-h-screen marble-bg">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-border/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and App Name */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary p-1 shadow-soft">
                <img 
                  src={mascotImage} 
                  alt="Matcha mascot" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h1 className="text-xl font-bold text-foreground">{appName}</h1>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth
                      ${isActive(item.path)
                        ? "marble-card text-primary shadow-soft"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                      }
                    `}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;