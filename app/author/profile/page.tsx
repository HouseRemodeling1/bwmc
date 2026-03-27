"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";

export default function AuthorProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<any>({
    name: "", bio: "", avatar: "", role: "Writer", 
    linkedin: "", twitter: "", instagram: "", website: "", 
    username: "", password: ""
  });
  const [authorId, setAuthorId] = useState<string | null>(null);

  useEffect(() => {
    // 1. Get current session
    fetch("/api/author-auth/me")
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data) {
          router.push("/author/login");
          return;
        }
        setAuthorId(data.author.id);
        // 2. Fetch full author profile
        return fetch(`/api/authors/${data.author.id}`);
      })
      .then(r => r?.json())
      .then(profile => {
        if (!profile) return;
        setFormData({ ...profile, password: "" }); // keep pass empty
        setLoading(false);
      });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorId) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/authors/${authorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Profile updated successfully!");
        router.push("/author/dashboard");
      } else {
        alert("Failed to update profile. Username might be taken.");
      }
    } catch (err) {
      alert("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-24">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-royal-blue" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/author/dashboard" className="inline-flex items-center gap-2 text-gray-600 hover:text-royal-blue transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-md p-8 border border-royal-blue/10">
          <h1 className="text-3xl font-bold text-navy mb-8">Edit My Profile</h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input value={formData.name || ""} onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none" required />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role Display Title</label>
              <input value={formData.role || ""} onChange={e => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Login Username</label>
              <input value={formData.username || ""} onChange={e => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input type="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })}
                placeholder="Leave blank to keep current password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Avatar Image URL</label>
              <input type="url" value={formData.avatar || ""} onChange={e => setFormData({ ...formData, avatar: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none" />
              {formData.avatar && (
                <img src={formData.avatar} alt="Avatar UI preview" className="mt-3 w-16 h-16 rounded-full object-cover border" />
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Bio</label>
              <textarea value={formData.bio || ""} onChange={e => setFormData({ ...formData, bio: e.target.value })}
                rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none" />
            </div>

            {/* Social Links */}
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
               <input type="url" value={formData.linkedin || ""} onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none" />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Twitter / X URL</label>
               <input type="url" value={formData.twitter || ""} onChange={e => setFormData({ ...formData, twitter: e.target.value })}
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none" />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
               <input type="url" value={formData.instagram || ""} onChange={e => setFormData({ ...formData, instagram: e.target.value })}
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none" />
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Personal Website URL</label>
               <input type="url" value={formData.website || ""} onChange={e => setFormData({ ...formData, website: e.target.value })}
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-royal-blue outline-none" />
            </div>

            <div className="md:col-span-2 flex gap-4 pt-4 border-t border-gray-100 mt-2">
              <button type="submit" disabled={saving}
                className="flex items-center gap-2 bg-gradient-to-r from-royal-blue to-sky-blue text-white font-semibold px-8 py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50">
                <Save className="w-5 h-5" /> {saving ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </form>

        </motion.div>
      </main>
    </div>
  );
}
