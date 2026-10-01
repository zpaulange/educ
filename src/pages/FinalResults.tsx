import { useNavigate } from 'react-router-dom';

export default function FinalResults() {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen relative">
            {/* Confetti Simulation Layer (Static SVG Patterns for design purity) */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
                <div className="absolute top-10 left-10 text-primary transform rotate-12">
                    <span className="material-symbols-outlined text-4xl">celebration</span>
                </div>
                <div className="absolute top-40 right-20 text-primary/40 transform -rotate-12">
                    <span className="material-symbols-outlined text-5xl">auto_awesome</span>
                </div>
                <div className="absolute bottom-20 left-1/4 text-primary/30">
                    <span className="material-symbols-outlined text-3xl">star</span>
                </div>
                <div className="absolute top-1/2 right-10 text-primary/20">
                    <span className="material-symbols-outlined text-6xl">grade</span>
                </div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                {/* Top Navigation */}
                <header className="flex items-center justify-between px-6 py-4 lg:px-40 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="bg-primary p-2 rounded-lg text-white">
                            <span className="material-symbols-outlined block">fitness_center</span>
                        </div>
                        <h1 className="text-xl font-extrabold tracking-tight text-primary">EduTug</h1>
                    </div>
                    <div className="flex items-center gap-6">
                        <nav className="hidden md:flex items-center gap-8 font-medium text-sm">
                            <a className="hover:text-primary transition-colors cursor-pointer" onClick={() => navigate('/hub')}>Dashboard</a>
                            <a className="hover:text-primary transition-colors cursor-pointer">Leçons</a>
                            <a className="text-primary font-bold cursor-pointer">Résultats</a>
                        </nav>
                        <div className="size-10 rounded-full border-2 border-primary overflow-hidden">
                            <img
                                alt="User Avatar"
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuLMPlxU9jlzLj3TEz6l5f7XoDzkM9nJ5sJ-RIEfCEUCkc0GHfNlpGXBpJriyKLdDfZYhE9P_wG07gvGhn-zuQFWiIQHEjJrJLMpCdhGNIr57MISdLA3O78sDeVNkTsklUQ0NMtID0G3ECCqgFmfogBiJiYTrR8At8BHk-VDF6tR_L_Kd2H0tQcosH2fMzsm1dqn6Aa5XydLQQGJis-N-fNxG1q5wsI3IJeSKrIbXkTG2zvQpdth0KF9usqj9Nu940avHjTqteTqg"
                            />
                        </div>
                    </div>
                </header>

                <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-12 flex flex-col items-center">
                    {/* Hero Completion Message */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-6">
                            <span className="material-symbols-outlined text-primary text-6xl">emoji_events</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black mb-4 tracking-tighter">Félicitations ! Vous avez gagné !</h2>
                        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
                            Session terminée avec succès. Votre équipe a dominé le tir à la corde grâce à votre précision et votre rapidité !
                        </p>
                    </div>

                    {/* Stats Overview Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full">
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
                            <span className="text-slate-500 dark:text-slate-400 font-semibold text-sm uppercase tracking-widest mb-2">Score Final</span>
                            <p className="text-4xl font-black text-primary">2,450 pts</p>
                            <div className="mt-4 flex items-center gap-1 text-green-600 font-bold text-sm">
                                <span className="material-symbols-outlined text-sm">trending_up</span> +15% vs record
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
                            <span className="text-slate-500 dark:text-slate-400 font-semibold text-sm uppercase tracking-widest mb-2">Temps Total</span>
                            <p className="text-4xl font-black text-slate-900 dark:text-white">05:12</p>
                            <div className="mt-4 flex items-center gap-1 text-slate-400 font-bold text-sm italic">
                                <span className="material-symbols-outlined text-sm">schedule</span> Rythme optimal
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center text-center">
                            <span className="text-slate-500 dark:text-slate-400 font-semibold text-sm uppercase tracking-widest mb-2">Précision</span>
                            <p className="text-4xl font-black text-slate-900 dark:text-white">92%</p>
                            <div className="mt-4 flex items-center gap-1 text-primary font-bold text-sm">
                                <span className="material-symbols-outlined text-sm">verified</span> Expert
                            </div>
                        </div>
                    </div>

                    {/* Performance Graph Section */}
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 mb-12 w-full">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                            <div>
                                <h3 className="text-xl font-bold">Momentum du Tir à la Corde</h3>
                                <p className="text-slate-500 text-sm">Visualisation de l'équilibre de force durant la session</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                                    <span className="w-2 h-2 rounded-full bg-primary"></span> Votre Équipe
                                </span>
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                    <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></span> Adversaires
                                </span>
                            </div>
                        </div>
                        <div className="relative h-64 w-full">
                            {/* SVG Chart */}
                            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 250">
                                {/* Grid Lines */}
                                <line className="text-slate-200 dark:text-slate-800" stroke="currentColor" strokeDasharray="4" x1="0" x2="1000" y1="125" y2="125"></line>
                                {/* Gradient Area */}
                                <defs>
                                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                                        <stop offset="0%" stopColor="#0d59f2" stopOpacity="0.2"></stop>
                                        <stop offset="100%" stopColor="#0d59f2" stopOpacity="0"></stop>
                                    </linearGradient>
                                </defs>
                                <path d="M0,150 C50,140 100,200 150,180 C200,160 250,50 300,70 C350,90 400,220 450,210 C500,200 550,40 600,20 C650,0 700,120 750,110 C800,100 850,50 900,40 C950,30 1000,60 1000,60 L1000,250 L0,250 Z" fill="url(#chartGradient)"></path>
                                {/* Line Path */}
                                <path d="M0,150 C50,140 100,200 150,180 C200,160 250,50 300,70 C350,90 400,220 450,210 C500,200 550,40 600,20 C650,0 700,120 750,110 C800,100 850,50 900,40 C950,30 1000,60 1000,60" fill="none" stroke="#0d59f2" strokeLinecap="round" strokeWidth="4"></path>
                            </svg>
                            <div className="flex justify-between mt-4 px-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                <span>Début</span>
                                <span>1m</span>
                                <span>2m</span>
                                <span>3m</span>
                                <span>4m</span>
                                <span>Fin</span>
                            </div>
                        </div>
                    </div>

                    {/* Achievements & Badges */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <span className="material-symbols-outlined text-primary">bolt</span>
                            <span className="font-bold text-sm">Apprenant Rapide</span>
                        </div>
                        <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <span className="material-symbols-outlined text-amber-500">star</span>
                            <span className="font-bold text-sm">Série Parfaite</span>
                        </div>
                        <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <span className="material-symbols-outlined text-primary">groups</span>
                            <span className="font-bold text-sm">Esprit d'Équipe</span>
                        </div>
                        <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <span className="material-symbols-outlined text-indigo-500">military_tech</span>
                            <span className="font-bold text-sm">Top 5% Hebdomadaire</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate('/hub')}
                            className="w-full sm:w-auto min-w-[240px] px-10 py-5 bg-primary hover:bg-primary/90 text-white rounded-full font-black text-lg shadow-xl shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined">home</span>
                            Retour au Hub
                        </button>
                        <button
                            onClick={() => navigate('/game')}
                            className="w-full sm:w-auto min-w-[200px] px-10 py-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-full font-bold text-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined">replay</span>
                            Rejouer
                        </button>
                    </div>
                </main>

                <footer className="py-12 text-center text-slate-400 text-sm font-medium">
                    <p>© 2024 EduTug. Apprendre ensemble, tirer ensemble.</p>
                </footer>
            </div>
        </div>
    );
}
