import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, MessageSquare } from "lucide-react";
import BookCard from "./BookCard";

function useBooks(filter, sortBy, externalThreads, searchQuery) {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (externalThreads) {
			let results = [...externalThreads];
			if (filter) results = results.filter(b => b.genre === filter);
			
			if (searchQuery) {
				const query = searchQuery.toLowerCase();
				results = results.filter(b => 
					b.title.toLowerCase().includes(query) || 
					b.author.toLowerCase().includes(query)
				);
			}
			
			// Apply sorting
			if (sortBy === "title_asc") results.sort((a, b) => a.title.localeCompare(b.title));
			if (sortBy === "replies") results.sort((a, b) => b.replies - a.replies);
			if (sortBy === "views") results.sort((a, b) => b.views - a.views);

			setBooks(results);
			setLoading(false);
			return;
		}

		const fetchBooks = async () => {
			try {
				const params = new URLSearchParams();
				if (filter) params.append("genre", filter);
				if (sortBy) params.append("sort", sortBy);

				const url = `/api/books${params.toString() ? `?${params.toString()}` : ""}`;
				const response = await fetch(url);

				if (!response.ok) {
					throw new Error(`API returned status: ${response.status}`);
				}

				const data = await response.json();

				if (data.books) {
					let results = data.books;
					if (searchQuery) {
						const query = searchQuery.toLowerCase();
						results = results.filter(b => 
							b.title.toLowerCase().includes(query) || 
							b.author.toLowerCase().includes(query)
						);
					}
					setBooks(results);
				} else {
					setBooks([]);
				}
			} catch (error) {
				console.error("Error loading threads:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchBooks();
	}, [filter, sortBy, externalThreads, searchQuery]);

	return { books, loading };
}

function BooksList({ filter, onSelectBook, threads, onOpenNewThread }) {
	const navigate = useNavigate();
	const [sortBy, setSortBy] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const { books, loading } = useBooks(filter, sortBy, threads, searchQuery);

	const handleBookSelect = (bookId) => {
		onSelectBook ? onSelectBook(bookId) : navigate(`/book/${bookId}`);
	};
	const handleSortChange = (e) => {
		setSortBy(e.target.value);
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center py-20">
				<div className="h-10 w-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
			</div>
		);
	}

	return (
		<div className="space-y-10">
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
				<div className="flex gap-6 items-center w-full sm:w-auto">
					<button 
						onClick={onOpenNewThread}
						className="bg-blue-600 hover:bg-blue-500 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-[0_10px_30px_-10px_rgba(37,99,235,0.5)] active:scale-[0.98] flex items-center gap-3 uppercase tracking-widest text-[11px] cursor-pointer group"
					>
						<Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
						New Discussion
					</button>
					<div className="h-10 w-px bg-white/[0.05] hidden sm:block"></div>
					<span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] hidden sm:inline">
						{books.length} Threads Active
					</span>
				</div>
				<div className="flex gap-4 w-full sm:w-auto">
					<div className="relative flex-1 sm:w-64">
						<input 
							type="text"
							placeholder="Search intelligence..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full py-3.5 pl-6 pr-12 bg-[#0a0a0a] border border-white/[0.05] rounded-2xl text-slate-300 text-xs font-bold outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-700"
						/>
						<div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600">
							<Search size={14} />
						</div>
					</div>
					<div className="relative">
						<select
							className="h-full pl-6 pr-10 appearance-none cursor-pointer bg-[#0a0a0a] border border-white/[0.05] rounded-2xl text-slate-400 text-[10px] font-black uppercase tracking-widest outline-none focus:border-blue-500/50 transition-all"
							value={sortBy}
							onChange={handleSortChange}
						>
							<option value="">Latest</option>
							<option value="title_asc">A-Z</option>
							<option value="replies">Replies</option>
							<option value="views">Views</option>
						</select>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6">
				{books.map((book, index) => (
					<BookCard
						key={`${book.id}-${index}`}
						book={book}
						onClick={() => handleBookSelect(book.id)}
					/>
				))}
			</div>

			{books.length === 0 && (
				<div className="text-center py-32 bg-[#0a0a0a] rounded-[3rem] border border-dashed border-white/[0.05] animate-fade-up">
	<div className="w-20 h-20 bg-white/[0.02] rounded-3xl flex items-center justify-center mx-auto mb-8">
	<MessageSquare size={32} className="text-slate-800" />
	</div>
					<p className="text-slate-600 font-black uppercase tracking-[0.3em] text-xs">No active threads in this sector.</p>
				</div>
			)}
		</div>
	);
}

export default BooksList;
