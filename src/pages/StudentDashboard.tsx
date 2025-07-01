import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Calendar, BookOpen, Award, Clock, Target, Star } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data for recent tests
  const [recentTests, setRecentTests] = useState([
    {
      id: '1',
      subject: 'Mathematics',
      topic: 'Algebra',
      score: 85,
      maxScore: 100,
      date: '2024-01-12',
      duration: '45 min',
      grade: 'A-'
    },
    {
      id: '2',
      subject: 'English',
      topic: 'Literature Analysis',
      score: 92,
      maxScore: 100,
      date: '2024-01-10',
      duration: '60 min',
      grade: 'A'
    },
    {
      id: '3',
      subject: 'Science',
      topic: 'Ecology',
      score: 78,
      maxScore: 100,
      date: '2024-01-08',
      duration: '50 min',
      grade: 'B+'
    }
  ]);

  // Mock data for upcoming tests
  const [upcomingTests, setUpcomingTests] = useState([
    {
      id: '1',
      subject: 'Physics',
      topic: 'Mechanics',
      date: '2024-01-16',
      time: '10:30 AM',
      duration: '60 min'
    },
    {
      id: '2',
      subject: 'History',
      topic: 'World War II',
      date: '2024-01-18',
      time: '02:00 PM',
      duration: '75 min'
    },
    {
      id: '3',
      subject: 'Chemistry',
      topic: 'Organic Chemistry',
      date: '2024-01-20',
      time: '11:00 AM',
      duration: '60 min'
    }
  ]);

  // Mock data for subject progress
  const [subjectProgress, setSubjectProgress] = useState([
    { subject: 'Mathematics', progress: 87, tests: 8, color: 'bg-blue-500' },
    { subject: 'English', progress: 92, tests: 10, color: 'bg-red-500' },
    { subject: 'Science', progress: 78, tests: 6, color: 'bg-green-500' },
    { subject: 'History', progress: 85, tests: 7, color: 'bg-yellow-500' }
  ]);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-roboto-slab font-bold text-foreground mb-2">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-muted-foreground">
          Ready to continue your learning journey? Let's see how you're progressing.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-hover enhanced-glow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Score</p>
                <p className="text-3xl font-bold text-primary">87%</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover enhanced-glow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tests Completed</p>
                <p className="text-3xl font-bold text-green-600">12</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Award className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover enhanced-glow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upcoming Tests</p>
                <p className="text-3xl font-bold text-amber-600">3</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover enhanced-glow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Study Streak</p>
                <p className="text-3xl font-bold text-purple-600">7 days</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Test Results */}
          <Card className="morphing-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Recent Test Results</span>
              </CardTitle>
              <CardDescription>
                Your latest assessment performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTests.map((test) => (
                  <div key={test.id} className="flex items-center justify-between p-4 border rounded-lg test-card">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium">{test.subject} - {test.topic}</h3>
                        <Badge variant={test.score >= 90 ? 'default' : test.score >= 70 ? 'secondary' : 'destructive'}>
                          {test.grade}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{test.date}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{test.duration}</span>
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{test.score}%</div>
                      <div className="text-sm text-muted-foreground">of {test.maxScore}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Subject Progress */}
          <Card className="morphing-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>Subject Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {subjectProgress.map((subject) => (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{subject.subject}</span>
                      <span className="text-sm text-muted-foreground">{subject.tests} tests</span>
                    </div>
                    <Progress value={subject.progress} className="h-3" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Progress</span>
                      <span>{subject.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Tests */}
          <Card className="morphing-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Upcoming Tests</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTests.map((test) => (
                  <div key={test.id} className="p-4 border rounded-lg gradient-border">
                    <h3 className="font-medium mb-2">{test.subject}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{test.topic}</p>
                    <div className="flex justify-between text-sm">
                      <span>{test.date}</span>
                      <span>{test.time}</span>
                    </div>
                    <div className="mt-2">
                      <Button 
                        size="sm" 
                        className="w-full" 
                        onClick={() => navigate(`/test/${test.id}`)}
                      >
                        Start Test
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="morphing-shadow">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start enhanced-glow">
                <BookOpen className="mr-2 h-4 w-4" />
                Study Materials
              </Button>
              <Button variant="outline" className="w-full justify-start enhanced-glow">
                <Calendar className="mr-2 h-4 w-4" />
                View Schedule
              </Button>
              <Button variant="outline" className="w-full justify-start enhanced-glow">
                <TrendingUp className="mr-2 h-4 w-4" />
                Performance Report
              </Button>
              <Button variant="outline" className="w-full justify-start enhanced-glow">
                <Award className="mr-2 h-4 w-4" />
                Achievements
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
