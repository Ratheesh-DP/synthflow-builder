import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  Square, 
  MoreVertical, 
  Clock, 
  Database,
  Zap,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface PipelineCardProps {
  id: string;
  name: string;
  type: "simple" | "full" | "eval" | "llama";
  status: "running" | "completed" | "failed" | "idle";
  progress?: number;
  blocksCount: number;
  dataGenerated: string;
  lastRun?: string;
  estimatedTime?: string;
}

export function PipelineCard({
  id,
  name,
  type,
  status,
  progress = 0,
  blocksCount,
  dataGenerated,
  lastRun,
  estimatedTime
}: PipelineCardProps) {
  const statusConfig = {
    running: { 
      color: "bg-primary text-primary-foreground", 
      icon: Play,
      pulse: true 
    },
    completed: { 
      color: "bg-success text-success-foreground", 
      icon: CheckCircle,
      pulse: false 
    },
    failed: { 
      color: "bg-destructive text-destructive-foreground", 
      icon: AlertCircle,
      pulse: false 
    },
    idle: { 
      color: "bg-muted text-muted-foreground", 
      icon: Clock,
      pulse: false 
    }
  };

  const typeColors = {
    simple: "border-l-success",
    full: "border-l-primary",
    eval: "border-l-warning",
    llama: "border-l-secondary"
  };

  const StatusIcon = statusConfig[status].icon;

  return (
    <Card className={`glass hover:shadow-neural transition-all duration-300 border-l-4 ${typeColors[type]} group`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="space-y-1">
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs capitalize">
              {type} Pipeline
            </Badge>
            <Badge 
              className={`${statusConfig[status].color} ${statusConfig[status].pulse ? 'pulse-glow' : ''}`}
            >
              <StatusIcon className="h-3 w-3 mr-1" />
              {status}
            </Badge>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        {status === "running" && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-foreground font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Blocks:</span>
            <span className="font-medium">{blocksCount}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Database className="h-4 w-4 text-success" />
            <span className="text-muted-foreground">Generated:</span>
            <span className="font-medium">{dataGenerated}</span>
          </div>
        </div>

        {/* Time Info */}
        {(lastRun || estimatedTime) && (
          <div className="text-xs text-muted-foreground space-y-1">
            {lastRun && <div>Last run: {lastRun}</div>}
            {estimatedTime && status === "running" && (
              <div>Est. time remaining: {estimatedTime}</div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          {status === "idle" && (
            <Button size="sm" className="flex-1">
              <Play className="h-4 w-4 mr-2" />
              Run Pipeline
            </Button>
          )}
          {status === "running" && (
            <>
              <Button variant="outline" size="sm" className="flex-1">
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
              <Button variant="destructive" size="sm">
                <Square className="h-4 w-4" />
              </Button>
            </>
          )}
          {(status === "completed" || status === "failed") && (
            <Button variant="outline" size="sm" className="flex-1">
              View Results
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}