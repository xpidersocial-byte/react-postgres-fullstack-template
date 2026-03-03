import { useNavigate } from "react-router-dom";
import { Zap, ArrowRight, MessageSquare, TrendingUp } from "lucide-react";

export default function LatestThreadsHero({ threads }) {
	const navigate = useNavigate();
	const latest = threads.slice(0, 3);

	if (threads.length === 0) return null;

	return (
		<div className="mb-16 grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
			<div 
				onClick={() => navigate(`/book/${latest[0]?.id}`)}
				className="lg:col-span-2 relative h-[450px] rounded-[3rem] overflow-hidden border border-white/[0.05] shadow-2xl group cursor-pointer"
			>
				<div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent z-10"></div>
				<img 
					src={latest[0]?.image_url || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"} 
					className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
					alt="Hero"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent z-20"></div>
				
				<div className="absolute bottom-0 left-0 p-12 z-30 w-full">
					<div className="flex items-center gap-2 mb-6">
						<div className="px-3 py-1 bg-blue-600 rounded-lg text-white text-[9px] font-black uppercase tracking-[0.2em]">Featured Node</div>
						<div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-slate-300 text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5">
                            <TrendingUp size={10} className="text-blue-400" />
                            Trending
                        </div>
					</div>
					<h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase mb-4 leading-[0.9]">
						{latest[0]?.title || "Initialising Network Streams..."}
					</h2>
					<p className="text-slate-400 font-bold max-w-xl mb-8 line-clamp-2 uppercase text-xs tracking-wide">
						{latest[0]?.description || "Standby for incoming intelligence data."}
					</p>
					<button className="flex items-center gap-3 px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-blue-500 hover:text-white transition-all active:scale-95 uppercase tracking-widest text-[11px] group/btn">
						Synchronize <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
					</button>
				</div>
			</div>

			<div className="bg-[#0f0f0f] rounded-[3rem] border border-white/[0.05] p-10 flex flex-col shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-full border-b border-l border-blue-500/10"></div>
				<div className="flex items-center gap-3 mb-10 relative z-10">
					<div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center border border-blue-600/20">
						<Zap className="text-blue-500" size={20} />
					</div>
					<h3 className="text-sm font-black text-white uppercase tracking-widest mb-0">System Pulse</h3>
				</div>

				<div className="space-y-8 relative z-10">
					{latest.slice(1, 3).map((t, i) => (
						<div key={i} onClick={() => navigate(`/book/${t.id}`)} className="group cursor-pointer">
							<p className="text-[10px] text-blue-500 font-black uppercase tracking-widest mb-2">{t.genre}</p>
							<h4 className="text-base font-black text-white group-hover:text-blue-400 transition-colors line-clamp-2 uppercase tracking-tight mb-2">{t.title}</h4>
							<div className="flex items-center gap-3 text-slate-600">
								<MessageSquare size={12} />
								<span className="text-[10px] font-black uppercase tracking-widest">{t.replies} Responses</span>
							</div>
						</div>
					))}
				</div>

				<div className="mt-auto pt-8 border-t border-white/[0.03]">
					<div className="flex justify-between items-center">
						<span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Active Data Streams</span>
						<span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-1.5">
                            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                            Connected
                        </span>
					</div>
				</div>
			</div>
		</div>
	);
}
