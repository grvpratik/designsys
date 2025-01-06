import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const DraggableTask = ({ task, onDelete }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-blue-100 p-2 mb-2 rounded cursor-move group"
        >
            <div className="flex justify-between items-center">
                <span>{task.text}</span>
                <button
                    onClick={onDelete}
                    className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    ×
                </button>
            </div>
        </div>
    );
};
