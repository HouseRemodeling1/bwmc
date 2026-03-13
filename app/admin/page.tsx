"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, FileText, LogOut } from "lucide-react";

interface Blog {
    id: string;
    title: string;
    excerpt: string;
    published: boolean;
    createdat: string;
}

export default function AdminDashboard() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await fetch("/api/blogs");
            const data = await res.json();
            setBlogs(data);
        } catch (error) {
            console.error("Failed to fetch blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await fetch("/api/auth", { method: "DELETE" });
        router.push("/admin/login");
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this blog?")) return;

        try {
            await fetch(`/api/blogs/${id}`, { method: "DELETE" });
            fetchBlogs();
        } catch (error) {
            alert("Failed to delete blog");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-navy">Blog Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-navy mb-2">Your Blogs</h2>
                        <p className="text-gray-600">Manage and create blog posts</p>
                    </div>
                    <Link
                        href="/admin/blogs/new"
                        className="flex items-center gap-2 bg-gradient-to-r from-royal-blue to-sky-blue text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        New Blog
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-royal-blue"></div>
                    </div>
                ) : blogs.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300"
                    >
                        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No blogs yet</h3>
                        <p className="text-gray-500 mb-6">Create your first blog post to get started</p>
                        <Link
                            href="/admin/blogs/new"
                            className="inline-flex items-center gap-2 bg-royal-blue text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-all"
                        >
                            <Plus className="w-5 h-5" />
                            Create Blog
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid gap-6">
                        {blogs.map((blog, index) => (
                            <motion.div
                                key={blog.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold text-navy">{blog.title}</h3>
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${blog.published
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {blog.published ? "Published" : "Draft"}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mb-3">{blog.excerpt}</p>
                                        <p className="text-sm text-gray-400">
                                            Created: {new Date(blog.createdat).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <Link
                                            href={`/admin/blogs/${blog.id}/edit`}
                                            className="px-4 py-2 bg-royal-blue text-white rounded-lg hover:bg-opacity-90 transition-all"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(blog.id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
