// First install these packages:
// npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities

import React, { useState } from 'react';
import {
    DndContext,
    DragOverlay,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';


import { DraggableTask } from './draggable';

// Main Calendar Component
export const DndCalendar = () => {
    const [tasks, setTasks] = useState([
        { id: '1', text: 'Team Meeting', date: '2025-01-06' },
        { id: '2', text: 'Project Review', date: '2025-01-07' },
        { id: '3', text: 'Client Call', date: '2025-01-08' },
    ]);

    const [activeId, setActiveId] = useState(null);
    const [newTask, setNewTask] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor)
    );

    const getCurrentWeekDates = () => {
        const today = new Date();
        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - today.getDay() + i);
            dates.push(date);
        }
        return dates;
    };

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return;

        const activeTask = tasks.find(task => task.id === active.id);
        const [, dropDate] = over.id.split('-');

        if (activeTask && dropDate) {
            setTasks(tasks.map(task =>
                task.id === activeTask.id
                    ? { ...task, date: dropDate }
                    : task
            ));
        }

        setActiveId(null);
    };

    const addTask = () => {
        if (newTask && selectedDate) {
            setTasks([
                ...tasks,
                {
                    id: String(Date.now()),
                    text: newTask,
                    date: selectedDate,
                },
            ]);
            setNewTask('');
            setSelectedDate('');
        }
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const weekDates = getCurrentWeekDates();

    return (
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle>Weekly Calendar</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="mb-4 flex gap-2">
                    <Input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="New task"
                        className="flex-grow"
                    />
                    <Input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    <Button onClick={addTask}>
                        <Plus className="w-6 h-6" />
                    </Button>
                </div>

                <DndContext
                    sensors={sensors}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    <div className="grid grid-cols-7 gap-4">
                        {weekDates.map((date) => {
                            const dateStr = date.toISOString().split('T')[0];
                            const dayTasks = tasks.filter(task => task.date === dateStr);

                            return (
                                <DroppableColumn
                                    key={dateStr}
                                    id={`col-${dateStr}`}
                                    date={date}
                                >
                                    <SortableContext
                                        items={dayTasks.map(task => task.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {dayTasks.map(task => (
                                            <DraggableTask
                                                key={task.id}
                                                task={task}
                                                onDelete={() => deleteTask(task.id)}
                                            />
                                        ))}
                                    </SortableContext>
                                </DroppableColumn>
                            );
                        })}
                    </div>

                    <DragOverlay>
                        {activeId ? (
                            <div className="bg-blue-100 p-2 rounded shadow-lg">
                                {tasks.find(task => task.id === activeId)?.text}
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </CardContent>
        </Card>
    );
};