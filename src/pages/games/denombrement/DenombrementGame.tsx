import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, Float } from '@react-three/drei';
import { A11y, A11yAnnouncer, useA11y } from '@react-three/a11y';
import * as THREE from 'three';
import gsap from 'gsap';
import { speak, cn } from '../../../lib/utils';

// We won't strictly load an external GLTF since we might not have one, 
// so we'll construct a nice "Apple" mathematically out of ThreeJS primitives.
// We wrap the visual apple inside the logic to handle A11y focus states
const AccessibleAppleVisual = ({ position, delay }: any) => {
    const a11y = useA11y() as any;
    const groupRef = useRef<THREE.Group>(null);

    useEffect(() => {
        if (groupRef.current) {
            // GSAP drop-in animation
            gsap.fromTo(groupRef.current.position,
                { y: position[1] + 5 },
                { y: position[1], duration: 1, ease: "bounce.out", delay: delay }
            );
            gsap.fromTo(groupRef.current.scale,
                { x: 0, y: 0, z: 0 },
                { x: 1, y: 1, z: 1, duration: 0.5, ease: "back.out(1.7)", delay: delay }
            );
        }
    }, [position, delay]);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.01;
            // Optionally scale up slightly if focused via keyboard tab
            if (a11y.focus || a11y.hover) {
                groupRef.current.scale.setScalar(1.2);
            } else {
                groupRef.current.scale.setScalar(1.0);
            }
        }
    });

    const handleClick = (e: any) => {
        e.stopPropagation();
        if (groupRef.current) {
            gsap.fromTo(groupRef.current.scale,
                { x: 1.5, y: 1.5, z: 1.5 },
                { x: 1, y: 1, z: 1, duration: 0.3 }
            );
        }
        a11y.actionCall();
    };

    return (
        <group ref={groupRef} position={position} onClick={handleClick}>
            {/* Apple Body */}
            <mesh castShadow receiveShadow position={[0, 0, 0]}>
                <sphereGeometry args={[0.4, 32, 32]} />
                <meshStandardMaterial color={a11y.focus ? "#f87171" : "#ef4444"} roughness={0.3} emissive={a11y.focus ? "#450a0a" : "#000"} emissiveIntensity={0.5} />
            </mesh>
            {/* Stem */}
            <mesh castShadow receiveShadow position={[0, 0.45, 0]} rotation={[0, 0, 0.2]}>
                <cylinderGeometry args={[0.02, 0.04, 0.3, 8]} />
                <meshStandardMaterial color="#4d2900" roughness={0.8} />
            </mesh>
            {/* Leaf */}
            <mesh castShadow receiveShadow position={[0.15, 0.45, 0]} rotation={[0.4, -0.2, 0.6]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshStandardMaterial color="#22c55e" roughness={0.5} />
            </mesh>
        </group>
    );
};

const Apple3D = ({ position, delay, id }: { position: [number, number, number], delay: number, id: number }) => {
    return (
        <A11y
            role="button"
            description={`Pomme numéro ${id + 1} tombée de l'arbre`}
            actionCall={() => { speak(`C'est la pomme numéro ${id + 1}`); }}
        >
            <AccessibleAppleVisual position={position} delay={delay} />
        </A11y>
    );
};

