import { getAuthors } from "./lib/authors.ts";

async function main() {
    const authors = await getAuthors();
    console.log(JSON.stringify(authors, null, 2));
}

main();
