import { MessageSquare, Eye, Clock, User, ArrowRight } from "lucide-react";

function BookCard({ book, onClick }) {
	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { 
			month: 'short', 
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	return (
		<div 
			onClick={onClick}
			className="book-card group cursor-pointer animate-fade-up"
		>
			<div className="flex flex-col md:flex-row">
				{/* Visual Node */}
				<div className="md:w-48 h-48 md:h-auto relative overflow-hidden bg-black/20 border-r border-white/[0.03]">
					<img 
						src={book.image_url} 
						alt={book.title} 
						className="object-cover w-full h-full opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] to-transparent opacity-60"></div>
					<div className="absolute bottom-4 left-4">
						<span className="px-2.5 py-1 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-400 text-[9px] font-black uppercase tracking-widest backdrop-blur-md">
							{book.genre}
						</span>
					</div>
				</div>

				{/* Content Node */}
				<div className="flex-1 p-8 flex flex-col">
					<div className="flex justify-between items-start gap-4 mb-3">
						<h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors leading-tight tracking-tighter uppercase">
							{book.title}
						</h3>
						<div className="p-2 bg-white/[0.02] border border-white/[0.05] rounded-xl text-slate-600 group-hover:text-blue-500 group-hover:border-blue-500/20 transition-all">
							<ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
						</div>
					</div>

					<p className="text-slate-500 text-sm line-clamp-2 mb-6 font-bold leading-relaxed">
						{book.description}
					</p>

					<div className="mt-auto flex flex-wrap items-center gap-6">
						<div className="flex items-center gap-2">
							<div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-400 border border-white/5 uppercase">
								{book.author.charAt(0)}
							</div>
							<span className="text-[11px] font-black text-slate-400 uppercase tracking-tight">{book.author}</span>
						</div>

						<div className="h-4 w-px bg-white/[0.05]"></div>

						<div className="flex items-center gap-4 text-slate-600">
							<div className="flex items-center gap-1.5">
								<MessageSquare size={14} className="text-blue-500/50" />
								<span className="text-[10px] font-black uppercase tracking-widest">{book.replies || 0}</span>
							</div>
							<div className="flex items-center gap-1.5">
								<Eye size={14} className="text-slate-700" />
								<span className="text-[10px] font-black uppercase tracking-widest">{book.views || 0}</span>
							</div>
						</div>

						<div className="ml-auto flex items-center gap-1.5 text-slate-700">
							<Clock size={12} />
							<span className="text-[9px] font-black uppercase tracking-widest">{formatDate(book.created_at)}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BookCard;
