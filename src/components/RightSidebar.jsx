import { useNavigate } from "react-router-dom";
import { 
  TrendingUp, 
  Users, 
  Activity, 
  Zap, 
  ArrowRight,
  ShieldCheck,
  Globe,
  Circle
} from "lucide-react";

export default function RightSidebar({ threads, genres }) {
    const navigate = useNavigate();
    const trending = threads.slice(0, 4);

    return (
        <aside className="sidebar-right p-10 flex flex-col gap-12 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
            {/* Community Health Node */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-0">Network Pulse</h3>
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 rounded-lg">
                        <Circle size={6} className="fill-emerald-500 text-emerald-500 animate-pulse" />
                        <span className="text-[8px] text-emerald-500 font-black uppercase">Active</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-4">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                            <Users size={12} />
                            <span className="text-[9px] font-black uppercase tracking-widest">Operators</span>
                        </div>
                        <p className="text-lg font-black text-white leading-none">1,240</p>
                    </div>
                    <div className="bg-white/[0.02] border border-white/[0.04] rounded-2xl p-4">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                            <Activity size={12} />
                            <span className="text-[9px] font-black uppercase tracking-widest">Sync Rate</span>
                        </div>
                        <p className="text-lg font-black text-white leading-none">99.9%</p>
                    </div>
                </div>
            </div>

            {/* Trending Sectors */}
            <div className="space-y-6">
                <div className="flex items-center gap-2 px-2">
                    <TrendingUp size={14} className="text-blue-500" />
                    <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-0">Trending Sectors</h3>
                </div>

                <div className="space-y-2">
                    {trending.map((t, i) => (
                        <div 
                            key={i} 
                            onClick={() => navigate(`/book/${t.id}`)}
                            className="p-4 rounded-2xl border border-transparent hover:border-white/[0.05] hover:bg-white/[0.02] transition-all group cursor-pointer"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded-md">
                                    {t.genre}
                                </span>
                                <span className="text-[8px] text-slate-600 font-bold uppercase">{t.replies} Replies</span>
                            </div>
                            <h4 className="text-xs font-black text-slate-300 uppercase leading-snug group-hover:text-white transition-colors line-clamp-2">
                                {t.title}
                            </h4>
                        </div>
                    ))}
                </div>
            </div>

            {/* System Security */}
            <div className="mt-auto">
                <div className="bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/10 rounded-[2rem] p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full border-b border-l border-blue-500/10"></div>
                    <ShieldCheck size={32} className="text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
                    <h4 className="text-xs font-black text-white uppercase tracking-widest mb-3">Kernel Security</h4>
                    <p className="text-[10px] text-slate-500 font-bold leading-relaxed mb-6 uppercase">
                        Enterprise-grade encryption enabled for all network traffic.
                    </p>
                    <button className="w-full py-3 bg-white/[0.03] border border-white/[0.05] rounded-xl text-[9px] font-black text-slate-400 uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                        View Audit <ArrowRight size={12} />
                    </button>
                </div>
            </div>

            {/* Footer Telemetry */}
            <div className="pt-8 border-t border-white/[0.03] flex items-center justify-between opacity-40">
                <div className="flex items-center gap-2">
                    <Globe size={10} className="text-slate-500" />
                    <span className="text-[8px] font-black text-slate-500 uppercase">Edge: global-anycast</span>
                </div>
                <span className="text-[8px] font-black text-slate-500 uppercase">v3.1.0-STABLE</span>
            </div>
        </aside>
    );
}
