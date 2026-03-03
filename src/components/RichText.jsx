import React from 'react';

export default function RichText({ content, className = "" }) {
    if (!content) return null;

    // Basic Markdown Parser
    const parseMarkdown = (text) => {
        const parts = [];
        let lastIndex = 0;
        
        // Regex for Code Blocks (```code```), Inline Code (`code`), Bold (**text**), and Links ([text](url))
        const regex = /(`{3})([\s\S]*?)\1|(`)(.*?)\3|(\*\*)(.*?)\5|\[(.*?)\]\((.*?)\)/g;
        
        let match;
        while ((match = regex.exec(text)) !== null) {
            // Push preceding text
            if (match.index > lastIndex) {
                parts.push(text.substring(lastIndex, match.index));
            }

            // Code Block
            if (match[2]) {
                parts.push(
                    <div key={match.index} className="my-4 bg-black/50 border border-white/10 rounded-xl p-4 font-mono text-sm text-blue-400 overflow-x-auto">
                        <pre>{match[2].trim()}</pre>
                    </div>
                );
            }
            // Inline Code
            else if (match[4]) {
                parts.push(
                    <code key={match.index} className="bg-white/10 px-1.5 py-0.5 rounded text-blue-300 font-mono text-xs">
                        {match[4]}
                    </code>
                );
            }
            // Bold
            else if (match[6]) {
                parts.push(
                    <strong key={match.index} className="text-white font-black">
                        {match[6]}
                    </strong>
                );
            }
            // Link
            else if (match[7] && match[8]) {
                parts.push(
                    <a key={match.index} href={match[8]} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline font-bold">
                        {match[7]}
                    </a>
                );
            }

            lastIndex = regex.lastIndex;
        }

        // Push remaining text
        if (lastIndex < text.length) {
            parts.push(text.substring(lastIndex));
        }

        return parts;
    };

    // Split by newlines to handle paragraphs
    const paragraphs = content.split('

').filter(p => p.trim());

    return (
        <div className={`space-y-4 ${className}`}>
            {paragraphs.map((paragraph, idx) => (
                <p key={idx} className="leading-relaxed text-slate-300">
                    {parseMarkdown(paragraph)}
                </p>
            ))}
        </div>
    );
}
