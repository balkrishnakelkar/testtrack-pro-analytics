
import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Clock, Target, TrendingUp, BookOpen, CheckCircle, XCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ResultsAnalytics = () => {
  const { resultId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Mock result data (in real app, this would come from API or location state)
  const resultData = location.state || {
    testData: {
      title: 'Mathematics Assessment - Algebra',
      questions: [
        { id: '1', text: 'What is the solution to the equation 2x + 5 = 13?', options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'], correctAnswer: 1, explanation: 'Subtract 5 from both sides: 2x = 8, then divide by 2: x = 4' },
        { id: '2', text: 'Which of the following is equivalent to (x + 3)²?', options: ['x² + 6x + 9', 'x² + 3x + 9', 'x² + 6x + 6', 'x² + 9'], correctAnswer: 0, explanation: '(x + 3)² = (x + 3)(x + 3) = x² + 3x + 3x + 9 = x² + 6x + 9' },
        { id: '3', text: 'If f(x) = 2x - 1, what is f(5)?', options: ['9', '10', '11', '12'], correctAnswer: 0, explanation: 'f(5) = 2(5) - 1 = 10 - 1 = 9' },
        { id: '4', text: 'What is the slope of the line passing through points (2, 3) and (6, 11)?', options: ['1', '2', '3', '4'], correctAnswer: 1, explanation: 'Slope = (y₂ - y₁)/(x₂ - x₁) = (11 - 3)/(6 - 2) = 8/4 = 2' },
        { id: '5', text: 'Which expression is equivalent to 3(x - 2) + 2(x + 1)?', options: ['5x - 4', '5x - 6', '5x + 4', 'x - 4'], correctAnswer: 0, explanation: '3(x - 2) + 2(x + 1) = 3x - 6 + 2x + 2 = 5x - 4' }
      ]
    },
    userAnswers: { 0: 1, 1: 0, 2: 0, 3: 1, 4: 2 },
    timeSpent: 2700 // 45 minutes
  };

  const { testData, userAnswers, timeSpent } = resultData;
  
  // Calculate results
  const totalQuestions = testData.questions.length;
  const correctAnswers = testData.questions.filter((q, index) => 
    userAnswers[index] === q.correctAnswer
  ).length;
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  const timeSpentMinutes = Math.floor(timeSpent / 60);
  const avgTimePerQuestion = Math.round(timeSpent / totalQuestions);

  // Topic breakdown (mock data)
  const topicData = [
    { topic: 'Linear Equations', correct: 2, total: 2, percentage: 100 },
    { topic: 'Quadratic Expressions', correct: 1, total: 2, percentage: 50 },
    { topic: 'Functions', correct: 1, total: 1, percentage: 100 }
  ];

  // Performance data for charts
  const performanceData = topicData.map(topic => ({
    name: topic.topic,
    score: topic.percentage,
    questions: topic.total
  }));

  const pieData = [
    { name: 'Correct', value: correctAnswers, color: '#34A853' },
    { name: 'Incorrect', value: totalQuestions - correctAnswers, color: '#EA4335' }
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-primary';
    if (score >= 50) return 'text-amber-600';
    return 'text-destructive';
  };

  const getScoreBadge = (score) => {
    if (score >= 90) return { label: 'Excellent', variant: 'default', className: 'bg-success' };
    if (score >= 70) return { label: 'Good', variant: 'default', className: 'bg-primary' };
    if (score >= 50) return { label: 'Fair', variant: 'secondary' };
    return { label: 'Needs Improvement', variant: 'destructive' };
  };

  const scoreBadge = getScoreBadge(score);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-xl font-roboto-slab font-bold">Assessment Results</h1>
              <p className="text-sm text-muted-foreground">{testData.title}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary Banner */}
        <Card className="mb-8 animate-fade-in">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className={`text-4xl font-bold mb-2 ${getScoreColor(score)}`}>
                  {score}%
                </div>
                <Badge className={scoreBadge.className}>
                  {scoreBadge.label}
                </Badge>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Target className="h-6 w-6 text-primary mr-2" />
                  <span className="text-2xl font-bold">{correctAnswers}/{totalQuestions}</span>
                </div>
                <p className="text-sm text-muted-foreground">Questions Correct</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="h-6 w-6 text-primary mr-2" />
                  <span className="text-2xl font-bold">{timeSpentMinutes}m</span>
                </div>
                <p className="text-sm text-muted-foreground">Time Spent</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-primary mr-2" />
                  <span className="text-2xl font-bold">{avgTimePerQuestion}s</span>
                </div>
                <p className="text-sm text-muted-foreground">Avg per Question</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="questions">Question Review</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Breakdown Chart */}
              <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                <CardHeader>
                  <CardTitle>Performance by Topic</CardTitle>
                  <CardDescription>Your accuracy across different topics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                      <Bar dataKey="score" fill="#1A73E8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Score Distribution */}
              <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                <CardHeader>
                  <CardTitle>Score Distribution</CardTitle>
                  <CardDescription>Breakdown of correct vs incorrect answers</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Topic Breakdown */}
            <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
              <CardHeader>
                <CardTitle>Detailed Topic Analysis</CardTitle>
                <CardDescription>Performance breakdown by subject area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topicData.map((topic, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{topic.topic}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {topic.correct}/{topic.total}
                          </span>
                          <span className={`font-bold ${getScoreColor(topic.percentage)}`}>
                            {topic.percentage}%
                          </span>
                        </div>
                      </div>
                      <Progress value={topic.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="space-y-4">
            {testData.questions.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              const wasAnswered = userAnswer !== undefined;

              return (
                <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2">
                              {isCorrect ? (
                                <CheckCircle className="h-5 w-5 text-success" />
                              ) : wasAnswered ? (
                                <XCircle className="h-5 w-5 text-destructive" />
                              ) : (
                                <AlertCircle className="h-5 w-5 text-amber-500" />
                              )}
                              <span className="font-medium">Question {index + 1}</span>
                            </div>
                            <Badge variant={isCorrect ? 'default' : wasAnswered ? 'destructive' : 'secondary'}>
                              {isCorrect ? 'Correct' : wasAnswered ? 'Incorrect' : 'Skipped'}
                            </Badge>
                          </div>
                          <ChevronDown className="h-4 w-4" />
                        </div>
                        <CardDescription className="text-left">
                          {question.text}
                        </CardDescription>
                      </CardHeader>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <div className="space-y-4">
                          <div className="grid gap-2">
                            {question.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className={`p-3 rounded-lg border ${
                                  optionIndex === question.correctAnswer
                                    ? 'bg-success/10 border-success text-success'
                                    : optionIndex === userAnswer && userAnswer !== question.correctAnswer
                                    ? 'bg-destructive/10 border-destructive text-destructive'
                                    : 'bg-muted border-border'
                                }`}
                              >
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium">{String.fromCharCode(65 + optionIndex)}.</span>
                                  <span>{option}</span>
                                  {optionIndex === question.correctAnswer && (
                                    <Badge variant="outline" className="ml-auto text-success border-success">
                                      Correct
                                    </Badge>
                                  )}
                                  {optionIndex === userAnswer && userAnswer !== question.correctAnswer && (
                                    <Badge variant="outline" className="ml-auto text-destructive border-destructive">
                                      Your Answer
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="bg-accent/50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2 flex items-center">
                              <BookOpen className="h-4 w-4 mr-2" />
                              Explanation
                            </h4>
                            <p className="text-sm text-muted-foreground">{question.explanation}</p>
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Strengths */}
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-success">Strengths</CardTitle>
                  <CardDescription>Areas where you performed well</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">Linear Equations: 100% accuracy</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">Functions: Perfect understanding</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-sm">Good time management</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Areas for Improvement */}
              <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                <CardHeader>
                  <CardTitle className="text-amber-600">Areas for Improvement</CardTitle>
                  <CardDescription>Focus areas for your next study session</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <span className="text-sm">Quadratic Expressions: 50% accuracy</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <span className="text-sm">Review expansion formulas</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <span className="text-sm">Practice slope calculations</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Study Recommendations */}
            <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle>Recommended Study Resources</CardTitle>
                <CardDescription>Personalized recommendations based on your performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-medium mb-2">Quadratic Expressions</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Review expansion and factoring techniques
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Study Now
                    </Button>
                  </div>
                  
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-medium mb-2">Coordinate Geometry</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Practice slope and line equations
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Practice Problems
                    </Button>
                  </div>
                  
                  <div className="p-4 border border-border rounded-lg">
                    <h4 className="font-medium mb-2">Mixed Practice</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Combined algebra problems
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Take Quiz
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default ResultsAnalytics;
