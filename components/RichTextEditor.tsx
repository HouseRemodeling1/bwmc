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
                /* Professional Visual Fixes for Editor */
                .tiptap h1 {
                    font-size: 2.5rem;
                    font-weight: 900;
                    margin-top: 2rem;
                    margin-bottom: 1.5rem;
                }
                .tiptap h2 {
                    font-size: 1.8rem;
                    font-weight: 800;
                    margin-top: 1.5rem;
                    margin-bottom: 1rem;
                }
                .tiptap ul {
                    list-style-type: disc !important;
                    padding-left: 2rem !important;
                    margin: 1rem 0 !important;
                }
                .tiptap ol {
                    list-style-type: decimal !important;
                    padding-left: 2rem !important;
                    margin: 1rem 0 !important;
                }
                .tiptap li {
                    margin-bottom: 0.5rem;
                }
                .tiptap strong {
                    font-weight: 900;
                }
            `}</style>
        </div>
    );
}
