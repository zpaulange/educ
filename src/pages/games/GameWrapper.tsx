import { Suspense, lazy, useState } from 'react';
import { A11yUserPreferences } from '@react-three/a11y';

// Maps each topic ID to its specific lazy-loaded mini-game component
const gameComponents: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  // Maternelle
  'denombrement': lazy(() => import('./denombrement/DenombrementGame')),
  'formes_couleurs': lazy(() => import('./formes_couleurs/FormesGame')),
  'logique_suites': lazy(() => import('./logique_suites/SuitesGame')),
  'reperage_espace': lazy(() => import('./reperage_espace/EspaceGame')),
  'grandeurs': lazy(() => import('./grandeurs/GrandeursGame')),
  'graphisme': lazy(() => import('./graphisme/GraphismeGame')),
  // Elémentaire
  'nombres_numeration': lazy(() => import('./nombres_numeration/NumerationGame')),
  'calcul_operations': lazy(() => import('./calcul_operations/CalculGame')),
  'geometrie': lazy(() => import('./geometrie/GeometrieGame')),
  'mesures_grandeurs': lazy(() => import('./mesures_grandeurs/MesuresGame')),
  'logique_problemes': lazy(() => import('./logique_problemes/ProblemesGame')),
};

interface GameWrapperProps {
  topic: string;
  level: string;
  onSuccess: () => void;
  onFail: () => void;
  isRunning: boolean;
}

export default function GameWrapper({ topic, level, onSuccess, onFail, isRunning }: GameWrapperProps) {
  const SpecificGame = gameComponents[topic];
  const [highContrast, setHighContrast] = useState(false);

  if (!SpecificGame) {
    return (
      <div className="w-full h-64 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center font-bold text-slate-500">
        Module "{topic}" non trouvé ou en cours de développement.
      </div>
    );
  }

  return (
    <A11yUserPreferences>
      <div className={`relative w-full h-full ${highContrast ? 'contrast-150 saturate-200' : ''}`}>

        {/* Global A11y Controls */}
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={() => setHighContrast(!highContrast)}
            aria-label={highContrast ? "Désactiver le contraste élevé" : "Activer le contraste élevé"}
            aria-pressed={highContrast}
            className="bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-white p-2 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-4 focus:ring-primary"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              contrast
            </span>
          </button>
        </div>

        <Suspense fallback={
          <div className="w-full h-64 flex items-center justify-center">
            <div className="size-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          {/* A11yAnnouncer is usually within Canvas for 3D, but can be used globally for other events */}
          <SpecificGame
            level={level}
            onSuccess={onSuccess}
            onFail={onFail}
            isRunning={isRunning}
          />
        </Suspense>
      </div>
    </A11yUserPreferences>
  );
}
