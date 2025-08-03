import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { PipelineCard } from "@/components/pipeline/PipelineCard";
import { BlockLibrary } from "@/components/blocks/BlockLibrary";
import { PipelineFlow } from "@/components/visualization/PipelineFlow";
import { MetricsChart } from "@/components/analytics/MetricsChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Database, 
  Zap, 
  Activity, 
  Plus,
  BarChart3,
  GitBranch,
  Clock,
  Users,
  Cpu
} from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for demonstrations
  const stats = [
    {
      title: "Active Pipelines",
      value: 12,
      change: "+2 this week",
      changeType: "positive" as const,
      icon: GitBranch,
      description: "Running workflows"
    },
    {
      title: "Data Generated",
      value: "2.4M",
      change: "+12% from last month", 
      changeType: "positive" as const,
      icon: Database,
      description: "Total records"
    },
    {
      title: "Model Calls",
      value: "847K",
      change: "+8% this week",
      changeType: "positive" as const,
      icon: Brain,
      description: "LLM interactions"
    },
    {
      title: "Success Rate",
      value: "98.7%",
      change: "+0.3% improvement",
      changeType: "positive" as const,
      icon: Activity,
      description: "Pipeline completion"
    }
  ];

  const pipelines = [
    {
      id: "1",
      name: "Knowledge Base Generation",
      type: "full" as const,
      status: "running" as const,
      progress: 75,
      blocksCount: 8,
      dataGenerated: "125K records",
      lastRun: "2 hours ago",
      estimatedTime: "25 minutes"
    },
    {
      id: "2", 
      name: "MMLU Evaluation Dataset",
      type: "eval" as const,
      status: "completed" as const,
      blocksCount: 5,
      dataGenerated: "50K records",
      lastRun: "Yesterday",
    },
    {
      id: "3",
      name: "Skills Training Data",
      type: "simple" as const,
      status: "idle" as const,
      blocksCount: 6,
      dataGenerated: "0 records",
      lastRun: "3 days ago",
    },
    {
      id: "4",
      name: "Llama Fine-tuning Set",
      type: "llama" as const,
      status: "failed" as const,
      blocksCount: 10,
      dataGenerated: "15K records",
      lastRun: "1 hour ago",
    }
  ];

  const flowNodes = [
    { id: "1", name: "Input Data", type: "input" as const, status: "completed" as const, duration: "2min", records: 1000 },
    { id: "2", name: "Question Gen", type: "llm" as const, status: "completed" as const, duration: "15min", records: 850 },
    { id: "3", name: "Filter Quality", type: "filter" as const, status: "running" as const, records: 720 },
    { id: "4", name: "Response Gen", type: "llm" as const, status: "pending" as const },
    { id: "5", name: "Final Output", type: "output" as const, status: "pending" as const }
  ];

  const metricsData = [
    { time: "00:00", value: 120 },
    { time: "04:00", value: 180 },
    { time: "08:00", value: 240 },
    { time: "12:00", value: 320 },
    { time: "16:00", value: 280 },
    { time: "20:00", value: 350 },
    { time: "24:00", value: 420 }
  ];

  return (
    <div className="min-h-screen bg-background grid-pattern">
      <Header />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-12">
          <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            SDG Studio
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional synthetic data generation platform. Build, manage, and scale 
            your AI training workflows with enterprise-grade reliability.
          </p>
          <div className="flex items-center justify-center space-x-4 pt-6">
            <Button size="xl" className="shadow-glow">
              <Plus className="h-5 w-5 mr-2" />
              Create Pipeline
            </Button>
            <Button variant="neural" size="xl">
              <BarChart3 className="h-5 w-5 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 glass">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="pipelines">Pipelines</TabsTrigger>
            <TabsTrigger value="blocks">Blocks</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StatsCard key={index} {...stat} />
              ))}
            </div>

            {/* Pipeline Flow Visualization */}
            <PipelineFlow 
              pipelineName="Knowledge Base Generation"
              nodes={flowNodes}
              isRunning={true}
            />

            {/* Quick Actions and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-3" />
                    Create New Pipeline
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Brain className="h-4 w-4 mr-3" />
                    Import LLM Configuration
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Database className="h-4 w-4 mr-3" />
                    Upload Training Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-3" />
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { time: "2 minutes ago", action: "Pipeline 'Knowledge Base' completed block 2", type: "success" },
                    { time: "15 minutes ago", action: "New LLM block added to library", type: "info" },
                    { time: "1 hour ago", action: "Pipeline 'Llama Fine-tuning' failed at block 7", type: "error" },
                    { time: "2 hours ago", action: "User John deployed evaluation pipeline", type: "info" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 text-sm">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'success' ? 'bg-success' :
                        activity.type === 'error' ? 'bg-destructive' : 'bg-primary'
                      }`} />
                      <div className="flex-1">
                        <p className="text-foreground">{activity.action}</p>
                        <p className="text-muted-foreground text-xs">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pipelines" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Active Pipelines</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Pipeline
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pipelines.map((pipeline) => (
                <PipelineCard key={pipeline.id} {...pipeline} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="blocks" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Block Library</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Block
              </Button>
            </div>
            
            <BlockLibrary />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Analytics Dashboard</h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  User Metrics
                </Button>
                <Button variant="outline" size="sm">
                  <Cpu className="h-4 w-4 mr-2" />
                  System Health
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MetricsChart
                title="Data Generation Rate"
                data={metricsData}
                trend="up"
                trendValue="+15%"
                metric="Records/Hour"
              />
              <MetricsChart
                title="Pipeline Success Rate"
                data={metricsData.map(d => ({ ...d, value: d.value * 0.8 + 20 }))}
                trend="stable"
                trendValue="98.7%"
                metric="Success Rate"
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
