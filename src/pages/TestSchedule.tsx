
import React from 'react';
import { Calendar, Clock, BookOpen, MapPin, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const upcomingTests = [
  {
    id: 1,
    subject: 'Mathematics',
    title: 'Algebra & Geometry',
    date: '2025-07-15',
    time: '10:00 AM',
    duration: '2 hours',
    location: 'Room 204',
    type: 'Final Exam',
    status: 'upcoming'
  },
  {
    id: 2,
    subject: 'Science',
    title: 'Chemistry Lab Test',
    date: '2025-07-18',
    time: '2:00 PM',
    duration: '1.5 hours',
    location: 'Lab 3',
    type: 'Practical',
    status: 'upcoming'
  },
  {
    id: 3,
    subject: 'English',
    title: 'Literature Analysis',
    date: '2025-07-22',
    time: '9:00 AM',
    duration: '3 hours',
    location: 'Room 101',
    type: 'Essay',
    status: 'upcoming'
  },
  {
    id: 4,
    subject: 'History',
    title: 'World War II',
    date: '2025-07-25',
    time: '11:00 AM',
    duration: '2 hours',
    location: 'Room 305',
    type: 'Written Test',
    status: 'scheduled'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'upcoming':
      return 'bg-amber-100 text-amber-800';
    case 'scheduled':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const TestSchedule = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Schedule</h1>
        <p className="text-gray-600">View and manage your upcoming tests and exams</p>
      </div>

      <div className="grid gap-6">
        {upcomingTests.map((test) => (
          <Card key={test.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{test.title}</CardTitle>
                    <p className="text-sm text-gray-600">{test.subject}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(test.status)}>
                  {test.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{test.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{test.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{test.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{test.duration}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Badge variant="outline">{test.type}</Badge>
                <Button size="sm" variant="outline">
                  <Bell className="h-4 w-4 mr-2" />
                  Set Reminder
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestSchedule;
