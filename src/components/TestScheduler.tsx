
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { CalendarIcon, Plus, Clock, Users } from 'lucide-react';
import { format } from 'date-fns';

interface TestData {
  title: string;
  subject: string;
  duration: number;
  questions: number;
  scheduledDate: Date | undefined;
  scheduledTime: string;
  instructions: string;
  targetGroups: string[];
}

export const TestScheduler = () => {
  const [open, setOpen] = useState(false);
  const [testData, setTestData] = useState<TestData>({
    title: '',
    subject: '',
    duration: 60,
    questions: 20,
    scheduledDate: undefined,
    scheduledTime: '09:00',
    instructions: '',
    targetGroups: []
  });

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 
    'English', 'History', 'Geography', 'Computer Science'
  ];

  const groups = [
    'Grade 9A', 'Grade 9B', 'Grade 10A', 'Grade 10B',
    'Grade 11 Science', 'Grade 11 Arts', 'Grade 12 Science', 'Grade 12 Arts'
  ];

  const handleScheduleTest = () => {
    if (!testData.title || !testData.subject || !testData.scheduledDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    console.log('Scheduling test:', testData);
    toast({
      title: "Test Scheduled",
      description: `${testData.title} has been scheduled for ${format(testData.scheduledDate, 'PPP')} at ${testData.scheduledTime}`,
    });
    
    setOpen(false);
    setTestData({
      title: '',
      subject: '',
      duration: 60,
      questions: 20,
      scheduledDate: undefined,
      scheduledTime: '09:00',
      instructions: '',
      targetGroups: []
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="btn-primary">
          <Plus className="h-4 w-4 mr-2" />
          Schedule New Test
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule New Assessment</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Test Title *</Label>
              <Input
                id="title"
                value={testData.title}
                onChange={(e) => setTestData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Mid-term Mathematics Assessment"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Select value={testData.subject} onValueChange={(value) => setTestData(prev => ({ ...prev, subject: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={testData.duration}
                onChange={(e) => setTestData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                min="15"
                max="240"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="questions">Number of Questions</Label>
              <Input
                id="questions"
                type="number"
                value={testData.questions}
                onChange={(e) => setTestData(prev => ({ ...prev, questions: parseInt(e.target.value) }))}
                min="5"
                max="100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Scheduled Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {testData.scheduledDate ? format(testData.scheduledDate, 'PPP') : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={testData.scheduledDate}
                    onSelect={(date) => setTestData(prev => ({ ...prev, scheduledDate: date }))}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Scheduled Time</Label>
              <Input
                id="time"
                type="time"
                value={testData.scheduledTime}
                onChange={(e) => setTestData(prev => ({ ...prev, scheduledTime: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Target Groups</Label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded p-2">
              {groups.map(group => (
                <label key={group} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={testData.targetGroups.includes(group)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTestData(prev => ({ ...prev, targetGroups: [...prev.targetGroups, group] }));
                      } else {
                        setTestData(prev => ({ ...prev, targetGroups: prev.targetGroups.filter(g => g !== group) }));
                      }
                    }}
                    className="rounded"
                  />
                  <span>{group}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Special Instructions</Label>
            <Textarea
              id="instructions"
              value={testData.instructions}
              onChange={(e) => setTestData(prev => ({ ...prev, instructions: e.target.value }))}
              placeholder="Any special instructions for students..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleScheduleTest} className="btn-primary">
              <Clock className="h-4 w-4 mr-2" />
              Schedule Test
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
