"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import EditorToolbar from "./EditorToolbar";

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-royal-blue hover:underline font-bold",
                },
            }),
            Underline,
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "prose prose-slate max-w-none focus:outline-none min-h-[500px] px-8 py-6 text-navy",
            },
        },
        immediatelyRender: false,
    });

    // Update content if value changes from outside (e.g. AI Optimization)
    // We use a ref-like check to avoid feedback loops
    React.useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    return (
        <div className="w-full bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-inner group transition-all focus-within:ring-2 focus-within:ring-royal-blue/20">
            <EditorToolbar editor={editor} />
            <div className="editor-container">
                <EditorContent editor={editor} />
            </div>
            
            <style jsx global>{`
                .tiptap p.is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: #adb5bd;
                    pointer-events: none;
                    height: 0;
                }
                .tiptap {
                    min-height: 500px;
                }
                .tiptap:focus {
                    outline: none;
                }
            `}</style>
        </div>
    );
}
