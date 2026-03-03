import { Hono } from "hono";
import { setCookie, getCookie, deleteCookie } from "hono/cookie";

const auth = new Hono();

// Default Admin Credentials
const ADMIN_USER = {
	username: "admin",
	password: "password123", // In a real app, use hashed passwords
	role: "admin",
	name: "System Administrator"
};

auth.post("/login", async (c) => {
	const { username, password } = await c.req.json();

	if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
		// Set a simple session cookie
		setCookie(c, "session_token", "admin-session-id-123", {
			path: "/",
			httpOnly: true,
			secure: true,
			sameSite: "Strict",
			maxAge: 3600 // 1 hour
		});

		return c.json({ 
			success: true, 
			user: { username: ADMIN_USER.username, name: ADMIN_USER.name, role: ADMIN_USER.role } 
		});
	}

	return c.json({ success: false, message: "Invalid username or password" }, 401);
});

auth.get("/me", (c) => {
	const session = getCookie(c, "session_token");
	
	if (session === "admin-session-id-123") {
		return c.json({ 
			authenticated: true, 
			user: { username: ADMIN_USER.username, name: ADMIN_USER.name, role: ADMIN_USER.role } 
		});
	}

	return c.json({ authenticated: false }, 401);
});

auth.post("/logout", (c) => {
	deleteCookie(c, "session_token");
	return c.json({ success: true });
});

export default auth;
