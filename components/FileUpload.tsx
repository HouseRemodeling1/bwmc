"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FileUploadProps {
  onUpload: (url: string) => void;
  defaultValue?: string;
  label?: string;
}

export default function FileUpload({ onUpload, defaultValue, label = "Cover Photo" }: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(defaultValue || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      onUpload(data.url);
    } catch (err: any) {
      setError(err.message);
      setPreview(defaultValue || null);
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setPreview(null);
    onUpload("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-black text-navy uppercase tracking-widest">{label}</label>
      
      <div 
        className={`relative group border-2 border-dashed rounded-2xl overflow-hidden transition-all h-48 flex items-center justify-center bg-gray-50 ${
          preview ? "border-royal-blue/30" : "border-gray-200 hover:border-royal-blue/50"
        }`}
      >
        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div 
              key="preview"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full"
            >
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button 
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2 bg-white rounded-full text-navy hover:scale-110 transition-transform"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button 
                  type="button"
                  onClick={removeFile}
                  className="p-2 bg-white rounded-full text-red-600 hover:scale-110 transition-transform"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {uploading && (
                <div className="absolute inset-0 bg-white/60 flex flex-col items-center justify-center">
                  <Loader2 className="w-8 h-8 animate-spin text-royal-blue" />
                  <p className="text-xs font-black text-navy mt-2 uppercase tracking-widest">Uploading...</p>
                </div>
              )}
              {!uploading && !error && (
                <div className="absolute top-3 right-3">
                   <CheckCircle className="w-6 h-6 text-green-500 fill-white shadow-sm" />
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center cursor-pointer px-6 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-royal-blue/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6 text-royal-blue" />
              </div>
              <p className="text-sm font-bold text-navy">Click or Drag to Upload</p>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP (Max 5MB)</p>
            </motion.div>
          )}
        </AnimatePresence>

        <input 
          ref={fileInputRef}
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleFileChange} 
        />
      </div>

      {error && (
        <p className="text-xs text-red-500 font-bold flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );
}

function RefreshCw({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

function AlertCircle({ className }: { className?: string }) {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    );
}
