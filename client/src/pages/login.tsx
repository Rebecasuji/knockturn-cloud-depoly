import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff, User, KeyRound, Shield, AlertCircle } from "lucide-react";

const VALID_CREDENTIALS = [
  { username: "MOHAN RAJ C", employeeCode: "E0041" },
  { username: "YUVARAJ S", employeeCode: "E0042" },
  { username: "ATMAKUR RAJESH", employeeCode: "E0043" },
  { username: "SIVARAM C", employeeCode: "E0032" },
  { username: "UMAR FAROOQUE", employeeCode: "E0040" },
  { username: "KAALIPUSHPA R", employeeCode: "E0028" },
  { username: "DENNIS RAJU", employeeCode: "E0035" },
  { username: "RANJITH", employeeCode: "E0009" },
  { username: "PRIYA P", employeeCode: "E0044" },
  { username: "RATCHITHA", employeeCode: "E0045" },
  { username: "FAREETHA", employeeCode: "-" },
  { username: "Samyuktha S", employeeCode: "E0047" },
  { username: "Rebecasuji.A", employeeCode: "E0046" },
  { username: "DurgaDevi E", employeeCode: "E0048" },
  { username: "ZAMEELA BEGAM N.", employeeCode: "E0050" },
  { username: "ARUN KUMAR V.", employeeCode: "EOO51" },
  { username: "D K JYOTHSNA PRIYA", employeeCode: "E0052" },
  { username: "P PUSHPA", employeeCode: "E0049" },
  { username: "S.NAVEEN KUMAR", employeeCode: "EOO53" },
  { username: "Leocelestine", employeeCode: "A0001" },
  { username: "Samparkash", employeeCode: "A0002" },
];

const PASSWORD = "admin123";

export default function Login() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const isValidUser = VALID_CREDENTIALS.some(
      (cred) =>
        cred.username.toLowerCase() === username.toLowerCase() &&
        cred.employeeCode.toLowerCase() === employeeCode.toLowerCase()
    );

    if (isValidUser && password === PASSWORD) {
      localStorage.setItem("knocxtirn_user", JSON.stringify({ username, employeeCode }));
      setLocation("/dashboard");
    } else {
      setError("Invalid credentials. Please check your username, employee code, and password.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[hsl(210,90%,35%)] via-[hsl(210,85%,45%)] to-[hsl(215,80%,25%)] animate-gradient">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <div className="mb-8 animate-float">
              <div className="w-24 h-24 mx-auto bg-white/15 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h1 className="font-display text-5xl font-bold mb-4 tracking-tight">
              Knockturn
            </h1>
            <p className="text-xl text-white/80 font-light mb-2">
              Employee Portal
            </p>
            <div className="w-20 h-1 bg-white/40 mx-auto rounded-full mt-6"></div>
            
            <p className="mt-8 text-white/60 text-sm max-w-sm mx-auto leading-relaxed">
              Access your enterprise dashboard, manage time tracking, and stay connected with your team.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-12 text-white/50 text-sm"
          >
            knockturn.tech
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden text-center mb-10">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">Knockturn</h1>
            <p className="text-muted-foreground mt-1">Employee Portal</p>
          </div>

          <Card className="border-0 shadow-xl bg-card">
            <CardHeader className="space-y-1 pb-6">
              <h2 className="font-display text-2xl font-semibold text-center text-foreground">
                Sign In
              </h2>
              <p className="text-sm text-muted-foreground text-center">
                Enter your credentials to access the portal
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-5">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm"
                  >
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-foreground">
                    Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your full name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-11 h-12 bg-secondary/50 border-input focus:bg-background transition-colors"
                      data-testid="input-username"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeCode" className="text-sm font-medium text-foreground">
                    Employee Code
                  </Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                    <Input
                      id="employeeCode"
                      type="text"
                      placeholder="e.g., E0041"
                      value={employeeCode}
                      onChange={(e) => setEmployeeCode(e.target.value)}
                      className="pl-11 h-12 bg-secondary/50 border-input focus:bg-background transition-colors uppercase"
                      data-testid="input-employee-code"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-11 pr-11 h-12 bg-secondary/50 border-input focus:bg-background transition-colors"
                      data-testid="input-password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      data-testid="button-toggle-password"
                    >
                      {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 transition-all duration-200 shadow-lg shadow-primary/25"
                  disabled={isLoading}
                  data-testid="button-login"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-8">
            © 2026 Knockturn Technologies. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}