import { Hono } from "hono";

const storage = new Hono();

storage.get("/status", async (c) => {
	const status = {
		d1: {
			available: !!c.env.D1,
			limit: "5GB",
			usage: "D1 SQL Database for relational data",
		},
		kv: {
			available: !!c.env.KV,
			limit: "1GB",
			usage: "KV Key-Value store for sessions/caching",
		},
		r2: {
			available: !!c.env.R2,
			limit: "10GB",
			usage: "R2 Object Storage for images/files",
		},
		hyperdrive: {
			available: !!c.env.HYPERDRIVE,
			usage: "Hyperdrive Postgres connection pooler",
		},
	};

	return c.json(status);
});

export default storage;
