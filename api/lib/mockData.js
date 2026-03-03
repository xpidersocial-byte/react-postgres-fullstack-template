// Forum-style Mock Data
export const mockBooks = [
	{
		id: 1,
		title: "Welcome to XPIDER Forum! Read the rules here.",
		author: "admin",
		description: "Please read this before posting. We follow strict community guidelines to ensure a productive environment for all developers.",
		image_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
		genre: "Announcements",
		replies: 12,
		views: 1420,
		created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
		updated_at: new Date().toISOString(),
	},
	{
		id: 2,
		title: "How to optimize Cloudflare D1 queries for scale?",
		author: "jdoe_dev",
		description: "I'm seeing some latency when my D1 database hits 1M+ rows. Any tips on indexing strategies specific to SQLite on the Edge?",
		image_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=jdoe",
		genre: "Technical Support",
		replies: 45,
		views: 3200,
		created_at: new Date(Date.now() - 3600000 * 5).toISOString(), // 5 hours ago
		updated_at: new Date().toISOString(),
	},
	{
		id: 3,
		title: "Showcase: Built a real-time chat using Durable Objects",
		author: "pixel_pioneer",
		description: "Just finished my latest project. It uses DO for state management and WebSockets for low-latency messaging. Check it out!",
		image_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=pixel",
		genre: "Showcase",
		replies: 89,
		views: 5600,
		created_at: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
		updated_at: new Date().toISOString(),
	},
	{
		id: 4,
		title: "React 19 Server Actions: My honest thoughts",
		author: "frontend_fan",
		description: "After using Server Actions for a month, I'm divided. On one hand, the simplicity is great. On the other, testing is tricky.",
		image_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=fan",
		genre: "General Discussion",
		replies: 156,
		views: 12400,
		created_at: new Date(Date.now() - 3600000 * 24 * 3).toISOString(), // 3 days ago
		updated_at: new Date().toISOString(),
	},
	{
		id: 5,
		title: "Hyperdrive vs Direct Postgres Connection: Latency benchmarks",
		author: "latency_king",
		description: "Ran some tests from different Cloudflare regions. Hyperdrive significantly reduces cold start overhead for remote databases.",
		image_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=king",
		genre: "Technical Support",
		replies: 23,
		views: 890,
		created_at: new Date(Date.now() - 3600000 * 10).toISOString(), // 10 hours ago
		updated_at: new Date().toISOString(),
	},
	{
		id: 6,
		title: "Anyone tried the new Tailwind CSS v4 alpha?",
		author: "style_guru",
		description: "The CSS-first approach is refreshing. @theme blocks make it feel more like vanilla CSS but with the power of Tailwind.",
		image_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=guru",
		genre: "General Discussion",
		replies: 67,
		views: 4500,
		created_at: new Date(Date.now() - 3600000 * 1).toISOString(), // 1 hour ago
		updated_at: new Date().toISOString(),
	}
];
