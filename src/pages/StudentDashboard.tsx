
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Bell, Clock, User, Settings, ChevronRight, Calendar, Target, TrendingUp } from 'lucide-react';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications] = useState(3);

  const upcomingTests = [
    {
      id: '1',
      title: 'Mathematics Assessment - Algebra',
      subject: 'Mathematics',
      duration: '90 minutes',
      questions: 25,
      scheduledFor: '2024-01-15T14:00:00',
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Physics Quiz - Mechanics',
      subject: 'Physics',
      duration: '45 minutes',
      questions: 15,
      scheduledFor: '2024-01-16T10:30:00',
      status: 'scheduled'
    },
    {
      id: '3',
      title: 'Chemistry Lab Assessment',
      subject: 'Chemistry',
      duration: '60 minutes',
      questions: 20,
      scheduledFor: '2024-01-18T09:00:00',
      status: 'available'
    }
  ];

  const recentResults = [
    { subject: 'Biology', score: 87, date: '2024-01-12', improvement: '+5%' },
    { subject: 'History', score: 92, date: '2024-01-10', improvement: '+12%' },
    { subject: 'English', score: 78, date: '2024-01-08', improvement: '-3%' }
  ];

  const getTimeUntilTest = (scheduledFor: string) => {
    const now = new Date();
    const testTime = new Date(scheduledFor);
    const diff = testTime.getTime() - now.getTime();
    
    if (diff < 0) return 'Past due';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h ${Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))}m`;
  };

  const handleStartTest = (testId: string) => {
    navigate(`/test/${testId}`);
  };

  const handleViewResults = (resultId: string) => {
    navigate(`/results/${resultId}`);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-roboto-slab font-bold text-primary">TestTrack Pro</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {notifications}
                </Badge>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 h-auto p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className="text-left hidden md:block">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate('/admin')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-roboto-slab font-bold text-foreground mb-2">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground">
            You have {upcomingTests.length} upcoming assessments and {recentResults.length} recent results to review.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Tests */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Upcoming Assessments</span>
                </CardTitle>
                <CardDescription>
                  Scheduled tests and available assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTests.map((test, index) => (
                    <div
                      key={test.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:shadow-md transition-all duration-200"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium text-foreground">{test.title}</h3>
                          <Badge variant={test.status === 'available' ? 'default' : 'secondary'}>
                            {test.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{test.duration}</span>
                          </span>
                          <span>{test.questions} questions</span>
                          <span>Due in {getTimeUntilTest(test.scheduledFor)}</span>
                        </div>
                      </div>
                      <Button
                        onClick={() => handleStartTest(test.id)}
                        className="btn-primary"
                        disabled={test.status !== 'available'}
                      >
                        {test.status === 'available' ? 'Begin Test' : 'Scheduled'}
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Results */}
            <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Recent Results</span>
                </CardTitle>
                <CardDescription>
                  Your latest assessment performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentResults.map((result, index) => (
                    <div
                      key={result.subject}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:shadow-md transition-all duration-200 cursor-pointer"
                      onClick={() => handleViewResults(result.subject.toLowerCase())}
                      style={{ animationDelay: `${(index + 2) * 100}ms` }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-foreground">{result.subject}</h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-primary">{result.score}%</span>
                            <span className={`text-sm font-medium ${
                              result.improvement.startsWith('+') ? 'text-success' : 'text-destructive'
                            }`}>
                              {result.improvement}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{result.date}</span>
                          <Progress value={result.score} className="w-24 h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Results
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <Card className="animate-slide-in" style={{ animationDelay: '300ms' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Progress Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Overall Performance */}
                  <div className="text-center">
                    <div className="relative inline-flex items-center justify-center w-24 h-24 mb-4">
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-muted"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${85 * 2.51} ${100 * 2.51}`}
                          className="text-primary transition-all duration-1000"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary">85%</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Overall Accuracy</p>
                  </div>

                  {/* Subject Progress */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Subject Performance</h4>
                    {[
                      { subject: 'Mathematics', progress: 92 },
                      { subject: 'Physics', progress: 78 },
                      { subject: 'Chemistry', progress: 85 },
                      { subject: 'Biology', progress: 87 }
                    ].map((item, index) => (
                      <div key={item.subject} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{item.subject}</span>
                          <span className="font-medium">{item.progress}%</span>
                        </div>
                        <Progress 
                          value={item.progress} 
                          className="h-2"
                          style={{ 
                            animationDelay: `${(index + 5) * 100}ms`,
                            animation: 'progress-fill 1s ease-out forwards'
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="animate-slide-in" style={{ animationDelay: '400ms' }}>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Schedule
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Performance Reports
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    toast({
                      title: "Support Center",
                      description: "Help and support resources would be available here."
                    });
                  }}
                >
                  <User className="mr-2 h-4 w-4" />
                  Get Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
