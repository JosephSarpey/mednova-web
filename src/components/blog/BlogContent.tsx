import React from 'react';

interface BlogContentProps {
    content: string;
}


export default function BlogContent({ content }: BlogContentProps) {

    const parseContent = (htmlString: string) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');

        const convertNodeToReact = (node: ChildNode, index: number): React.ReactNode => {
            if (node.nodeType === Node.TEXT_NODE) {
                return node.textContent;
            }

            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as Element;
                const tagName = element.tagName.toLowerCase();
                const children = Array.from(element.childNodes).map((child, i) =>
                    convertNodeToReact(child, i)
                );

                switch (tagName) {
                    case 'p':
                        return <p key={index}>{children}</p>;
                    case 'h3':
                        return <h3 key={index}>{children}</h3>;
                    case 'h4':
                        return <h4 key={index}>{children}</h4>;
                    case 'ul':
                        return <ul key={index}>{children}</ul>;
                    case 'ol':
                        return <ol key={index}>{children}</ol>;
                    case 'li':
                        return <li key={index}>{children}</li>;
                    case 'strong':
                        return <strong key={index}>{children}</strong>;
                    case 'em':
                        return <em key={index}>{children}</em>;
                    case 'blockquote':
                        return <blockquote key={index}>{children}</blockquote>;
                    case 'a':
                        return (
                            <a
                                key={index}
                                href={(element as HTMLAnchorElement).href}
                                target={(element as HTMLAnchorElement).target}
                                rel={(element as HTMLAnchorElement).rel || 'noopener noreferrer'}
                            >
                                {children}
                            </a>
                        );
                    default:
                        return <span key={index}>{children}</span>;
                }
            }

            return null;
        };

        return Array.from(doc.body.childNodes).map((node, i) =>
            convertNodeToReact(node, i)
        );
    };

    return <>{parseContent(content)}</>;
}
