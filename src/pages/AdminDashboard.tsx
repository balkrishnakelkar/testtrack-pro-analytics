
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TestScheduler } from '../components/TestScheduler';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { 
  Bell, User, Settings, TrendingUp, Calendar, Users, BookOpen, 
  BarChart3, FileText, Search, Filter, Download, Eye, Edit, Trash2 
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');

  // Mock data
  const scheduledTests = [
    {
      id: '1',
      title: 'Mathematics Assessment - Algebra',
      subject: 'Mathematics',
      date: '2024-01-16',
      time: '10:30',
      duration: 90,
      groups: ['Grade 10A', 'Grade 10B'],
      status: 'scheduled',
      participants: 45
    },
    {
      id: '2',
      title: 'Physics Quiz - Mechanics',
      subject: 'Physics',
      date: '2024-01-17',
      time: '14:00',
      duration: 45,
      groups: ['Grade 11 Science'],
      status: 'scheduled',
      participants: 32
    }
  ];

  const recentResults = [
    {
      id: '1',
      testTitle: 'Chemistry Lab Assessment',
      subject: 'Chemistry',
      date: '2024-01-12',
      participants: 38,
      avgScore: 84,
      passRate: 92
    },
    {
      id: '2',
      testTitle: 'English Literature Essay',
      subject: 'English',
      date: '2024-01-10',
      participants: 42,
      avgScore: 78,
      passRate: 85
    }
  ];

  const students = [
    {
      id: '1',
      name: 'Emma Johnson',
      email: 'emma.j@school.edu',
      grade: 'Grade 10',
      lastTest: '2024-01-12',
      avgScore: 87,
      testsCompleted: 12
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'michael.c@school.edu',
      grade: 'Grade 11',
      lastTest: '2024-01-11',
      avgScore: 92,
      testsCompleted: 15
    }
  ];

  const handleViewResults = (testId: string) => {
    navigate(`/results/${testId}`);
  };

  const handleEditTest = (testId: string) => {
    toast({
      title: "Edit Test",
      description: "Test editing functionality would be implemented here."
    });
  };

  const handleDeleteTest = (testId: string) => {
    toast({
      title: "Delete Test",
      description: "Test deletion functionality would be implemented here.",
      variant: "destructive"
    });
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
            <Badge variant="secondary">
              {user?.role === 'admin' ? 'Administrator' : 'Educator'}
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                3
              </Badge>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 h-auto p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0) || 'A'}</AvatarFallback>
                  </Avatar>
                  <div className="text-left hidden md:block">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <User className="mr-2 h-4 w-4" />
                  Switch to Student View
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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-roboto-slab font-bold text-foreground mb-2">
              {user?.role === 'admin' ? 'Admin Dashboard' : 'Educator Dashboard'}
            </h1>
            <p className="text-muted-foreground">
              Manage assessments, monitor student progress, and analyze performance data.
            </p>
          </div>
          
          <TestScheduler />
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tests">Tests</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Tests</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">+2 scheduled today</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">84.2%</div>
                  <p className="text-xs text-muted-foreground">+3.1% from last week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94.7%</div>
                  <p className="text-xs text-muted-foreground">+1.2% from last week</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Scheduled Tests</CardTitle>
                  <CardDescription>Upcoming assessments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scheduledTests.slice(0, 3).map(test => (
                      <div key={test.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{test.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {test.date} at {test.time} • {test.participants} students
                          </p>
                        </div>
                        <Badge variant="outline">{test.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Results</CardTitle>
                  <CardDescription>Latest test performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentResults.map(result => (
                      <div key={result.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{result.testTitle}</h4>
                          <p className="text-sm text-muted-foreground">
                            {result.participants} participants • {result.passRate}% pass rate
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">{result.avgScore}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tests" className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-64"
                  />
                </div>
                <Select value={filterSubject} onValueChange={setFilterSubject}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Tests</CardTitle>
                <CardDescription>Manage your assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheduledTests.map(test => (
                    <div key={test.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-medium">{test.title}</h3>
                          <Badge variant={test.status === 'scheduled' ? 'default' : 'secondary'}>
                            {test.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{test.subject}</span>
                          <span>{test.date} at {test.time}</span>
                          <span>{test.duration} min</span>
                          <span>{test.participants} students</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewResults(test.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditTest(test.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTest(test.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>Monitor student progress and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map(student => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{student.name}</h3>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                          <p className="text-sm text-muted-foreground">{student.grade}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-4">
                          <div>
                            <div className="text-lg font-bold text-primary">{student.avgScore}%</div>
                            <p className="text-xs text-muted-foreground">{student.testsCompleted} tests</p>
                          </div>
                          <Progress value={student.avgScore} className="w-16 h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>Detailed insights and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Advanced Analytics</h3>
                  <p className="text-muted-foreground mb-4">
                    Detailed charts and reports would be displayed here using the Recharts library.
                  </p>
                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
