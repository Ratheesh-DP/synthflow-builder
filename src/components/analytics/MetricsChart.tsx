import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface DataPoint {
  time: string;
  value: number;
  label?: string;
}

interface MetricsChartProps {
  title: string;
  data: DataPoint[];
  trend: "up" | "down" | "stable";
  trendValue: string;
  metric: string;
}

export function MetricsChart({ title, data, trend, trendValue, metric }: MetricsChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-success";
      case "down":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className="glass">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <Badge variant="outline" className={getTrendColor()}>
          {getTrendIcon()}
          <span className="ml-1">{trendValue}</span>
        </Badge>
      </CardHeader>
      
      <CardContent>
        {/* Chart Container */}
        <div className="h-40 w-full relative">
          {/* Y-axis labels */}
          <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
            <span>{maxValue.toLocaleString()}</span>
            <span>{Math.round((maxValue + minValue) / 2).toLocaleString()}</span>
            <span>{minValue.toLocaleString()}</span>
          </div>
          
          {/* Chart area */}
          <div className="ml-12 h-full relative border-l border-b border-border/50">
            {/* Grid lines */}
            <div className="absolute inset-0">
              {[0, 25, 50, 75, 100].map(percent => (
                <div 
                  key={percent}
                  className="absolute w-full border-t border-border/20"
                  style={{ top: `${100 - percent}%` }}
                />
              ))}
            </div>
            
            {/* Data visualization */}
            <svg className="absolute inset-0 w-full h-full">
              {/* Area fill */}
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              
              {/* Create path */}
              {data.length > 1 && (
                <>
                  {/* Area */}
                  <path
                    d={`M 0 ${160} L ${data.map((point, index) => {
                      const x = (index / (data.length - 1)) * 100;
                      const y = 160 - ((point.value - minValue) / range) * 160;
                      return `${x}% ${y}`;
                    }).join(' L ')} L 100% 160 Z`}
                    fill="url(#areaGradient)"
                    className="opacity-60"
                  />
                  
                  {/* Line */}
                  <path
                    d={`M ${data.map((point, index) => {
                      const x = (index / (data.length - 1)) * 100;
                      const y = 160 - ((point.value - minValue) / range) * 160;
                      return `${x}% ${y}`;
                    }).join(' L ')}`}
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    className="drop-shadow-sm"
                  />
                  
                  {/* Data points */}
                  {data.map((point, index) => {
                    const x = (index / (data.length - 1)) * 100;
                    const y = 160 - ((point.value - minValue) / range) * 160;
                    return (
                      <circle
                        key={index}
                        cx={`${x}%`}
                        cy={y}
                        r="3"
                        fill="hsl(var(--primary))"
                        className="hover:r-4 transition-all cursor-pointer shadow-glow"
                      />
                    );
                  })}
                </>
              )}
            </svg>
          </div>
          
          {/* X-axis labels */}
          <div className="absolute bottom-0 left-12 right-0 flex justify-between text-xs text-muted-foreground mt-2">
            {data.slice(0, 5).map((point, index) => (
              <span key={index}>{point.time}</span>
            ))}
          </div>
        </div>
        
        {/* Current metric */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Current {metric}</span>
            <span className="text-xl font-bold text-foreground">
              {data[data.length - 1]?.value.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}