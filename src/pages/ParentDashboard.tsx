
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { Bell, User, Settings, TrendingUp, Calendar, BookOpen, Award, AlertCircle, Users } from 'lucide-react';

const ParentDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedChild, setSelectedChild] = useState('all');
  
  // Mock data for parent's children
  const children = [
    {
      id: '1',
      name: 'Emma Johnson',
      grade: 'Grade 10',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=EJ',
      overallScore: 87,
      recentTests: 3,
      upcomingTests: 2
    },
    {
      id: '2', 
      name: 'Michael Johnson',
      grade: 'Grade 8',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MJ',
      overallScore: 92,
      recentTests: 2,
      upcomingTests: 1
    }
  ];

  const recentActivity = [
    {
      child: 'Emma Johnson',
      test: 'Mathematics - Algebra',
      score: 85,
      date: '2024-01-12',
      subject: 'Mathematics',
      grade: 'A-'
    },
    {
      child: 'Michael Johnson', 
      test: 'Science - Biology',
      score: 94,
      date: '2024-01-11',
      subject: 'Biology',
      grade: 'A'
    },
    {
      child: 'Emma Johnson',
      test: 'English Literature',
      score: 78,
      date: '2024-01-10',
      subject: 'English',
      grade: 'B+'
    }
  ];

  const upcomingTests = [
    {
      child: 'Emma Johnson',
      test: 'Physics - Mechanics',
      date: '2024-01-16',
      time: '10:30 AM',
      subject: 'Physics'
    },
    {
      child: 'Michael Johnson',
      test: 'Mathematics - Geometry', 
      date: '2024-01-17',
      time: '2:00 PM',
      subject: 'Mathematics'
    }
  ];

  const alerts = [
    {
      type: 'low_performance',
      child: 'Emma Johnson',
      message: 'Below average performance in Physics',
      severity: 'warning'
    }
  ];

  const getSelectedChildData = () => {
    if (selectedChild === 'all') return null;
    return children.find(child => child.id === selectedChild);
  };

  const filteredActivity = selectedChild === 'all' 
    ? recentActivity 
    : recentActivity.filter(activity => activity.child === children.find(c => c.id === selectedChild)?.name);

  const filteredUpcoming = selectedChild === 'all'
    ? upcomingTests
    : upcomingTests.filter(test => test.child === children.find(c => c.id === selectedChild)?.name);

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
            <Badge variant="secondary">Parent Portal</Badge>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              {alerts.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {alerts.length}
                </Badge>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 h-auto p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0) || 'P'}</AvatarFallback>
                  </Avatar>
                  <div className="text-left hidden md:block">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">Parent</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-roboto-slab font-bold text-foreground mb-2">
                Parent Dashboard
              </h1>
              <p className="text-muted-foreground">
                Monitor your children's academic progress and upcoming assessments.
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Select value={selectedChild} onValueChange={setSelectedChild}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Children</SelectItem>
                  {children.map(child => (
                    <SelectItem key={child.id} value={child.id}>
                      {child.name} - {child.grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Children Overview */}
            {selectedChild === 'all' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Children Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {children.map(child => (
                      <div key={child.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center space-x-3 mb-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={child.avatar} alt={child.name} />
                            <AvatarFallback>{child.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{child.name}</h3>
                            <p className="text-sm text-muted-foreground">{child.grade}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Overall Performance</span>
                            <span className="font-medium">{child.overallScore}%</span>
                          </div>
                          <Progress value={child.overallScore} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{child.recentTests} recent tests</span>
                            <span>{child.upcomingTests} upcoming</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Test Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Recent Test Results</span>
                </CardTitle>
                <CardDescription>
                  Latest assessment performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium">{activity.test}</h3>
                          <Badge variant={activity.score >= 90 ? 'default' : activity.score >= 70 ? 'secondary' : 'destructive'}>
                            {activity.grade}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{activity.child}</span>
                          <span>{activity.subject}</span>
                          <span>{activity.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{activity.score}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Tests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Upcoming Tests</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUpcoming.map((test, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{test.test}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{test.child}</span>
                          <span>{test.subject}</span>
                        </div>
                      </div>
                      <div className="text-right text-sm">
                        <div className="font-medium">{test.date}</div>
                        <div className="text-muted-foreground">{test.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Alerts */}
            {alerts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-amber-600">
                    <AlertCircle className="h-5 w-5" />
                    <span>Alerts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {alerts.map((alert, index) => (
                      <div key={index} className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="font-medium text-amber-800">{alert.child}</div>
                        <div className="text-sm text-amber-700">{alert.message}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Full Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Test Schedule
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Award className="mr-2 h-4 w-4" />
                  Achievements
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Contact Teachers
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParentDashboard;
