import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Settings, User, Bell } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 border-b border-border/50 bg-card/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Brain className="h-8 w-8 text-primary" />
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-md animate-pulse" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SDG Studio
            </h1>
            <p className="text-xs text-muted-foreground">Synthetic Data Generation</p>
          </div>
          <Badge variant="outline" className="ml-2 glass">
            Enterprise
          </Badge>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Button variant="ghost" size="sm">
            Pipelines
          </Button>
          <Button variant="ghost" size="sm">
            Blocks
          </Button>
          <Button variant="ghost" size="sm">
            Analytics
          </Button>
          <Button variant="ghost" size="sm">
            Documentation
          </Button>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full animate-pulse" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="neural" size="icon">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}