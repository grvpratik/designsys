import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Plus } from 'lucide-react';

const DragDropCalendar = () => {
    const [tasks, setTasks] = useState([
        { id: 1, text: "Team Meeting", date: "2025-01-06", order: 0 },
        { id: 2, text: "Project Review", date: "2025-01-07", order: 0 },
        { id: 3, text: "Client Call", date: "2025-01-08", order: 0 }
    ]);

    const [newTask, setNewTask] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [draggedTask, setDraggedTask] = useState(null);
    const [dragOverTaskId, setDragOverTaskId] = useState(null);

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

    const handleDragStart = (task, e) => {
        setDraggedTask(task);
        // Set a transparent drag image
        const dragImg = document.createElement('div');
        dragImg.style.opacity = '0';
        document.body.appendChild(dragImg);
        e.dataTransfer.setDragImage(dragImg, 0, 0);
        document.body.removeChild(dragImg);
    };

    const handleDragOver = (e, taskId = null) => {
        e.preventDefault();
        setDragOverTaskId(taskId);
    };

    const handleDrop = (date, targetTaskId = null) => {
        if (!draggedTask) return;

        const formattedDate = date.toISOString().split('T')[0];
        const dateTasksSorted = tasks
            .filter(task => task.date === formattedDate)
            .sort((a, b) => a.order - b.order);

        let newOrder;
        if (!targetTaskId) {
            // Dropped at the end of the list
            newOrder = dateTasksSorted.length > 0
                ? Math.max(...dateTasksSorted.map(t => t.order)) + 1
                : 0;
        } else {
            const targetTask = tasks.find(t => t.id === targetTaskId);
            newOrder = targetTask.order;

            // Update orders of tasks that come after the drop position
            tasks.forEach(task => {
                if (task.date === formattedDate && task.order >= newOrder && task.id !== draggedTask.id) {
                    task.order += 1;
                }
            });
        }

        const updatedTasks = tasks.map(task =>
            task.id === draggedTask.id
                ? { ...task, date: formattedDate, order: newOrder }
                : task
        );

        setTasks(updatedTasks);
        setDraggedTask(null);
        setDragOverTaskId(null);
    };

    const addTask = () => {
        if (newTask && selectedDate) {
            const dateTasksSorted = tasks
                .filter(task => task.date === selectedDate)
                .sort((a, b) => a.order - b.order);

            const newOrder = dateTasksSorted.length > 0
                ? Math.max(...dateTasksSorted.map(t => t.order)) + 1
                : 0;

            setTasks([
                ...tasks,
                {
                    id: Math.max(...tasks.map(t => t.id), 0) + 1,
                    text: newTask,
                    date: selectedDate,
                    order: newOrder
                }
            ]);
            setNewTask("");
            setSelectedDate("");
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
                    <input
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="New task"
                        className="border p-2 rounded flex-grow"
                    />
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <button
                        onClick={addTask}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        <Plus className="w-6 h-6" />
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-4">
                    {weekDates.map((date) => {
                        const dateStr = date.toISOString().split('T')[0];
                        const dayTasks = tasks
                            .filter(task => task.date === dateStr)
                            .sort((a, b) => a.order - b.order);

                        return (
                            <div
                                key={dateStr}
                                className="border rounded p-2 min-h-64"
                                onDragOver={(e) => handleDragOver(e)}
                                onDrop={() => handleDrop(date)}
                            >
                                <div className="font-semibold mb-2">
                                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                                    <br />
                                    {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </div>
                                {dayTasks.map(task => (
                                    <div
                                        key={task.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(task, e)}
                                        onDragOver={(e) => handleDragOver(e, task.id)}
                                        onDrop={(e) => {
                                            e.stopPropagation();
                                            handleDrop(date, task.id);
                                        }}
                                        className={`
                      bg-blue-100 p-2 mb-2 rounded cursor-move group
                      ${dragOverTaskId === task.id ? 'border-t-2 border-blue-500' : ''}
                      ${draggedTask?.id === task.id ? 'opacity-50' : ''}
                    `}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span>{task.text}</span>
                                            <button
                                                onClick={() => deleteTask(task.id)}
                                                className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

export default DragDropCalendar;