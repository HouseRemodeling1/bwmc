"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Edit2, Save, X, User } from "lucide-react";
import { motion } from "framer-motion";

interface Author {
  id: string; name: string; bio: string; avatar: string;
  role: string; linkedin?: string; twitter?: string;
  instagram?: string; website?: string;
}

const empty = (): Omit<Author, "id"> => ({
  name: "", bio: "", avatar: "", role: "Writer",
  linkedin: "", twitter: "", instagram: "", website: "",
});

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [editing, setEditing] = useState<(Partial<Author> & { id?: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchAuthors(); }, []);

  const fetchAuthors = async () => {
    try {
      const res = await fetch("/api/authors");
      const data = await res.json();
      setAuthors(data);
    } catch (err) {
      console.error("Failed to fetch authors:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editing?.name) {
      alert("Name is required");
      return;
    }
    setSaving(true);
    try {
      const method = editing?.id ? "PUT" : "POST";
      const url = editing?.id ? `/api/authors/${editing.id}` : "/api/authors";
      await fetch(url, { 
        method, 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(editing) 
      });
      await fetchAuthors();
      setEditing(null);
    } catch (err) {
      console.error("Failed to save author:", err);
      alert("Failed to save author");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this author? This will leave their blogs without a profile card.")) return;
    try {
      await fetch(`/api/authors/${id}`, { method: "DELETE" });
      fetchAuthors();
    } catch (err) {
      console.error("Failed to delete author:", err);
      alert("Failed to delete author");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/admin" className="inline-flex items-center gap-2 text-gray-600 hover:text-royal-blue transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Dashboard
          </Link>
          <button
            onClick={() => setEditing(empty())}
            className="flex items-center gap-2 bg-gradient-to-r from-royal-blue to-sky-blue text-white font-semibold px-5 py-2 rounded-lg hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" /> New Author
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-navy mb-8">Authors</h1>

        {/* Edit / Create Form */}
        {editing && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-6 mb-8 border border-royal-blue/20"
          >
            <h2 className="text-xl font-bold text-navy mb-6">{editing.id ? "Edit Author" : "New Author"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                ["name", "Full Name *"], ["role", "Role (e.g. Tax Advisor)"],
                ["avatar", "Avatar Image URL"], ["website", "Website URL"],
                ["linkedin", "LinkedIn URL"], ["twitter", "Twitter / X URL"],
                ["instagram", "Instagram URL"],
              ].map(([field, label]) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    value={(editing as any)[field] || ""}
                    onChange={e => setEditing({ ...editing, [field]: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none"
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea
                  value={editing.bio || ""}
                  onChange={e => setEditing({ ...editing, bio: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none"
                />
              </div>
            </div>
            {/* Avatar preview */}
            {editing.avatar && (
              <div className="mt-4 flex items-center gap-3">
                <img src={editing.avatar} alt="preview" className="w-12 h-12 rounded-full object-cover border" />
                <span className="text-sm text-gray-500">Avatar preview</span>
              </div>
            )}
            <div className="flex gap-3 mt-6">
              <button 
                onClick={handleSave} 
                disabled={saving || !editing.name}
                className="flex items-center gap-2 bg-royal-blue text-white font-semibold px-6 py-2 rounded-lg disabled:opacity-50 hover:bg-opacity-90 transition-all"
              >
                <Save className="w-4 h-4" />{saving ? "Saving..." : "Save Author"}
              </button>
              <button onClick={() => setEditing(null)}
                className="flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-all">
                <X className="w-4 h-4" /> Cancel
              </button>
            </div>
          </motion.div>
        )}

        {/* Authors List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-royal-blue mx-auto" />
          </div>
        ) : authors.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
            <User className="w-14 h-14 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No authors yet. Add your first author above.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {authors.map(author => (
              <div key={author.id} className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-5 hover:shadow-md transition-shadow">
                {author.avatar
                  ? <img src={author.avatar} alt={author.name} className="w-14 h-14 rounded-full object-cover border-2 border-gray-100" />
                  : <div className="w-14 h-14 rounded-full bg-royal-blue/10 flex items-center justify-center text-royal-blue font-bold text-xl">{author.name[0]}</div>
                }
                <div className="flex-1">
                  <h3 className="font-bold text-navy text-lg">{author.name}</h3>
                  <p className="text-sm text-royal-blue font-medium">{author.role}</p>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-1">{author.bio}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditing(author)}
                    className="p-2 text-royal-blue hover:bg-royal-blue/10 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(author.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
