import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen flex flex-col font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 selection:bg-primary selection:text-white overflow-x-hidden">
            {/* Background Pattern */}
            <div
                className="absolute inset-0 pointer-events-none -z-10"
                style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(13, 89, 242, 0.05) 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Navigation */}
            <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/')}>
                    <div className="bg-primary p-2 rounded-lg text-white transform group-hover:rotate-12 transition-transform">
                        <span className="material-symbols-outlined text-2xl">sports_kabaddi</span>
                    </div>
                    <h2 className="text-2xl font-black tracking-tight text-primary">EduTug</h2>
                </div>
                <nav className="hidden md:flex items-center gap-8 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-8 py-3 rounded-full border border-primary/10 shadow-sm">
                    <a className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-lg">leaderboard</span>
                        Classement
                    </a>
                    <a className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-lg">settings</span>
                        Paramètres
                    </a>
                    <a className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-lg">language</span>
                        Français
                    </a>
                </nav>
                <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">person</span>
                    Connexion
                </button>
            </header>

            {/* Main Hero Section */}
            <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center relative max-w-7xl mx-auto w-full">
                {/* Mascots Pulling Rope Visual */}
                <div className="w-full max-w-5xl mb-12 relative h-64 md:h-80 flex items-center justify-center">
                    {/* Mascot Left (Robot) */}
                    <div className="absolute left-0 bottom-0 w-48 h-48 md:w-64 md:h-64 bg-primary/10 rounded-xl flex items-center justify-center border-4 border-primary overflow-hidden shadow-2xl z-10">
                        <img
                            alt="Robot mascot pulling rope"
                            className="object-cover w-full h-full opacity-90 hover:scale-110 transition-transform cursor-pointer"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYWqr8gM7-nMFvc1jVdLSmym6C-jWE5a6bLBPPS__tzR-o6krhJcu_P71mk125-mjRxJ5jBdZVKTn-DgucU5ELLm0QUCZ64fByImy3iklna1q2TtJ0LKEZ5VUzuQ_A1djSL3YJ9GyCwIA3TS6ZOuZgwAlBMvmyEqRKd7ZTV2WRgjV6liJ-YLqrgkgLLrcBfezZZUGl3QxoXiZ_UcHz5ebeQDVr0qzDyRAObXRV0enRefAby4UMYdL1Z2whxIT1uRu-R4Cxai4ty7s"
                        />
                    </div>
                    {/* The Rope */}
                    <div
                        className="absolute w-[80%] h-4 rounded-full shadow-[0_0_20px_rgba(255,234,0,0.5)] z-0 flex items-center justify-center"
                        style={{ background: 'linear-gradient(90deg, #0d59f2 0%, #ffea00 50%, #8ce02c 100%)' }}
                    >
                        <div className="bg-bright-yellow h-8 w-1 rounded-full animate-pulse shadow-lg"></div>
                    </div>
                    {/* Mascot Right (Owl) */}
                    <div className="absolute right-0 bottom-0 w-48 h-48 md:w-64 md:h-64 bg-apple-green/10 rounded-xl flex items-center justify-center border-4 border-apple-green overflow-hidden shadow-2xl z-10">
                        <img
                            alt="Owl mascot pulling rope"
                            className="object-cover w-full h-full opacity-90"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaQCjox1m0I6weKs0y6y0c0QeUtoVXWvg_OkrzSptdUsJLvUBlMglcqKZ58FaeCc6c8LtZw3nF-UnfO3m4R1hWPPw-OtN27-xGRAO9MnEzTCdk-TLyfYwIskDjGffc722xuEjlhX6DA6s9mprPJRg-O1QnEEZePoOhNZCTxkVIbnJyGNFWNolIM0nCPQtAhseVg9wbiSUTVAOhxO3otz0-b1TlOMw40kndAt3NKtjt9vKcnLE8S5pRdIxNgu4RLoBN92KMjpTy74U"
                        />
                    </div>
                </div>

                {/* Content Area */}
                <div className="z-10 max-w-2xl mx-auto space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter">
                            Edu<span className="text-primary italic">Tug</span>
                        </h1>
                        <p className="text-xl md:text-2xl font-medium text-slate-600 dark:text-slate-400">
                            Tirez vers la connaissance ! Relevez le défi du savoir dans un duel épique.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button
                            onClick={() => navigate('/avatar')}
                            className="group relative w-full sm:w-auto min-w-[240px] px-10 py-5 bg-primary text-white rounded-full font-extrabold text-xl shadow-xl shadow-primary/30 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                        >
                            <span className="material-symbols-outlined text-3xl">play_circle</span>
                            COMMENCER
                            <div className="absolute -top-2 -right-2 bg-bright-yellow text-slate-900 text-xs px-2 py-1 rounded-full font-bold animate-bounce border-2 border-white">
                                Nouveau !
                            </div>
                        </button>
                        <button className="w-full sm:w-auto min-w-[240px] px-10 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-4 border-apple-green rounded-full font-extrabold text-xl hover:bg-apple-green hover:text-white transition-all flex items-center justify-center gap-3">
                            <span className="material-symbols-outlined text-3xl">help</span>
                            INSTRUCTIONS
                        </button>
                    </div>
                </div>

                {/* Feature Badges */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                    <div className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-2xl flex items-center gap-3 border border-slate-200 dark:border-slate-700 backdrop-blur-sm">
                        <div className="bg-primary/20 p-2 rounded-xl text-primary">
                            <span className="material-symbols-outlined">calculate</span>
                        </div>
                        <span className="text-sm font-bold">Mathématiques</span>
                    </div>
                    <div className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-2xl flex items-center gap-3 border border-slate-200 dark:border-slate-700 backdrop-blur-sm">
                        <div className="bg-apple-green/20 p-2 rounded-xl text-apple-green">
                            <span className="material-symbols-outlined">science</span>
                        </div>
                        <span className="text-sm font-bold">Sciences</span>
                    </div>
                    <div className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-2xl flex items-center gap-3 border border-slate-200 dark:border-slate-700 backdrop-blur-sm">
                        <div className="bg-bright-yellow/20 p-2 rounded-xl text-yellow-600">
                            <span className="material-symbols-outlined">history_edu</span>
                        </div>
                        <span className="text-sm font-bold">Histoire</span>
                    </div>
                    <div className="bg-white/50 dark:bg-slate-800/50 p-4 rounded-2xl flex items-center gap-3 border border-slate-200 dark:border-slate-700 backdrop-blur-sm">
                        <div className="bg-purple-500/20 p-2 rounded-xl text-purple-600">
                            <span className="material-symbols-outlined">translate</span>
                        </div>
                        <span className="text-sm font-bold">Langues</span>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between border-t border-slate-200 dark:border-slate-800 gap-6">
                <div className="flex items-center gap-4">
                    <div className="flex gap-4">
                        <a className="text-slate-400 hover:text-primary transition-colors cursor-pointer">
                            <span className="material-symbols-outlined">public</span>
                        </a>
                        <a className="text-slate-400 hover:text-primary transition-colors cursor-pointer">
                            <span className="material-symbols-outlined">smart_display</span>
                        </a>
                        <a className="text-slate-400 hover:text-primary transition-colors cursor-pointer">
                            <span className="material-symbols-outlined">campaign</span>
                        </a>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">© 2024 EduTug</p>
                </div>
                <div className="flex gap-8">
                    <a className="text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">Conditions</a>
                    <a className="text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">Vie privée</a>
                    <a className="text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">Contact</a>
                </div>
                <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700">
                    <span className="size-2 bg-apple-green rounded-full"></span>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">1,240 JOUEURS EN LIGNE</span>
                </div>
            </footer>

            {/* Background Accents */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-apple-green/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-24 bg-bright-yellow/5 rounded-full blur-3xl opacity-50"></div>
            </div>
        </div>
    );
}
