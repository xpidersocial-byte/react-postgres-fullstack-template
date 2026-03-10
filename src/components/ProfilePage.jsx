import { useState, useEffect } from "react";
import { User, Save, Camera, Mail, Shield, Award } from "lucide-react";

export default function ProfilePage({ user, onUpdateUser }) {
	const [name, setName] = useState(user?.name || "");
	const [bio, setBio] = useState(user?.bio || "No intelligence brief available.");
	const [saving, setSaving] = useState(false);

	const handleSave = (e) => {
		e.preventDefault();
		setSaving(true);
		
		// Simulate API call
		setTimeout(() => {
			onUpdateUser({ ...user, name, bio });
			setSaving(false);
			alert("PROFILE_SYNC: IDENTITY UPDATED SUCCESSFULLY");
		}, 800);
	};

	return (
		<div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-3xl mx-auto">
			<div className="bg-[#0f0f0f] border border-white/[0.05] rounded-[2rem] overflow-hidden shadow-2xl">
				{/* Header Banner */}
				<div className="h-48 bg-gradient-to-r from-blue-900/20 to-purple-900/20 relative">
					<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
				</div>

				<div className="px-10 pb-10">
					{/* Avatar Section */}
					<div className="relative -mt-16 mb-8 flex justify-between items-end">
						<div className="relative group">
							<div className="w-32 h-32 rounded-3xl bg-[#0f0f0f] p-1.5">
								<div className="w-full h-full rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-white font-black text-4xl shadow-inner border border-white/10">
									{name.charAt(0).toUpperCase()}
								</div>
							</div>
							<button className="absolute bottom-2 right-2 p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
								<Camera size={16} />
							</button>
						</div>
						
						<div className="flex gap-3">
                            <div className="px-4 py-2 bg-white/[0.03] border border-white/[0.05] rounded-xl flex items-center gap-2 text-xs font-bold text-slate-400">
                                <Shield size={14} className="text-blue-500" />
                                {user?.role === 'admin' ? 'System Admin' : 'Operator'}
                            </div>
						</div>
					</div>

					<form onSubmit={handleSave} className="space-y-8">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div className="space-y-2">
								<label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
									<User size={12} className="text-blue-500" /> Callsign (Display Name)
								</label>
								<input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="w-full px-5 py-4 bg-black/40 border border-white/[0.05] text-white rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 outline-none transition-all font-bold text-sm"
								/>
							</div>
                            
                            <div className="space-y-2">
								<label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
									<Mail size={12} className="text-blue-500" /> Secure Uplink (Email)
								</label>
								<input
									type="email"
									value={user?.email || "admin@inventory.com"}
									disabled
									className="w-full px-5 py-4 bg-white/[0.02] border border-white/[0.05] text-slate-500 rounded-2xl cursor-not-allowed font-mono text-xs"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
								<Award size={12} className="text-blue-500" /> Operator Bio
							</label>
							<textarea
								value={bio}
								onChange={(e) => setBio(e.target.value)}
								className="w-full px-5 py-4 bg-black/40 border border-white/[0.05] text-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/40 outline-none transition-all font-medium min-h-[120px] resize-none text-sm leading-relaxed"
                                placeholder="Brief intelligence summary..."
							/>
						</div>

						<div className="pt-4 flex justify-end">
							<button
								type="submit"
								disabled={saving}
								className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl transition-all shadow-[0_10px_20px_-5px_rgba(37,99,235,0.4)] active:scale-95 flex items-center gap-2 uppercase tracking-widest text-[10px]"
							>
								{saving ? "SAVING..." : (
                                    <>
                                        Update Identity <Save size={14} />
                                    </>
                                )}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
