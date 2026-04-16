import { getBlogs } from "./lib/blogs.ts";

async function main() {
    const blogs = await getBlogs();
    const authorsInBlogs = [...new Set(blogs.map(b => b.author))];
    console.log("Authors in blogs table column 'author':", authorsInBlogs);
}

main();
