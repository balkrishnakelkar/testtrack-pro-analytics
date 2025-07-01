
import React from 'react';
import { Trophy, Star, Medal, Award, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const achievements = [
  {
    id: 1,
    title: 'Perfect Score',
    description: 'Achieved 100% on a test',
    icon: Trophy,
    earned: true,
    date: '2025-06-15',
    points: 100,
    color: 'text-yellow-600'
  },
  {
    id: 2,
    title: 'Study Streak',
    description: 'Completed tests for 7 consecutive days',
    icon: Star,
    earned: true,
    date: '2025-06-20',
    points: 50,
    color: 'text-blue-600'
  },
  {
    id: 3,
    title: 'Subject Master',
    description: 'Scored above 90% in Mathematics',
    icon: Medal,
    earned: true,
    date: '2025-06-25',
    points: 75,
    color: 'text-green-600'
  },
  {
    id: 4,
    title: 'Quick Learner',
    description: 'Complete a test in under 30 minutes',
    icon: Award,
    earned: false,
    progress: 65,
    points: 25,
    color: 'text-purple-600'
  },
  {
    id: 5,
    title: 'Goal Crusher',
    description: 'Achieve your monthly target',
    icon: Target,
    earned: false,
    progress: 80,
    points: 150,
    color: 'text-red-600'
  }
];

const totalPoints = achievements.filter(a => a.earned).reduce((sum, a) => sum + a.points, 0);

const Achievements = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Achievements</h1>
        <p className="text-gray-600">Track your progress and celebrate your successes</p>
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              <span>Achievement Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{achievements.filter(a => a.earned).length}</div>
                <div className="text-sm text-gray-600">Achievements Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{totalPoints}</div>
                <div className="text-sm text-gray-600">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{achievements.length - achievements.filter(a => a.earned).length}</div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        {achievements.map((achievement) => (
          <Card key={achievement.id} className={`transition-all ${achievement.earned ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${achievement.earned ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <achievement.icon className={`h-6 w-6 ${achievement.earned ? achievement.color : 'text-gray-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{achievement.title}</h3>
                    <p className="text-gray-600">{achievement.description}</p>
                    {achievement.earned && (
                      <p className="text-sm text-green-600 mt-1">Earned on {achievement.date}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={achievement.earned ? 'default' : 'secondary'}>
                    {achievement.points} points
                  </Badge>
                  {achievement.earned && (
                    <div className="mt-2">
                      <Badge className="bg-green-100 text-green-800">Completed</Badge>
                    </div>
                  )}
                </div>
              </div>
              {!achievement.earned && achievement.progress && (
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{achievement.progress}%</span>
                  </div>
                  <Progress value={achievement.progress} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
