import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { speak, cn } from '../../../lib/utils';

// We create a simple Train Car component
const TrainCar = ({ position, color, hasShape, shapeType }: any) => {
    const groupRef = useRef<THREE.Group>(null);

    // Simple bobbing for train motion
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 5 + position[0]) * 0.05;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            {/* Base platform */}
            <mesh castShadow receiveShadow position={[0, -0.3, 0]}>
                <boxGeometry args={[1.4, 0.2, 0.8]} />
                <meshStandardMaterial color={color} roughness={0.5} />
            </mesh>
            {/* Wheels */}
            <mesh castShadow receiveShadow position={[-0.4, -0.5, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
                <meshStandardMaterial color="#334155" roughness={0.8} />
            </mesh>
            <mesh castShadow receiveShadow position={[0.4, -0.5, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
                <meshStandardMaterial color="#334155" roughness={0.8} />
            </mesh>
            <mesh castShadow receiveShadow position={[-0.4, -0.5, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
                <meshStandardMaterial color="#334155" roughness={0.8} />
            </mesh>
            <mesh castShadow receiveShadow position={[0.4, -0.5, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
                <meshStandardMaterial color="#334155" roughness={0.8} />
            </mesh>

            {/* The Payload Shape */}
            {hasShape && shapeType === 'box' && (
                <mesh position={[0, 0.2, 0]} castShadow>
                    <boxGeometry args={[0.6, 0.6, 0.6]} />
                    <meshStandardMaterial color="#f43f5e" roughness={0.2} />
                </mesh>
            )}
            {hasShape && shapeType === 'sphere' && (
                <mesh position={[0, 0.2, 0]} castShadow>
                    <sphereGeometry args={[0.4, 32, 32]} />
                    <meshStandardMaterial color="#3b82f6" roughness={0.2} />
                </mesh>
            )}
            {hasShape && shapeType === 'cone' && (
                <mesh position={[0, 0.2, 0]} castShadow>
                    <coneGeometry args={[0.4, 0.8, 16]} />
                    <meshStandardMaterial color="#10b981" roughness={0.2} />
                </mesh>
            )}

            {/* Empty Slot Highlight */}
            {!hasShape && (
                <Html position={[0, 0.5, 0]} center>
                    <div className="text-4xl animate-pulse drop-shadow-lg text-white font-black">?</div>
                </Html>
            )}
        </group>
    );
};

export default function SuitesGame({ onSuccess, onFail, isRunning }: any) {
    const [pattern, setPattern] = useState<'ABA' | 'AAB'>('ABA');
    const [shapesA, setShapesA] = useState<any[]>(['box', 'sphere']);

    const trainRef = useRef<THREE.Group>(null);
    const uiRef = useRef<HTMLDivElement>(null);

    const generateNew = () => {
        // Basic sequence generator
        const p = Math.random() > 0.5 ? 'ABA' : 'AAB';
        setPattern(p);

        const available = ['box', 'sphere', 'cone'].sort(() => Math.random() - 0.5);
        setShapesA([available[0], available[1]]);

        speak("Complète la suite logique. Que manque-t-il sur le dernier wagon ?");

        if (trainRef.current) {
            // Animate train driving in
            gsap.fromTo(trainRef.current.position,
                { x: -15 },
                { x: 0, duration: 1.5, ease: "power2.out" }
            );
        }
        if (uiRef.current) {
            gsap.fromTo(uiRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 1 });
        }
    };

    useEffect(() => {
        generateNew();
        // eslint-disable-next-line
    }, []);

    const handleSelect = (shape: string) => {
        if (!isRunning) return;

        const expected = pattern === 'ABA' ? shapesA[1] : shapesA[0]; // If ABA, 4th is B. If AAB, 4th is A (A-A-B-A)

        if (shape === expected) {
            speak("Bravo !");
            onSuccess();

            // Drive train out
            if (trainRef.current) {
                gsap.to(trainRef.current.position, { x: 15, duration: 1, ease: "power2.in", onComplete: generateNew });
            }
            if (uiRef.current) {
                gsap.to(uiRef.current, { y: 50, opacity: 0, duration: 0.3 });
            }

        } else {
            speak("Non, regarde bien la logique avant.");
            onFail();
        }
    };

    return (
        <div className={cn("w-full h-[500px] bg-slate-100 dark:bg-slate-900 rounded-3xl relative overflow-hidden transition-all duration-500 shadow-xl border border-slate-300 dark:border-slate-800", !isRunning ? "opacity-40 blur-sm pointer-events-none grayscale" : "")}>

            {/* 3D Scene */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <Canvas shadows camera={{ position: [0, 2, 8], fov: 40 }}>
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow shadow-mapSize={1024} />

                    <group ref={trainRef}>
                        {/* The sequence: 4 cars. Car 1, 2, 3 have items. Car 4 is missing */}
                        <TrainCar position={[-3, 0, 0]} color="#f59e0b" hasShape={true} shapeType={shapesA[0]} />

                        <TrainCar position={[-1, 0, 0]} color="#f59e0b" hasShape={true} shapeType={pattern === 'ABA' ? shapesA[1] : shapesA[0]} />

                        <TrainCar position={[1, 0, 0]} color="#f59e0b" hasShape={true} shapeType={pattern === 'ABA' ? shapesA[0] : shapesA[1]} />

                        <TrainCar position={[3, 0, 0]} color="#fbbf24" hasShape={false} />
                    </group>

                    {/* Ground */}
                    <mesh position={[0, -0.6, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[50, 10]} />
                        <meshStandardMaterial color="#475569" roughness={0.8} />
                    </mesh>

                    <ContactShadows position={[0, -0.55, 0]} opacity={0.6} scale={40} blur={2} far={10} />
                </Canvas>
            </div>

            {/* 2D Interactive UI Layer */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-between p-6 pointer-events-none">
                <div
                    role="heading"
                    aria-level={2}
                    className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md px-6 py-2 rounded-full shadow-lg font-bold text-slate-700 dark:text-slate-200 pointer-events-auto"
                >
                    Complète la suite logique de ce train
                </div>

                {/* Options */}
                <div ref={uiRef} className="flex items-center justify-center gap-6 bg-white/40 dark:bg-slate-800/60 backdrop-blur-xl p-4 rounded-2xl shadow-2xl pointer-events-auto border border-white/20">
                    <button
                        onClick={() => handleSelect('box')}
                        aria-label="Sélectionner le Cube"
                        className="basis-1/3 flex flex-col items-center gap-2 p-2 focus:outline-none focus:ring-4 focus:ring-primary focus:bg-white/50 hover:bg-white/50 rounded-xl transition-colors"
                    >
                        <div className="size-12 bg-rose-500 rounded-md border-4 border-rose-700 shadow-lg" aria-hidden="true"></div>
                        <span className="text-xs font-bold uppercase" aria-hidden="true">Cube</span>
                    </button>
                    <button
                        onClick={() => handleSelect('sphere')}
                        aria-label="Sélectionner la Boule"
                        className="basis-1/3 flex flex-col items-center gap-2 p-2 focus:outline-none focus:ring-4 focus:ring-primary focus:bg-white/50 hover:bg-white/50 rounded-xl transition-colors"
                    >
                        <div className="size-12 bg-blue-500 rounded-full border-4 border-blue-700 shadow-lg" aria-hidden="true"></div>
                        <span className="text-xs font-bold uppercase" aria-hidden="true">Boule</span>
                    </button>
                    <button
                        onClick={() => handleSelect('cone')}
                        aria-label="Sélectionner le Cône"
                        className="basis-1/3 flex flex-col items-center gap-2 p-2 focus:outline-none focus:ring-4 focus:ring-primary focus:bg-white/50 hover:bg-white/50 rounded-xl transition-colors"
                    >
                        <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[40px] border-emerald-500 drop-shadow-md" aria-hidden="true"></div>
                        <span className="text-xs font-bold uppercase" aria-hidden="true">Cône</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
