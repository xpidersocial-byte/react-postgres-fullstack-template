import { useState, useEffect } from "react";

export default function StorageDashboard() {
	const [status, setStatus] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("/api/storage/status")
			.then((res) => res.json())
			.then((data) => {
				setStatus(data);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	if (loading) return <div className="p-4 text-gray-500 italic">Scanning Cloudflare services...</div>;
	if (!status) return null;

	const storageItems = [
		{ name: "D1 SQL", ...status.d1, icon: "🗄️" },
		{ name: "KV Store", ...status.kv, icon: "🔑" },
		{ name: "R2 Storage", ...status.r2, icon: "📦" },
		{ name: "Hyperdrive", ...status.hyperdrive, icon: "⚡" },
	];

	return (
		<div className="p-8 bg-[#181818] rounded-2xl border border-gray-800 shadow-xl mt-12">
			<h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
				<span className="text-blue-500">☁️</span> Cloudflare Infrastructure Status
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{storageItems.map((item) => (
					<div key={item.name} className="p-5 rounded-xl border border-gray-800 bg-[#1e1e1e] transition-all hover:border-gray-700">
						<div className="flex items-center gap-3 mb-3">
							<span className="text-2xl">{item.icon}</span>
							<h3 className="font-bold text-gray-200 text-sm mb-0">{item.name}</h3>
						</div>
						<p className="text-[10px] text-gray-500 mb-4 leading-relaxed uppercase tracking-wider">{item.usage}</p>
						<div className="flex items-center justify-between mt-auto">
							<span className={`text-[9px] px-2 py-1 rounded-md font-bold uppercase tracking-tighter ${item.available ? 'bg-green-900/30 text-green-400 border border-green-800/50' : 'bg-amber-900/30 text-amber-400 border border-amber-800/50'}`}>
								{item.available ? 'Connected' : 'Local Mock'}
							</span>
							{item.limit && <span className="text-[10px] text-gray-600 font-mono italic">{item.limit}</span>}
						</div>
					</div>
				))}
			</div>
			<div className="mt-6 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
				<p className="text-xs text-gray-500 m-0">
					<strong className="text-blue-400">Pro Tip:</strong> All storage services are currently operating on the <span className="text-white font-bold">Cloudflare Free Tier</span>.
				</p>
			</div>
		</div>
	);
}
