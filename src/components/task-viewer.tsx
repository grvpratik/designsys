import React, { useState } from 'react';
import { Calendar, Clock, Tag } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";

// Sample data structure
const initialTasks = [
    {
        id: 1,
        title: "Project Review",
        date: "2025-01-10",
        functionality: "meeting",
        category: "work",
        description: "Review Q1 project progress"
    },
    {
        id: 2,
        title: "Code Review",
        date: "2025-01-08",
        functionality: "development",
        category: "technical",
        description: "Review pull requests"
    },
    {
        id: 3,
        title: "Team Sync",
        date: "2025-01-15",
        functionality: "meeting",
        category: "team",
        description: "Weekly team sync"
    }
];

const CalendarTaskViewer = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [tasks, setTasks] = useState(initialTasks);
    const [selectedFunctionality, setSelectedFunctionality] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Get unique functionalities and categories
    const functionalities = [...new Set(tasks.map(task => task.functionality))];
    const categories = [...new Set(tasks.map(task => task.category))];

    // Filter tasks based on date range and selections
    const filteredTasks = tasks.filter(task => {
        const taskDate = new Date(task.date);
        const start = startDate ? new Date(startDate) : new Date('1900-01-01');
        const end = endDate ? new Date(endDate) : new Date('2100-12-31');

        return (
            taskDate >= start &&
            taskDate <= end &&
            (!selectedFunctionality || task.functionality === selectedFunctionality) &&
            (!selectedCategory || task.category === selectedCategory)
        );
    });

    // Update tasks functionality
    const updateTasksFunctionality = (newFunctionality) => {
        setTasks(prevTasks =>
            prevTasks.map(task => {
                if (isTaskInDateRange(task)) {
                    return { ...task, functionality: newFunctionality };
                }
                return task;
            })
        );
        setSelectedFunctionality(newFunctionality);
    };

    // Update tasks category
    const updateTasksCategory = (newCategory) => {
        setTasks(prevTasks =>
            prevTasks.map(task => {
                if (isTaskInDateRange(task)) {
                    return { ...task, category: newCategory };
                }
                return task;
            })
        );
        setSelectedCategory(newCategory);
    };

    // Helper function to check if task is in selected date range
    const isTaskInDateRange = (task) => {
        const taskDate = new Date(task.date);
        const start = startDate ? new Date(startDate) : new Date('1900-01-01');
        const end = endDate ? new Date(endDate) : new Date('2100-12-31');
        return taskDate >= start && taskDate <= end;
    };

    return (
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-6 w-6" />
                    Calendar Task Viewer
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Date Range Selection */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Start Date</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">End Date</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                    </div>

                    {/* Functionality and Category Selectors */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Functionality</label>
                            <Select
                                value={selectedFunctionality}
                                onValueChange={updateTasksFunctionality}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select functionality" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Functionalities</SelectItem>
                                    {functionalities.map(func => (
                                        <SelectItem key={func} value={func}>
                                            {func}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <Select
                                value={selectedCategory}
                                onValueChange={updateTasksCategory}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categories.map(cat => (
                                        <SelectItem key={cat} value={cat}>
                                            {cat}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Tasks List */}
                    <div className="space-y-2">
                        {filteredTasks.map(task => (
                            <div
                                key={task.id}
                                className="p-4 border rounded-lg hover:bg-gray-50"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-medium">{task.title}</h3>
                                        <p className="text-sm text-gray-600">{task.description}</p>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {task.date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Tag className="h-4 w-4" />
                                            {task.functionality} | {task.category}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CalendarTaskViewer;