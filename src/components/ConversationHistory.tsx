
import { useState, useEffect } from 'react';
import { MessageCircle, Calendar, Trash2, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface ConversationSession {
  id: string;
  title: string;
  date: Date;
  messageCount: number;
  lastMessage: string;
  messages: Array<{
    id: string;
    content: string;
    sender: 'user' | 'agent';
    timestamp: Date;
  }>;
}

interface ConversationHistoryProps {
  agentId: string;
}

export const ConversationHistory = ({ agentId }: ConversationHistoryProps) => {
  const [sessions, setSessions] = useState<ConversationSession[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSession, setSelectedSession] = useState<ConversationSession | null>(null);

  useEffect(() => {
    loadConversationHistory();
  }, [agentId]);

  const loadConversationHistory = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const storageKey = `chat_${user.id}_${agentId}`;
    const savedMessages = localStorage.getItem(storageKey);
    
    if (savedMessages) {
      const messages = JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      
      // Group messages into sessions (for demo, we'll create one session)
      if (messages.length > 0) {
        const session: ConversationSession = {
          id: 'current',
          title: 'Current Conversation',
          date: messages[0].timestamp,
          messageCount: messages.length,
          lastMessage: messages[messages.length - 1].content,
          messages: messages
        };
        setSessions([session]);
      }
    }
  };

  const deleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId));
    if (selectedSession?.id === sessionId) {
      setSelectedSession(null);
    }
    
    // Also remove from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const storageKey = `chat_${user.id}_${agentId}`;
    localStorage.removeItem(storageKey);
  };

  const filteredSessions = sessions.filter(session =>
    session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex gap-4">
      {/* Sessions List */}
      <Card className="w-1/3">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <span>Conversation History</span>
          </CardTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            {filteredSessions.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No conversations found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSessions.map((session) => (
                  <Card 
                    key={session.id}
                    className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedSession?.id === session.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedSession(session)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-sm truncate">{session.title}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSession(session.id);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground truncate mb-2">
                        {session.lastMessage}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{session.date.toLocaleDateString()}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {session.messageCount} messages
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Conversation Detail */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>
            {selectedSession ? selectedSession.title : 'Select a conversation'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedSession ? (
            <ScrollArea className="h-96">
              <div className="space-y-4">
                {selectedSession.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div className={`p-2 rounded-full ${
                      message.sender === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}>
                      <MessageCircle className="h-4 w-4" />
                    </div>
                    <div className={`flex-1 max-w-[70%] ${
                      message.sender === 'user' ? 'text-right' : ''
                    }`}>
                      <div className={`p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground ml-auto'
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex items-center justify-center h-96 text-muted-foreground">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a conversation to view details</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
