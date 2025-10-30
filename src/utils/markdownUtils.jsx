import React from 'react';

/**
 * Basic function to render simple Markdown (like bold, lists) to JSX using 
 * dangerouslySetInnerHTML. This is needed because the AI diagnosis is likely 
 * formatted with Markdown.
 * @param {string} markdownText - The markdown string to render.
 * @returns {JSX.Element}
 */
export const renderMarkdown = (markdownText) => {
    if (!markdownText) return null;

    // Convert common Markdown features to basic HTML
    let html = markdownText;

    // 1. Headings (H2 to large bold paragraph text)
    html = html.replace(/^##\s*(.*)$/gm, '<p class="text-lg font-bold mt-4 mb-2">$1</p>');
    
    // 2. Bold/Strong
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // 3. Lists (Simple unordered lists)
    html = html.replace(/^\*\s*(.*)$/gm, '<li class="ml-4 list-disc">$1</li>');
    html = html.replace(/^\-\s*(.*)$/gm, '<li class="ml-4 list-disc">$1</li>');

    // Wrap list items in a <ul> if lists were created
    if (html.includes('<li')) {
        // Simple heuristic: look for li elements and wrap them if they're at the beginning of a line
        const listRegex = /((?:<li[\s\S]*?<\/li>\s*)+)/g;
        html = html.replace(listRegex, '<ul class="list-inside mb-3">$1</ul>');
    }

    // 4. Line Breaks (convert double newlines to paragraphs, single newlines to breaks)
    html = html.replace(/\n\n/g, '</p><p>');
    html = html.replace(/\n/g, '<br/>');
    
    // 5. Wrap the entire output in a paragraph for consistency
    if (!html.startsWith('<p') && !html.startsWith('<div')) {
        html = `<p>${html}</p>`;
    }

    return <div dangerouslySetInnerHTML={{ __html: html }} className="markdown-output" />;
};