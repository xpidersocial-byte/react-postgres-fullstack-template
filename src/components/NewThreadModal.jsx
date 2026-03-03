import { useState } from "react";
import { X, MessageSquare, Send, Type, AlignLeft, Hash, Shield, Zap } from "lucide-react";

export default function NewThreadModal({ isOpen, onClose, onCreate, genres, activeGenre }) {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [genre, setGenre] = useState(activeGenre || "");
	const [loading, setLoading] = useState(false);

	if (!isOpen) return null;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title || !content || !genre) return;

		setLoading(true);
		
		const threadData = {
			title,
			author: "admin", // Demo default
			description: content,
			image_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${title}`,
			genre,
		};

		try {
			const response = await fetch("/api/books", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(threadData),
			});

			const data = await response.json();

			if (data.success) {
				onCreate(data.book);
				setTitle("");
				setContent("");
				onClose();
			} else {
				alert("KERNEL_SYNC_ERROR: UNABLE TO PERSIST DATA CORE");
			}
		} catch (err) {
			alert("NETWORK_TRANSCEIVER_FAILURE: ACCESS_DENIED");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-500">
			<div className="bg-[#0a0a0a] w-full max-w-3xl rounded-[3rem] border border-white/[0.05] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8)] overflow-hidden relative">
				<div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                
				{/* Header */}
				<div className="px-12 py-10 border-b border-white/[0.03] flex justify-between items-center bg-white/[0.01]">
					<div className="flex items-center gap-5">
						<div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-600/20 shadow-inner">
							<Zap className="text-blue-500" size={28} />
						</div>
						<div>
                            <div className="flex items-center gap-2 mb-1">
                                <Shield size={12} className="text-blue-500" />
							    <h2 className="text-2xl font-black text-white tracking-tighter uppercase mb-0">Initialise Thread</h2>
                            </div>
							<p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black">Broadcast intelligence to the global network</p>
						</div>
					</div>
					<button 
						onClick={onClose}
						className="w-12 h-12 rounded-2xl hover:bg-white/5 flex items-center justify-center text-slate-600 hover:text-white transition-all cursor-pointer border border-transparent hover:border-white/10"
					>
						<X size={24} />
					</button>
				</div>

				{/* Body */}
				<form onSubmit={handleSubmit} className="p-12 space-y-10 relative z-10">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
						<div className="space-y-3 md:col-span-2">
							<label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
								<Type size={12} className="text-blue-500" /> Topic Identifier
							</label>
							<input
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="w-full px-6 py-5 bg-black/40 border border-white/[0.05] text-white rounded-[1.5rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/40 transition-all placeholder:text-slate-800 text-lg font-black tracking-tight uppercase"
								placeholder="Enter subject code..."
								required
							/>
						</div>

						<div className="space-y-3">
							<label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
								<Hash size={12} className="text-blue-500" /> Target Sector
							</label>
							<select
								value={genre}
								onChange={(e) => setGenre(e.target.value)}
								className="w-full px-6 py-5 bg-black/40 border border-white/[0.05] text-white rounded-[1.5rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/40 transition-all text-xs font-black uppercase tracking-widest cursor-pointer appearance-none"
								required
							>
								<option value="" disabled className="bg-[#0a0a0a]">Select Sector</option>
								{genres.map(g => (
									<option key={g.name} value={g.name} className="bg-[#0a0a0a]">{g.name.toUpperCase()}</option>
								))}
							</select>
						</div>
					</div>

					<div className="space-y-3">
						<label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
							<AlignLeft size={12} className="text-blue-500" /> Intelligence Briefing
						</label>
						<textarea
							value={content}
							onChange={(e) => setContent(e.target.value)}
							className="w-full px-8 py-6 bg-black/40 border border-white/[0.05] text-slate-300 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/40 transition-all placeholder:text-slate-800 text-base font-bold min-h-[220px] resize-none leading-relaxed"
							placeholder="Compose the primary data transmission..."
							required
						/>
					</div>

					<div className="pt-6 flex gap-6">
						<button
							type="button"
							onClick={onClose}
							className="flex-1 py-5 bg-white/[0.02] hover:bg-white/[0.05] text-slate-500 hover:text-white font-black rounded-2xl transition-all uppercase tracking-widest text-[11px] border border-white/[0.05] cursor-pointer"
						>
							Abort Mission
						</button>
						<button
							type="submit"
							disabled={loading || !title || !content || !genre}
							className="flex-[2.5] py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all duration-500 disabled:opacity-30 shadow-[0_20px_40px_-10px_rgba(37,99,235,0.5)] active:scale-[0.98] flex items-center justify-center gap-4 uppercase tracking-[0.2em] text-[11px] cursor-pointer group"
						>
							{loading ? (
								"TRANSMITTING DATA..."
							) : (
								<>
									Broadcast to Network <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
								</>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
