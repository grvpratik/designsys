import { useState } from 'react';
import { Calendar } from './ui/calendar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { X, Plus, Calendar as CalendarIcon, CheckCircle2, Circle } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

const categories = {
  core: { label: 'Core', color: 'bg-blue-500' },
  auth: { label: 'Auth', color: 'bg-purple-500' },
  db: { label: 'Database', color: 'bg-green-500' },
  ai: { label: 'AI', color: 'bg-yellow-500' },
  ui: { label: 'UI/UX', color: 'bg-pink-500' }
};

// Demo data
const generateDemoData = (): Record<string, { id: string; text: string; category: string; completed: boolean }[]> => {
  const demoData: Record<string, { id: string; text: string; category: string; completed: boolean }[]> = {};
  const currentDate = new Date();

  // Generate tasks for the past week and next week
  for (let i = -7; i < 7; i++) {
    const date = new Date();
    date.setDate(currentDate.getDate() + i);
    const dateKey = date.toISOString().split('T')[0];

    demoData[dateKey] = [
      {
        id: `${dateKey}-1`,
        text: ['Implement JWT authentication', 'Set up OAuth flow', 'Add password reset'][Math.floor(Math.random() * 3)],
        category: 'auth',
        completed: Math.random() > 0.5
      },
      {
        id: `${dateKey}-2`,
        text: ['Design system updates', 'Responsive layout fixes', 'Add dark mode support'][Math.floor(Math.random() * 3)],
        category: 'ui',
        completed: Math.random() > 0.5
      },
      {
        id: `${dateKey}-3`,
        text: ['Train ML model', 'Implement chat interface', 'Fine-tune responses'][Math.floor(Math.random() * 3)],
        category: 'ai',
        completed: Math.random() > 0.5
      }
    ].filter(() => Math.random() > 0.3); // Randomly remove some tasks
  }

  return demoData;
};

const TodoCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [todos, setTodos] = useState(generateDemoData());
  const [newTodo, setNewTodo] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('core');
  const [showAddDialog, setShowAddDialog] = useState(false);

  const addTodo = (): void => {
    if (!newTodo.trim()) return;

    const dateKey = date.toISOString().split('T')[0];
    const newTodoItem = {
      id: `${dateKey}-${Date.now()}`,
      text: newTodo,
      category: selectedCategory,
      completed: false
    };

    setTodos(prev => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newTodoItem]
    }));

    setNewTodo('');
    setShowAddDialog(false);
  };

  const toggleTodo = (dateKey: string, todoId: string): void => {
    setTodos(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  };

  const removeTodo = (dateKey: string, todoId: string): void => {
    setTodos(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].filter(todo => todo.id !== todoId)
    }));
  };

  const selectedDateKey = date.toISOString().split('T')[0];
  const currentTodos = todos[selectedDateKey] || [];

  // Calculate task counts for calendar day rendering
  const getDayContent = (day: Date | null): JSX.Element | null => {
    console.log(day , "day");
    const dayKey = day.toISOString().split('T')[0];
    const dayTodos = todos[dayKey] || [];
    if (dayTodos.length === 0) return null;

    const completedCount = dayTodos.filter(todo => todo.completed).length;
    return (
      <div className="w-full h-full flex items-end justify-center">
        <Badge variant="secondary" className="text-xs">
          {completedCount}/{dayTodos.length}
        </Badge>
      </div>
    );
  };

  return (
    <div className="flex gap-4 max-w-6xl mx-auto p-4">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => setDate(newDate || date)}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex flex-col">
            <span className="text-2xl">{date.toLocaleDateString(undefined, { weekday: 'long' })}</span>
            <span className="text-muted-foreground">{date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </CardTitle>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Input
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="What needs to be done?"
                  onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categories).map(([key, { label }]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={addTodo} className="w-full">Add Task</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            {currentTodos.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <p>No tasks for this date</p>
                <p className="text-sm">Click 'Add Task' to get started</p>
              </div>
            ) : (
              <div className="space-y-2">
                {currentTodos.map((todo) => (
                  <div
                    key={todo.id}
                    className="flex items-center gap-2 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-0 h-auto"
                      onClick={() => toggleTodo(selectedDateKey, todo.id)}
                    >
                      {todo.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </Button>
                    <div className="flex-1">
                      <p className={`${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {todo.text}
                      </p>
                    </div>
                    <Badge className={`${categories[todo.category].color} text-white`}>
                      {categories[todo.category].label}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTodo(selectedDateKey, todo.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default TodoCalendar;