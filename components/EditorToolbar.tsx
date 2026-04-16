"use client";

import React from "react";
import { 
    Bold, Italic, List, Heading2, Heading3, 
    Quote, Link as LinkIcon, Lightbulb, CheckCircle2 
} from "lucide-react";

interface EditorToolbarProps {
    textareaRef: React.RefObject<HTMLTextAreaElement | null>;
    value: string;
    onChange: (newValue: string) => void;
}

export default function EditorToolbar({ textareaRef, value, onChange }: EditorToolbarProps) {
    const insertText = (before: string, after: string = "") => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = value.substring(start, end);
        
        const newValue = 
            value.substring(0, start) + 
            before + selectedText + after + 
            value.substring(end);

        onChange(newValue);
        
        // Return focus and set selection
        setTimeout(() => {
            textarea.focus();
            const newPos = start + before.length + selectedText.length + after.length;
            textarea.setSelectionRange(newPos, newPos);
        }, 0);
    };

    const tools = [
        { icon: Heading2, label: "H2", action: () => insertText("\n## ", "\n") },
        { icon: Heading3, label: "H3", action: () => insertText("\n### ", "\n") },
        { icon: Bold, label: "Bold", action: () => insertText("**", "**") },
        { icon: Italic, label: "Italic", action: () => insertText("_", "_") },
        { icon: List, label: "List", action: () => insertText("\n- ", "") },
        { icon: Quote, label: "Quote", action: () => insertText("\n> ", "\n") },
        { icon: Lightbulb, label: "Tip", action: () => insertText("\nTip: ", "\n") },
        { icon: CheckCircle2, label: "Summary", action: () => insertText("\nKey Takeaway: ", "\n") },
        { icon: LinkIcon, label: "Link", action: () => insertText("[", "](url)") },
    ];

    return (
        <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border-b border-slate-200 sticky top-0 z-20">
            {tools.map((tool, idx) => (
                <button
                    key={idx}
                    type="button"
                    onClick={tool.action}
                    className="p-2 hover:bg-white hover:text-royal-blue rounded-lg transition-all flex items-center gap-1.5 text-slate-600 font-bold text-xs uppercase tracking-tighter group"
                    title={tool.label}
                >
                    <tool.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline">{tool.label}</span>
                </button>
            ))}
            <div className="flex-1" />
            <div className="px-3 py-1 bg-sky-blue/10 rounded-full">
                <span className="text-[10px] font-black text-royal-blue uppercase tracking-widest">Editor Mode</span>
            </div>
        </div>
    );
}
