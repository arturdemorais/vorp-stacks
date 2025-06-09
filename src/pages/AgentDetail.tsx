
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Settings, History, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sidebar } from '@/components/AgentSidebar';
import { ChatWindow } from '@/components/ChatWindow';
import { ConversationHistory } from '@/components/ConversationHistory';

const AgentDetail = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'chat' | 'history' | 'settings'>('chat');

  // Mock agent data - in real app this would come from an API
  const agentData = {
    'content-creator': {
      name: 'Content Creator',
      description: 'Generate blog posts, social media content, and marketing copy',
      category: 'marketing',
      capabilities: ['Blog Writing', 'Social Media Posts', 'Email Campaigns', 'SEO Optimization'],
      model: 'GPT-4',
      temperature: 0.7
    },
    'campaign-optimizer': {
      name: 'Campaign Optimizer',
      description: 'Analyze and optimize marketing campaigns for better ROI',
      category: 'marketing',
      capabilities: ['Campaign Analysis', 'ROI Optimization', 'A/B Testing', 'Performance Metrics'],
      model: 'GPT-4',
      temperature: 0.3
    },
    // Add more agents as needed
  };

  const agent = agentData[agentId as keyof typeof agentData];

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Agent Not Found</h1>
          <Button onClick={() => navigate('/')}>Return to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar 
        agent={agent} 
        agentId={agentId!}
        activeView={activeView}
        onViewChange={setActiveView}
        onBack={() => navigate(`/agents/${agent.category}`)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">{agent.name}</h1>
              <p className="text-muted-foreground">{agent.description}</p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={activeView === 'chat' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveView('chat')}
              >
                Chat
              </Button>
              <Button
                variant={activeView === 'history' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveView('history')}
              >
                <History className="h-4 w-4 mr-2" />
                History
              </Button>
              <Button
                variant={activeView === 'settings' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveView('settings')}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4">
          {activeView === 'chat' && (
            <ChatWindow agentId={agentId!} agentName={agent.name} />
          )}
          
          {activeView === 'history' && (
            <ConversationHistory agentId={agentId!} />
          )}
          
          {activeView === 'settings' && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Agent Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Model</label>
                  <p className="text-sm text-muted-foreground">{agent.model}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Temperature</label>
                  <p className="text-sm text-muted-foreground">{agent.temperature}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Capabilities</label>
                  <div className="flex flex-wrap gap-2">
                    {agent.capabilities.map((capability, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                      >
                        {capability}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All Conversations
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentDetail;
