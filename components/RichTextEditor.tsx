"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Blockquote from "@tiptap/extension-blockquote";
import Underline from "@tiptap/extension-underline";
import EditorToolbar from "./EditorToolbar";

interface RichTextEditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const [showSource, setShowSource] = React.useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
                blockquote: false, // Use the separate extension for better control if needed, but StarterKit has it
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-royal-blue hover:underline font-bold",
                },
            }),
            Underline,
            Blockquote.configure({
                HTMLAttributes: {
                    class: "border-l-4 border-sky-blue bg-sky-blue/5 py-4 pl-6 rounded-r-xl italic my-8",
                },
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "blog-content prose prose-lg prose-slate max-w-none focus:outline-none min-h-[600px] px-12 py-10 text-navy bg-white selection:bg-sky-blue/30",
            },
        },
        immediatelyRender: false,
    });

    // Update content if value changes from outside (e.g. AI Optimization)
    React.useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value);
        }
    }, [value, editor]);

    return (
        <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-2xl group transition-all focus-within:ring-4 focus-within:ring-royal-blue/10 overflow-hidden">
            <EditorToolbar editor={editor} showSource={showSource} onToggleSource={() => setShowSource(!showSource)} />
            <div className="editor-container bg-white relative">
                {showSource ? (
                    <div className="relative group/code">
                        <div className="absolute top-4 right-4 px-3 py-1 bg-slate-800 text-slate-400 text-[10px] font-mono rounded-md border border-slate-700 z-10 pointer-events-none">
                            HTML SOURCE
                        </div>
                        <textarea
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                            className="w-full min-h-[600px] p-12 font-mono text-sm bg-[#0d1117] text-[#c9d1d9] leading-relaxed focus:outline-none focus:ring-0 resize-none selection:bg-royal-blue/50"
                            spellCheck={false}
                        />
                    </div>
                ) : (
                    <div className="bg-white">
                        <EditorContent editor={editor} />
                    </div>
                )}
            </div>
            
            <style jsx global>{`
                .tiptap p.is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: #94a3b8;
                    pointer-events: none;
                    height: 0;
                    font-style: italic;
                }
                .tiptap {
                    min-height: 600px;
                }
                .tiptap:focus {
                    outline: none;
                }
                
                /* Tiptap-specific styles to ensure they match the site exactly */
                .tiptap h1 {
                    font-size: 3rem !important;
                    font-weight: 900 !important;
                    color: #0F172A !important;
                    margin-top: 3rem !important;
                    margin-bottom: 2rem !important;
                    text-transform: uppercase !important;
                    letter-spacing: -0.05em !important;
                }
                .tiptap h2 {
                    font-size: 2rem !important;
                    font-weight: 900 !important;
                    color: #0F172A !important;
                    margin-top: 2.5rem !important;
                    margin-bottom: 1.5rem !important;
                }
                .tiptap h3 {
                    font-size: 1.5rem !important;
                    font-weight: 800 !important;
                    color: #0F172A !important;
                    margin-top: 2rem !important;
                    margin-bottom: 1rem !important;
                }
                .tiptap p {
                    margin-bottom: 1.5rem !important;
                    line-height: 1.8 !important;
                    color: #334155 !important;
                    font-size: 1.125rem !important;
                }
                .tiptap ul {
                    list-style-type: disc !important;
                    padding-left: 2rem !important;
                    margin: 1.5rem 0 !important;
                }
                .tiptap ol {
                    list-style-type: decimal !important;
                    padding-left: 2rem !important;
                    margin: 1.5rem 0 !important;
                }
                .tiptap blockquote {
                    border-left: 6px solid #1E40AF !important;
                    background: #f8fafc !important;
                    padding: 2rem !important;
                    border-radius: 0 1rem 1rem 0 !important;
                    font-style: italic !important;
                    font-size: 1.25rem !important;
                    color: #1e293b !important;
                }
                .tiptap strong {
                    font-weight: 900 !important;
                    color: #0F172A !important;
                }
            `}</style>
        </div>
    );
}
