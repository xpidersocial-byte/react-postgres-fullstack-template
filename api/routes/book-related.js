import { Hono } from "hono";
import { selectDataSource, bookRelatedMockUtils } from "../lib/utils.js";

// Create book related router
const bookRelatedRouter = new Hono();

// Thread Intelligence endpoint (includes book details, related data, and replies)
bookRelatedRouter.get("/", async (c) => {
	const bookId = c.req.param("id");

	// Use the imported mock logic
	const mockLogic = async (c) => {
		const data = await bookRelatedMockUtils.getRelatedBookData(c, bookId);
		const jsonData = await data.json();
		return Response.json({
			...jsonData,
			replies: [] // Mock replies if needed
		});
	};

	// Database logic
	const dbLogic = async (c) => {
		const sql = c.env.SQL;

		const book = await sql`SELECT * FROM public.books WHERE id = ${bookId}`;

		if (book.length === 0) {
			return Response.json({ error: "Book not found" }, { status: 404 });
		}

		const bookGenre = book[0].genre;

		const [relatedBooks, genreCounts, recentBooks, replies] = await Promise.all([
			sql`SELECT * FROM public.books WHERE genre = ${bookGenre} AND id != ${bookId} LIMIT 3`,
			sql`SELECT genre, COUNT(*) as count FROM public.books GROUP BY genre ORDER BY count DESC`,
			sql`SELECT * FROM public.books WHERE id != ${bookId} ORDER BY created_at DESC LIMIT 2`,
			sql`SELECT * FROM public.replies WHERE thread_id = ${bookId} ORDER BY created_at ASC`
		]);

		return Response.json({
			bookId: bookId,
			bookGenre: bookGenre,
			book: book[0],
			relatedBooks,
			recentRecommendations: recentBooks,
			genreStats: genreCounts,
			replies,
			source: "database",
		});
	};

	return selectDataSource(c, dbLogic, mockLogic);
});

// Post a reply to a thread
bookRelatedRouter.post("/replies", async (c) => {
	const threadId = c.req.param("id");
	const { author, content } = await c.req.json();

	const dbLogic = async (c) => {
		const sql = c.env.SQL;
		const result = await sql`
			INSERT INTO public.replies (thread_id, author, content)
			VALUES (${threadId}, ${author}, ${content})
			RETURNING *
		`;
		return Response.json({ success: true, reply: result[0] });
	};

	const mockLogic = async (c) => {
		return Response.json({ 
			success: true, 
			reply: { id: Date.now(), thread_id: threadId, author, content, created_at: new Date().toISOString() } 
		});
	};

	return selectDataSource(c, dbLogic, mockLogic);
});

export default bookRelatedRouter;
