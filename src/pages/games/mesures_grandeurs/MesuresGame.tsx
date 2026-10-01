import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Text } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { speak, cn } from '../../../lib/utils';

// The Beaker (Eprouvette) and its fluid
const Beaker = ({ fluidPercentage, capacity }: any) => {
    const fluidRef = useRef<THREE.Mesh>(null);

    // Smooth fluid fill animation
    useEffect(() => {
        if (fluidRef.current) {
            const targetHeight = (fluidPercentage / 100) * 4; // max height is 4
            gsap.to(fluidRef.current.scale, { y: Math.max(targetHeight, 0.01), duration: 1, ease: "power2.out" });
            gsap.to(fluidRef.current.position, { y: -1.95 + (Math.max(targetHeight, 0.01) / 2), duration: 1, ease: "power2.out" });
        }
    }, [fluidPercentage]);

    return (
        <group position={[0, 0, 0]}>
            {/* Glass cylinder */}
            <mesh position={[0, 0, 0]} castShadow>
                <cylinderGeometry args={[1.5, 1.5, 4, 32]} />
                <meshPhysicalMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.2}
                    roughness={0.1}
                    transmission={0.9}
                    thickness={0.1}
                />
            </mesh>

            {/* Fluid cylinder */}
            {/* We scale Y from bottom up */}
            <mesh ref={fluidRef} position={[0, -1.95, 0]}>
                <cylinderGeometry args={[1.45, 1.45, 1, 32]} />
                <meshPhysicalMaterial
                    color="#3b82f6"
                    transmission={0.6}
                    transparent
                    opacity={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Measurement Ticks */}
            {Array.from({ length: 5 }).map((_, i) => (
                <Text
                    key={i}
                    position={[1.55, -2 + (i * 1), 0]}
                    fontSize={0.2}
                    color="black"
                    anchorX="left"
                    anchorY="middle"
                >
                    {i === 0 ? '' : `${(capacity / 4) * i} ml`}
                </Text>
            ))}
            {/* Tick lines */}
            {Array.from({ length: 5 }).map((_, i) => i > 0 && (
                <mesh key={`tick-${i}`} position={[1.48, -2 + (i * 1), 0]}>
                    <boxGeometry args={[0.2, 0.02, 0.02]} />
                    <meshBasicMaterial color="black" />
                </mesh>
            ))}
        </group>
    );
};

export default function MesuresGame({ onSuccess, onFail, isRunning }: any) {
    const [targetAmount, setTargetAmount] = useState(0);
    const [currentAmount, setCurrentAmount] = useState(0);
    const capacity = 1000; // max ml

    const generateNew = () => {
        // Targets in multiples of 100 up to 1000
        const targets = [200, 300, 400, 500, 600, 700, 800, 900, 1000];
        const t = targets[Math.floor(Math.random() * targets.length)];
        setTargetAmount(t);
        setCurrentAmount(0);

        speak(`Remplis le bécher avec exactement ${t} millilitres.`);
    };

    useEffect(() => {
        generateNew();
        // eslint-disable-next-line
    }, []);

    const handleAdd = (amount: number) => {
        if (!isRunning) return;
        setCurrentAmount(prev => Math.min(prev + amount, capacity));
    };

    const handleRemove = () => {
        if (!isRunning) return;
        setCurrentAmount(0); // Empty it
    };

    const validate = () => {
        if (!isRunning) return;
        if (currentAmount === targetAmount) {
            speak("Parfait ! Le volume est exact.");
            onSuccess();
            setTimeout(generateNew, 1500);
        } else {
            speak(`Tu n'y es pas. Il y a ${currentAmount} millilitres. Vide et recommence si besoin.`);
            onFail();
        }
    };

    const fluidPercentage = (currentAmount / capacity) * 100;

    return (
        <div className={cn("w-full h-[500px] bg-slate-50 rounded-3xl relative overflow-hidden transition-all duration-500 shadow-xl border border-slate-300", !isRunning ? "opacity-40 blur-sm pointer-events-none grayscale" : "")}>

            {/* Top UI */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center justify-between w-[80%]">
                <div className="flex flex-col bg-white/80 backdrop-blur-md px-6 py-2 rounded-xl shadow-sm border border-slate-200">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Objectif</span>
                    <span className="text-2xl font-black text-rose-500">{targetAmount} ml</span>
                </div>

                <div className="flex flex-col bg-white/80 backdrop-blur-md px-6 py-2 rounded-xl shadow-sm border border-slate-200 items-end">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Actuel</span>
                    <span className={cn("text-2xl font-black transition-colors", currentAmount > targetAmount ? "text-red-500" : currentAmount === targetAmount ? "text-emerald-500" : "text-blue-500")}>
                        {currentAmount} ml
                    </span>
                </div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-3">
                <button onClick={() => handleAdd(100)} className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold px-4 py-2 rounded-lg shadow-sm border border-blue-300 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">water_drop</span>
                    + 100 ml
                </button>
                <button onClick={() => handleAdd(250)} className="bg-blue-200 hover:bg-blue-300 text-blue-800 font-bold px-4 py-2 rounded-lg shadow-sm border border-blue-400 flex items-center gap-2">
                    <span className="material-symbols-outlined">water_drop</span>
                    + 250 ml
                </button>
                <button onClick={handleRemove} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-4 py-2 rounded-lg shadow-sm mt-4 text-xs uppercase tracking-widest">
                    Vider
                </button>
            </div>

            <div className="absolute bottom-6 right-6 z-20">
                <button
                    onClick={validate}
                    className="bg-emerald-500 hover:bg-emerald-400 active:translate-y-1 text-white px-8 py-4 rounded-2xl shadow-[0_6px_0_#065f46] transition-all font-black text-xl flex items-center gap-2 uppercase tracking-widest"
                >
                    Valider
                </button>
            </div>

            {/* 3D Scene */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <Canvas shadows camera={{ position: [0, 2, 8], fov: 45 }}>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[5, 10, 5]} intensity={1} castShadow shadow-mapSize={1024} />
                    <pointLight position={[-5, 5, -5]} intensity={0.5} color="#cbd5e1" />

                    <group position={[0, -0.5, 0]}>
                        <Beaker fluidPercentage={fluidPercentage} capacity={capacity} />

                        {/* Table */}
                        <mesh position={[0, -2.1, 0]} receiveShadow>
                            <cylinderGeometry args={[4, 4, 0.2, 32]} />
                            <meshStandardMaterial color="#e5e7eb" roughness={0.8} />
                        </mesh>
                    </group>

                    <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={15} blur={2} far={10} />
                </Canvas>
            </div>
        </div>
    );
}
