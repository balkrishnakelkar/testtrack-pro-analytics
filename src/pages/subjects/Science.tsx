
import React from 'react';
import { Beaker, BookOpen, Trophy, Clock, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const Science = () => {
  const topics = [
    { name: 'Biology', progress: 92, tests: 6, lastScore: 95 },
    { name: 'Chemistry', progress: 78, tests: 5, lastScore: 82 },
    { name: 'Physics', progress: 85, tests: 4, lastScore: 88 },
    { name: 'Environmental Science', progress: 88, tests: 3, lastScore: 90 }
  ];

  const recentTests = [
    { id: 1, topic: 'Cell Structure', score: 95, date: '2025-06-30', grade: 'A+' },
    { id: 2, topic: 'Chemical Bonds', score: 82, date: '2025-06-26', grade: 'B+' },
    { id: 3, topic: 'Motion & Forces', score: 88, date: '2025-06-22', grade: 'A-' }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Beaker className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Science</h1>
        </div>
        <p className="text-gray-600">Explore the wonders of scientific discovery and experimentation</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-3xl font-bold text-green-600">88%</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Tests Completed</p>
                <p className="text-3xl font-bold text-blue-600">18</p>
              </div>
              <Trophy className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Lab Hours</p>
                <p className="text-3xl font-bold text-purple-600">32h</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Improvement</p>
                <p className="text-3xl font-bold text-amber-600">+12%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Topic Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-green-600" />
              <span>Subject Areas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topics.map((topic) => (
                <div key={topic.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{topic.name}</span>
                    <Badge variant="outline">{topic.tests} tests</Badge>
                  </div>
                  <Progress value={topic.progress} className="h-3" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Progress: {topic.progress}%</span>
                    <span>Last Score: {topic.lastScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Tests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-green-600" />
              <span>Recent Tests</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTests.map((test) => (
                <div key={test.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{test.topic}</h3>
                    <p className="text-sm text-muted-foreground">{test.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{test.score}%</div>
                    <Badge variant={test.score >= 90 ? 'default' : 'secondary'}>
                      {test.grade}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View All Tests
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Science;
