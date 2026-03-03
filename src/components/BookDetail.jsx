import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, User, Clock, ArrowLeft, Share2, Shield, Send, Sparkles, AlertCircle } from "lucide-react";

function BookDetail({ bookData, user }) {
	const navigate = useNavigate();
	const { book, relatedBooks, replies: initialReplies } = bookData;
	const [replies, setReplies] = useState(initialReplies || []);
	const [newReply, setNewReply] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { 
			year: 'numeric',
			month: 'long', 
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	const handleReplySubmit = async (e) => {
		e.preventDefault();
		if (!newReply.trim() || submitting) return;

		setSubmitting(true);
		try {
			const response = await fetch(`/api/books/${book.id}/related/replies`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					author: user?.name || "Anonymous Operator",
					content: newReply
				}),
			});

			const data = await response.json();
			if (data.success) {
				setReplies([...replies, data.reply]);
				setNewReply("");
			}
		} catch (err) {
			console.error("Transmission error:", err);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto">
			<button 
				onClick={() => navigate(-1)}
				className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-10 group text-xs font-black uppercase tracking-widest cursor-pointer"
			>
				<ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
				Return to Sector
			</button>

			<div className="space-y-12">
				{/* Thread Main Node */}
				<div className="bg-[#0f0f0f] rounded-[3rem] border border-white/[0.05] overflow-hidden shadow-2xl">
					<div className="p-12">
						<div className="flex flex-wrap items-center gap-4 mb-10">
							<span className="px-3 py-1 bg-blue-600/10 border border-blue-500/20 rounded-lg text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
								{book.genre}
							</span>
							<div className="h-1 w-1 rounded-full bg-slate-800"></div>
							<span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Thread Node #{book.id}</span>
						</div>

						<h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-10 leading-[0.9]">
							{book.title}
						</h1>

						<div className="flex items-center justify-between py-8 border-y border-white/[0.03] mb-12">
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-white/5 shadow-inner">
									<User size={24} className="text-slate-400" />
								</div>
								<div>
									<div className="flex items-center gap-2">
										<span className="text-sm font-black text-white uppercase tracking-tight">{book.author}</span>
										{book.author === 'admin' && <Shield size={12} className="text-blue-500" />}
									</div>
									<div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mt-0.5">Originator</div>
								</div>
							</div>

							<div className="flex items-center gap-8">
								<div className="text-right hidden sm:block">
									<div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Transmission Date</div>
									<div className="text-xs font-black text-white flex items-center gap-2">
										<Clock size={12} className="text-slate-700" />
										{formatDate(book.created_at)}
									</div>
								</div>
								<button className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-slate-500 hover:text-white transition-all cursor-pointer">
									<Share2 size={18} />
								</button>
							</div>
						</div>

						<div className="md:flex gap-16">
							<div className="flex-1">
								<p className="text-slate-300 text-lg leading-relaxed font-medium whitespace-pre-wrap">
									{book.description}
								</p>
							</div>

							{book.image_url && book.image_url !== 'Unknown' && (
								<div className="md:w-1/3 shrink-0 mt-8 md:mt-0">
									<div className="rounded-[2.5rem] overflow-hidden border border-white/[0.05] shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500 group">
										<img
											src={book.image_url}
											alt={book.title}
											className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
										/>
									</div>
								</div>
							)}
						</div>
					</div>

					<div className="px-12 py-8 bg-black/20 border-t border-white/[0.03] flex items-center justify-between">
						<div className="flex items-center gap-6">
							<div className="flex items-center gap-2 text-slate-500 font-black text-[10px] uppercase tracking-widest">
								<MessageSquare size={14} className="text-blue-500/50" />
								{replies.length} Intelligence Entries
							</div>
						</div>
					</div>
				</div>

				{/* Intelligence Entries (Replies) */}
				<div className="space-y-6">
					<div className="flex items-center gap-3 px-4">
						<Sparkles size={16} className="text-blue-500" />
						<h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.3em] mb-0">Incoming Transmissions</h3>
					</div>

					{replies.map((reply, index) => (
						<div key={reply.id} className="bg-[#0f0f0f] border border-white/[0.05] rounded-[2.5rem] p-10 flex gap-8 animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
							<div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-slate-600 shrink-0">
								<User size={20} />
							</div>
							<div className="flex-1">
								<div className="flex items-center justify-between mb-4">
									<div className="flex items-center gap-3">
										<span className="text-sm font-black text-white uppercase tracking-tight">{reply.author}</span>
										<div className="h-1 w-1 rounded-full bg-slate-800"></div>
										<span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{formatDate(reply.created_at)}</span>
									</div>
									<span className="text-[9px] font-black text-slate-800 uppercase tracking-widest">#{index + 1}</span>
								</div>
								<p className="text-slate-400 text-base leading-relaxed font-medium">
									{reply.content}
								</p>
							</div>
						</div>
					))}

					{replies.length === 0 && (
						<div className="bg-[#0f0f0f] border border-dashed border-white/[0.05] rounded-[3rem] p-20 text-center">
							<AlertCircle size={32} className="mx-auto text-slate-800 mb-4" />
							<p className="text-slate-600 font-black uppercase tracking-[0.2em] text-xs">No responses logged for this thread.</p>
						</div>
					)}
				</div>

				{/* Submit Response Node */}
				<div className="bg-[#0f0f0f] rounded-[3rem] border border-white/[0.05] p-10 shadow-2xl relative overflow-hidden">
					<div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-bl-full border-b border-l border-blue-500/10"></div>
					<div className="mb-8 relative z-10">
						<h3 className="text-2xl font-black text-white tracking-tighter uppercase mb-1">Transmit Response</h3>
						<p className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic">Engage with the XPIDER network intelligence.</p>
					</div>

					<form onSubmit={handleReplySubmit} className="space-y-6 relative z-10">
						<textarea
							value={newReply}
							onChange={(e) => setNewReply(e.target.value)}
							className="w-full px-8 py-6 bg-black/40 border border-white/[0.05] text-slate-300 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/40 transition-all placeholder:text-slate-800 text-base font-bold min-h-[150px] resize-none leading-relaxed"
							placeholder="Compose your intelligence entry..."
							required
						/>
						<div className="flex justify-end">
							<button
								type="submit"
								disabled={submitting || !newReply.trim()}
								className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all duration-500 disabled:opacity-30 shadow-[0_20px_40px_-10px_rgba(37,99,235,0.5)] active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[11px] cursor-pointer group"
							>
								{submitting ? "UPLOADING DATA..." : (
									<>
										Execute Uplink <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
									</>
								)}
							</button>
						</div>
					</form>
				</div>

				{/* Related Streams */}
				{relatedBooks.length > 0 && (
					<section className="pt-12">
						<div className="flex items-center justify-between mb-8 px-4">
							<h3 className="text-sm font-black text-slate-500 uppercase tracking-[0.3em] mb-0">Cross-Sector Referencing</h3>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{relatedBooks.map((relBook) => (
								<div
									key={relBook.id}
									className="bg-[#0f0f0f] border border-white/[0.05] rounded-[2rem] p-8 hover:border-blue-500/30 transition-all group cursor-pointer"
									onClick={() => navigate(`/book/${relBook.id}`)}
								>
									<p className="text-[9px] text-blue-500 font-black uppercase tracking-[0.2em] mb-3">{relBook.genre}</p>
									<h4 className="text-white font-black uppercase tracking-tight line-clamp-2 mb-6 group-hover:text-blue-400 transition-colors">
										{relBook.title}
									</h4>
									<div className="flex items-center justify-between mt-auto">
										<div className="flex items-center gap-2">
											<div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-500 border border-white/5 uppercase">
												{relBook.author.charAt(0)}
											</div>
											<span className="text-[10px] font-black text-slate-600 uppercase tracking-tight">{relBook.author}</span>
										</div>
										<ArrowLeft size={14} className="text-slate-800 group-hover:text-blue-500 rotate-180 transition-all" />
									</div>
								</div>
							))}
						</div>
					</section>
				)}
			</div>
		</div>
	);
}

export default BookDetail;
