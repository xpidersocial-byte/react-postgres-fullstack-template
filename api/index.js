import { Hono } from "hono";
import postgres from "postgres";
import booksRouter from "./routes/books";
import bookRelatedRouter from "./routes/book-related";
import authRouter from "./routes/auth";
import mediaRouter from "./routes/media";
import storageRouter from "./routes/storage";
import { mockBooks } from "./lib/mockData";

const app = new Hono();

// Setup SQL client middleware
app.use("*", async (c, next) => {
	// 1. Check for Hyperdrive (Postgres)
	if (c.env.HYPERDRIVE) {
		try {
			const sql = postgres(c.env.HYPERDRIVE.connectionString, {
				max: 5,
				fetch_types: false,
			});
			c.env.SQL = sql;
			c.env.DB_AVAILABLE = true;
			await next();
			c.executionCtx.waitUntil(sql.end());
			return;
		} catch (error) {
			console.error("Hyperdrive connection error:", error);
		}
	} 
	
	// 2. Check for D1 (SQLite)
	if (c.env.D1) {
		// Create a compatibility layer for D1 to match the 'postgres' tagged template literal usage
		c.env.SQL = async (strings, ...values) => {
			// SQLite doesn't support 'public.' schema prefix
			let query = strings.reduce((acc, str, i) => acc + str + (values[i] !== undefined ? "?" : ""), "");
			query = query.replace(/public\./g, ""); 
			
			const stmt = c.env.D1.prepare(query);
			const result = await stmt.bind(...values).all();
			return result.results;
		};
		c.env.DB_AVAILABLE = true;
		await next();
		return;
	}

	// 3. Fallback to Mock Data
	console.log("No database connection available (Hyperdrive or D1). Using mock data.");
	c.env.DB_AVAILABLE = false;
	c.env.MOCK_DATA = mockBooks;
	await next();
});

app.route("/api/books", booksRouter);
app.route("/api/books/:id/related", bookRelatedRouter);
app.route("/api/auth", authRouter);
app.route("/api/media", mediaRouter);
app.route("/api/storage", storageRouter);

// Catch-all route for static assets
app.all("*", async (c) => {
	return c.env.ASSETS.fetch(c.req.raw);
});

export default {
	fetch: app.fetch,
};
