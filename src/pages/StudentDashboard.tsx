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
    <div className="p-6 space-y-6 bg-background">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-semibold text-foreground mb-2">
          Welcome back, {user?.name?.split(' ')[0]}!
        </h1>
        <p className="text-lg text-muted-foreground">
          Ready to continue your learning journey? Let's see how you're progressing.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="metric-card animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <span className="status-success">A+</span>
          </div>
          <div className="metric-value">87%</div>
          <div className="metric-label">Overall Score</div>
        </div>

        <div className="metric-card animate-fade-in" style={{animationDelay: "0.1s"}}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
              <Award className="h-6 w-6 text-success" />
            </div>
            <span className="status-info">Active</span>
          </div>
          <div className="metric-value">12</div>
          <div className="metric-label">Tests Completed</div>
        </div>

        <div className="metric-card animate-fade-in" style={{animationDelay: "0.2s"}}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center">
              <Calendar className="h-6 w-6 text-warning" />
            </div>
            <span className="status-warning">Due Soon</span>
          </div>
          <div className="metric-value">3</div>
          <div className="metric-label">Upcoming Tests</div>
        </div>

        <div className="metric-card animate-fade-in" style={{animationDelay: "0.3s"}}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-info/10 rounded-xl flex items-center justify-center">
              <Star className="h-6 w-6 text-info" />
            </div>
            <span className="status-success">On Fire</span>
          </div>
          <div className="metric-value">7</div>
          <div className="metric-label">Day Streak</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Tests */}
          <div className="elite-card-featured">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-foreground text-xl">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <span>Upcoming Tests</span>
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Your scheduled assessments for this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTests.map((test, index) => (
                  <div key={test.id} className="elite-card p-6 animate-slide-in" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground mb-1">{test.subject}</h3>
                        <p className="text-muted-foreground">{test.topic}</p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <div>{test.date}</div>
                        <div className="font-semibold text-primary">{test.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{test.duration}</span>
                      </div>
                      <button 
                        className="elite-btn-primary"
                        onClick={() => navigate(`/test/${test.id}`)}
                      >
                        Start Test
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>

          {/* Subject Progress */}
          <div className="elite-card-featured">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-foreground text-xl">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <span>Subject Progress</span>
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Track your learning progress across subjects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {subjectProgress.map((subject, index) => (
                  <div key={subject.subject} className="elite-card p-5" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-semibold text-foreground text-lg">{subject.subject}</span>
                      <div className="text-sm text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                        {subject.tests} tests completed
                      </div>
                    </div>
                    <div className="elite-progress mb-3">
                      <div 
                        className="elite-progress-fill" 
                        style={{width: `${subject.progress}%`}}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-bold text-primary text-lg">{subject.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Recent Test Results */}
          <div className="elite-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-foreground">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <span>Recent Results</span>
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Your latest test performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTests.map((test, index) => (
                  <div key={test.id} className="elite-card p-4 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{test.subject}</h3>
                        <p className="text-xs text-muted-foreground">{test.topic}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{test.score}%</div>
                        <span className={`status-${test.score >= 90 ? 'success' : test.score >= 70 ? 'info' : 'warning'}`}>
                          {test.grade}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{test.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>

          {/* Quick Actions */}
          <div className="elite-card">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
              <CardDescription className="text-muted-foreground">
                Fast access to key features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="elite-btn-ghost w-full justify-start">
                <BookOpen className="mr-3 h-5 w-5" />
                Study Materials
              </button>
              <button className="elite-btn-ghost w-full justify-start">
                <Calendar className="mr-3 h-5 w-5" />
                View Schedule
              </button>
              <button className="elite-btn-ghost w-full justify-start">
                <TrendingUp className="mr-3 h-5 w-5" />
                Performance Report
              </button>
              <button className="elite-btn-ghost w-full justify-start">
                <Award className="mr-3 h-5 w-5" />
                Achievements
              </button>
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
