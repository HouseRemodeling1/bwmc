"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { Extension } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Blockquote from "@tiptap/extension-blockquote";
import Underline from "@tiptap/extension-underline";
import EditorToolbar from "./EditorToolbar";

/**
 * Custom extension to allow 'style' and 'class' attributes on all nodes/marks.
 * This prevents Tiptap from stripping inline styles and custom classes.
 */
const GlobalAttributes = Extension.create({
    name: 'globalAttributes',
    addGlobalAttributes() {
        return [
            {
                // NOTE: 'text' node type cannot have attributes in Tiptap. 
                // We apply styles to block nodes and marks instead.
                types: ['heading', 'paragraph', 'bulletList', 'orderedList', 'listItem', 'blockquote', 'table', 'tableRow', 'tableCell', 'image', 'link'],
                attributes: {
                    style: {
                        default: null,
                        parseHTML: element => element.getAttribute('style'),
                        renderHTML: attributes => {
                            if (!attributes.style) return {};
                            return { style: attributes.style };
                        },
                    },
                    class: {
                        default: null,
                        parseHTML: element => element.getAttribute('class'),
                        renderHTML: attributes => {
                            if (!attributes.class) return {};
                            return { class: attributes.class };
                        },
                    },
                },
            },
        ];
    },
});

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
                heading: { levels: [1, 2, 3] },
                blockquote: false, // Disable to use custom Blockquote extension below
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
            GlobalAttributes,
        ],
        content: value,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            if (html !== value) {
                onChange(html);
            }
        },
        editorProps: {
            attributes: {
                class: "blog-content prose prose-lg prose-slate max-w-none focus:outline-none min-h-[600px] px-12 py-10 text-navy bg-white selection:bg-sky-blue/30",
            },
        },
        immediatelyRender: true,
    });

    // Sync external value with editor content
    React.useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            // We prevent update emission to avoid feedback loops
            editor.commands.setContent(value, { emitUpdate: false });
        }
    }, [value, editor]);

    return (
        <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-2xl group transition-all focus-within:ring-4 focus-within:ring-royal-blue/10 overflow-hidden min-h-[700px]">
            <EditorToolbar editor={editor} showSource={showSource} onToggleSource={() => setShowSource(!showSource)} />
            <div className="editor-container bg-white relative min-h-[600px]">
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
                    <div className="bg-white min-h-[600px]">
                        <EditorContent editor={editor} className="min-h-[600px]" />
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
                
                /* Tiptap-specific styles */
                .tiptap h1 { font-size: 3rem !important; font-weight: 900 !important; color: #0F172A !important; margin-top: 3rem !important; margin-bottom: 2rem !important; text-transform: uppercase !important; letter-spacing: -0.05em !important; }
                .tiptap h2 { font-size: 2rem !important; font-weight: 900 !important; color: #0F172A !important; margin-top: 2.5rem !important; margin-bottom: 1.5rem !important; }
                .tiptap h3 { font-size: 1.5rem !important; font-weight: 800 !important; color: #0F172A !important; margin-top: 2rem !important; margin-bottom: 1rem !important; }
                .tiptap p { margin-bottom: 1.5rem !important; line-height: 1.8 !important; color: #334155 !important; font-size: 1.125rem !important; }
                .tiptap ul { list-style-type: disc !important; padding-left: 2rem !important; margin: 1.5rem 0 !important; }
                .tiptap ol { list-style-type: decimal !important; padding-left: 2rem !important; margin: 1.5rem 0 !important; }
                .tiptap blockquote { border-left: 6px solid #1E40AF !important; background: #f8fafc !important; padding: 2rem !important; border-radius: 0 1rem 1rem 0 !important; font-style: italic !important; font-size: 1.25rem !important; color: #1e293b !important; }
                .tiptap strong { font-weight: 900 !important; color: #0F172A !important; }
            `}</style>
        </div>
    );
}
