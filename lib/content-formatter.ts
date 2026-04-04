/**
 * Converts raw text or Markdown-like content into structured HTML for the blog.
 * Handles paragraphs, bold text, and detected headers.
 */
export function formatBlogContent(content: string): string {
    if (!content) return "";

    // 1. Normalize line endings
    let formatted = content.replace(/\r\n/g, "\n");

    // 2. Wrap block sections (paragraphs)
    // We split by double newlines to find paragraphs
    const paragraphs = formatted.split(/\n\s*\n/);
    
    formatted = paragraphs.map(p => {
        const trimmed = p.trim();
        if (!trimmed) return "";

        // Detect if it's a heading (Start with #, or all caps and short)
        if (trimmed.startsWith("#")) {
            const level = trimmed.match(/^#+/)?.[0].length || 1;
            const text = trimmed.replace(/^#+\s*/, "");
            return `<h${level + 1} class="text-navy font-bold mt-10 mb-6">${text}</h${level + 1}>`;
        }

        // Detect potential headings that aren't marked with #
        // (Short, bold, or all caps)
        if (trimmed.length < 80 && (trimmed.toUpperCase() === trimmed || trimmed.startsWith("**"))) {
            const cleanText = trimmed.replace(/\*\*/g, "");
            return `<h3 class="text-navy font-bold mt-8 mb-4">${cleanText}</h3>`;
        }

        // Standard paragraph
        // Handle bold text within paragraph
        const withBold = trimmed.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        
        // Handle simple lists (lines starting with - or *)
        if (withBold.includes("\n- ") || withBold.includes("\n* ")) {
            const lines = withBold.split("\n");
            let inList = false;
            const listHtml = lines.map(line => {
                if (line.match(/^[-*]\s+/)) {
                    const item = line.replace(/^[-*]\s+/, "");
                    const prefix = !inList ? '<ul class="list-disc pl-6 my-6 space-y-2">' : "";
                    inList = true;
                    return `${prefix}<li>${item}</li>`;
                } else {
                    const suffix = inList ? "</ul>" : "";
                    inList = false;
                    return `${suffix}${line}`;
                }
            }).join("\n");
            return listHtml + (inList ? "</ul>" : "");
        }

        return `<p class="mb-6 leading-relaxed text-gray-700">${withBold}</p>`;
    }).join("\n");

    return formatted;
}