export default function DenombrementGame({ onSuccess, onFail, isRunning }: any) {
    const [targetCount, setTargetCount] = useState(0);
    const [apples, setApples] = useState<{ id: number; pos: [number, number, number]; delay: number }[]>([]);
    const [selectedCount, setSelectedCount] = useState<number | null>(null);

    const uiRef = useRef<HTMLDivElement>(null);

    const generateNew = () => {
        const count = Math.floor(Math.random() * 7) + 2; // 2 to 8 apples
        setTargetCount(count);
        setSelectedCount(null);

        // logically position apples in a 3D grid layout so they don't overlap much
        const positions: [number, number, number][] = [
            [-1.5, 1, 0], [0, 1.5, 0], [1.5, 1, 0],
            [-2.5, 0, 0], [-0.8, -0.5, 0.5], [0.8, -0.5, 0.5], [2.5, 0, 0],
            [-1.5, -1.5, 1], [0, -2, 1], [1.5, -1.5, 1]
        ];
        positions.sort(() => Math.random() - 0.5);

        const newApples = Array.from({ length: count }).map((_, i) => ({
            id: i,
            pos: positions.pop() || [0, 0, 0],
            delay: Math.random() * 0.5
        }));

        setApples(newApples);
        speak(`Combien comptes-tu de pommes ?`);

        if (uiRef.current) {
            gsap.fromTo(uiRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.5)" });
        }
    };

    useEffect(() => {
        generateNew();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSelect = (num: number) => {
        if (!isRunning) return;
        setSelectedCount(num);
        if (num === targetCount) {
            speak("Bravo !");
            onSuccess();
            setTimeout(generateNew, 1800);
        } else {
            speak("Ce n'est pas ça. Essaye encore !");
            onFail();
        }
    };

    return (
        <div className={cn("w-full h-[500px] bg-sky-200 rounded-3xl relative overflow-hidden transition-all duration-500 shadow-xl border border-sky-300", !isRunning ? "opacity-40 blur-sm pointer-events-none grayscale" : "")}>

            {/* 3D Scene */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <Canvas shadows camera={{ position: [0, 0, 8], fov: 40 }}>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow shadow-mapSize={1024} />

                    {/* The Tree Canopy Mockup (Green blob) */}
                    <Float floatIntensity={0.5} speed={1}>
                        <mesh position={[0, 1, -2]} receiveShadow>
                            <sphereGeometry args={[4, 32, 32]} />
                            <meshStandardMaterial color="#166534" roughness={0.8} />
                        </mesh>
                    </Float>
                    {/* Tree Trunk */}
                    <mesh position={[0, -3.5, -2]} receiveShadow>
                        <cylinderGeometry args={[0.5, 0.8, 5, 16]} />
                        <meshStandardMaterial color="#78350f" roughness={1} />
                    </mesh>

                    {/* Render Apples */}
                    <group position={[0, 0, 0]}>
                        {apples.map(apple => (
                            <Apple3D key={apple.id} id={apple.id} position={apple.pos} delay={apple.delay} />
                        ))}
                    </group>

                    <ContactShadows position={[0, -4, 0]} opacity={0.5} scale={20} blur={2} far={10} />
                    <Environment preset="forest" />
                </Canvas>
            </div>

            {/* 2D Interactive UI Layer */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-between p-6 pointer-events-none">
                <A11yAnnouncer />
                <div
                    role="heading"
                    aria-level={2}
                    className="bg-white/80 backdrop-blur-md px-6 py-2 rounded-full shadow-lg font-bold text-slate-700 pointer-events-auto"
                >
                    Combien y a-t-il de pommes ?
                </div>

                <div ref={uiRef} className="flex items-center justify-center gap-3 bg-white/40 backdrop-blur-xl p-3 rounded-2xl shadow-2xl pointer-events-auto">
                    {[2, 3, 4, 5, 6, 7, 8].map(num => (
                        <button
                            key={num}
                            onClick={() => handleSelect(num)}
                            aria-label={`Répondre ${num} pommes`}
                            aria-pressed={selectedCount === num}
                            className={cn(
                                "size-14 rounded-xl text-2xl font-black border-b-4 transition-all hover:-translate-y-1 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-primary focus:border-transparent",
                                selectedCount === num && num !== targetCount ? "bg-red-500 text-white border-red-700" :
                                    selectedCount === num && num === targetCount ? "bg-green-500 text-white border-green-700 shadow-[0_0_20px_rgba(34,197,94,0.6)]" :
                                        "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                            )}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
