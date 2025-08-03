import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Brain, 
  Filter, 
  Database, 
  Shuffle, 
  GitBranch, 
  Zap,
  Plus,
  Copy,
  Settings
} from "lucide-react";

interface BlockType {
  id: string;
  name: string;
  type: "LLM" | "Filter" | "Transform" | "Generator" | "Aggregator";
  description: string;
  icon: React.ElementType;
  category: string;
  popularity: number;
  version: string;
}

const blockTypes: BlockType[] = [
  {
    id: "llm-block",
    name: "LLM Block",
    type: "LLM",
    description: "Generate content using large language models with configurable prompts",
    icon: Brain,
    category: "Generation",
    popularity: 95,
    version: "v2.1"
  },
  {
    id: "filter-value",
    name: "Filter by Value",
    type: "Filter", 
    description: "Filter datasets based on specific column values and conditions",
    icon: Filter,
    category: "Processing",
    popularity: 87,
    version: "v1.8"
  },
  {
    id: "data-transform",
    name: "Data Transform",
    type: "Transform",
    description: "Apply transformations and manipulations to dataset columns",
    icon: Shuffle,
    category: "Processing", 
    popularity: 78,
    version: "v1.5"
  },
  {
    id: "conditional-generator",
    name: "Conditional Generator", 
    type: "Generator",
    description: "Generate data based on conditional logic and rules",
    icon: GitBranch,
    category: "Generation",
    popularity: 72,
    version: "v2.0"
  },
  {
    id: "data-aggregator",
    name: "Data Aggregator",
    type: "Aggregator",
    description: "Combine and aggregate multiple data sources",
    icon: Database,
    category: "Processing",
    popularity: 65,
    version: "v1.3"
  }
];

export function BlockLibrary() {
  const getTypeColor = (type: BlockType["type"]) => {
    const colors = {
      LLM: "bg-primary/10 text-primary border-primary/20",
      Filter: "bg-success/10 text-success border-success/20", 
      Transform: "bg-warning/10 text-warning border-warning/20",
      Generator: "bg-secondary/10 text-secondary border-secondary/20",
      Aggregator: "bg-accent/10 text-accent border-accent/20"
    };
    return colors[type];
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-primary" />
          <span>Block Library</span>
          <Badge variant="outline">{blockTypes.length} blocks</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {blockTypes.map((block, index) => (
          <div key={block.id}>
            <div className="flex items-start justify-between space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors group">
              <div className="flex items-start space-x-3 flex-1">
                <div className="p-2 rounded-lg bg-card border">
                  <block.icon className="h-5 w-5 text-primary" />
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-foreground">{block.name}</h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getTypeColor(block.type)}`}
                    >
                      {block.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {block.version}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {block.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>Category: {block.category}</span>
                    <span>•</span>
                    <span>Popularity: {block.popularity}%</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-1" />
                  Clone
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
                <Button variant="ghost" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {index < blockTypes.length - 1 && <Separator className="opacity-50" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}