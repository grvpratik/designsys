import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownRenderer = ({ markdownString }) => {
    return (
        <div className="markdown-container">
            <ReactMarkdown  remarkPlugins={[remarkGfm]}>{markdownString}</ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;
