import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Tag, 
  Users, 
  Database, 
  Terminal, 
  Settings, 
  ArrowLeft,
  Activity,
  Shield,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Cpu,
  RefreshCw,
  Search,
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  Copy,
  ExternalLink
} from "lucide-react";

export default function AdminPanel({ user, genres, onAddCategory }) {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState("dashboard");
	const [stats, setStats] = useState({
		totalBooks: 0,
		totalGenres: 0,
		dbStatus: "Healthy (D1)",
		lastBackup: "Just Now"
	});

	// Image Upload State
	const [uploading, setUploading] = useState(false);
	const [uploadedImages, setUploadedImages] = useState([]);
	const [uploadError, setUploadError] = useState(null);

	useEffect(() => {
		if (user?.role !== "admin") {
			navigate("/");
			return;
		}

		if (genres) {
			setStats(prev => ({
				...prev,
				totalBooks: genres.reduce((acc, g) => acc + g.count, 0),
				totalGenres: genres.length,
			}));
		}
	}, [user, navigate, genres]);

	if (user?.role !== "admin") return null;

	const menuItems = [
		{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
		{ id: "categories", label: "Categories", icon: Tag },
		{ id: "media", label: "Asset Node", icon: ImageIcon },
		{ id: "users", label: "User Management", icon: Users },
		{ id: "logs", label: "System Logs", icon: Terminal },
		{ id: "settings", label: "Settings", icon: Settings },
	];

	const [newCategory, setNewCategory] = useState({ name: "", description: "" });
	const [isCreating, setIsCreating] = useState(false);

	const handleCreateCategory = async (e) => {
		e.preventDefault();
		if (!newCategory.name) return;
		
		setIsCreating(true);
		
		if (onAddCategory) {
			const success = await onAddCategory(newCategory.name);
			if (success) {
				setNewCategory({ name: "", description: "" });
			}
		}
		
		setIsCreating(false);
	};

	const handleImageUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		setUploading(true);
		setUploadError(null);

		const formData = new FormData();
		formData.append("source", file);

		try {
			const response = await fetch("/api/media/upload", {
				method: "POST",
				body: formData,
			});

			const data = await response.json();

			if (data.status_code === 200) {
				setUploadedImages(prev => [data.image, ...prev]);
			} else {
				setUploadError(data.error?.message || data.error || "Upload failed");
			}
		} catch (err) {
			setUploadError("Network error: Could not reach image server");
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="flex min-h-screen bg-[#0a0a0a] w-full text-gray-200 font-sans selection:bg-blue-500/30">
			{/* Professional Admin Sidebar */}
			<aside className="w-72 bg-[#0f0f0f] border-r border-white/[0.05] flex flex-col fixed h-full z-30 transition-all">
				<div className="p-8 mb-4">
					<div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-blue-400/20">
                            <Cpu size={20} />
                        </div>
                        <div>
					        <h2 className="text-lg font-black text-white tracking-tighter uppercase leading-none">XPIDER</h2>
					        <p className="text-[9px] text-blue-500 uppercase tracking-[0.3em] mt-1 font-black">Admin Kernel</p>
                        </div>
					</div>
				</div>

				<nav className="flex-1 px-4 space-y-1">
					<div className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] px-4 mb-4 mt-2">Core Modules</div>
					{menuItems.map((item) => (
						<button
							key={item.id}
							onClick={() => setActiveTab(item.id)}
							className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all text-[13px] font-bold cursor-pointer group relative ${
								activeTab === item.id 
									? "bg-blue-600/10 text-blue-400 border border-blue-600/20" 
									: "text-gray-500 hover:text-gray-300 hover:bg-white/[0.02] border border-transparent"
							}`}
						>
							<item.icon size={18} className={activeTab === item.id ? "text-blue-400" : "text-gray-600 group-hover:text-gray-400"} />
							{item.label}
                            {activeTab === item.id && (
                                <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                            )}
						</button>
					))}
				</nav>

				<div className="p-6 border-t border-white/[0.05] bg-[#0d0d0d]">
					<button 
						onClick={() => navigate("/")}
						className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-gray-400 text-[11px] font-black uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all cursor-pointer group"
					>
						<ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
						Exit to Interface
					</button>
				</div>
			</aside>

			{/* Main Admin Content */}
			<main className="flex-1 ml-72 p-12 bg-[#0a0a0a] relative">
                {/* Subtle Background Glow */}
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-600/5 blur-[120px] pointer-events-none rounded-full"></div>

				<header className="mb-12 flex justify-between items-end relative z-10">
					<div>
                        <div className="flex items-center gap-2 mb-2 text-blue-500 font-black text-[10px] uppercase tracking-widest">
                            <Shield size={12} />
                            Root Access Authenticated
                        </div>
						<h1 className="text-5xl font-black text-white tracking-tighter uppercase mb-1">{activeTab}</h1>
						<p className="text-gray-600 text-xs font-bold uppercase tracking-[0.2em]">Kernel Version 3.1.0-STABLE // Sector: {activeTab}</p>
					</div>
					<div className="flex items-center gap-4 bg-[#111] p-2 pr-6 rounded-2xl border border-white/[0.05] shadow-2xl">
						<div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl flex items-center justify-center font-black text-sm shadow-inner border border-blue-400/20">A</div>
						<div className="text-xs">
							<div className="font-black text-gray-100 uppercase tracking-tight">{user.name}</div>
							<div className="flex items-center gap-1.5 text-blue-500/70 uppercase tracking-tighter font-black text-[9px] mt-0.5">
                                <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse"></div>
                                System Administrator
                            </div>
						</div>
					</div>
				</header>

				{activeTab === "dashboard" && (
					<div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
							<AdminStatCard title="Global Threads" value={stats.totalBooks} icon={Activity} color="text-blue-400" trend="+12.5%" />
							<AdminStatCard title="Active Sectors" value={stats.totalGenres} icon={Tag} color="text-purple-400" trend="Live" />
							<AdminStatCard title="Node Health" value={stats.dbStatus} icon={RefreshCw} color="text-emerald-400" trend="100%" />
						</div>

						<div className="bg-[#0f0f0f] border border-white/[0.05] rounded-[2.5rem] shadow-2xl overflow-hidden">
							<div className="px-10 py-8 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.01]">
                                <div>
								    <h2 className="font-black text-white uppercase tracking-widest text-xs mb-1">Intelligence Feed</h2>
                                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Real-time system transaction logs</p>
                                </div>
								<div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                                    <span className="text-[9px] text-blue-400 font-black uppercase tracking-widest">Live Uplink</span>
                                </div>
							</div>
							<div className="overflow-x-auto">
								<table className="w-full text-left text-sm">
									<thead className="bg-black/20 text-gray-600 uppercase text-[10px] tracking-[0.2em] font-black">
										<tr>
											<th className="px-10 py-6">Operation Descriptor</th>
											<th className="px-10 py-6">Origin Node</th>
											<th className="px-10 py-6">Timestamp</th>
											<th className="px-10 py-6">Status</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-white/[0.03]">
										<ActivityRow event="Root Access Protocol Handshake" user="kernel.root" time="Just now" status="Success" />
										<ActivityRow event="D1 Database Sector Scan" user="node.edge.lhr" time="14 mins ago" status="Complete" />
										<ActivityRow event="KV Namespace Synchronization" user="worker.global" time="42 mins ago" status="Success" />
										<ActivityRow event="R2 Asset Integrity Audit" user="storage.sys" time="2 hours ago" status="Warning" />
									</tbody>
								</table>
							</div>
						</div>
					</div>
				)}

				{activeTab === "categories" && (
					<div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
						<div className="bg-[#0f0f0f] border border-white/[0.05] rounded-[2.5rem] p-12 max-w-2xl shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-full border-b border-l border-blue-500/10"></div>
							<div className="mb-10 relative z-10">
								<h2 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase">Taxonomy Protocol</h2>
								<p className="text-gray-500 text-xs font-bold uppercase tracking-widest italic">Initialise a new sector for the network.</p>
							</div>

							<form onSubmit={handleCreateCategory} className="space-y-8 relative z-10">
								<div className="space-y-3">
									<label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Sector Identifier (Name)</label>
									<input
										type="text"
										value={newCategory.name}
										onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
										className="w-full px-6 py-4 bg-black/40 border border-white/[0.05] text-white rounded-2xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 focus:outline-none transition-all placeholder:text-gray-800 text-sm font-bold"
										placeholder="e.g. CYBERSECURITY"
										required
									/>
								</div>

								<div className="space-y-3">
									<label className="text-[10px] font-black text-gray-600 uppercase tracking-widest ml-1">Mission Brief (Description)</label>
									<textarea
										value={newCategory.description}
										onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
										className="w-full px-6 py-4 bg-black/40 border border-white/[0.05] text-white rounded-2xl focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 focus:outline-none transition-all placeholder:text-gray-800 text-sm font-medium min-h-[120px] resize-none"
										placeholder="State the primary objective of this sector..."
									/>
								</div>

								<button
									type="submit"
									disabled={isCreating || !newCategory.name}
									className="group w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all duration-300 disabled:opacity-30 shadow-[0_10px_30px_-10px_rgba(37,99,235,0.5)] active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[11px]"
								>
									{isCreating ? (
                                        <RefreshCw size={16} className="animate-spin" />
                                    ) : (
                                        <>
                                            Execute Initialisation
                                            <Plus size={18} />
                                        </>
                                    )}
								</button>
							</form>
						</div>

						<div className="space-y-8">
							<div className="flex items-center justify-between px-2">
							    <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em]">Active Sectors Map</h3>
                                <div className="flex items-center gap-2 text-gray-700 text-[10px] font-black uppercase">
                                    <Search size={12} />
                                    Search Database
                                </div>
                            </div>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{genres?.map((genre, i) => (
									<div key={i} className="bg-[#0f0f0f] p-8 rounded-[2rem] border border-white/[0.05] flex flex-col transition-all group hover:border-blue-500/30 shadow-xl hover:-translate-y-1">
										<div className="flex items-start justify-between mb-6">
											<div className="w-12 h-12 bg-white/[0.02] rounded-xl flex items-center justify-center text-blue-500 border border-white/[0.05] group-hover:border-blue-500/20 group-hover:bg-blue-500/5 transition-all">
                                                <Tag size={20} />
                                            </div>
											<div className="text-[10px] text-gray-700 font-black uppercase tracking-widest border border-white/[0.05] px-2 py-1 rounded-lg">Sector #{i+1}</div>
										</div>
										<span className="text-lg font-black text-white uppercase tracking-tighter mb-1 group-hover:text-blue-400 transition-colors">{genre.name}</span>
										<span className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-6">{genre.count} Total Threads</span>
                                        
                                        <div className="mt-auto pt-6 border-t border-white/[0.03] flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
										    <button className="text-[9px] text-blue-500 font-black uppercase tracking-widest hover:text-blue-400">Manage</button>
                                            <button className="text-[9px] text-red-900 font-black uppercase tracking-widest hover:text-red-500 transition-colors flex items-center gap-1">
                                                <Trash2 size={10} /> Wipe
                                            </button>
                                        </div>
									</div>
								))}
								{(!genres || genres.length === 0) && (
									<div className="col-span-full p-20 bg-[#0f0f0f] border border-dashed border-white/[0.05] rounded-[3rem] text-center">
                                        <AlertCircle size={40} className="mx-auto text-gray-800 mb-4" />
										<p className="text-gray-700 font-black uppercase tracking-widest text-xs">No active sectors detected in database.</p>
									</div>
								)}
							</div>
						</div>
					</div>
				)}

				{activeTab === "media" && (
					<div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
						<div className="bg-[#0f0f0f] border border-white/[0.05] rounded-[2.5rem] p-12 max-w-4xl shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-full border-b border-l border-blue-500/10"></div>
							<div className="mb-10 relative z-10">
								<h2 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase">Asset Uplink Protocol</h2>
								<p className="text-gray-500 text-xs font-bold uppercase tracking-widest italic">Sync media assets to the XPIDER Cloud (Freeimage.host Node).</p>
							</div>

							<div className="space-y-8 relative z-10">
								<div className="flex items-center justify-center w-full">
									<label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/[0.05] rounded-[2rem] cursor-pointer bg-black/20 hover:bg-black/40 hover:border-blue-500/30 transition-all group">
										<div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            {uploading ? (
                                                <RefreshCw size={40} className="text-blue-500 animate-spin mb-4" />
                                            ) : (
											    <Upload size={40} className="text-gray-600 group-hover:text-blue-500 transition-colors mb-4" />
                                            )}
											<p className="mb-2 text-sm text-gray-400 font-bold uppercase tracking-widest">
												{uploading ? "Transmitting Data..." : "Drag and drop or click to upload"}
											</p>
											<p className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">JPG, PNG, BMP, GIF, WEBP (MAX 128MB)</p>
										</div>
										<input type="file" className="hidden" onChange={handleImageUpload} disabled={uploading} />
									</label>
								</div>

                                {uploadError && (
                                    <div className="flex items-center gap-3 p-4 bg-red-500/5 border border-red-500/20 text-red-400 text-[11px] font-bold rounded-2xl animate-pulse">
                                        <AlertCircle size={16} />
                                        <span>SYSTEM_ERROR: {uploadError}</span>
                                    </div>
                                )}
							</div>
						</div>

						<div className="space-y-8">
							<div className="flex items-center justify-between px-2">
							    <h3 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em]">Network Asset Vault</h3>
                                <div className="text-[10px] text-gray-700 font-black uppercase">{uploadedImages.length} Synced Items</div>
                            </div>
							
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{uploadedImages.map((img, i) => (
									<div key={i} className="bg-[#0f0f0f] border border-white/[0.05] rounded-[2rem] overflow-hidden group hover:border-blue-500/30 transition-all shadow-xl">
										<div className="aspect-video relative overflow-hidden bg-black flex items-center justify-center">
                                            <img src={img.display_url} alt={img.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                                <a href={img.url_viewer} target="_blank" rel="noreferrer" className="p-3 bg-white/10 rounded-xl hover:bg-blue-600 transition-colors text-white">
                                                    <ExternalLink size={18} />
                                                </a>
                                                <button 
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(img.url);
                                                        alert("URL copied to clipboard");
                                                    }}
                                                    className="p-3 bg-white/10 rounded-xl hover:bg-blue-600 transition-colors text-white"
                                                >
                                                    <Copy size={18} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <p className="text-sm font-black text-white uppercase tracking-tight truncate max-w-[150px]">{img.name}</p>
                                                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{img.size_formatted} // {img.extension.toUpperCase()}</p>
                                                </div>
                                                <div className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-500 text-[8px] font-black uppercase tracking-widest">Synced</div>
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-2.5 bg-black/40 border border-white/[0.05] rounded-xl">
                                                <LinkIcon size={12} className="text-gray-600" />
                                                <input readOnly value={img.url} className="bg-transparent border-none outline-none text-[10px] font-mono text-gray-400 w-full" />
                                            </div>
                                        </div>
									</div>
								))}
                                {uploadedImages.length === 0 && (
                                    <div className="col-span-full p-20 bg-[#0f0f0f] border border-dashed border-white/[0.05] rounded-[3rem] text-center">
                                        <ImageIcon size={40} className="mx-auto text-gray-800 mb-4" />
                                        <p className="text-gray-700 font-black uppercase tracking-widest text-xs">No assets detected in session vault.</p>
                                    </div>
                                )}
							</div>
						</div>
					</div>
				)}

				{(activeTab === "users" || activeTab === "logs" || activeTab === "settings") && (
					<div className="bg-[#0f0f0f] border border-white/[0.05] rounded-[3rem] p-24 text-center animate-in zoom-in duration-500 shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-600/[0.01] pointer-events-none"></div>
						<div className="w-24 h-24 bg-white/[0.02] border border-white/[0.05] rounded-3xl flex items-center justify-center mx-auto mb-8">
                            <Settings size={40} className="text-gray-800 animate-spin-slow" />
                        </div>
						<h2 className="text-3xl font-black text-white mb-3 tracking-tighter uppercase">Calibrating {activeTab}</h2>
						<p className="text-gray-600 text-sm font-bold max-w-md mx-auto leading-relaxed uppercase tracking-widest">
                            The XPIDER Engine is currently synchronizing this high-level interface module for production deployment.
                        </p>
					</div>
				)}
			</main>
		</div>
	);
}

function AdminStatCard({ title, value, icon: Icon, color, trend }) {
	return (
		<div className={`bg-[#0f0f0f] p-8 rounded-[2.5rem] border border-white/[0.05] shadow-xl transition-all hover:border-white/10 hover:-translate-y-1 group relative overflow-hidden`}>
			<div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-bl-full pointer-events-none"></div>
            <div className="flex items-start justify-between mb-8 relative z-10">
                <div className={`p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] ${color} group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                </div>
                <div className="flex flex-col items-end">
                    <span className={`text-[10px] font-black uppercase tracking-tighter ${trend.includes('+') ? 'text-emerald-500' : 'text-blue-500'}`}>
                        {trend}
                    </span>
                    <span className="text-[8px] text-gray-700 font-black uppercase tracking-widest mt-0.5">Real-time</span>
                </div>
            </div>
			<div className="text-gray-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{title}</div>
			<div className={`text-3xl font-black text-white tracking-tighter uppercase`}>{value}</div>
		</div>
	);
}

function ActivityRow({ event, user, time, status }) {
	return (
		<tr className="hover:bg-white/[0.02] transition-colors group">
			<td className="px-10 py-7">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-gray-600 group-hover:text-blue-500 transition-colors">
                        <Activity size={14} />
                    </div>
                    <span className="font-bold text-gray-200 text-sm tracking-tight">{event}</span>
                </div>
            </td>
			<td className="px-10 py-7">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/30"></div>
                    <span className="text-gray-600 font-mono text-[11px] font-bold group-hover:text-blue-400/70 transition-colors">{user}</span>
                </div>
            </td>
			<td className="px-10 py-7 text-gray-600 text-[11px] font-black uppercase tracking-widest">{time}</td>
			<td className="px-10 py-7">
				<span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border shadow-inner ${
					status === 'Success' || status === 'Complete' 
                        ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/20' 
                        : 'bg-amber-500/5 text-amber-500 border-amber-500/20'
				}`}>
					{status}
				</span>
			</td>
		</tr>
	);
}
