import { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, useCursor } from '@react-three/drei';
import { A11y, A11yAnnouncer, useA11y } from '@react-three/a11y';
import * as THREE from 'three';
import gsap from 'gsap';
import { speak, cn } from '../../../lib/utils';

// Interactive Bouncing Sphere
const AccessibleSphereVisual = ({ isRunning, size, position, color, index }: any) => {
    const a11y = useA11y() as any;
    const meshRef = useRef<THREE.Mesh>(null);
    useCursor(a11y.hover);

    // Initial Drop Animation
    useEffect(() => {
        if (meshRef.current) {
            gsap.fromTo(meshRef.current.position,
                { y: 10 },
                { y: size, duration: 1.5, ease: "bounce.out", delay: index * 0.2 }
            );
        }
    }, [size, index]);

    // Idle wiggle
    useFrame((state) => {
        if (meshRef.current && isRunning) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
            // tiny breathing scale
            let scale = 1 + Math.sin(state.clock.elapsedTime * 3 + index) * 0.02;

            if (a11y.focus || a11y.hover) {
                scale *= 1.1; // scale up slightly on focus/hover
            }

            meshRef.current.scale.set(scale, scale, scale);
        }
    });

    // Give a small pop reaction on click before passing it up to the parent.
    const handleClick = (e: any) => {
        e.stopPropagation();
        if (meshRef.current) {
            gsap.fromTo(meshRef.current.scale,
                { x: 1.2, y: 1.2, z: 1.2 },
                { x: 1, y: 1, z: 1, duration: 0.3 }
            );
        }
        a11y.actionCall();
    };

    return (
        <mesh
            ref={meshRef}
            position={position}
            castShadow
            receiveShadow
            onClick={handleClick}
        >
            <sphereGeometry args={[size, 32, 32]} />
            <meshStandardMaterial
                color={a11y.focus ? "#fef08a" : color}
                roughness={0.2}
                metalness={0.1}
                emissive={a11y.focus ? "#ca8a04" : "#000000"}
                emissiveIntensity={0.2}
            />
        </mesh>
    );
};

const BouncingSphere = ({ isRunning, size, position, color, onClick, index }: any) => {
    return (
        <A11y
            role="button"
            description={`Boule numéro ${index + 1}`}
            actionCall={onClick}
        >
            <AccessibleSphereVisual isRunning={isRunning} size={size} position={position} color={color} index={index} />
        </A11y>
    );
};

export default function GrandeursGame({ onSuccess, onFail, isRunning }: any) {
    const [targetType, setTargetType] = useState<'plus grand' | 'plus petit'>('plus grand');
    const [spheres, setSpheres] = useState<any[]>([]);

    // Use a stable set of colors
    const colors = useMemo(() => ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#a855f7'], []);

    const generateNew = () => {
        const type = Math.random() > 0.5 ? 'plus grand' : 'plus petit';
        setTargetType(type);

        // Generate 5 spheres with distinct sizes
        const sizes = [0.4, 0.6, 0.8, 1.1, 1.5];
        sizes.sort(() => Math.random() - 0.5); // shuffle sizes

        const positions: [number, number, number][] = [
            [-3, 0, 0], [-1.5, 0, 1], [0, 0, -1], [1.5, 0, 1], [3, 0, 0]
        ];

        const newSpheres = sizes.map((s, i) => ({
            id: i,
            size: s,
            position: [positions[i][0], s, positions[i][2]], // y is set during GSAP drop, but final rest is 's'
            color: colors[i % colors.length]
        }));

        setSpheres(newSpheres);
        speak(`Trouve l'objet le ${type}.`);
    };

    useEffect(() => {
        generateNew();
        // eslint-disable-next-line
    }, []);

    const handleSelect = (selectedSize: number) => {
        if (!isRunning) return;

        const allSizes = spheres.map(s => s.size);
        const targetSize = targetType === 'plus grand' ? Math.max(...allSizes) : Math.min(...allSizes);

        if (selectedSize === targetSize) {
            speak("Super ! C'est la bonne taille.");
            onSuccess();
            setTimeout(generateNew, 1000); // Give time for GSAP drop
        } else {
            speak(`Non, on cherche le ${targetType}.`);
            onFail();
        }
    };

    return (
        <div className={cn("w-full h-[500px] bg-neutral-900 rounded-3xl relative overflow-hidden transition-all duration-500 shadow-xl border border-neutral-700", !isRunning ? "opacity-40 blur-sm pointer-events-none grayscale" : "")}>

            {/* Helper UI */}
            <A11yAnnouncer />
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full shadow-lg border border-white/20 text-white font-bold text-lg text-center pointer-events-none">
                Trouve l'objet le <span className="text-amber-400 uppercase font-black px-2">{targetType}</span>
            </div>

            {/* 3D Scene */}
            <div className="absolute inset-0 z-10 w-full h-full">
                <Canvas shadows camera={{ position: [0, 5, 10], fov: 40 }} tabIndex={-1}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[5, 10, 5]} intensity={1} castShadow shadow-mapSize={1024} />
                    <pointLight position={[-5, 5, -5]} intensity={0.5} color="#3b82f6" />
                    <pointLight position={[5, 5, -5]} intensity={0.5} color="#ef4444" />

                    <group position={[0, -1, 0]}>
                        {spheres.map((s, i) => (
                            <BouncingSphere
                                key={s.id}
                                index={i}
                                isRunning={isRunning}
                                size={s.size}
                                color={s.color}
                                position={s.position as [number, number, number]}
                                onClick={() => handleSelect(s.size)}
                            />
                        ))}

                        {/* Floor Reflection / Shadow receiver */}
                        <mesh position={[0, 0, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                            <planeGeometry args={[50, 50]} />
                            <meshStandardMaterial color="#171717" roughness={0.1} metalness={0.8} />
                        </mesh>

                        <ContactShadows position={[0, 0.05, 0]} opacity={0.8} scale={20} blur={1} far={10} />
                    </group>
                </Canvas>
            </div>
        </div>
    )
}
