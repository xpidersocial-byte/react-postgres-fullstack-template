import { Hono } from "hono";

const mediaRouter = new Hono();

mediaRouter.post("/upload", async (c) => {
	try {
		const body = await c.req.parseBody();
		const file = body["source"];

		if (!file) {
			return c.json({ error: "No image source provided" }, 400);
		}

		const formData = new FormData();
		formData.append("key", "6d207e02198a847aa98d0a2a901485a5");
		formData.append("action", "upload");
		formData.append("source", file);
		formData.append("format", "json");

		const response = await fetch("https://freeimage.host/api/1/upload", {
			method: "POST",
			body: formData,
		});

		const data = await response.json();
		return c.json(data);
	} catch (error) {
		console.error("Media Proxy Error:", error);
		return c.json({ error: "Internal Server Error during media transmission" }, 500);
	}
});

export default mediaRouter;
