"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, FileText, LogOut, Edit2, Trash2, Eye, EyeOff } from "lucide-react";

interface AuthorInfo { id: string; name: string; avatar: string; role: string; }
interface Blog { id: string; title: string; excerpt: string; published: boolean; createdAt: string; }

export default function AuthorDashboard() {
  const [author, setAuthor] = useState<AuthorInfo | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/author-auth/me")
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data) { router.push("/author/login"); return; }
        setAuthor(data.author);
        fetchBlogs(data.author.id);
      });
  }, [router]);

  const fetchBlogs = async (authorId: string) => {
    try {
      const res = await fetch(`/api/blogs?authorId=${authorId}`);
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/author-auth", { method: "DELETE" });
    router.push("/author/login");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    if (author) fetchBlogs(author.id);
  };

  const togglePublish = async (blog: Blog) => {
    await fetch(`/api/blogs/${blog.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...blog, published: !blog.published }),
    });
    if (author) fetchBlogs(author.id);
  };

  if (!author) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {author.avatar
              ? <img src={author.avatar} alt={author.name} className="w-9 h-9 rounded-full object-cover" />
              : <div className="w-9 h-9 rounded-full bg-royal-blue flex items-center justify-center text-white font-bold">{author.name[0]}</div>
            }
            <div>
              <p className="font-bold text-navy">{author.name}</p>
              <p className="text-xs text-gray-500">{author.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/author/blogs/new"
              className="flex items-center gap-2 bg-gradient-to-r from-royal-blue to-sky-blue text-white font-semibold px-5 py-2 rounded-lg hover:shadow-lg transition-all">
              <Plus className="w-4 h-4" /> New Post
            </Link>
            <button onClick={handleLogout} title="Logout"
              className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors p-2 bg-gray-100 rounded-lg hover:bg-red-50">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-navy mb-2">My Posts</h1>
        <p className="text-gray-500 mb-8">Manage your blog articles</p>

        {loading ? (
          <div className="text-center py-12"><div className="animate-spin h-10 w-10 border-b-2 border-royal-blue rounded-full mx-auto" /></div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
            <FileText className="w-14 h-14 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">You haven't written any posts yet.</p>
            <Link href="/author/blogs/new" className="inline-flex items-center gap-2 bg-royal-blue text-white px-5 py-2 rounded-lg hover:bg-opacity-90 transition-all">
              <Plus className="w-4 h-4" /> Write your first post
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {blogs.map((blog, i) => (
              <motion.div key={blog.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl shadow-sm p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-navy">{blog.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${blog.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-1">{blog.excerpt}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(blog.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2 self-start md:self-auto">
                  <button onClick={() => togglePublish(blog)} title={blog.published ? "Unpublish" : "Publish"}
                    className="p-2 text-gray-400 hover:text-royal-blue rounded-lg hover:bg-royal-blue/10 transition-colors">
                    {blog.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <Link href={`/author/blogs/${blog.id}/edit`} title="Edit Post"
                    className="p-2 text-gray-400 hover:text-royal-blue rounded-lg hover:bg-royal-blue/10 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </Link>
                  <button onClick={() => handleDelete(blog.id)} title="Delete Post"
                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
