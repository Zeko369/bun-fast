import { Database } from "bun:sqlite";
const db = new Database("mydb.sqlite", { create: true });

db.exec(
  "CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY, title TEXT, body TEXT)"
);
db.exec("INSERT INTO posts (title, body) VALUES (?, ?)", [
  "Hello World",
  "This is my first post",
]);

class Post {
  id: number;
  title: string;
  body: string;
}

Bun.serve({
  port: 4000,
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/post") {
      const post = db.query("SELECT * FROM posts LIMIT 1").as(Post).get();
      if (!post) return new Response("404");

      return new Response(`<h1>${post.title}</h1><p>${post.body}</p>`);
    }

    return new Response("404!");
  },
});
