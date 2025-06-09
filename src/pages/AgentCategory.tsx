
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ArrowLeft, Bot, MessageCircle, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AgentCategory = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();

  const agents = {
    marketing: [
      {
        id: 'content-creator',
        name: 'Content Creator',
        description: 'Generate blog posts, social media content, and marketing copy',
        status: 'active',
        lastUsed: '2 hours ago',
        conversations: 23,
        specialty: 'Content Generation'
      },
      {
        id: 'campaign-optimizer',
        name: 'Campaign Optimizer',
        description: 'Analyze and optimize marketing campaigns for better ROI',
        status: 'active',
        lastUsed: '5 minutes ago',
        conversations: 45,
        specialty: 'Analytics'
      },
      {
        id: 'social-media-manager',
        name: 'Social Media Manager',
        description: 'Schedule posts, engage with audience, and track social metrics',
        status: 'idle',
        lastUsed: '1 day ago',
        conversations: 12,
        specialty: 'Social Media'
      }
    ],
    sales: [
      {
        id: 'lead-qualifier',
        name: 'Lead Qualifier',
        description: 'Score and qualify incoming leads based on predefined criteria',
        status: 'active',
        lastUsed: '1 hour ago',
        conversations: 67,
        specialty: 'Lead Management'
      },
      {
        id: 'proposal-generator',
        name: 'Proposal Generator',
        description: 'Create customized sales proposals and presentations',
        status: 'active',
        lastUsed: '30 minutes ago',
        conversations: 34,
        specialty: 'Proposals'
      },
      {
        id: 'crm-assistant',
        name: 'CRM Assistant',
        description: 'Manage customer relationships and track sales pipeline',
        status: 'active',
        lastUsed: '15 minutes ago',
        conversations: 89,
        specialty: 'CRM'
      },
      {
        id: 'email-outreach',
        name: 'Email Outreach',
        description: 'Craft personalized outreach emails and follow-up sequences',
        status: 'idle',
        lastUsed: '3 hours ago',
        conversations: 56,
        specialty: 'Email Marketing'
      }
    ],
    tools: [
      {
        id: 'data-analyst',
        name: 'Data Analyst',
        description: 'Process and analyze data to generate insights and reports',
        status: 'active',
        lastUsed: '10 minutes ago',
        conversations: 78,
        specialty: 'Analytics'
      },
      {
        id: 'task-automator',
        name: 'Task Automator',
        description: 'Automate repetitive tasks and workflows',
        status: 'active',
        lastUsed: '1 hour ago',
        conversations: 43,
        specialty: 'Automation'
      },
      {
        id: 'code-reviewer',
        name: 'Code Reviewer',
        description: 'Review code quality, suggest improvements, and find bugs',
        status: 'active',
        lastUsed: '20 minutes ago',
        conversations: 91,
        specialty: 'Development'
      },
      {
        id: 'document-processor',
        name: 'Document Processor',
        description: 'Extract, process, and organize information from documents',
        status: 'idle',
        lastUsed: '2 days ago',
        conversations: 25,
        specialty: 'Document Management'
      },
      {
        id: 'scheduler',
        name: 'Smart Scheduler',
        description: 'Manage calendars, schedule meetings, and send reminders',
        status: 'active',
        lastUsed: '5 minutes ago',
        conversations: 62,
        specialty: 'Scheduling'
      }
    ]
  };

  const categoryAgents = agents[category as keyof typeof agents] || [];
  const categoryColors = {
    marketing: 'blue',
    sales: 'green',
    tools: 'purple'
  };

  const color = categoryColors[category as keyof typeof categoryColors] || 'gray';

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getStatusBadge = (status: string) => {
    return status === 'active' ? (
      <Badge className="bg-green-100 text-green-700">Active</Badge>
    ) : (
      <Badge variant="secondary">Idle</Badge>
    );
  };

  const AgentCard = ({ agent, isListView = false }: { agent: any; isListView?: boolean }) => (
    <Card 
      key={agent.id}
      className={`cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
        isListView ? 'flex-row' : ''
      }`}
      onClick={() => navigate(`/agent/${agent.id}`)}
    >
      <CardHeader className={isListView ? 'flex-1' : ''}>
        <div className={`flex ${isListView ? 'items-center justify-between' : 'items-start justify-between'}`}>
          <div className={isListView ? 'flex items-center space-x-4' : ''}>
            <div className={`p-3 rounded-lg ${
              color === 'blue' ? 'bg-blue-100' : 
              color === 'green' ? 'bg-green-100' : 'bg-purple-100'
            }`}>
              <Bot className={`h-6 w-6 ${
                color === 'blue' ? 'text-blue-600' : 
                color === 'green' ? 'text-green-600' : 'text-purple-600'
              }`} />
            </div>
            <div>
              <CardTitle className={isListView ? 'text-lg' : 'text-lg mt-3'}>{agent.name}</CardTitle>
              <CardDescription className={isListView ? 'mt-1' : 'mt-1'}>
                {agent.description}
              </CardDescription>
            </div>
          </div>
          {getStatusBadge(agent.status)}
        </div>
      </CardHeader>
      <CardContent className={isListView ? 'flex items-center space-x-6' : ''}>
        <div className={`flex ${isListView ? 'space-x-6' : 'justify-between items-center'}`}>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <MessageCircle className="h-4 w-4" />
            <span>{agent.conversations} conversations</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{agent.lastUsed}</span>
          </div>
        </div>
        {!isListView && (
          <Badge variant="outline" className="mt-2">
            <Sparkles className="h-3 w-3 mr-1" />
            {agent.specialty}
          </Badge>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold capitalize">{category} Agents</h1>
              <p className="text-muted-foreground">
                {categoryAgents.length} agent{categoryAgents.length !== 1 ? 's' : ''} available
              </p>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'grid' | 'list')} className="mb-6">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Agents Grid/List */}
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {categoryAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} isListView={viewMode === 'list'} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentCategory;
