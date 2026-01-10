import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Clock,
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  Building2,
  ExternalLink,
} from "lucide-react";

interface User {
  username: string;
  employeeCode: string;
}

const QUICK_LINKS = [
  {
    id: "timestrap",
    title: "TimeStrap",
    description: "Track your work hours and manage timesheets",
    icon: Clock,
    url: "https://timenew--Rebecasuji.replit.app",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    available: true,
  },
  {
    id: "reports",
    title: "Reports",
    description: "View and generate performance reports",
    icon: FileText,
    url: "#",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    available: false,
  },
  {
    id: "team",
    title: "Team",
    description: "Collaborate with your team members",
    icon: Users,
    url: "#",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    available: false,
  },
  {
    id: "settings",
    title: "Settings",
    description: "Manage your account preferences",
    icon: Settings,
    url: "#",
    color: "from-slate-500 to-slate-600",
    bgColor: "bg-slate-100",
    iconColor: "text-slate-600",
    available: false,
  },
];

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const storedUser = localStorage.getItem("knocxtirn_user");
    if (!storedUser) {
      setLocation("/");
      return;
    }
    setUser(JSON.parse(storedUser));

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("knocxtirn_user");
    setLocation("/");
  };

  const handleLinkClick = (link: typeof QUICK_LINKS[0]) => {
    if (link.available && link.url !== "#") {
      window.open(link.url, "_blank", "noopener,noreferrer");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-md shadow-primary/25">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-lg font-bold text-foreground">Knockturn</h1>
                <p className="text-xs text-muted-foreground -mt-0.5">Employee Portal</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-foreground">{user.username}</p>
                <p className="text-xs text-muted-foreground">{user.employeeCode}</p>
              </div>
              <Avatar className="w-10 h-10 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                  {getInitials(user.username)}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                data-testid="button-logout"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-gradient-to-br from-primary via-primary to-[hsl(215,85%,35%)] text-primary-foreground border-0 shadow-xl shadow-primary/20 overflow-hidden relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-2xl -translate-x-1/2 translate-y-1/2"></div>
            </div>
            <CardContent className="relative p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <p className="text-primary-foreground/70 text-sm font-medium mb-1">
                    Welcome back,
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2">
                    {user.username}
                  </h2>
                  <p className="text-primary-foreground/80 text-sm">
                    {formatDate(currentTime)}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10">
                    <Clock className="w-5 h-5 text-primary-foreground/80" />
                    <span className="font-mono text-xl sm:text-2xl font-semibold tracking-wider">
                      {formatTime(currentTime)}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <LayoutDashboard className="w-5 h-5 text-primary" />
            <h3 className="font-display text-lg font-semibold text-foreground">Quick Access</h3>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {QUICK_LINKS.map((link, index) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
            >
              <Card
                className={`group relative overflow-hidden border transition-all duration-300 ${
                  link.available
                    ? "cursor-pointer hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/30"
                    : "opacity-60 cursor-not-allowed"
                }`}
                onClick={() => handleLinkClick(link)}
                data-testid={`card-link-${link.id}`}
              >
                {!link.available && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="text-[10px] font-medium uppercase tracking-wider bg-muted text-muted-foreground px-2 py-1 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 rounded-xl ${link.bgColor} flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110`}>
                    <link.icon className={`w-6 h-6 ${link.iconColor}`} />
                  </div>
                  <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                    {link.title}
                    {link.available && (
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {link.description}
                  </p>
                  {link.available && (
                    <div className="flex items-center gap-1 text-primary text-sm font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Open</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </CardContent>
                {link.available && (
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${link.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            © 2026 Knockturn Technologies • knockturn.tech
          </p>
        </motion.div>
      </main>
    </div>
  );
}