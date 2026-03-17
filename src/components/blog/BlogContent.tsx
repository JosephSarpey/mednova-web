import React from 'react';
import parse from 'html-react-parser';

interface BlogContentProps {
    content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
    return (
        <div className="blog-content-wrapper">
            {parse(content)}
        </div>
    );
}
