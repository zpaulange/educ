import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { speak, cn } from '../../../lib/utils';

const BlockStack = ({ type, count, position, color }: any) => {
    const groupRef = useRef<THREE.Group>(null);

    // Bounce on count change
    useEffect(() => {
        if (groupRef.current) {
            gsap.fromTo(groupRef.current.scale,
                { y: 0.5 },
                { y: 1, duration: 0.3, ease: "back.out(1.5)" }
            );
        }
    }, [count]);

    return (
        <group ref={groupRef} position={position}>
            {/* The Base Plate / Label */}
            <mesh position={[0, 0, 0]} receiveShadow>
                <boxGeometry args={[1.5, 0.2, 1.5]} />
                <meshStandardMaterial color="#475569" />
            </mesh>
            <Text position={[0, -0.3, 0.8]} fontSize={0.3} color="white" outlineWidth={0.05} outlineColor="black">
                {type}
            </Text>

            {/* The Blocks (Stacked visually) */}
            {Array.from({ length: count }).map((_, i) => (
                <mesh key={i} position={[0, 0.3 + (i * 0.4), 0]} castShadow receiveShadow>
                    <boxGeometry args={[1, 0.35, 1]} />
                    <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
                </mesh>
            ))}
        </group>
    );
};

export default function NumerationGame({ onSuccess, onFail, isRunning }: any) {
    const [targetNumber, setTargetNumber] = useState(0);
    const [hundreds, setHundreds] = useState(0);
    const [tens, setTens] = useState(0);
    const [units, setUnits] = useState(0);

    const generateNew = () => {
        // Generate a random number between 11 and 999
        const target = Math.floor(Math.random() * 989) + 11;
        setTargetNumber(target);

        setHundreds(0);
        setTens(0);
        setUnits(0);

        speak(`Construis le nombre ${target} en ajoutant des centaines, dizaines et unités.`);
    };

    useEffect(() => {
        generateNew();
        // eslint-disable-next-line
    }, []);

    const handleAdd = (type: 'C' | 'D' | 'U') => {
        if (!isRunning) return;

        if (type === 'C') setHundreds(h => Math.min(h + 1, 9));
        if (type === 'D') setTens(t => Math.min(t + 1, 9));
        if (type === 'U') setUnits(u => Math.min(u + 1, 9));
    };

    const handleRemove = (type: 'C' | 'D' | 'U') => {
        if (!isRunning) return;

        if (type === 'C') setHundreds(h => Math.max(h - 1, 0));
        if (type === 'D') setTens(t => Math.max(t - 1, 0));
        if (type === 'U') setUnits(u => Math.max(u - 1, 0));
    };

    const validate = () => {
        if (!isRunning) return;

        const currentTotal = (hundreds * 100) + (tens * 10) + units;

        if (currentTotal === targetNumber) {
            speak("Excellent, c'est le bon nombre !");
            onSuccess();
            setTimeout(generateNew, 1500);
        } else {
            speak(`Tu y es presque, tu as fait ${currentTotal} mais on cherche ${targetNumber}.`);
            onFail();
        }
    };

    return (
        <div className={cn("w-full h-[500px] bg-sky-900 rounded-3xl relative overflow-hidden transition-all duration-500 shadow-xl border border-sky-700", !isRunning ? "opacity-40 blur-sm pointer-events-none grayscale" : "")}>

            {/* Target Display UI */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
                <div className="bg-white/10 backdrop-blur-md px-8 py-2 rounded-full border border-white/20 text-sky-100 font-bold text-sm tracking-widest uppercase shadow-lg">
                    Objectif
                </div>
                <div className="text-6xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                    {targetNumber}
                </div>
            </div>

            {/* Current Value Display UI */}
            <div className="absolute top-6 right-6 z-20 flex flex-col items-end gap-1">
                <span className="text-sky-300 text-xs font-bold uppercase">Total Actuel</span>
                <span className={cn("text-3xl font-black transition-colors",
                    ((hundreds * 100) + (tens * 10) + units) > targetNumber ? "text-rose-400" : "text-emerald-400"
                )}>
                    {(hundreds * 100) + (tens * 10) + units}
                </span>
            </div>

            {/* 3D Scene */}
            <div className="absolute inset-0 z-10">
                <Canvas shadows camera={{ position: [0, 4, 8], fov: 45 }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow shadow-mapSize={1024} />

                    <Float speed={1} floatIntensity={0.2}>
                        <group position={[0, -2.5, 0]}>
                            <BlockStack type="Centaines" count={hundreds} position={[-2.5, 0, 0]} color="#ef4444" />
                            <BlockStack type="Dizaines" count={tens} position={[0, 0, 0]} color="#3b82f6" />
                            <BlockStack type="Unités" count={units} position={[2.5, 0, 0]} color="#10b981" />

                            {/* Table Surface */}
                            <mesh position={[0, -0.2, 0]} receiveShadow>
                                <boxGeometry args={[8, 0.4, 3]} />
                                <meshStandardMaterial color="#1e293b" />
                            </mesh>
                        </group>
                    </Float>

                    <ContactShadows position={[0, -2.8, 0]} opacity={0.7} scale={20} blur={2} far={10} />
                </Canvas>
            </div>

            {/* Controls UI Overlay (Buttons to add/remove) */}
            <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-12">

                {/* Centaines */}
                <div className="flex flex-col gap-2">
                    <button onClick={() => handleAdd('C')} className="bg-rose-500 hover:bg-rose-400 active:translate-y-1 text-white size-12 rounded-xl shadow-[0_4px_0_#9f1239] transition-all font-black text-2xl flex items-center justify-center">+</button>
                    <button onClick={() => handleRemove('C')} className="bg-slate-700 hover:bg-slate-600 active:translate-y-1 text-white size-12 rounded-xl shadow-[0_4px_0_#334155] transition-all font-black text-2xl flex items-center justify-center">-</button>
                </div>

                {/* Dizaines */}
                <div className="flex flex-col gap-2">
                    <button onClick={() => handleAdd('D')} className="bg-blue-500 hover:bg-blue-400 active:translate-y-1 text-white size-12 rounded-xl shadow-[0_4px_0_#1e3a8a] transition-all font-black text-2xl flex items-center justify-center">+</button>
                    <button onClick={() => handleRemove('D')} className="bg-slate-700 hover:bg-slate-600 active:translate-y-1 text-white size-12 rounded-xl shadow-[0_4px_0_#334155] transition-all font-black text-2xl flex items-center justify-center">-</button>
                </div>

                {/* Unités */}
                <div className="flex flex-col gap-2">
                    <button onClick={() => handleAdd('U')} className="bg-emerald-500 hover:bg-emerald-400 active:translate-y-1 text-white size-12 rounded-xl shadow-[0_4px_0_#064e3b] transition-all font-black text-2xl flex items-center justify-center">+</button>
                    <button onClick={() => handleRemove('U')} className="bg-slate-700 hover:bg-slate-600 active:translate-y-1 text-white size-12 rounded-xl shadow-[0_4px_0_#334155] transition-all font-black text-2xl flex items-center justify-center">-</button>
                </div>

                {/* Validate Button */}
                <div className="flex items-center ml-8">
                    <button
                        onClick={validate}
                        className="bg-amber-500 hover:bg-amber-400 active:translate-y-1 text-white px-8 py-4 rounded-2xl shadow-[0_6px_0_#b45309] transition-all font-black text-xl flex items-center gap-2 uppercase tracking-widest"
                    >
                        Valider
                        <span className="material-symbols-outlined">check_circle</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
