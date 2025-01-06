import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export const DroppableColumn = ({ children, id, date }) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div ref={setNodeRef} className="border rounded p-2 min-h-64">
            <div className="font-semibold mb-2">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
                <br />
                {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
            {children}
        </div>
    );
};