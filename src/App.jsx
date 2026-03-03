import { useState, useEffect } from "react";
import { useNavigate, useParams, Routes, Route, Link, Navigate } from "react-router-dom";
import { Shield, LogOut } from "lucide-react";
import { groupByGenre } from "./lib/utils";
import Breadcrumbs from "./components/Breadcrumbs";
import Sidebar from "./components/Sidebar";
import BooksList from "./components/BooksList";
import BookDetail from "./components/BookDetail";
import MockDataBanner from "./components/MockDataBanner";
import StorageDashboard from "./components/StorageDashboard";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import LatestThreadsHero from "./components/LatestThreadsHero";
import AdminAnnouncement from "./components/AdminAnnouncement";
import VotingProtocol from "./components/VotingProtocol";
import NewThreadModal from "./components/NewThreadModal";
import RightSidebar from "./components/RightSidebar";

function App() {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [authChecked, setAuthChecked] = useState(false);
	const [allThreads, setAllThreads] = useState([]);
	const [genres, setGenres] = useState([]);
	const [dataSource, setDataSource] = useState(null);
	const [isNewThreadModalOpen, setIsNewThreadModalOpen] = useState(false);
	const [theme, setTheme] = useState(localStorage.getItem("xpider-theme") || "carbon");

	// Theme effect
	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("xpider-theme", theme);
	}, [theme]);

	// Check if user is already logged in
	useEffect(() => {
		const checkAuth = async () => {
			try {
				const response = await fetch("/api/auth/me");
				const data = await response.json();
				if (data.authenticated) {
					setUser(data.user);
				}
			} catch (err) {
				console.error("Auth check failed");
			} finally {
				setAuthChecked(true);
			}
		};
		checkAuth();
	}, []);

	// Load threads and categories
	useEffect(() => {
		if (!user) return;
		const loadData = async () => {
			try {
				const response = await fetch("/api/books");
				const data = await response.json();
				if (data.books?.length) {
					setDataSource(data.source);
					setAllThreads(data.books);
					setGenres(groupByGenre(data.books));
				}
			} catch (error) {
				console.error("Error loading forum data:", error);
			}
		};
		loadData();
	}, [user]);

	// Function to dynamically sync a new category to the sidebar
	const handleSyncCategory = async (categoryTitle) => {
		const welcomeThread = {
			title: `Welcome to the ${categoryTitle} Sector!`,
			author: "system_kernel",
			description: `This sector has been newly initialised. Start the conversation about ${categoryTitle} here.`,
			image_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${categoryTitle}`,
			genre: categoryTitle,
		};

		try {
			const response = await fetch("/api/books", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(welcomeThread),
			});

			const data = await response.json();

			if (data.success) {
				const updatedThreads = [data.book, ...allThreads];
				setAllThreads(updatedThreads);
				setGenres(groupByGenre(updatedThreads));
				return true;
			}
		} catch (err) {
			console.error("Failed to persist new category:", err);
		}
		return false;
	};

	const handleSelectGenre = (genre) => {
		genre ? navigate(`/${encodeURIComponent(genre)}`) : navigate("/");
	};

	const handleLogout = async () => {
		await fetch("/api/auth/logout", { method: "POST" });
		setUser(null);
		navigate("/login");
	};

	const handleCreateThread = (newThread) => {
		const updatedThreads = [newThread, ...allThreads];
		setAllThreads(updatedThreads);
		setGenres(groupByGenre(updatedThreads));
		navigate(`/book/${newThread.id}`);
	};

	if (!authChecked) return <div className="bg-[#050505] min-h-screen flex items-center justify-center text-white font-sans font-black uppercase tracking-[0.3em] text-xs">Initialising XPIDER Engine...</div>;

	return (
		<div className="layout">
			{/* Professional User Header */}
			{user && (
				<div style={{ position: 'fixed', top: '24px', right: '40px', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '20px' }}>
					{user.role === 'admin' && (
						<Link to="/admin" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)] transition-all active:scale-95 flex items-center gap-2 border border-blue-400/20">
							<Shield size={14} />
							Admin Console
						</Link>
					)}
					<div className="hidden lg:flex items-center gap-4 bg-[#111]/80 backdrop-blur-xl p-1.5 pr-6 rounded-2xl border border-white/[0.05] shadow-2xl">
						<div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 text-white rounded-xl flex items-center justify-center font-black text-xs border border-white/10 shadow-inner uppercase">
                            {user.name.charAt(0)}
                        </div>
						<div className="text-left">
							<div className="text-[11px] font-black text-white uppercase tracking-tight leading-none">{user.name}</div>
							<div className="flex items-center gap-1.5 text-emerald-500 uppercase tracking-widest font-black text-[8px] mt-1">
                                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                                Online
                            </div>
						</div>
					</div>
					<button onClick={handleLogout} className="w-10 h-10 flex items-center justify-center bg-[#111]/80 backdrop-blur-xl text-slate-500 hover:text-red-400 rounded-xl border border-white/[0.05] transition-all cursor-pointer hover:bg-red-500/5 hover:border-red-500/20 group">
						<LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
					</button>
				</div>
			)}

			<Routes>
				<Route path="/login" element={user ? <Navigate to="/" /> : <Login onLoginSuccess={setUser} />} />
				<Route path="/admin" element={user ? <AdminPanel user={user} genres={genres} onAddCategory={handleSyncCategory} theme={theme} setTheme={setTheme} /> : <Navigate to="/login" replace />} />
				<Route path="*" element={
					user ? (
						<div className="layout-container">
							<div className="sidebar-left">
								<Sidebar genres={genres} onSelectGenre={handleSelectGenre} counts theme={theme} setTheme={setTheme} />
							</div>

							<main className="main-column">
                                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/[0.02] blur-[150px] pointer-events-none rounded-full"></div>
								<div className="content-gate">
									<Routes>
										<Route path="/voting" element={<VotingProtocol onSync={handleSyncCategory} />} />
										<Route path="/book/:bookId" element={<BookPage user={user} />} />
										<Route path="/" element={<Dashboard allThreads={allThreads} dataSource={dataSource} onOpenNewThread={() => setIsNewThreadModalOpen(true)} />} />
										{/* Capture all other root-level paths as genre IDs */}
										<Route path="/:genreId" element={<GenrePage allThreads={allThreads} dataSource={dataSource} onOpenNewThread={() => setIsNewThreadModalOpen(true)} />} />
									</Routes>
								</div>
							</main>

							<RightSidebar threads={allThreads} genres={genres} />

							<NewThreadModal 
								isOpen={isNewThreadModalOpen} 
								onClose={() => setIsNewThreadModalOpen(false)} 
								onCreate={handleCreateThread}
								genres={genres}
							/>
						</div>
					) : <Navigate to="/login" replace />
				} />
			</Routes>
		</div>
	);
}

function GenrePage({ allThreads, dataSource, onOpenNewThread }) {
	const params = useParams();
	const navigate = useNavigate();
	const activeGenre = params.genreId ? decodeURIComponent(params.genreId) : null;

	return (
		<>
			<div className="mt-10 mb-16">
				<div className="flex items-baseline gap-4 mb-4">
					<h1 className="text-3xl font-serif font-bold text-white tracking-tighter">
						{activeGenre}
					</h1>
					{dataSource === "mock" && (
						<span className="text-[9px] bg-amber-900/20 text-amber-500 px-3 py-1 rounded-full border border-amber-900/50 font-black uppercase tracking-widest">
							Demo Data Active
						</span>
					)}
				</div>
			</div>

			<BooksList onSelectBook={(id) => navigate(`/book/${id}`)} filter={activeGenre} threads={allThreads} onOpenNewThread={onOpenNewThread} />
		</>
	);
}

function BookPage({ user }) {
	const params = useParams();
	const [bookData, setBookData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadThread = async () => {
			setLoading(true);
			try {
				const response = await fetch(`/api/books/${params.bookId}/related`);
				const data = await response.json();
				setBookData(data);
			} catch (error) {
				console.error("Error loading thread:", error);
			} finally {
				setLoading(false);
			}
		};
		loadThread();
	}, [params.bookId]);

	if (loading) {
		return (
			<div className="flex justify-center items-center py-32">
				<RefreshCw className="text-blue-500 animate-spin" size={40} />
			</div>
		);
	}

	if (!bookData?.book) {
		return (
			<div className="bg-[#0f0f0f] border border-dashed border-white/[0.05] rounded-[3rem] p-20 text-center">
				<AlertCircle size={40} className="mx-auto text-red-900 mb-4" />
				<p className="text-slate-600 font-black uppercase tracking-widest text-xs">Intelligence Node not found or inaccessible.</p>
			</div>
		);
	}

	return <BookDetail bookData={bookData} user={user} />;
}

function Dashboard({ allThreads, dataSource, onOpenNewThread }) {
	const navigate = useNavigate();
	return (
		<>
			<div className="mt-10 mb-16">
				<LatestThreadsHero threads={allThreads} />
				<AdminAnnouncement />

				<div className="flex items-baseline gap-4 mb-4">
					<h1 className="text-3xl font-serif font-bold text-white tracking-tighter">
						All Discussions
					</h1>
					{dataSource === "mock" && (
						<span className="text-[9px] bg-amber-900/20 text-amber-500 px-3 py-1 rounded-full border border-amber-900/50 font-black uppercase tracking-widest">
							Demo Data Active
						</span>
					)}
				</div>
			</div>

			<BooksList onSelectBook={(id) => navigate(`/book/${id}`)} threads={allThreads} onOpenNewThread={onOpenNewThread} />
		</>
	);
}

export default App;
