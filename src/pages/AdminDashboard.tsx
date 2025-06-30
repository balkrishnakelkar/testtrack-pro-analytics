
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Users, TrendingUp, Clock, AlertTriangle, Download, Search, Filter, User, Settings, Bell } from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for admin dashboard
  const cohortPerformanceData = [
    { date: 'Jan 1', avgScore: 78, testsTaken: 45 },
    { date: 'Jan 8', avgScore: 82, testsTaken: 52 },
    { date: 'Jan 15', avgScore: 79, testsTaken: 48 },
    { date: 'Jan 22', avgScore: 85, testsTaken: 58 },
    { date: 'Jan 29', avgScore: 87, testsTaken: 61 },
    { date: 'Feb 5', avgScore: 84, testsTaken: 55 },
    { date: 'Feb 12', avgScore: 89, testsTaken: 63 }
  ];

  const subjectPerformanceData = [
    { subject: 'Mathematics', avgScore: 85, students: 120, improvement: '+5.2%' },
    { subject: 'Physics', avgScore: 78, students: 98, improvement: '+2.1%' },
    { subject: 'Chemistry', avgScore: 82, students: 105, improvement: '+7.8%' },
    { subject: 'Biology', avgScore: 91, students: 87, improvement: '+3.4%' },
    { subject: 'English', avgScore: 76, students: 134, improvement: '-1.2%' }
  ];

  const studentData = [
    { id: '1', name: 'Emma Wilson', email: 'emma.wilson@school.edu', lastTest: '2024-01-12', avgScore: 94, progress: 'excellent', status: 'active' },
    { id: '2', name: 'Liam Johnson', email: 'liam.johnson@school.edu', lastTest: '2024-01-11', avgScore: 67, progress: 'needs-attention', status: 'active' },
    { id: '3', name: 'Sophia Brown', email: 'sophia.brown@school.edu', lastTest: '2024-01-10', avgScore: 89, progress: 'good', status: 'active' },
    { id: '4', name: 'Noah Davis', email: 'noah.davis@school.edu', lastTest: '2024-01-09', avgScore: 82, progress: 'good', status: 'active' },
    { id: '5', name: 'Olivia Garcia', email: 'olivia.garcia@school.edu', lastTest: '2024-01-08', avgScore: 76, progress: 'fair', status: 'inactive' }
  ];

  const upcomingTests = [
    { id: '1', title: 'Calculus Midterm', class: 'AP Calculus', date: '2024-01-20', students: 28 },
    { id: '2', title: 'Chemistry Lab Quiz', class: 'Chemistry 101', date: '2024-01-21', students: 35 },
    { id: '3', title: 'Physics Final', class: 'AP Physics', date: '2024-01-25', students: 22 }
  ];

  const getProgressColor = (progress: string) => {
    switch (progress) {
      case 'excellent': return 'bg-success text-white';
      case 'good': return 'bg-primary text-white';
      case 'fair': return 'bg-amber-500 text-white';
      case 'needs-attention': return 'bg-destructive text-white';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getProgressLabel = (progress: string) => {
    switch (progress) {
      case 'excellent': return 'Excellent';
      case 'good': return 'Good';
      case 'fair': return 'Fair';
      case 'needs-attention': return 'Needs Attention';
      default: return 'Unknown';
    }
  };

  const filteredStudents = studentData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <Badge variant="outline" className="text-primary border-primary">
              Admin Dashboard
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                2
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
                  Student View
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
            Administrator Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor student performance and manage assessments across your institution.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-3xl font-bold text-primary">1,247</p>
                  <p className="text-sm text-success">+5.2% from last month</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <p className="text-3xl font-bold text-primary">84.2%</p>
                  <p className="text-sm text-success">+2.1% improvement</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tests This Week</p>
                  <p className="text-3xl font-bold text-primary">63</p>
                  <p className="text-sm text-muted-foreground">8 scheduled</p>
                </div>
                <Clock className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Alerts</p>
                  <p className="text-3xl font-bold text-destructive">7</p>
                  <p className="text-sm text-muted-foreground">Require attention</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="tests">Tests</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Cohort Performance Chart */}
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Cohort Performance Trend</CardTitle>
                  <CardDescription>Average scores over the last 7 weeks</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={cohortPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[70, 95]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="avgScore" stroke="#1A73E8" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Subject Performance */}
              <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                <CardHeader>
                  <CardTitle>Subject Performance</CardTitle>
                  <CardDescription>Average scores by subject area</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={subjectPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" angle={-45} textAnchor="end" height={80} />
                      <YAxis domain={[70, 95]} />
                      <Tooltip />
                      <Bar dataKey="avgScore" fill="#1A73E8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Subject Details */}
            <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle>Subject Analysis</CardTitle>
                <CardDescription>Detailed performance metrics by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjectPerformanceData.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div className="flex-1">
                        <h4 className="font-medium">{subject.subject}</h4>
                        <p className="text-sm text-muted-foreground">{subject.students} students enrolled</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{subject.avgScore}%</div>
                        <div className={`text-sm font-medium ${
                          subject.improvement.startsWith('+') ? 'text-success' : 'text-destructive'
                        }`}>
                          {subject.improvement}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            {/* Student Management Controls */}
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
                <CardDescription>Search and filter students by performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search students by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="calculus">AP Calculus</SelectItem>
                      <SelectItem value="physics">AP Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry 101</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>

                {/* Student Table */}
                <div className="border border-border rounded-lg">
                  <div className="p-4 border-b border-border">
                    <div className="grid grid-cols-12 gap-4 font-medium text-sm text-muted-foreground">
                      <div className="col-span-4">Student</div>
                      <div className="col-span-2">Last Test</div>
                      <div className="col-span-2">Avg Score</div>
                      <div className="col-span-2">Progress</div>
                      <div className="col-span-2">Actions</div>
                    </div>
                  </div>
                  <div className="divide-y divide-border">
                    {filteredStudents.map((student, index) => (
                      <div
                        key={student.id}
                        className="p-4 hover:bg-muted/50 transition-colors animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-4 flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`} />
                              <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-muted-foreground">{student.email}</div>
                            </div>
                          </div>
                          <div className="col-span-2 text-sm">{student.lastTest}</div>
                          <div className="col-span-2">
                            <span className="text-lg font-bold text-primary">{student.avgScore}%</span>
                          </div>
                          <div className="col-span-2">
                            <Badge className={getProgressColor(student.progress)}>
                              {getProgressLabel(student.progress)}
                            </Badge>
                          </div>
                          <div className="col-span-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Actions
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Send Message</DropdownMenuItem>
                                <DropdownMenuItem>Reset Password</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tests</CardTitle>
                <CardDescription>Scheduled assessments requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTests.map((test, index) => (
                    <div
                      key={test.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div>
                        <h4 className="font-medium">{test.title}</h4>
                        <p className="text-sm text-muted-foreground">{test.class} • {test.students} students</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{test.date}</div>
                        <div className="text-sm text-muted-foreground">Scheduled</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Export Reports</CardTitle>
                <CardDescription>Generate comprehensive reports for analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2">
                    <Download className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Student Performance</div>
                      <div className="text-sm text-muted-foreground">Individual progress reports</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2">
                    <Download className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Class Analytics</div>
                      <div className="text-sm text-muted-foreground">Cohort performance data</div>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-start space-y-2">
                    <Download className="h-5 w-5" />
                    <div className="text-left">
                      <div className="font-medium">Test Results</div>
                      <div className="text-sm text-muted-foreground">Detailed assessment data</div>
                    </div>
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
