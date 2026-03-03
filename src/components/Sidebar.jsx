import { Link, useParams } from "react-router-dom";
import { 
  Globe, 
  Flame, 
  Clock, 
  Gavel, 
  Star, 
  LayoutGrid, 
  ArrowUpRight,
  Shield,
  Megaphone,
  Wrench,
  Sparkles,
  MessageSquare,
  Folder
} from "lucide-react";

function Sidebar({ genres, onSelectGenre, counts, theme, setTheme }) {
	const params = useParams();
	const activeGenre = params.genreId ? decodeURIComponent(params.genreId) : null;
	
	const mainLinks = [
		{ id: "home", label: "Global Network", icon: Globe, path: "/" },
		{ id: "popular", label: "Trending Node", icon: Flame, path: "/popular" },
		{ id: "latest", label: "Live Telemetry", icon: Clock, path: "/latest" },
		{ id: "voting", label: "Consensus", icon: Gavel, path: "/voting" },
		{ id: "following", label: "Tracked Hubs", icon: Star, path: "/following" },
	];

	const categoryIcons = {
		"Announcements": Megaphone,
		"Announcement": Megaphone,
		"Technical Support": Wrench,
		"Showcase": Sparkles,
		"General Discussion": MessageSquare,
	};

	const themes = [
		{ id: "carbon", color: "bg-[#121212]", border: "border-slate-700" },
		{ id: "midnight", color: "bg-[#161b2c]", border: "border-indigo-900" },
		{ id: "emerald", color: "bg-[#121b16]", border: "border-emerald-900" },
		{ id: "amber", color: "bg-[#1b1812]", border: "border-amber-900" },
	];

	return (
		<aside className="sidebar flex flex-col shadow-[20px_0_50px_rgba(0,0,0,0.5)]">
			<div className="px-8 mb-12">
				<div className="flex items-center gap-3 group cursor-pointer">
					<div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-blue-400/20 group-hover:scale-110 transition-transform">
						<Shield size={20} />
					</div>
					<div>
						<h1 className="text-base font-black tracking-tighter uppercase mb-0 text-white">XPIDER</h1>
						<p className="text-[9px] text-blue-500 font-black tracking-[0.3em] uppercase leading-none mt-1">Core Network</p>
					</div>
				</div>
			</div>

			<nav className="flex-1 px-4 space-y-1">
				<div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] px-4 mb-4">Navigation</div>
				{mainLinks.map((link) => {
					const Icon = link.icon;
					const isActive = activeGenre === null && link.id === "home";
					return (
						<Link
							key={link.id}
							to={link.path}
							className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-[13px] font-bold group relative ${
								isActive 
									? "bg-blue-600/10 text-blue-400 border border-blue-600/20" 
									: "text-slate-500 hover:text-slate-200 hover:bg-white/[0.02]"
							}`}
						>
							<Icon size={18} className={isActive ? "text-blue-400" : "text-slate-600 group-hover:text-slate-400"} />
							{link.label}
							{isActive && <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />}
						</Link>
					);
				})}

				<div className="pt-8">
					<div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] px-4 mb-4">Sectors</div>
					<div className="space-y-1">
						{genres?.map((genre) => {
							const Icon = categoryIcons[genre.name] || Folder;
							const isActive = activeGenre === genre.name;
							return (
								<Link
									key={genre.name}
									to={`/${encodeURIComponent(genre.name)}`}
									className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-[13px] font-bold group relative ${
										isActive
											? "bg-blue-600/10 text-blue-400 border border-blue-600/20"
											: "text-slate-500 hover:text-slate-200 hover:bg-white/[0.02]"
									}`}
								>
									<Icon size={18} className={isActive ? "text-blue-400" : "text-slate-600 group-hover:text-slate-400"} />
									<span className="truncate">{genre.name}</span>
									{counts && (
										<span className={`ml-auto text-[10px] px-2 py-0.5 rounded-lg font-black border ${
											isActive ? "bg-blue-500/20 border-blue-500/30 text-blue-400" : "bg-white/5 border-white/5 text-slate-600"
										}`}>
											{genre.count}
										</span>
									)}
								</Link>
							);
						})}
					</div>
				</div>
			</nav>

			<div className="px-6 py-6 border-t border-white/[0.03] mt-4">
				<div className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4 ml-2">Visual Core Theme</div>
				<div className="flex items-center gap-3 px-2">
					{themes.map((t) => (
						<button
							key={t.id}
							onClick={() => setTheme(t.id)}
							className={`w-8 h-8 rounded-full ${t.color} border-2 ${t.border} transition-all cursor-pointer hover:scale-110 active:scale-90 relative ${
								theme === t.id ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-[#0d0d0d] scale-110 shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "opacity-60"
							}`}
							title={`Switch to ${t.id} theme`}
						>
							{theme === t.id && (
								<div className="absolute inset-0 flex items-center justify-center">
									<div className="w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_5px_#3b82f6]"></div>
								</div>
							)}
						</button>
					))}
				</div>
			</div>

			<div className="px-4 pb-8">
				<div className="p-6 bg-gradient-to-br from-blue-600/10 to-transparent rounded-[2rem] border border-blue-500/10 relative overflow-hidden group">
					<div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-full border-b border-l border-blue-500/10"></div>
					<h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2">Edge Node v3.1</h4>
					<p className="text-[10px] text-slate-500 leading-relaxed mb-4 font-bold">
						Synchronized with Cloudflare Global Network.
					</p>
					<a
						href="#"
						className="text-[10px] text-blue-400 font-black uppercase flex items-center gap-1 hover:text-blue-300 transition-colors"
					>
						Kernel Docs <ArrowUpRight size={12} />
					</a>
				</div>
			</div>

			<div className="mt-auto px-8 py-6 border-t border-white/[0.04] bg-black/20 flex items-center gap-3">
				<div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
				<span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Uplink Stable // LHR-1</span>
			</div>
		</aside>
	);
}

export default Sidebar;
