import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Float, useCursor } from '@react-three/drei';
import { A11y, A11yAnnouncer, useA11y } from '@react-three/a11y';
import * as THREE from 'three';
import { speak, cn } from '../../../lib/utils';
import gsap from 'gsap';

// Simple Bird Mesh 
const AccessibleBirdVisual = ({ position, rotation }: any) => {
    const a11y = useA11y() as any;
    const groupRef = useRef<THREE.Group>(null);
    useCursor(a11y.hover);

    useFrame((state) => {
        if (groupRef.current) {
            // Flapping wing effect (we just animate scaleY or rotation of a sub-mesh conceptually)
            groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 6) * 0.1;

            // Visual feedback for focus
            if (a11y.focus || a11y.hover) {
                gsap.to(groupRef.current.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.1 });
            } else {
                gsap.to(groupRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.1 });
            }
        }
    });

    const handleClick = (e: any) => {
        e.stopPropagation();
        a11y.actionCall();
    }

    return (
        <group
            ref={groupRef}
            position={position}
            rotation={rotation}
            onClick={handleClick}
        >
            {/* Body */}
            <mesh castShadow>
                <sphereGeometry args={[0.3, 16, 16]} />
                <meshStandardMaterial color={a11y.focus ? "#ffffff" : "#3b82f6"} roughness={0.4} emissive={a11y.focus ? "#1e3a8a" : "#000"} emissiveIntensity={0.5} />
            </mesh>
            {/* Beak */}
            <mesh castShadow position={[0.25, 0.05, 0]} rotation={[0, 0, -Math.PI / 2]}>
                <coneGeometry args={[0.08, 0.2, 8]} />
                <meshStandardMaterial color="#f59e0b" />
            </mesh>
            {/* Left Wing */}
            <mesh castShadow position={[0, 0.1, 0.25]} rotation={[0.4, 0, 0]}>
                <boxGeometry args={[0.3, 0.05, 0.2]} />
                <meshStandardMaterial color={a11y.focus ? "#bfdbfe" : "#2563eb"} />
            </mesh>
            {/* Right Wing */}
            <mesh castShadow position={[0, 0.1, -0.25]} rotation={[-0.4, 0, 0]}>
                <boxGeometry args={[0.3, 0.05, 0.2]} />
                <meshStandardMaterial color={a11y.focus ? "#bfdbfe" : "#2563eb"} />
            </mesh>
        </group>
    );
};

const Bird = ({ position, rotation, onClick, word }: any) => {
    return (
        <A11y
            role="button"
            description={`Oiseau ${word} l'arbre`}
            actionCall={() => onClick(word)}
        >
            <AccessibleBirdVisual position={position} rotation={rotation} />
        </A11y>
    );
};

export default function EspaceGame({ onSuccess, onFail, isRunning }: any) {
    type PositionWord = 'sur' | 'sous' | 'à gauche de' | 'à droite de';
    const positions: { word: PositionWord, pos: [number, number, number] }[] = [
        { word: 'sur', pos: [0, 4.8, 0] },
        { word: 'sous', pos: [0, -0.6, 0] },
        { word: 'à gauche de', pos: [-3, -0.6, 0] },
        { word: 'à droite de', pos: [3, -0.6, 0] }
    ];

    const [targetWord, setTargetWord] = useState<PositionWord>('sur');
    const [activePositions, setActivePositions] = useState<{ word: PositionWord, pos: [number, number, number] }[]>([]);

    const generateNew = () => {
        // Pick random target
        const target = positions[Math.floor(Math.random() * positions.length)];
        setTargetWord(target.word);

        // We always render 4 birds in the 4 spots to test the child.
        setActivePositions(positions);

        speak(`Où est l'oiseau qui vole ${target.word} l'arbre ? Cliquez dessus.`);
    };

    useEffect(() => {
        generateNew();
        // eslint-disable-next-line
    }, []);

    const handleSelect = (word: PositionWord) => {
        if (!isRunning) return;

        if (word === targetWord) {
            speak("Très bien !");
            onSuccess();
            setTimeout(generateNew, 1500);
        } else {
            speak(`Non, cherche l'oiseau ${targetWord}.`);
            onFail();
        }
    };

    return (
        <div className={cn("w-full h-[500px] bg-indigo-100 rounded-3xl relative overflow-hidden transition-all duration-500 shadow-xl border border-indigo-200", !isRunning ? "opacity-40 blur-sm pointer-events-none grayscale" : "")}>

            {/* Helper UI */}
            <A11yAnnouncer />
            <div
                role="heading"
                aria-level={2}
                className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-white/80 backdrop-blur-md px-8 py-3 rounded-full shadow-lg text-slate-700 font-bold text-lg text-center"
            >
                Trouve l'oiseau <span className="text-primary uppercase font-black px-2">{targetWord}</span> l'arbre.
            </div>

            {/* 3D Scene */}
            <div className="absolute inset-0 z-10 w-full h-full">
                <Canvas shadows camera={{ position: [0, 3, 12], fov: 45 }} tabIndex={-1}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow shadow-mapSize={1024} />

                    {/* The central Tree */}
                    <group position={[0, -1, 0]}>
                        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
                            <cylinderGeometry args={[0.4, 0.6, 3, 16]} />
                            <meshStandardMaterial color="#78350f" />
                        </mesh>
                        <Float speed={2} floatIntensity={0.2}>
                            <mesh position={[0, 4, 0]} castShadow receiveShadow>
                                <sphereGeometry args={[2.5, 32, 32]} />
                                <meshStandardMaterial color="#166534" />
                            </mesh>
                            <mesh position={[-1.5, 3.5, 1]} castShadow receiveShadow>
                                <sphereGeometry args={[1.5, 32, 32]} />
                                <meshStandardMaterial color="#15803d" />
                            </mesh>
                            <mesh position={[1.5, 3.2, -1]} castShadow receiveShadow>
                                <sphereGeometry args={[1.8, 32, 32]} />
                                <meshStandardMaterial color="#16a34a" />
                            </mesh>
                        </Float>
                    </group>

                    {/* The Birds */}
                    {activePositions.map((p, i) => (
                        <Bird
                            key={i}
                            word={p.word}
                            position={p.pos}
                            rotation={[0, (p.word === 'à gauche de' || p.word === 'sous') ? Math.PI : 0, 0]}
                            onClick={handleSelect}
                        />
                    ))}

                    {/* Ground */}
                    <mesh position={[0, -1, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                        <planeGeometry args={[50, 50]} />
                        <meshStandardMaterial color="#86efac" />
                    </mesh>

                    <ContactShadows position={[0, -0.95, 0]} opacity={0.6} scale={20} blur={2} far={10} />
                </Canvas>
            </div>
        </div>
    )
}
