/**
 * Converts raw text or Markdown-like content into structured HTML for the blog.
 * Handles paragraphs, bold text, and detected headers with improved intelligence.
 */
export function formatBlogContent(content: string): string {
    if (!content) return "";

    // 1. Normalize line endings
    let raw = content.replace(/\r\n/g, "\n").trim();

    // 2. Pre-process text to insert double newlines before "Step X:" if they are missing
    // This helps split paragraphs that were concatenated as a wall of text.
    // Example: " ...registration. Step 11: Register..." -> " ...registration.\n\nStep 11: Register..."
    raw = raw.replace(/([.!?])\s*(Step\s+\d+[:.-])/g, "$1\n\n$2");
    raw = raw.replace(/([.!?])\s*(How\s+to\s+)/gi, "$1\n\n$2");
    
    // 3. Handle specific patterns that often start new sections
    // "How to expand from India..." -> "\n\nHow to expand from India"
    raw = raw.replace(/([.!?])\s*(How\s+to\s+[^.!?]{10,80})/gi, "$1\n\n$2");

    // 4. Split by double newlines or single newlines followed by a header-like pattern
    const sections = raw.split(/\n\s*\n/);
    
    const formatted = sections.map(section => {
        const trimmed = section.trim();
        if (!trimmed) return "";

        // Header Detection (Starts with #)
        if (trimmed.startsWith("#")) {
            const level = trimmed.match(/^#+/)?.[0].length || 1;
            const text = trimmed.replace(/^#+\s*/, "");
            return `<h${level + 1} class="text-navy font-black mt-12 mb-6 leading-tight">${text}</h${level + 1}>`;
        }

        // Potential Header Detection (Step X:, All Caps, or Short Bold lines)
        // Detect "Step 11: ...", "Step 12: ...", "Conclusion:", "Important Note:"
        const isStepHeader = /^Step\s*\d+[:.-]/i.test(trimmed);
        const isShortBold = trimmed.startsWith("**") && trimmed.endsWith("**") && trimmed.length < 100;
        const isAllCapsHeader = trimmed.length < 80 && trimmed.toUpperCase() === trimmed && trimmed.length > 5;
        const isQuestionHeader = trimmed.length < 100 && trimmed.endsWith("?");

        if (isStepHeader || isShortBold || isAllCapsHeader || isQuestionHeader) {
            const cleanText = trimmed.replace(/\*\*/g, "");
            return `<h3 class="text-navy font-black text-2xl mt-12 mb-6 leading-tight border-l-4 border-royal-blue pl-4">${cleanText}</h3>`;
        }

        // List Detection
        if (trimmed.includes("\n- ") || trimmed.includes("\n* ") || trimmed.includes("\n• ")) {
            const lines = trimmed.split("\n");
            let listItems: string[] = [];
            let currentParagraph = "";

            const parts: string[] = [];
            
            lines.forEach(line => {
                const isListItem = line.trim().match(/^[-*•]\s+/);
                if (isListItem) {
                    if (currentParagraph) {
                        parts.push(`<p class="mb-6 leading-relaxed text-gray-700 text-lg">${formatInlineStyles(currentParagraph)}</p>`);
                        currentParagraph = "";
                    }
                    listItems.push(line.trim().replace(/^[-*•]\s+/, ""));
                } else {
                    if (listItems.length > 0) {
                        parts.push(`<ul class="list-disc pl-8 my-8 space-y-3 text-gray-700 text-lg">${listItems.map(li => `<li>${formatInlineStyles(li)}</li>`).join("")}</ul>`);
                        listItems = [];
                    }
                    currentParagraph += (currentParagraph ? " " : "") + line.trim();
                }
            });

            if (listItems.length > 0) {
                parts.push(`<ul class="list-disc pl-8 my-8 space-y-3 text-gray-700 text-lg">${listItems.map(li => `<li>${formatInlineStyles(li)}</li>`).join("")}</ul>`);
            }
            if (currentParagraph) {
                parts.push(`<p class="mb-6 leading-relaxed text-gray-700 text-lg">${formatInlineStyles(currentParagraph)}</p>`);
            }
            
            return parts.join("\n");
        }

        // Standard paragraph
        // If the paragraph is very long, try to split it into smaller logical chunks
        // This handles where multiple sentences are merged but should be separate paragraphs
        const processedParagraph = formatInlineStyles(trimmed);
        return `<p class="mb-8 leading-[1.8] text-gray-700 text-lg lg:text-xl font-medium antialiased">${processedParagraph}</p>`;
    }).join("\n");

    return formatted;
}

/**
 * Helper to handle bold, links, and other inline styles
 */
function formatInlineStyles(text: string): string {
    return text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/__(.*?)__/g, "<strong>$1</strong>")
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-royal-blue hover:underline font-bold">$1</a>');
}
