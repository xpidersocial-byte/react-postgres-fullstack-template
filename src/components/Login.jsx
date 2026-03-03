import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Lock, 
  User, 
  ShieldCheck, 
  ArrowRight, 
  Eye, 
  EyeOff,
  Terminal,
  Cpu
} from "lucide-react";

export default function Login({ onLoginSuccess }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});

			const data = await response.json();

			if (data.success) {
				onLoginSuccess(data.user);
				navigate("/");
			} else {
				setError(data.message || "Invalid credentials");
			}
		} catch (err) {
			setError("Failed to connect to authentication server");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen w-full bg-[#0d0d0d] px-4 relative overflow-hidden font-sans">
			{/* Professional Decorative Background Elements */}
			<div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
			<div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>
			
			{/* Grid Pattern Overlay */}
			<div className="absolute inset-0 z-0 opacity-[0.03]" 
                 style={{backgroundImage: 'linear-gradient(transparent 50%, rgba(59, 130, 246, 0.5) 50%), linear-gradient(90deg, transparent 50%, rgba(59, 130, 246, 0.5) 50%)', backgroundSize: '40px 40px'}}>
            </div>

			<div className="w-full max-w-[440px] relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
				<div className="bg-[#181818]/80 backdrop-blur-2xl p-10 rounded-[2.5rem] border border-white/5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">
					{/* Header Section */}
					<div className="text-center mb-10">
						<div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/10 rounded-2xl mb-6 border border-blue-600/20 shadow-inner">
							<Cpu className="text-blue-500" size={32} />
						</div>
						<h1 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase font-serif">XPIDER ENGINE</h1>
						<div className="flex items-center justify-center gap-2 text-gray-500">
							<Terminal size={12} className="text-blue-500/50" />
							<p className="text-[10px] font-bold uppercase tracking-[0.2em]">Secure Authentication Node</p>
						</div>
					</div>

					{/* Form Section */}
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-y-2">
							<label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Operator ID</label>
							<div className="relative group">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-blue-500 transition-colors">
									<User size={18} />
								</div>
								<input
									type="text"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									className="w-full pl-12 pr-5 py-4 bg-black/40 border border-white/5 text-white rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 focus:outline-none transition-all placeholder:text-gray-700 text-sm font-medium"
									placeholder="Enter operator username"
									required
								/>
							</div>
						</div>

						<div className="space-y-2">
							<label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Security Key</label>
							<div className="relative group">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-blue-500 transition-colors">
									<Lock size={18} />
								</div>
								<input
									type={showPassword ? "text" : "password"}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full pl-12 pr-12 py-4 bg-black/40 border border-white/5 text-white rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 focus:outline-none transition-all placeholder:text-gray-700 text-sm font-medium"
									placeholder="••••••••"
									required
								/>
								<button 
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute inset-y-0 right-4 flex items-center text-gray-600 hover:text-blue-500 transition-colors"
								>
									{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							</div>
						</div>

						{error && (
							<div className="flex items-center gap-3 p-4 bg-red-500/5 border border-red-500/20 text-red-400 text-[11px] font-bold rounded-2xl animate-pulse">
								<ShieldCheck size={16} className="shrink-0" />
								<span>{error}</span>
							</div>
						)}

						<button
							type="submit"
							disabled={loading}
							className="group w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all duration-300 disabled:opacity-50 shadow-[0_10px_30px_-10px_rgba(37,99,235,0.4)] active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-widest text-[11px]"
						>
							{loading ? (
								<span className="flex items-center gap-2">
									<svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									AUTHENTICATING...
								</span>
							) : (
								<>
									INITIATE UPLINK
									<ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
								</>
							)}
						</button>

						{/* Demo Access Helper */}
						<div className="mt-8 pt-8 border-t border-white/5">
							<div className="bg-blue-600/5 rounded-2xl p-5 border border-blue-600/10">
								<p className="text-[9px] text-blue-500/50 font-black mb-3 uppercase tracking-widest text-center">
									Development Access Protocol
								</p>
								<div className="flex justify-between items-center text-[11px] font-bold px-2">
									<div className="flex flex-col gap-1">
										<span className="text-gray-600 uppercase text-[9px]">Operator</span>
										<span className="text-blue-400 font-mono tracking-tight">admin</span>
									</div>
									<div className="h-6 w-px bg-white/5"></div>
									<div className="flex flex-col gap-1 text-right">
										<span className="text-gray-600 uppercase text-[9px]">Passkey</span>
										<span className="text-blue-400 font-mono tracking-tight">password123</span>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
				
				<p className="mt-8 text-center text-gray-700 text-[10px] font-bold uppercase tracking-[0.3em]">
					XPIDER_KERNEL_v3.1.0 // STABLE_READY
				</p>
			</div>
		</div>
	);
}
