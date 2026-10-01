import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

const avatars = [
    {
        id: 'robot',
        name: 'Le Robot',
        title: 'Logique & Tech',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwuVjKAlpa-1xtFzWzokJrN7wUCweyCWIWcYEf_WD6wUYU51pfxKd55mB7ixKk3kfTRDSvD1WS4tfgqTvDa53NTd022-zL8AkithLuIEqricikHdk7lqyLehx2g9_lkFH3qOazMVwXTQ4Q1xGsnvQnL1dnFJyDO095m1Y7n4R7A5Svg8uHJ_-Rxkxmop97RYguXDLAGFRdKtEzRBEniUHzP6-5RH2ls-BAk9IaoCBwBoOF-qFYOX7ApaHbn6iaoZZDW5Onxy6vm_Y',
    },
    {
        id: 'wizard',
        name: 'Le Sorcier',
        title: 'Mystère & Histoire',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANfHWoP_JC3nNP_99Y3v4eGFsCuxSBKEBBgd_pPLcIeMOw0qcPyPoKM4RXg1p8q5gP_1M4fPG5pz6ZKdolccUrXcvOGH8S4ZA3_IrgiP0duMpO7TpoV9PjcTSPp7hextNLegB9ySBw22QyBKmIOB-VzaHalQSB45WQ4FzskoMcsyQ580Mv0MMACm26GZZCnOLM37p5WoYN0Kbw6Ezp9XeXPwzjHjdiAmG6-0e2d8t4tauM4wweb6a0KEJIqT6NbagwrWKCHwBidVw',
    },
    {
        id: 'athlete',
        name: "L'Athlète",
        title: 'Énergie & Sport',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCozoxdUpkP5rg0ae1mrXx2fa59YxhZm60fqVQGmHA_tpIgZFjb6hZ_WNlhELzeyut9-Dmlp76MOoRvtxTiqy67-w3zy4_6MwHIV4zkNXSCTq9OIfKRLmJP61LXWuJRzwJiMX2vqcLk-PG76fFwyCgg5hmxvg8Ln4Kfd54qUZNph7XpkfKGaAKPE21K_P7OxkOKizkjvHx4xS3RPnfHlKow9OexZwHVtNI5yGJWcryrKftct6CxvXhiw8WqeKhqR04OsltmSrZ-xvg',
    },
    {
        id: 'scientist',
        name: 'La Scientifique',
        title: 'Découverte & Nature',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqeByvyXUaJpHTHP3nPYUi314PYRuRa0hzSCOk4uLVFHVjMeqiPZkDVBAmYS5ID6FiGZ95WnbTEi1CYQmPLG5-6C0LHwUKFK-2TFD6_FexKwfp7DWXga5rXjP6MoM3DfbOSkTEUOvrosY48ww-eg0oI-pBh8owfD-1J6N221BdWmBJUb0Y5LKz5xegV64kOwa-KnzX-CX0bJmF-NEJXqmt6HpgY73vW_INzYBEmgEQlE_wMtc3Gah4JtD5hZ-gWLgdYQ_2UDPr9Gs',
    }
];

export default function AvatarSelection() {
    const [selectedAvatar, setSelectedAvatar] = useState('wizard');
    const navigate = useNavigate();

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100">
            <div className="layout-container flex h-full grow flex-col">
                {/* Top Navigation Bar */}
                <header className="flex items-center justify-between border-b border-primary/10 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-10 py-4 sticky top-0 z-50">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="bg-primary text-white p-2 rounded-xl">
                            <span className="material-symbols-outlined !text-3xl">fitness_center</span>
                        </div>
                        <h2 className="text-xl font-extrabold tracking-tight text-primary">EduTug</h2>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                            <span className="material-symbols-outlined">settings</span>
                        </button>
                        <button className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                            <span className="material-symbols-outlined">help</span>
                        </button>
                    </div>
                </header>

                <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 max-w-6xl mx-auto w-full">
                    {/* Progress Stepper */}
                    <div className="w-full max-w-md mb-8">
                        <div className="flex justify-between items-end mb-2">
                            <p className="text-primary font-bold text-sm uppercase tracking-wider">Étape 2 sur 5</p>
                            <p className="text-slate-500 font-medium text-sm">Profil : 40%</p>
                        </div>
                        <div className="h-3 w-full bg-primary/10 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full transition-all duration-300" style={{ width: '40%' }}></div>
                        </div>
                    </div>

                    {/* Main Heading */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
                            Choisis ton champion !
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-lg">Sélectionne l'avatar qui te représentera lors des duels.</p>
                    </div>

                    {/* Avatar Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full mb-16">
                        {avatars.map((avatar) => {
                            const isSelected = selectedAvatar === avatar.id;

                            return (
                                <button
                                    key={avatar.id}
                                    onClick={() => setSelectedAvatar(avatar.id)}
                                    className={cn(
                                        "group relative flex flex-col items-center p-6 bg-white dark:bg-slate-800 rounded-xl transition-all border-4",
                                        isSelected
                                            ? "shadow-2xl border-selection-green selection-glow transform scale-105 z-10"
                                            : "hover:shadow-xl border-transparent hover:border-primary/20"
                                    )}
                                >
                                    {isSelected && (
                                        <div className="absolute -top-4 right-4 bg-selection-green text-white size-8 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-800">
                                            <span className="material-symbols-outlined !text-lg font-bold">check</span>
                                        </div>
                                    )}

                                    <div className={cn(
                                        "w-40 h-40 rounded-full mb-6 overflow-hidden flex items-center justify-center ring-4",
                                        isSelected
                                            ? "bg-purple-100 dark:bg-purple-900/30 ring-selection-green/30"
                                            : "bg-slate-100 dark:bg-slate-700 ring-slate-50 dark:ring-slate-900"
                                    )}>
                                        <div
                                            className="w-full h-full bg-cover bg-center"
                                            style={{ backgroundImage: `url("${avatar.image}")` }}
                                        ></div>
                                    </div>

                                    <h3 className={cn("text-xl font-bold mb-1", isSelected ? "text-slate-900 dark:text-white" : "")}>{avatar.name}</h3>
                                    <p className={cn(
                                        "text-sm font-medium uppercase tracking-tight",
                                        isSelected ? "text-purple-600 dark:text-purple-400" : "text-slate-500"
                                    )}>{avatar.title}</p>

                                    <div className={cn(
                                        "mt-4 px-4 py-1 rounded-full text-xs font-bold transition-opacity",
                                        isSelected
                                            ? "bg-selection-green text-white opacity-100"
                                            : "bg-slate-100 dark:bg-slate-700 text-slate-500 opacity-0 group-hover:opacity-100"
                                    )}>
                                        {isSelected ? "SÉLECTIONNÉ" : "SÉLECTIONNER"}
                                    </div>
                                </button>
                            )
                        })}
                    </div>

                    {/* Footer Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                        <button
                            onClick={() => navigate('/')}
                            className="flex-1 flex h-14 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-lg font-bold hover:bg-slate-300 transition-colors"
                        >
                            <span>Retour</span>
                        </button>
                        <button
                            onClick={() => navigate('/hub')}
                            className="flex-[2] flex h-14 items-center justify-center rounded-full bg-primary text-white text-lg font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all transform hover:-translate-y-1"
                        >
                            <span>C'est parti !</span>
                            <span className="material-symbols-outlined ml-2">rocket_launch</span>
                        </button>
                    </div>
                </main>

                {/* Bottom Decoration (Tug of War concept) */}
                <div className="h-2 bg-gradient-to-r from-primary via-selection-green to-primary opacity-50"></div>
            </div>
        </div>
    );
}
