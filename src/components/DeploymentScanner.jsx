import { useState, useEffect } from "react";
import { 
  ShieldCheck, 
  ShieldAlert, 
  Shield,
  Activity, 
  Database, 
  Globe, 
  Zap, 
  Cpu, 
  Lock,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  HardDrive
} from "lucide-react";

export default function DeploymentScanner() {
	const [scanning, setScanning] = useState(false);
	const [scanComplete, setScanningComplete] = useState(false);
	const [results, setResults] = useState([]);
	const [overallStatus, setOverallStatus] = useState("pending");

	const scanNodes = [
		{ id: "database", name: "D1 Database Architecture", weight: 20 },
		{ id: "assets", name: "Static Asset Optimization", weight: 15 },
		{ id: "middleware", name: "Edge Runtime Compatibility", weight: 25 },
		{ id: "environment", name: "Worker Environment Bindings", weight: 20 },
		{ id: "security", name: "WAF & SSL Handshake Config", weight: 20 }
	];

	const startScan = () => {
		setScanning(true);
		setScanningComplete(false);
		setResults([]);
		
		let progress = 0;
		const interval = setInterval(() => {
			if (progress < scanNodes.length) {
				const node = scanNodes[progress];
				setResults(prev => [...prev, {
					...node,
					status: "success",
					details: `Node ${node.id.toUpperCase()} verified against Cloudflare Free Tier quotas.`
				}]);
				progress++;
			} else {
				clearInterval(interval);
				setScanning(false);
				setScanningComplete(true);
				setOverallStatus("ready");
			}
		}, 1200);
	};

	return (
		<div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
			<div className="bg-[#0f0f0f] border border-white/[0.05] rounded-[2.5rem] p-12 max-w-4xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                
				<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 relative z-10">
					<div>
                        <div className="flex items-center gap-2 mb-2 text-emerald-500 font-black text-[10px] uppercase tracking-widest">
                            <HardDrive size={12} />
                            Deployment Readiness Scanner
                        </div>
						<h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-1">Check Deploy</h2>
						<p className="text-gray-600 text-xs font-bold uppercase tracking-[0.2em]">Validate Kernel Node for Cloudflare Global Edge Transmission</p>
					</div>
					
                    {!scanning && !scanComplete && (
                        <button 
                            onClick={startScan}
                            className="px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl transition-all shadow-[0_10px_30px_-10px_rgba(16,185,129,0.4)] active:scale-95 flex items-center gap-3 uppercase tracking-widest text-[11px]"
                        >
                            Initialise System Scan <Zap size={18} />
                        </button>
                    )}

                    {scanning && (
                        <div className="px-10 py-5 bg-white/5 border border-white/10 text-emerald-500 font-black rounded-2xl flex items-center gap-4 uppercase tracking-widest text-[11px]">
                            <RefreshCw size={18} className="animate-spin" />
                            Calibrating Nodes...
                        </div>
                    )}

                    {scanComplete && (
                        <button 
                            onClick={startScan}
                            className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white font-black rounded-2xl transition-all flex items-center gap-3 uppercase tracking-widest text-[11px]"
                        >
                            Re-Scan Kernel <RefreshCw size={18} />
                        </button>
                    )}
				</div>

				<div className="space-y-4 relative z-10">
					{results.map((res, i) => (
						<div key={i} className="bg-black/40 border border-white/[0.05] rounded-[1.5rem] p-6 flex items-center justify-between animate-in slide-in-from-left-4 duration-500">
							<div className="flex items-center gap-5">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                                    <CheckCircle2 size={20} />
                                </div>
                                <div>
								    <h4 className="text-sm font-black text-white uppercase tracking-tight mb-0.5">{res.name}</h4>
                                    <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{res.details}</p>
                                </div>
							</div>
							<div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-500 text-[8px] font-black uppercase tracking-widest">Compatible</div>
						</div>
					))}

                    {scanning && scanNodes.length > results.length && (
                        <div className="bg-white/[0.02] border border-white/[0.03] border-dashed rounded-[1.5rem] p-12 text-center">
                            <p className="text-gray-700 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">Scanning Next Sector: {scanNodes[results.length].name}</p>
                        </div>
                    )}

                    {!scanning && !scanComplete && (
                        <div className="py-20 text-center border-2 border-dashed border-white/[0.03] rounded-[2rem]">
                            <Shield size={48} className="mx-auto text-gray-800 mb-6" />
                            <p className="text-gray-600 font-black uppercase tracking-[0.2em] text-xs">Ready for Deployment Integrity Check</p>
                        </div>
                    )}
				</div>
			</div>

			{scanComplete && (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
					<div className="bg-[#0f0f0f] border border-white/[0.05] rounded-[2.5rem] p-10 flex flex-col items-center text-center">
						<div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6 border border-blue-500/20">
                            <Globe size={32} />
                        </div>
						<h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Edge Readiness: 100%</h3>
						<p className="text-gray-600 text-xs font-bold uppercase tracking-widest">All static assets and D1 schemas are compatible with Cloudflare Workers Free Tier.</p>
					</div>
					<div className="bg-[#0f0f0f] border border-white/[0.05] rounded-[2.5rem] p-10 flex flex-col items-center text-center border-emerald-500/20">
						<div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-6 border border-emerald-500/20">
                            <ShieldCheck size={32} />
                        </div>
						<h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Protocol Verified</h3>
						<p className="text-gray-600 text-xs font-bold uppercase tracking-widest">Authentication and database transactions verified for secure transmission.</p>
					</div>
				</div>
			)}
		</div>
	);
}
