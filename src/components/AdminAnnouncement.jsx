import { ShieldAlert, ArrowRight, ExternalLink } from "lucide-react";

export default function AdminAnnouncement() {
	return (
		<div className="mb-16 bg-blue-600/5 border border-blue-500/20 rounded-[2rem] p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
			<div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[80px] -mr-32 -mt-32"></div>
            
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] border border-blue-400/20 shrink-0">
				<ShieldAlert size={32} />
			</div>

			<div className="flex-1 text-center md:text-left relative z-10">
				<div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">System Broadcast</span>
                    <div className="h-px w-8 bg-blue-500/20"></div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Priority Alpha</span>
                </div>
				<h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">XPIDER KERNEL v3.1 INITIALISED</h3>
				<p className="text-slate-400 font-bold text-sm uppercase tracking-wide mb-0">
					Security protocols updated. D1 Database synchronization established. All network nodes are operating at optimal parameters.
				</p>
			</div>

			<div className="flex gap-4 shrink-0 relative z-10">
				<button className="px-6 py-3 bg-white text-black font-black rounded-xl hover:bg-blue-500 hover:text-white transition-all active:scale-95 uppercase tracking-widest text-[10px] flex items-center gap-2">
					Changelog <ExternalLink size={14} />
				</button>
			</div>
		</div>
	);
}
