import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn, speak } from '../lib/utils';

type Level = 'maternelle' | 'elementaire' | null;
type Topic = string | null;
type Mode = 'quiz' | 'dragdrop' | 'dessin' | 'chrono' | null;

const levels = [
    { id: 'maternelle', title: 'Maternelle', description: 'PS, MS, GS', icon: 'child_care', color: 'text-fuchsia-500', bg: 'bg-fuchsia-100', border: 'border-fuchsia-200' },
    { id: 'elementaire', title: 'Élémentaire', description: 'CP, CE1, CE2, CM1, CM2', icon: 'school', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' }
];

const maternelle_topics = [
    { id: 'denombrement', title: 'Dénombrement & Quantités', description: 'Compter des objets, constellation du dé, associer un chiffre...', icon: '123', color: 'text-cyan-500', bg: 'bg-cyan-100', border: 'border-cyan-200' },
    { id: 'formes_couleurs', title: 'Formes & Couleurs', description: 'Identifier les formes géométriques de base et les couleurs.', icon: 'category', color: 'text-amber-500', bg: 'bg-amber-100', border: 'border-amber-200' },
    { id: 'logique_suites', title: 'Logique & Suites', description: 'Compléter une suite logique.', icon: 'extension', color: 'text-emerald-500', bg: 'bg-emerald-100', border: 'border-emerald-200' },
    { id: 'reperage_espace', title: 'Repérage dans l\'Espace', description: 'Jeux de labyrinthes, puzzles, dessus/dessous.', icon: 'explore', color: 'text-rose-500', bg: 'bg-rose-100', border: 'border-rose-200' },
    { id: 'grandeurs', title: 'Grandeurs', description: 'Classer des objets du plus petit au plus grand.', icon: 'straighten', color: 'text-indigo-500', bg: 'bg-indigo-100', border: 'border-indigo-200' },
    { id: 'graphisme', title: 'Graphisme des Chiffres', description: 'Suivre le tracé pour apprendre à écrire le chiffre.', icon: 'draw', color: 'text-purple-500', bg: 'bg-purple-100', border: 'border-purple-200' }
];

const elementaire_topics = [
    { id: 'nombres_numeration', title: 'Nombres & Numération', description: 'Valeur de position, comparaison, fractions & décimaux.', icon: '123', color: 'text-cyan-500', bg: 'bg-cyan-100', border: 'border-cyan-200' },
    { id: 'calcul_operations', title: 'Calcul & Opérations', description: 'Calcul mental, opérations posées, compléments.', icon: 'calculate', color: 'text-rose-500', bg: 'bg-rose-100', border: 'border-rose-200' },
    { id: 'geometrie', title: 'Géométrie', description: 'Figures planes, solides, symétrie.', icon: 'category', color: 'text-amber-500', bg: 'bg-amber-100', border: 'border-amber-200' },
    { id: 'mesures_grandeurs', title: 'Mesures & Grandeurs', description: 'L\'heure, monnaie, unités de mesure.', icon: 'straighten', color: 'text-indigo-500', bg: 'bg-indigo-100', border: 'border-indigo-200' },
    { id: 'logique_problemes', title: 'Logique & Problèmes', description: 'Enigmes, proportionnalité, lecture de tableaux/graphiques.', icon: 'extension', color: 'text-emerald-500', bg: 'bg-emerald-100', border: 'border-emerald-200' }
];

const modes = [
    { id: 'quiz', title: 'Mode Quiz', description: 'Répondre à des questions à choix multiples', icon: 'quiz', color: 'text-indigo-500', bg: 'bg-indigo-100', border: 'border-indigo-200' },
    { id: 'dragdrop', title: 'Drag & Drop', description: 'Glisser-déposer des objets', icon: 'touch_app', color: 'text-orange-500', bg: 'bg-orange-100', border: 'border-orange-200' },
    { id: 'dessin', title: 'Dessin/Tracé', description: 'Apprendre à tracer les chiffres ou formes', icon: 'draw', color: 'text-purple-500', bg: 'bg-purple-100', border: 'border-purple-200' },
    { id: 'chrono', title: 'Mode Chrono', description: 'Réussir le maximum d\'exercices avant la fin du temps', icon: 'timer', color: 'text-red-500', bg: 'bg-red-100', border: 'border-red-200' }
];

export default function MathFlow() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [level, setLevel] = useState<Level>(null);
    const [topic, setTopic] = useState<Topic>(null);
    const [mode, setMode] = useState<Mode>(null);

    const handleLevelSelect = (id: Level) => {
        setLevel(id);
        setStep(2);
    };

    const handleTopicSelect = (item: any) => {
        setTopic(item.id as Topic);
        // Read the topic title and description aloud
        speak(`${item.title}. ${item.description} `);
        setStep(3);
    };

    const handleModeSelect = (id: Mode) => {
        setMode(id);
        // Add small delay to allow UI to show click before navigating
        setTimeout(() => {
            navigate('/game', { state: { level, topic, mode: id } });
        }, 400);
    };

    const currentTopics = level === 'maternelle' ? maternelle_topics : elementaire_topics;

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10 px-4 md:px-10 py-4">
                <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="bg-primary p-2 rounded-lg flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-2xl">sports_kabaddi</span>
                        </div>
                        <h1 className="text-2xl font-black tracking-tight text-primary">EduTug</h1>
                    </div>
                    <button onClick={() => {
                        if (step === 1) navigate('/hub');
                        else {
                            window.speechSynthesis.cancel();
                            setStep(step - 1);
                        }
                    }} className="flex items-center gap-2 justify-center rounded-full h-10 px-5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-bold text-sm">
                        <span className="material-symbols-outlined text-sm">{step === 1 ? 'close' : 'arrow_back'}</span>
                        {step === 1 ? "Quitter" : "Retour"}
                    </button>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center py-12 px-6 w-full max-w-4xl mx-auto">
                {/* Stepper */}
                <div className="w-full mb-12 flex justify-center">
                    <div className="flex items-center gap-4 w-full max-w-2xl">
                        <div className={cn("flex-1 h-2 rounded-full transition-colors", step >= 1 ? "bg-primary" : "bg-slate-200 dark:bg-slate-700")}></div>
                        <div className={cn("flex-1 h-2 rounded-full transition-colors", step >= 2 ? "bg-primary" : "bg-slate-200 dark:bg-slate-700")}></div>
                        <div className={cn("flex-1 h-2 rounded-full transition-colors", step >= 3 ? "bg-primary" : "bg-slate-200 dark:bg-slate-700")}></div>
                    </div>
                </div>

                {/* Dynamic Content */}
                <div className="w-full flex-1 flex flex-col items-center">
                    {step === 1 && (
                        <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-4">Étape 1</span>
                            <h1 className="text-4xl md:text-5xl font-black mb-12 text-center">Choisis ta classe</h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                                {levels.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleLevelSelect(item.id as Level)}
                                        className={cn(
                                            "flex flex-col items-center p-8 rounded-2xl border-4 transition-all text-center group",
                                            level === item.id
                                                ? `border-primary bg-primary/5 shadow-xl scale-105`
                                                : "border-transparent bg-white dark:bg-slate-800 shadow-md hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-lg hover:-translate-y-1"
                                        )}
                                    >
                                        <div className={cn("size-20 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-active:scale-95", item.bg, item.color)}>
                                            <span className="material-symbols-outlined text-4xl">{item.icon}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                                        <p className="text-slate-500 font-medium">{item.description}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-4">Étape 2</span>
                            <h1 className="text-4xl md:text-5xl font-black mb-12 text-center">Sélectionne la rubrique</h1>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                                {currentTopics.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleTopicSelect(item)}
                                        className={cn(
                                            "flex items-start text-left gap-4 p-6 rounded-2xl border-4 transition-all group",
                                            topic === item.id
                                                ? `border - primary bg - primary / 5 shadow - xl scale - [1.02]`
                                                : "border-transparent bg-white dark:bg-slate-800 shadow-md hover:border-slate-200 dark:hover:border-slate-700 hover:-translate-y-1"
                                        )}
                                    >
                                        <div className={cn("size-14 rounded-full flex shrink-0 items-center justify-center transition-transform group-hover:scale-110 group-active:scale-95", item.bg, item.color)}>
                                            <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                                            <p className="text-slate-500 font-medium text-sm line-clamp-3">{item.description}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest mb-4">Étape 3</span>
                            <h1 className="text-4xl md:text-5xl font-black mb-12 text-center">Choix de la méthode</h1>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
                                {modes.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleModeSelect(item.id as Mode)}
                                        className={cn(
                                            "flex items-start text-left gap-4 p-6 rounded-2xl border-4 transition-all group",
                                            mode === item.id
                                                ? `border - primary bg - primary / 5 shadow - xl scale - [1.02]`
                                                : "border-transparent bg-white dark:bg-slate-800 shadow-md hover:border-slate-200 dark:hover:border-slate-700 hover:-translate-y-1"
                                        )}
                                    >
                                        <div className={cn("size-14 rounded-full flex shrink-0 items-center justify-center transition-transform group-hover:scale-110 group-active:scale-95", item.bg, item.color)}>
                                            <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                                            <p className="text-slate-500 font-medium text-sm line-clamp-2">{item.description}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
