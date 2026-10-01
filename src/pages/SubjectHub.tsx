import { useNavigate } from 'react-router-dom';

export default function SubjectHub() {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 px-4 md:px-10 py-4">
                <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                            <div className="bg-primary p-2 rounded-lg flex items-center justify-center text-white">
                                <span className="material-symbols-outlined text-2xl">sports_kabaddi</span>
                            </div>
                            <h1 className="text-2xl font-black tracking-tight text-primary">EduTug</h1>
                        </div>
                        <nav className="hidden lg:flex items-center gap-6">
                            <a className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/avatar')}>Dashboard</a>
                            <a className="text-sm font-semibold text-primary cursor-pointer">Subjects</a>
                            <a className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer">Leaderboard</a>
                            <a className="text-sm font-semibold hover:text-primary transition-colors cursor-pointer">Shop</a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Search Bar */}
                        <div className="hidden sm:flex relative items-center">
                            <span className="material-symbols-outlined absolute left-3 text-slate-400">search</span>
                            <input
                                className="bg-primary/5 border-none focus:ring-2 focus:ring-primary rounded-full pl-10 pr-4 py-2 text-sm w-64 placeholder:text-slate-400"
                                placeholder="Search subjects..."
                                type="text"
                            />
                        </div>
                        {/* Stats */}
                        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1.5 pr-4 rounded-full border border-primary/10">
                            <div className="bg-yellow-400/20 text-yellow-600 p-1 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-sm font-bold">trophy</span>
                            </div>
                            <span className="text-xs font-bold">1,250 XP</span>
                        </div>
                        {/* Profile */}
                        <div className="size-10 rounded-full bg-primary/20 overflow-hidden border-2 border-primary/20">
                            <img
                                alt="User Avatar"
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAblDu2S14nwUp_aL-Mokgucsi_O1mKc1Lxp8URtAEVRmj4Qk-e1atucPS60EFv9N6RV1H9cw4SzO9IHRMRoHULfo5Q8bIojkdpyiaLa5zsH7feXp1MFkZEdlMMjbzt69IDOltlKfuvjzgaoGI2bDNtFhvfD2BPjJZ9n_hHENOvwn3WKhNkR7p30hBjsaPCzfCaMkucJlueYPb7MbRDyy4Bfz3M_PqlMe_1jBPSrVC4YYMIdNKyba49DYYCTzXsoGGsriyslY8f524"
                            />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1280px] mx-auto px-4 md:px-10 py-8">
                {/* Hero Section */}
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                            Pick Your Battleground
                        </h2>
                        <p className="text-lg text-slate-500 max-w-xl">
                            Ready to pull? Choose a subject to start the learning tug-of-war and climb the leaderboard.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 rounded-full font-bold text-sm shadow-sm hover:shadow-md transition-all border border-slate-200 dark:border-slate-700">
                            <span className="material-symbols-outlined text-primary">filter_list</span>
                            All Grades
                        </button>
                        <button
                            onClick={() => navigate('/game')}
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-bold text-sm shadow-lg shadow-primary/30 hover:brightness-110 transition-all"
                        >
                            <span className="material-symbols-outlined">bolt</span>
                            Quick Play
                        </button>
                    </div>
                </div>

                {/* 3x3 Subject Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Maths */}
                    <div onClick={() => navigate('/math-flow')} className="group relative bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                        <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Mastered</div>
                        <div className="size-24 mb-6 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600 group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-5xl">calculate</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Maths</h3>
                        <p className="text-slate-500 text-sm mb-6">Numerical symbols, equations &amp; logic battles.</p>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full mb-6 overflow-hidden">
                            <div className="h-full bg-cyan-500 w-[92%]"></div>
                        </div>
                        <button className="w-full py-3 bg-slate-100 dark:bg-slate-700 group-hover:bg-primary group-hover:text-white transition-colors rounded-full font-bold text-sm">Join Tug</button>
                    </div>
                    {/* Lecture */}
                    <div onClick={() => navigate('/game')} className="group relative bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                        <div className="absolute top-4 right-4 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Level 12</div>
                        <div className="size-24 mb-6 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-5xl">menu_book</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Lecture</h3>
                        <p className="text-slate-500 text-sm mb-6">Master comprehension &amp; speed reading.</p>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full mb-6 overflow-hidden">
                            <div className="h-full bg-orange-500 w-[65%]"></div>
                        </div>
                        <button className="w-full py-3 bg-slate-100 dark:bg-slate-700 group-hover:bg-primary group-hover:text-white transition-colors rounded-full font-bold text-sm">Join Tug</button>
                    </div>
                    {/* Orthographe */}
                    <div onClick={() => navigate('/game')} className="group relative bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                        <div className="absolute top-4 right-4 bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">In Progress</div>
                        <div className="size-24 mb-6 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-5xl">edit_note</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Orthographe</h3>
                        <p className="text-slate-500 text-sm mb-6">Grammar wars and spelling challenges.</p>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full mb-6 overflow-hidden">
                            <div className="h-full bg-rose-500 w-[42%]"></div>
                        </div>
                        <button className="w-full py-3 bg-slate-100 dark:bg-slate-700 group-hover:bg-primary group-hover:text-white transition-colors rounded-full font-bold text-sm">Join Tug</button>
                    </div>
                    {/* Culture G */}
                    <div onClick={() => navigate('/game')} className="group relative bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                        <div className="size-24 mb-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-5xl">public</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Culture G</h3>
                        <p className="text-slate-500 text-sm mb-6">Explore history, science &amp; global knowledge.</p>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full mb-6 overflow-hidden">
                            <div className="h-full bg-indigo-500 w-[78%]"></div>
                        </div>
                        <button className="w-full py-3 bg-slate-100 dark:bg-slate-700 group-hover:bg-primary group-hover:text-white transition-colors rounded-full font-bold text-sm">Join Tug</button>
                    </div>
                    {/* Mémoire */}
                    <div onClick={() => navigate('/game')} className="group relative bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                        <div className="size-24 mb-6 rounded-full bg-fuchsia-100 dark:bg-fuchsia-900/30 flex items-center justify-center text-fuchsia-600 group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-5xl">psychology</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Mémoire</h3>
                        <p className="text-slate-500 text-sm mb-6">Train your brain with pattern matching.</p>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full mb-6 overflow-hidden">
                            <div className="h-full bg-fuchsia-500 w-[55%]"></div>
                        </div>
                        <button className="w-full py-3 bg-slate-100 dark:bg-slate-700 group-hover:bg-primary group-hover:text-white transition-colors rounded-full font-bold text-sm">Join Tug</button>
                    </div>
                    {/* Observation */}
                    <div onClick={() => navigate('/game')} className="group relative bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                        <div className="size-24 mb-6 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-5xl">visibility</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Observation</h3>
                        <p className="text-slate-500 text-sm mb-6">Find the details before your opponent does.</p>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full mb-6 overflow-hidden">
                            <div className="h-full bg-amber-500 w-[30%]"></div>
                        </div>
                        <button className="w-full py-3 bg-slate-100 dark:bg-slate-700 group-hover:bg-primary group-hover:text-white transition-colors rounded-full font-bold text-sm">Join Tug</button>
                    </div>
                    {/* Énigmes */}
                    <div onClick={() => navigate('/game')} className="group relative bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                        <div className="size-24 mb-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-5xl">extension</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Énigmes</h3>
                        <p className="text-slate-500 text-sm mb-6">Solve complex puzzles &amp; escape logic traps.</p>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full mb-6 overflow-hidden">
                            <div className="h-full bg-blue-500 w-[85%]"></div>
                        </div>
                        <button className="w-full py-3 bg-slate-100 dark:bg-slate-700 group-hover:bg-primary group-hover:text-white transition-colors rounded-full font-bold text-sm">Join Tug</button>
                    </div>
                    {/* Créativité */}
                    <div onClick={() => navigate('/game')} className="group relative bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                        <div className="size-24 mb-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-5xl">palette</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Créativité</h3>
                        <p className="text-slate-500 text-sm mb-6">Express your ideas in high-stakes art tugs.</p>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full mb-6 overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[15%]"></div>
                        </div>
                        <button className="w-full py-3 bg-slate-100 dark:bg-slate-700 group-hover:bg-primary group-hover:text-white transition-colors rounded-full font-bold text-sm">Join Tug</button>
                    </div>
                    {/* Réflexes */}
                    <div onClick={() => navigate('/game')} className="group relative bg-white dark:bg-slate-800 p-8 rounded-xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                        <div className="size-24 mb-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-5xl">bolt</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Réflexes</h3>
                        <p className="text-slate-500 text-sm mb-6">Speed and precision are your only tools.</p>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full mb-6 overflow-hidden">
                            <div className="h-full bg-red-500 w-[25%]"></div>
                        </div>
                        <button className="w-full py-3 bg-slate-100 dark:bg-slate-700 group-hover:bg-primary group-hover:text-white transition-colors rounded-full font-bold text-sm">Join Tug</button>
                    </div>
                </div>

                {/* Secondary Info Cards */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-primary/5 dark:bg-slate-800/50 rounded-xl p-8 border border-primary/20 flex items-center gap-6">
                        <div className="bg-primary size-16 rounded-full flex items-center justify-center text-white flex-shrink-0">
                            <span className="material-symbols-outlined text-3xl">trending_up</span>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold mb-1">Your Strength: 2,450 XP</h4>
                            <p className="text-slate-500 text-sm">You are in the top 10% of students this week. Keep pulling to reach the Diamond League!</p>
                        </div>
                    </div>
                    <div className="bg-yellow-400/5 dark:bg-slate-800/50 rounded-xl p-8 border border-yellow-400/20 flex items-center gap-6">
                        <div className="bg-yellow-400 size-16 rounded-full flex items-center justify-center text-white flex-shrink-0">
                            <span className="material-symbols-outlined text-3xl">emoji_events</span>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold mb-1">Current Event: Trivia Pull</h4>
                            <p className="text-slate-500 text-sm">Join the 2v2 multiplayer battle in Culture G to earn double rewards for the next 4 hours.</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Decoration */}
            <footer className="mt-20 py-10 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-[1280px] mx-auto px-4 text-center">
                    <div className="flex justify-center gap-2 mb-4">
                        <div className="w-1 h-1 bg-primary rounded-full"></div>
                        <div className="w-1 h-1 bg-primary rounded-full opacity-60"></div>
                        <div className="w-1 h-1 bg-primary rounded-full opacity-30"></div>
                    </div>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">EduTug © 2024 • Gamified Learning Platform</p>
                </div>
            </footer>
        </div>
    );
}
