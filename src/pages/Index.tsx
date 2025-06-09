
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, Bot, Users, Briefcase, Wrench } from 'lucide-react';

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in real app this would connect to authentication service
    if (email && password) {
      localStorage.setItem('user', JSON.stringify({ email, id: Date.now() }));
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  // Check if user is already logged in
  const checkAuth = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  const user = checkAuth();
  const authenticated = isLoggedIn || user;

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
              <Bot className="h-6 w-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">Welcome to AgentHub</CardTitle>
            <CardDescription>
              Access your intelligent agent dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AgentHub Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.email || email}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        {/* Agent Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card 
            className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-l-4 border-l-blue-500"
            onClick={() => navigate('/agents/marketing')}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Marketing Agents</CardTitle>
                  <CardDescription>Content, campaigns, and analytics</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">3 active agents</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-l-4 border-l-green-500"
            onClick={() => navigate('/agents/sales')}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Briefcase className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Sales Agents</CardTitle>
                  <CardDescription>Lead generation and CRM</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">4 active agents</p>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-l-4 border-l-purple-500"
            onClick={() => navigate('/agents/tools')}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Wrench className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Tool Agents</CardTitle>
                  <CardDescription>Automation and utilities</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">5 active agents</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">Total Agents</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">847</div>
              <div className="text-sm text-muted-foreground">Conversations</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">98%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">24</div>
              <div className="text-sm text-muted-foreground">Active Today</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
