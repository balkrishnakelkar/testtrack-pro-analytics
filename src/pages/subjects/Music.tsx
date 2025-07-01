
import React from 'react';
import { Music, BookOpen, Trophy, Clock, Target, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const MusicPage = () => {
  const topics = [
    { name: 'Music Theory', progress: 88, tests: 6, lastScore: 92 },
    { name: 'Instrument Practice', progress: 75, tests: 4, lastScore: 78 },
    { name: 'Music History', progress: 90, tests: 5, lastScore: 93 },
    { name: 'Composition', progress: 82, tests: 3, lastScore: 85 }
  ];

  const recentTests = [
    { id: 1, topic: 'Classical Composers', score: 92, date: '2025-06-28', grade: 'A' },
    { id: 2, topic: 'Chord Progressions', score: 88, date: '2025-06-24', grade: 'A-' },
    { id: 3, topic: 'Jazz History', score: 93, date: '2025-06-20', grade: 'A+' }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Music className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Music</h1>
        </div>
        <p className="text-gray-600">Explore the art of sound, rhythm, and musical expression</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Average Score</p>
                <p className="text-3xl font-bold text-indigo-600">84%</p>
              </div>
              <Target className="h-8 w-8 text-indigo-600" />
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
                <p className="text-sm text-muted-foreground">Practice Hours</p>
                <p className="text-3xl font-bold text-green-600">56h</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Improvement</p>
                <p className="text-3xl font-bold text-purple-600">+14%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Topic Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              <span>Musical Areas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topics.map((topic) => (
                <div key={topic.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{topic.name}</span>
                    <Badge variant="outline">{topic.tests} assessments</Badge>
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
              <Trophy className="h-5 w-5 text-indigo-600" />
              <span>Recent Assessments</span>
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
                    <div className="text-2xl font-bold text-indigo-600">{test.score}%</div>
                    <Badge variant={test.score >= 90 ? 'default' : 'secondary'}>
                      {test.grade}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              View All Assessments
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MusicPage;
