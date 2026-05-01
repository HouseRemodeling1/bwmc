/**
 * Normalizes messy text from Word, ChatGPT, or PDFs.
 * Handles smart quotes, non-standard bullets, and weird whitespace.
 */
export function normalizeText(text: string): string {
    if (!text) return "";
    
    return text
        // Normalize line endings
        .replace(/\r\n/g, "\n")
        // Replace non-breaking spaces
        .replace(/\u00A0/g, " ")
        // Replace smart quotes
        .replace(/[“”]/g, '"')
        .replace(/[‘’]/g, "'")
        // Replace long dashes (em dash, en dash) with standard dash
        .replace(/[—–]/g, "-")
        // Replace various bullet points with standard markdown dash
        .replace(/[•⁃‣○●]/g, "-")
        // Add double newlines before common headings that are stuck to previous text
        .replace(/([.!?])\s*(Why|How|The|Conclusion|Summary|Important)[:.-]/gi, "$1\n\n$2")
        // Clean up multiple spaces
        .replace(/ {2,}/g, " ")
        .trim();
}

/**
 * Converts raw text or Markdown-like content into structured HTML for the blog.
 * Now enhanced to detect and preserve existing HTML from the professional editor.
 */
export function formatBlogContent(content: string): string {
    if (!content) return "";

    // 1. Detect if content is already structured HTML from Tiptap or manual entry
    // Improved detection: Check if it contains any common HTML tags or inline styles
    const htmlTags = /<(p|div|h[1-6]|ul|ol|li|blockquote|table|pre|img|iframe|section|article|header|footer|aside|span|strong|em|b|i|a|style)/i;
    const hasStyleAttr = /style=["'].*?["']/i;
    const isHtml = htmlTags.test(content) || hasStyleAttr.test(content);
    
    if (isHtml) {
        return content;
    }

    // 2. Normalize and clean the text (Legacy Markdown Path)
    let raw = normalizeText(content);

    // 2. Intelligence: Detect "Step X:" or "1. ..." prefixes that should be H3s
    // Also detect "Conclusion:", "Summary:", "FAQ:"
    raw = raw.replace(/^(\d+\.|Step\s*\d+[:.-]|Section\s*\d+[:.-])\s*([A-Z].*?)([:.-]|\n|$)/gm, "### $1 $2");
    
    // 3. Intelligence: Insert double newlines before common structural markers if missing
    raw = raw.replace(/([.!?])\s*(Important|Note|Tip|Key Takeaway|Pro Tip|Background)[:.-]/gi, "$1\n\n$2");

    // 4. Split into sections
    const sections = raw.split(/\n\s*\n/);
    
    const formatted = sections.map((section, index) => {
        const trimmed = section.trim();
        if (!trimmed) return "";

        // Standard Markdown-style Header Detection (Starts with #)
        if (trimmed.startsWith("#")) {
            const level = trimmed.match(/^#+/)?.[0].length || 1;
            const text = trimmed.replace(/^#+\s*/, "");
            return `<h${level + 1} class="text-navy font-black mt-16 mb-8 leading-tight">${text}</h${level + 1}>`;
        }

        // Semantic Header Detection (All Caps OR Short Bold OR Question)
        const isHeaderPattern = 
            (trimmed.length < 80 && trimmed.toUpperCase() === trimmed && trimmed.length > 5) ||
            (trimmed.startsWith("**") && trimmed.endsWith("**") && trimmed.length < 100) ||
            (trimmed.length < 100 && trimmed.endsWith("?"));

        if (isHeaderPattern) {
            const cleanText = trimmed.replace(/\*\*/g, "");
            return `<h3 class="text-navy font-black text-2xl mt-14 mb-8 leading-tight border-l-4 border-royal-blue pl-5">${cleanText}</h3>`;
        }

        // Callout Box Detection (Important, Note, Tip)
        const lower = trimmed.toLowerCase();
        if (lower.startsWith("tip:") || lower.startsWith("pro tip:") || lower.startsWith("note:") || lower.startsWith("important:")) {
            const [label, ...rest] = trimmed.split(":");
            return `
                <div class="my-12 p-8 bg-sky-blue/5 border-l-4 border-sky-blue rounded-r-2xl shadow-sm">
                    <span class="text-xs font-black uppercase tracking-widest text-royal-blue mb-2 block">${label}</span>
                    <p class="text-gray-700 leading-relaxed m-0 italic font-medium">${formatInlineStyles(rest.join(":").trim())}</p>
                </div>
            `;
        }
        
        // Key Takeaways / Summary Detection
        if (lower.startsWith("key takeaway") || lower.startsWith("summary:") || lower.startsWith("conclusion:")) {
            return `
                <div class="my-14 p-10 bg-navy text-white rounded-3xl shadow-2xl relative overflow-hidden group">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-sky-blue/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                    <h4 class="text-sky-blue font-black uppercase tracking-widest text-sm mb-4">Quick Summary</h4>
                    <div class="text-white/90 leading-relaxed prose-invert">${formatInlineStyles(trimmed.replace(/.*?:/i, "").trim())}</div>
                </div>
            `;
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
                        parts.push(`<p class="mb-10 leading-[1.8] text-gray-700 text-lg lg:text-xl font-medium antialiased text-justify">${formatInlineStyles(currentParagraph)}</p>`);
                        currentParagraph = "";
                    }
                    listItems.push(line.trim().replace(/^[-*•]\s+/, ""));
                } else {
                    if (listItems.length > 0) {
                        parts.push(`<ul class="list-disc pl-8 my-10 space-y-4 text-gray-700 text-lg lg:text-xl font-medium">${listItems.map(li => `<li>${formatInlineStyles(li)}</li>`).join("")}</ul>`);
                        listItems = [];
                    }
                    currentParagraph += (currentParagraph ? " " : "") + line.trim();
                }
            });

            if (listItems.length > 0) {
                parts.push(`<ul class="list-disc pl-8 my-10 space-y-4 text-gray-700 text-lg lg:text-xl font-medium">${listItems.map(li => `<li>${formatInlineStyles(li)}</li>`).join("")}</ul>`);
            }
            if (currentParagraph) {
                parts.push(`<p class="mb-10 leading-[1.8] text-gray-700 text-lg lg:text-xl font-medium antialiased text-justify">${formatInlineStyles(currentParagraph)}</p>`);
            }
            
            return parts.join("\n");
        }

        // Standard paragraph
        return `<p class="mb-10 leading-[1.8] text-gray-700 text-lg lg:text-xl font-medium antialiased text-justify">${formatInlineStyles(trimmed)}</p>`;
    }).join("\n");

    return formatted;
}

/**
 * Helper to handle bold, italic, links, and other inline styles
 */
function formatInlineStyles(text: string): string {
    if (!text) return "";
    
    return text
        // Bold: handles **bold** and __bold__, including multi-line
        .replace(/\*\*((?:.|\n)*?)\*\*/g, "<strong>$1</strong>")
        .replace(/__(?:.|\n)*?__/g, "<strong>$1</strong>")
        // Italic: handles *italic* and _italic_, including multi-line
        .replace(/_((?:.|\n)*?)_/g, "<em>$1</em>")
        .replace(/\*((?:.|\n)*?)\*/g, "<em>$1</em>")
        // Links: [text](url)
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-royal-blue hover:underline font-bold cursor-pointer relative z-10">$1</a>');
}
