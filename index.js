import express from "express"
import pg from "pg";
import "dotenv/config";

const port = Number(process.env.PORT ?? process.env.APP_PORT ?? 3000);
const db = new pg.Client(
    process.env.DATABASE_URL
        ? { connectionString: process.env.DATABASE_URL }
        : {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT ?? 5432)
        }
);

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/showall", async (req, res, next) => {
    try {
        const result = await db.query("SELECT content FROM users_content");
        res.render("content", { content: result.rows });
    } catch (error) {
        next(error);
    }
});

app.post("/submit", async (req, res, next) => {
    const content = req.body.content;
    if (typeof content !== "string" || !content.trim()) {
        return res.status(400).send("Please enter a snippet or note.");
    }

    try {
        await db.query("INSERT INTO users_content(title, content) VALUES ($1, $2)", ["Code", content]);
        res.redirect("/");
    } catch (error) {
        next(error);
    }
});

app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send("Something went wrong. Please try again later.");
});

async function start() {
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new Error("PORT must be a valid port number.");
    }

    await db.connect();
    await db.query(`
        CREATE TABLE IF NOT EXISTS users_content (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            content TEXT NOT NULL
        )
    `);
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

start().catch((error) => {
    console.error("Failed to start the server:", error);
    process.exitCode = 1;
});