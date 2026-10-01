import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn, speak } from '../lib/utils';
import GameWrapper from './games/GameWrapper';

interface GameState {
  playerScore: number;
  cpuScore: number;
}

export default function GameSession() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { level: string, topic: string, mode: string } | null;

  // Timer State
  const [time, setTime] = useState(0); // in seconds
  const [isRunning, setIsRunning] = useState(false);

  // General Tug Of War State
  const [gameState, setGameState] = useState<GameState>({
    playerScore: 50,
    cpuScore: 50
  });

  // Handle TTS Rules on Mount
  useEffect(() => {
    const topic = state?.topic || 'mathématiques';
    const rulesStr = `Bienvenue à l'atelier de ${topic.replace('_', ' ')}. Appuie sur Play pour commencer le jeu.`;
    speak(rulesStr);
  }, [state]);

  // Timer Tick
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);

        // Passive CPU Drain
        if (Math.random() > 0.6) {
          setGameState(prev => ({
            cpuScore: Math.min(100, prev.cpuScore + 1),
            playerScore: Math.max(0, prev.playerScore - 1)
          }));
        }
      }, 1000);
    } else if (!isRunning && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlay = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setGameState({ playerScore: 50, cpuScore: 50 });
  };

  const handleLevelSuccess = () => {
    setGameState(prev => {
      const newPlayerScore = Math.min(100, prev.playerScore + 15);
      if (newPlayerScore >= 100) {
        navigate('/results');
      }
      return {
        playerScore: newPlayerScore,
        cpuScore: Math.max(0, prev.cpuScore - 15)
      };
    });
  };

  const handleLevelFail = () => {
    setGameState(prev => {
      const newCpuScore = Math.min(100, prev.cpuScore + 10);
      if (newCpuScore >= 100) {
        setIsRunning(false);
        speak("Oh non, le robot a gagné ! Essaie encore.");
      }
      return {
        cpuScore: newCpuScore,
        playerScore: Math.max(0, prev.playerScore - 10)
      };
    });
  };

  const sessionTitle = state?.topic ? state.topic.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : "Math Mastery";

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex flex-col font-display">
      {/* Header / TopNavBar */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-primary text-white p-2 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">sports_kabaddi</span>
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight leading-none">EduTug</h2>
              <span className="text-[10px] uppercase tracking-widest font-bold text-primary">Session en cours</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 bg-slate-100 dark:bg-slate-800 px-6 py-2 rounded-full">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm">functions</span>
              <span className="text-sm font-semibold">{sessionTitle}</span>
            </div>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-600"></div>
            <div className="flex items-center gap-2">
              <span className={cn("material-symbols-outlined text-sm", isRunning ? "text-red-500 animate-pulse" : "text-slate-500")}>timer</span>
              <span className={cn("text-lg font-bold tabular-nums", isRunning ? "text-slate-900 dark:text-white" : "text-slate-500")}>{formatTime(time)}</span>
            </div>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-600"></div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-rose-500 text-sm">local_fire_department</span>
              <span className="text-sm font-bold">7 Streak</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                window.speechSynthesis.cancel();
                navigate('/hub');
              }}
              className="flex items-center justify-center rounded-full h-10 px-5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-bold text-sm"
            >
              Quitter
            </button>
            <div className="size-10 rounded-full bg-primary/10 border-2 border-primary overflow-hidden">
              <img
                alt="User Profile"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvnmSk_gMpNU4RONYnc5UuwaY9RS4L5VfYQogxlajQeQYOh3bs9mI_XEe3mpFktGIl-fN4lp3ArQ8Nn9GsFUUc0WLhrNf2FC_q_eJztWGj9c_zgvfH-TqBfGX88qO3w7-q65BQHVYFHkutdWtTs2DD3PUORI3ibBZP3Bwds18b0msY9jFbjiWDJMkcIxpJNvbEOW0P7_fTDnyhhVbCOsy4TxTuxwbHTCwlJBQD8cwXObML9QgUgbsVWA7MqJuQmJx7N0fJHVugiIE"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full p-4 gap-6">

        {/* Timer Control Bar */}
        <div className="w-full max-w-md bg-white dark:bg-slate-800 p-2 rounded-full border-2 border-slate-200 dark:border-slate-700 flex items-center justify-between shadow-lg mx-auto overflow-hidden">
          <button
            onClick={handlePlay}
            disabled={isRunning}
            className="flex-1 px-4 py-2 flex items-center justify-center gap-2 font-bold disabled:opacity-50 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-green-600"
          >
            <span className="material-symbols-outlined leading-none">play_arrow</span>
            PLAY
          </button>
          <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
          <button
            onClick={handlePause}
            disabled={!isRunning}
            className="flex-1 px-4 py-2 flex items-center justify-center gap-2 font-bold disabled:opacity-50 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-amber-500"
          >
            <span className="material-symbols-outlined leading-none">pause</span>
            PAUSE
          </button>
          <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2 flex items-center justify-center gap-2 font-bold transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-500"
          >
            <span className="material-symbols-outlined leading-none">refresh</span>
            RESET
          </button>
        </div>

        {/* Tug-of-War Arena Section */}
        <section className={cn("w-full bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 relative overflow-hidden transition-opacity duration-300", !isRunning ? "opacity-30 pointer-events-none grayscale" : "opacity-100")}>
          <div className="flex flex-col gap-6 relative z-10">
            {/* Character & Rope Area */}
            <div className="flex items-center justify-between relative px-12 h-32">

              {/* Student Side (P1) */}
              <div
                className="flex flex-col items-center gap-2 transition-transform duration-75 ease-linear"
                style={{ transform: `translateX(${(gameState.playerScore - 50) * 2}px)` }}
              >
                <div className={cn("size-20 rounded-full bg-blue-100 dark:bg-blue-900/30 border-4 border-primary flex items-center justify-center relative shadow-lg", isRunning ? "animate-bounce" : "")} style={{ animationDuration: '2s' }}>
                  <span className="material-symbols-outlined text-4xl text-primary">person</span>
                </div>
              </div>

              {/* The Rope */}
              <div
                className={cn("flex-1 h-3 mx-[-20px] rounded-full shadow-inner relative transition-opacity", isRunning ? "animate-pulse" : "")}
                style={{ background: 'repeating-linear-gradient(45deg, #cbd5e1, #cbd5e1 10px, #94a3b8 10px, #94a3b8 20px)' }}
              >
                {/* Center Flag */}
                <div
                  className={cn("absolute top-1/2 -translate-y-1/2 size-6 bg-rose-500 rounded-sm rotate-45 border-2 border-white shadow-md transition-all duration-300 ease-out", isRunning ? "animate-pulse" : "")}
                  style={{ left: `${gameState.playerScore}%` }}
                ></div>
              </div>

              {/* CPU Side */}
              <div
                className="flex flex-col items-center gap-2 transition-transform duration-75 ease-linear"
                style={{ transform: `translateX(${-(gameState.cpuScore - 50) * 2}px)` }}
              >
                <div className={cn("size-20 rounded-full bg-slate-100 dark:bg-slate-800 border-4 border-slate-300 dark:border-slate-600 flex items-center justify-center relative shadow-lg", isRunning ? "animate-bounce" : "")} style={{ animationDuration: '2.5s', animationDelay: '0.3s' }}>
                  <span className="material-symbols-outlined text-4xl text-slate-400">smart_toy</span>
                </div>
              </div>
            </div>

            {/* Energy Bars */}
            <div className="grid grid-cols-2 gap-12 px-4">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-primary uppercase">Ton Énergie</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-300 ease-out" style={{ width: `${gameState.playerScore}%` }}></div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Énergie Robot</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 rounded-full transition-all duration-300 ease-out" style={{ width: `${gameState.cpuScore}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Game Wrapper Area */}
        <div className="w-full max-w-4xl">
          <GameWrapper
            topic={state?.topic || 'denombrement'}
            level={state?.level || 'maternelle'}
            onSuccess={handleLevelSuccess}
            onFail={handleLevelFail}
            isRunning={isRunning}
          />
        </div>
      </main>
    </div>
  );
}
