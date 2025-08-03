import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Database, 
  Brain, 
  Filter, 
  Play, 
  Pause,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";

interface FlowNode {
  id: string;
  name: string;
  type: "input" | "llm" | "filter" | "transform" | "output";
  status: "pending" | "running" | "completed" | "error";
  duration?: string;
  records?: number;
}

interface PipelineFlowProps {
  pipelineName: string;
  nodes: FlowNode[];
  isRunning: boolean;
}

const nodeIcons = {
  input: Database,
  llm: Brain,
  filter: Filter,
  transform: Database,
  output: Database
};

const statusConfig = {
  pending: { color: "bg-muted text-muted-foreground", icon: Clock },
  running: { color: "bg-primary text-primary-foreground animate-pulse", icon: Play },
  completed: { color: "bg-success text-success-foreground", icon: CheckCircle },
  error: { color: "bg-destructive text-destructive-foreground", icon: AlertTriangle }
};

export function PipelineFlow({ pipelineName, nodes, isRunning }: PipelineFlowProps) {
  return (
    <Card className="glass">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <span>{pipelineName} Flow</span>
          {isRunning && (
            <Badge className="bg-primary text-primary-foreground animate-pulse">
              <Play className="h-3 w-3 mr-1" />
              Running
            </Badge>
          )}
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Pause className="h-4 w-4 mr-2" />
            Pause
          </Button>
          <Button variant="ghost" size="sm">
            View Logs
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center space-x-4 overflow-x-auto pb-4">
          {nodes.map((node, index) => {
            const NodeIcon = nodeIcons[node.type];
            const StatusIcon = statusConfig[node.status].icon;
            
            return (
              <div key={node.id} className="flex items-center space-x-4 min-w-0">
                {/* Node */}
                <div className="flex flex-col items-center space-y-2 min-w-[120px]">
                  <div 
                    className={`
                      relative p-4 rounded-xl border-2 transition-all duration-300
                      ${node.status === 'running' ? 'border-primary shadow-glow' : 'border-border'}
                      glass hover:shadow-card group
                    `}
                  >
                    {/* Main Icon */}
                    <NodeIcon className="h-6 w-6 text-primary" />
                    
                    {/* Status Indicator */}
                    <div className={`
                      absolute -top-2 -right-2 p-1 rounded-full border-2 border-background
                      ${statusConfig[node.status].color}
                    `}>
                      <StatusIcon className="h-3 w-3" />
                    </div>
                    
                    {/* Progress Ring for Running */}
                    {node.status === 'running' && (
                      <div className="absolute inset-0 rounded-xl border-2 border-primary/30 animate-ping" />
                    )}
                  </div>
                  
                  {/* Node Info */}
                  <div className="text-center space-y-1">
                    <div className="font-medium text-sm text-foreground">
                      {node.name}
                    </div>
                    <Badge variant="outline" className="text-xs capitalize">
                      {node.type}
                    </Badge>
                    
                    {/* Node Stats */}
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      {node.duration && (
                        <div>{node.duration}</div>
                      )}
                      {node.records && (
                        <div>{node.records.toLocaleString()} records</div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Arrow Connector */}
                {index < nodes.length - 1 && (
                  <div className="flex items-center">
                    <ArrowRight 
                      className={`
                        h-6 w-6 transition-colors duration-300
                        ${nodes[index + 1].status === 'running' || node.status === 'completed' 
                          ? 'text-primary' 
                          : 'text-muted-foreground'}
                      `} 
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Pipeline Summary */}
        <div className="mt-6 p-4 rounded-lg bg-muted/20 border border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">
                {nodes.filter(n => n.status === 'completed').length}/{nodes.length}
              </div>
              <div className="text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary">
                {nodes.reduce((sum, n) => sum + (n.records || 0), 0).toLocaleString()}
              </div>
              <div className="text-muted-foreground">Total Records</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-success">
                {nodes.filter(n => n.status === 'running').length > 0 ? 'In Progress' : 'Idle'}
              </div>
              <div className="text-muted-foreground">Status</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">
                {Math.round(Math.random() * 45 + 15)}min
              </div>
              <div className="text-muted-foreground">Est. Remaining</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}