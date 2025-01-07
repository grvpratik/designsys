import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TaskForm = () => {
    const [items, setItems] = useState([]);
    const [currentItem, setCurrentItem] = useState({
        category: '',
        description: '',
        days: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentItem(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAdd = () => {
        if (currentItem.category && currentItem.description && currentItem.days) {
            setItems(prev => [...prev, currentItem]);
            setCurrentItem({
                category: '',
                description: '',
                days: ''
            });
        }
    };

    const handleSubmit = () => {
        const indexedItems = items.map((item, index) => ({
            ...item,
            index
        }));
        console.log(indexedItems);
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-gray-900">Add Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-4">
                    <Input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={currentItem.category}
                        onChange={handleInputChange}
                        className="flex-1 bg-white text-gray-900 placeholder:text-gray-500"
                    />
                    <Input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={currentItem.description}
                        onChange={handleInputChange}
                        className="flex-1 bg-white text-gray-900 placeholder:text-gray-500"
                    />
                    <Input
                        type="number"
                        name="days"
                        placeholder="Days"
                        value={currentItem.days}
                        onChange={handleInputChange}
                        className="w-24 bg-white text-gray-900 placeholder:text-gray-500"
                    />
                    <Button onClick={handleAdd}>Add</Button>
                </div>

                <div className="mt-4 space-y-2">
                    {items.map((item, index) => (
                        <div key={index} className="p-3 border rounded bg-white">
                            <p className="text-sm text-gray-900">
                                <span className="font-medium">Category:</span> {item.category} |
                                <span className="font-medium ml-2">Description:</span> {item.description} |
                                <span className="font-medium ml-2">Days:</span> {item.days}
                            </p>
                        </div>
                    ))}
                </div>

                {items.length > 0 && (
                    <Button onClick={handleSubmit} className="w-full">
                        Submit
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default TaskForm;