import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { Clock, Flag, ChevronLeft, ChevronRight, AlertTriangle, Youtube, CheckCircle } from 'lucide-react';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  youtubeUrl?: string;
  image?: string;
}

const TestInterface = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(90 * 60); // 90 minutes in seconds
  const [testStarted, setTestStarted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  // Mock test data with YouTube links
  const mockTest = {
    id: testId,
    title: 'Mathematics Assessment - Algebra',
    duration: 90,
    questions: [
      {
        id: '1',
        text: 'What is the solution to the equation 2x + 5 = 13?',
        options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
        correctAnswer: 1,
        explanation: 'Subtract 5 from both sides: 2x = 8, then divide by 2: x = 4',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' // Example YouTube link
      },
      {
        id: '2',
        text: 'Which of the following is equivalent to (x + 3)²?',
        options: ['x² + 6x + 9', 'x² + 3x + 9', 'x² + 6x + 6', 'x² + 9'],
        correctAnswer: 0,
        explanation: '(x + 3)² = (x + 3)(x + 3) = x² + 3x + 3x + 9 = x² + 6x + 9',
        youtubeUrl: 'https://www.youtube.com/watch?v=example1'
      },
      {
        id: '3',
        text: 'If f(x) = 2x - 1, what is f(5)?',
        options: ['9', '10', '11', '12'],
        correctAnswer: 0,
        explanation: 'f(5) = 2(5) - 1 = 10 - 1 = 9',
        youtubeUrl: 'https://www.youtube.com/watch?v=example2'
      },
      {
        id: '4',
        text: 'What is the slope of the line passing through points (2, 3) and (6, 11)?',
        options: ['1', '2', '3', '4'],
        correctAnswer: 1,
        explanation: 'Slope = (y₂ - y₁)/(x₂ - x₁) = (11 - 3)/(6 - 2) = 8/4 = 2',
        youtubeUrl: 'https://www.youtube.com/watch?v=example3'
      },
      {
        id: '5',
        text: 'Which expression is equivalent to 3(x - 2) + 2(x + 1)?',
        options: ['5x - 4', '5x - 6', '5x + 4', 'x - 4'],
        correctAnswer: 0,
        explanation: '3(x - 2) + 2(x + 1) = 3x - 6 + 2x + 2 = 5x - 4',
        youtubeUrl: 'https://www.youtube.com/watch?v=example4'
      }
    ] as Question[]
  };

  // Timer effect
  useEffect(() => {
    if (!testStarted || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmitTest();
          return 0;
        }
        if (prev <= 5 * 60 && !showWarning) { // 5 minutes warning
          setShowWarning(true);
          toast({
            title: "Time Warning",
            description: "Only 5 minutes remaining!",
            variant: "destructive"
          });
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, timeRemaining, showWarning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: optionIndex
    }));
  };

  const handleFlagQuestion = () => {
    setFlagged(prev => {
      const newFlagged = new Set(prev);
      if (newFlagged.has(currentQuestion)) {
        newFlagged.delete(currentQuestion);
      } else {
        newFlagged.add(currentQuestion);
      }
      return newFlagged;
    });
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < mockTest.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleSubmitTest = () => {
    const resultId = 'result-' + testId;
    navigate(`/results/${resultId}`, {
      state: {
        testData: mockTest,
        userAnswers: answers,
        timeSpent: (90 * 60) - timeRemaining
      }
    });
  };

  const getQuestionStatus = (index: number) => {
    if (answers.hasOwnProperty(index)) return 'answered';
    if (flagged.has(index)) return 'flagged';
    return 'unanswered';
  };

  const answeredCount = Object.keys(answers).length;
  const progressPercentage = (answeredCount / mockTest.questions.length) * 100;
  const isLastQuestion = currentQuestion === mockTest.questions.length - 1;

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-2 border-primary/20">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-roboto-slab font-bold mb-2">{mockTest.title}</h1>
              <p className="text-muted-foreground">
                {mockTest.questions.length} questions • {mockTest.duration} minutes
              </p>
            </div>
            
            <Alert className="mb-6 text-left border-2 border-amber-200 bg-amber-50/50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important Instructions:</strong>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Once started, the timer cannot be paused</li>
                  <li>• You can flag questions for review</li>
                  <li>• Test will auto-submit when time expires</li>
                  <li>• Ensure stable internet connection</li>
                  <li>• YouTube help videos available for review after completion</li>
                </ul>
              </AlertDescription>
            </Alert>
            
            <Button 
              onClick={() => setTestStarted(true)}
              className="w-full btn-primary h-12 text-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Start Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = mockTest.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-muted/60">
      {/* Header */}
      <header className="bg-white border-b-2 border-primary/20 px-6 py-4 sticky top-0 z-10 shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-roboto-slab font-bold">{mockTest.title}</h1>
            <Badge variant="outline" className="border-2 border-primary/30 bg-primary/5 text-primary font-medium">
              Question {currentQuestion + 1} of {mockTest.questions.length}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 shadow-inner ${
              timeRemaining <= 5 * 60 
                ? 'bg-destructive/10 text-destructive border-destructive/30' 
                : 'bg-primary/5 text-primary border-primary/30'
            }`}>
              <Clock className="h-4 w-4" />
              <span className="font-mono font-medium">{formatTime(timeRemaining)}</span>
            </div>
            
            <Button
              onClick={handleSubmitTest}
              variant="outline"
              className="font-medium border-2 border-primary/30 hover:bg-primary/10 shadow-md hover:shadow-lg transition-all duration-300"
            >
              Submit Test
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Question Content */}
          <div className="lg:col-span-3">
            <Card className="mb-6 shadow-xl border-2 border-primary/10 bg-gradient-to-br from-white to-muted/30">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium">Question {currentQuestion + 1}</h2>
                    <div className="flex items-center space-x-2">
                      {question.youtubeUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(question.youtubeUrl, '_blank')}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 shadow-sm"
                        >
                          <Youtube className="h-4 w-4 mr-1" />
                          Help Video
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleFlagQuestion}
                        className={`border shadow-sm ${
                          flagged.has(currentQuestion) 
                            ? 'text-amber-600 bg-amber-50 border-amber-200' 
                            : 'border-gray-200 hover:bg-amber-50 hover:border-amber-200'
                        }`}
                      >
                        <Flag className="h-4 w-4 mr-1" />
                        {flagged.has(currentQuestion) ? 'Flagged' : 'Flag'}
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-lg leading-relaxed text-foreground">
                    {question.text}
                  </p>
                </div>

                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 ${
                        answers[currentQuestion] === index
                          ? 'border-primary bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-medium shadow-lg'
                          : 'border-border bg-white hover:bg-primary/5 hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shadow-inner ${
                          answers[currentQuestion] === index
                            ? 'border-primary bg-primary'
                            : 'border-border bg-white'
                        }`}>
                          {answers[currentQuestion] === index && (
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="flex-1">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center space-x-2 border-2 border-primary/30 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              <div className="flex-1 mx-8">
                <div className="relative">
                  <Progress 
                    value={progressPercentage} 
                    className="h-3 bg-gradient-to-r from-muted to-muted/80 rounded-full shadow-inner border border-primary/20"
                  />
                  <div 
                    className="absolute top-0 left-0 h-3 bg-gradient-to-r from-primary to-primary/80 rounded-full shadow-lg transition-all duration-1000"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center mt-2 font-medium">
                  {answeredCount} of {mockTest.questions.length} questions answered
                </p>
              </div>

              {isLastQuestion ? (
                <Button
                  onClick={handleSubmitTest}
                  className="btn-primary flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <CheckCircle className="h-4 w-4" />
                  <span>Submit Test</span>
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="btn-primary flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Question Navigator */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-xl border-2 border-primary/10 bg-gradient-to-br from-white to-muted/20">
              <CardContent className="p-6">
                <h3 className="font-medium mb-4 text-lg">Question Navigator</h3>
                
                <div className="grid grid-cols-5 gap-2 mb-6">
                  {mockTest.questions.map((_, index) => {
                    const status = getQuestionStatus(index);
                    return (
                      <button
                        key={index}
                        onClick={() => setCurrentQuestion(index)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 border-2 ${
                          index === currentQuestion
                            ? 'bg-gradient-to-br from-primary to-primary/80 text-white border-primary/50 shadow-lg'
                            : status === 'answered'
                            ? 'bg-gradient-to-br from-green-500 to-green-600 text-white border-green-400'
                            : status === 'flagged'
                            ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white border-amber-400'
                            : 'bg-gradient-to-br from-muted to-muted/80 text-muted-foreground border-muted-foreground/30 hover:from-primary/10 hover:to-primary/5 hover:border-primary/30'
                        }`}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2 p-2 rounded-lg bg-green-50 border border-green-200">
                    <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-green-600 rounded shadow-sm"></div>
                    <span className="font-medium">Answered ({answeredCount})</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-lg bg-amber-50 border border-amber-200">
                    <div className="w-4 h-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded shadow-sm"></div>
                    <span className="font-medium">Flagged ({flagged.size})</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-lg bg-muted/50 border border-muted-foreground/30">
                    <div className="w-4 h-4 bg-gradient-to-br from-muted to-muted/80 rounded shadow-sm"></div>
                    <span className="font-medium">Unanswered ({mockTest.questions.length - answeredCount})</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200 shadow-inner">
                  <div className="flex items-center space-x-2 text-blue-700 text-sm">
                    <Youtube className="h-4 w-4" />
                    <span className="font-medium">Help Available</span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    Click "Help Video" for explanatory videos on each question
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestInterface;
