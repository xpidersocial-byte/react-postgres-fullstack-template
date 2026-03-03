import { useState, useEffect } from "react";

export default function VotingProtocol({ onSync }) {
	const [activeStage, setActiveStage] = useState("draft");
	const [showSubmitModal, setShowSubmitModal] = useState(false);
	const [syncMessages, setSyncMessages] = useState([]);
	
	const [proposals, setProposals] = useState([
		{ 
			id: 999, 
			stage: "draft", 
			title: "🚀 Super-Fast Test Category", 
			desc: "DEMO MODE: 1 vote required, 30s processing. Try it now!",
			votes: 0, 
			required: 1, 
			author: "system_demo" 
		},
		{ 
			id: 102, 
			stage: "final", 
			title: "Cybersecurity & Pentesting", 
			desc: "Standard proposal for testing high-threshold voting.",
			votes: 840, 
			required: 1000, 
			author: "root_access" 
		}
	]);

	// Timer Logic for Stage 3
	const [now, setNow] = useState(new Date());
	useEffect(() => {
		const interval = setInterval(() => setNow(new Date()), 1000);
		return () => clearInterval(interval);
	}, []);

	const handleAction = (id) => {
		setProposals(prev => prev.map(p => {
			if (p.id === id) {
				const newVotes = p.votes + 1;
				
				if (p.stage === "draft" && newVotes >= p.required) {
					addSyncMessage(`Proposal #${p.id} promoted to FINAL VOTE.`);
					return { ...p, votes: 0, required: 1, stage: "final" };
				}
				
				if (p.stage === "final" && newVotes >= p.required) {
					addSyncMessage(`Proposal #${p.id} PASSED. Initialising 30s calibration...`);
					return { ...p, votes: newVotes, stage: "processing", passedAt: new Date().toISOString() };
				}
				
				return { ...p, votes: newVotes };
			}
			return p;
		}));
	};

	const executeSync = (proposal) => {
		if (onSync) {
			onSync(proposal.title);
			addSyncMessage(`SUCCESS: '${proposal.title}' has been synced to the Sidebar.`);
			// Remove the proposal from state after sync
			setProposals(prev => prev.filter(p => p.id !== proposal.id));
		}
	};

	const addSyncMessage = (msg) => {
		setSyncMessages(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 5));
	};

	const getSecondsRemaining = (passedAt) => {
		const targetDate = new Date(passedAt);
		targetDate.setSeconds(targetDate.getSeconds() + 30);
		const diff = Math.ceil((targetDate - now) / 1000);
		return diff <= 0 ? 0 : diff;
	};

	const currentProposals = proposals.filter(p => p.stage === activeStage);

	return (
		<div className="p-4 md:p-12">
			<header className="mb-12">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
					<div className="flex items-center gap-4">
						<div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg border border-blue-400/30">⚡</div>
						<div>
							<h1 className="text-4xl font-serif font-bold text-white tracking-tighter mb-0">Rapid Sync Protocol</h1>
							<p className="text-[10px] text-blue-400 uppercase tracking-[0.4em] font-black italic">Demo Mode: 1 Vote / 30s Sync</p>
						</div>
					</div>
				</div>

				<div className="flex flex-wrap gap-3 p-2 bg-[#181818] rounded-[1.5rem] border border-gray-800 w-fit">
					<button onClick={() => setActiveStage("draft")} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${activeStage === "draft" ? "bg-amber-600 text-white" : "text-gray-500 hover:text-gray-300"}`}>Draft</button>
					<button onClick={() => setActiveStage("final")} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${activeStage === "final" ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-300"}`}>Final</button>
					<button onClick={() => setActiveStage("processing")} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${activeStage === "processing" ? "bg-green-600 text-white" : "text-gray-500 hover:text-gray-300"}`}>Processing</button>
				</div>
			</header>

			<div className="mb-10 p-6 bg-black rounded-2xl border border-gray-800 font-mono text-[10px]">
				<div className="flex items-center gap-2 mb-3">
					<span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
					<span className="text-gray-500 uppercase font-black">System Sync Logs</span>
				</div>
				<div className="space-y-1">
					{syncMessages.length === 0 && <div className="text-gray-700">Waiting for community consensus...</div>}
					{syncMessages.map((m, i) => <div key={i} className="text-blue-400">{m}</div>)}
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{currentProposals.map((p) => {
					const secondsLeft = p.stage === 'processing' ? getSecondsRemaining(p.passedAt) : null;
					
					return (
						<div key={p.id} className={`bg-[#181818] border rounded-[2.5rem] p-10 flex flex-col transition-all group shadow-2xl relative overflow-hidden ${
							p.stage === 'draft' ? 'border-amber-900/20' : 
							p.stage === 'final' ? 'border-blue-900/20' : 
							'border-green-900/20'
						}`}>
							<div className="relative z-10 flex flex-col h-full">
								<h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">{p.title}</h3>
								<p className="text-gray-500 text-sm italic mb-10 leading-relaxed">{p.desc}</p>

								<div className="mt-auto space-y-6">
									<div className="space-y-4">
										<div className="flex justify-between items-end">
											<span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
												{p.stage === 'processing' ? 'Deployment Readiness' : 'Progress'}
											</span>
											<span className="text-xs font-mono font-bold text-white">
												{p.stage === 'processing' ? (secondsLeft === 0 ? "READY" : `${30 - secondsLeft}/30s`) : `${Math.round((p.votes / p.required) * 100)}%`}
											</span>
										</div>
										<div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
											<div 
												className={`h-full transition-all duration-700 ${p.stage === 'draft' ? 'bg-amber-600' : p.stage === 'final' ? 'bg-blue-600' : 'bg-green-600 shadow-[0_0_15px_rgba(34,197,94,0.5)]'}`} 
												style={{ width: `${p.stage === 'processing' ? ((30 - secondsLeft) / 30) * 100 : (p.votes / p.required) * 100}%` }}
											></div>
										</div>
									</div>

									{p.stage === 'processing' ? (
										<button 
											onClick={() => secondsLeft === 0 && executeSync(p)}
											className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 transition-all ${secondsLeft === 0 ? 'bg-blue-600 text-white cursor-pointer hover:bg-blue-500 shadow-lg shadow-blue-900/20' : 'bg-gray-900/50 text-green-400 border border-green-900/30 cursor-wait'}`}
										>
											{secondsLeft === 0 ? (
												<span className="font-black text-xs uppercase tracking-widest">EXECUTE SYNC</span>
											) : (
												<>
													<span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
													<span className="font-black text-xs uppercase tracking-widest">{secondsLeft}s Remaining</span>
												</>
											)}
										</button>
									) : (
										<button 
											onClick={() => handleAction(p.id)}
											className="w-full py-4 bg-white text-stone-900 font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95 cursor-pointer"
										>
											Commit Vote (1 Needed)
										</button>
									)}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
