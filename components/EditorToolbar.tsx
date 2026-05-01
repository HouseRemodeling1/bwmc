"use client";

import React from "react";
import { type Editor } from "@tiptap/react";
import { 
    Bold, Italic, List, Heading2, Heading3, 
    Quote, Link as LinkIcon, Lightbulb, Heading1,
    ListOrdered, Code
} from "lucide-react";

interface EditorToolbarProps {
    editor: Editor | null;
    showSource: boolean;
    onToggleSource: () => void;
}

export default function EditorToolbar({ editor, showSource, onToggleSource }: EditorToolbarProps) {
    if (!editor) return null;

    const tools = [
        { 
            icon: Heading1, 
            label: "H1", 
            active: editor.isActive("heading", { level: 1 }),
            action: () => editor.chain().focus().toggleHeading({ level: 1 }).run() 
        },
        { 
            icon: Heading2, 
            label: "H2", 
            active: editor.isActive("heading", { level: 2 }),
            action: () => editor.chain().focus().toggleHeading({ level: 2 }).run() 
        },
        { 
            icon: Heading3, 
            label: "H3", 
            active: editor.isActive("heading", { level: 3 }),
            action: () => editor.chain().focus().toggleHeading({ level: 3 }).run() 
        },
        { 
            icon: Bold, 
            label: "Bold", 
            active: editor.isActive("bold"),
            action: () => editor.chain().focus().toggleBold().run() 
        },
        { 
            icon: Italic, 
            label: "Italic", 
            active: editor.isActive("italic"),
            action: () => editor.chain().focus().toggleItalic().run() 
        },
        { 
            icon: List, 
            label: "Bullets", 
            active: editor.isActive("bulletList"),
            action: () => editor.chain().focus().toggleBulletList().run() 
        },
        { 
            icon: ListOrdered, 
            label: "Ordered", 
            active: editor.isActive("orderedList"),
            action: () => editor.chain().focus().toggleOrderedList().run() 
        },
        { 
            icon: LinkIcon, 
            label: "Link", 
            active: editor.isActive("link"),
            action: () => {
                const url = window.prompt("Enter URL");
                if (url) {
                    editor.chain().focus().setLink({ href: url }).run();
                }
            } 
        },
        {
            icon: Code,
            label: showSource ? "Visual" : "HTML",
            active: showSource,
            action: onToggleSource
        }
    ];

    const filteredTools = showSource ? [tools[tools.length - 1]] : tools;

    return (
        <div className="flex flex-wrap items-center gap-1 p-2 bg-white border-b border-slate-200 sticky top-[73px] z-20 shadow-sm rounded-t-3xl">
            {filteredTools.map((tool, idx) => (
                <button
                    key={idx}
                    type="button"
                    onClick={tool.action}
                    className={`p-2 rounded-lg transition-all flex items-center gap-1.5 font-bold text-xs uppercase tracking-tighter group ${
                        tool.active 
                        ? "bg-royal-blue text-white" 
                        : "hover:bg-white text-slate-600 hover:text-royal-blue"
                    }`}
                    title={tool.label}
                >
                    <tool.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span className="hidden sm:inline">{tool.label}</span>
                </button>
            ))}
            <div className="flex-1" />
            <div className="px-3 py-1 bg-sky-blue/10 rounded-full">
                <span className="text-[10px] font-black text-royal-blue uppercase tracking-widest">Live Editor</span>
            </div>
        </div>
    );
}
