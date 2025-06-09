
import { useState } from 'react';
import { ArrowLeft, Bot, ChevronLeft, ChevronRight, MessageCircle, Settings, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AgentSidebarProps {
  agent: {
    name: string;
    description: string;
    category: string;
    capabilities: string[];
  };
  agentId: string;
  activeView: 'chat' | 'history' | 'settings';
  onViewChange: (view: 'chat' | 'history' | 'settings') => void;
  onBack: () => void;
}

export const Sidebar = ({ agent, agentId, activeView, onViewChange, onBack }: AgentSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'history', label: 'History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'marketing': return 'bg-blue-100 text-blue-700';
      case 'sales': return 'bg-green-100 text-green-700';
      case 'tools': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className={cn(
      "bg-card border-r transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-80"
    )}>
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Agent Info */}
      {!isCollapsed && (
        <div className="p-4 border-b">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{agent.name}</CardTitle>
                  <Badge className={getCategoryColor(agent.category)} variant="secondary">
                    {agent.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-3">{agent.description}</p>
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Capabilities:</h4>
                <div className="flex flex-wrap gap-1">
                  {agent.capabilities.slice(0, 3).map((capability, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                    >
                      {capability}
                    </span>
                  ))}
                  {agent.capabilities.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                      +{agent.capabilities.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeView === item.id ? 'default' : 'ghost'}
                className={cn(
                  "w-full justify-start",
                  isCollapsed && "justify-center px-2"
                )}
                onClick={() => onViewChange(item.id as 'chat' | 'history' | 'settings')}
              >
                <Icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
                {!isCollapsed && item.label}
              </Button>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t">
          <div className="text-xs text-muted-foreground text-center">
            Agent ID: {agentId}
          </div>
        </div>
      )}
    </div>
  );
};
