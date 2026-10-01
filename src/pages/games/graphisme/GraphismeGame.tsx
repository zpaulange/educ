import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Sphere, useCursor } from '@react-three/drei';
import { A11y, A11yAnnouncer, useA11y } from '@react-three/a11y';
import * as THREE from 'three';
import gsap from 'gsap';
import { speak, cn } from '../../../lib/utils';

// Path Node
const AccessibleNodeVisual = ({ position, isHit }: any) => {
    const a11y = useA11y() as any;
    useCursor(a11y.hover);
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.02;
            meshRef.current.rotation.x += 0.02;
        }
    });

    useEffect(() => {
        if (isHit && meshRef.current) {
            gsap.to(meshRef.current.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.2, yoyo: true, repeat: 1 });
        }
    }, [isHit]);

    return (
        <mesh
            ref={meshRef}
            position={position}
            onPointerOver={() => {
                a11y.actionCall && a11y.actionCall()
            }}
        >
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial
                color={isHit ? "#22c55e" : (a11y.focus || a11y.hover ? "#fcd34d" : "#fbbf24")}
                emissive={isHit ? "#16a34a" : (a11y.focus || a11y.hover ? "#d97706" : "#000000")}
                emissiveIntensity={isHit ? 0.8 : (a11y.focus || a11y.hover ? 0.4 : 0)}
                roughness={0.2}
            />
        </mesh>
    );
};

const Node = ({ position, isHit, onHover, index }: any) => {
    return (
        <A11y
            role="button"
            description={`Point numéro ${index + 1}`}
            actionCall={onHover} // Trigger the 'hit' logic on keyboard enter or screen reader activation
        >
            <AccessibleNodeVisual position={position} isHit={isHit} />
        </A11y>
    );
};

export default function GraphismeGame({ onSuccess, isRunning }: any) {
    const [pathType, setPathType] = useState<'ligne' | 'vague'>('ligne');
    const [nodes, setNodes] = useState<[number, number, number][]>([]);
    const [hitNodes, setHitNodes] = useState<boolean[]>([]);

    const generateNew = () => {
        const isLigne = Math.random() > 0.5;
        setPathType(isLigne ? 'ligne' : 'vague');

        const newNodes: [number, number, number][] = [];

        // Generate 5 points left to right
        for (let i = 0; i < 5; i++) {
            const x = -3 + (i * 1.5);
            // If vague, oscillate Y. If ligne, straight Y
            const y = isLigne ? 0 : Math.sin(x * 1.5) * 1.5;
            newNodes.push([x, y, 0]);
        }

        setNodes(newNodes);
        setHitNodes(new Array(5).fill(false));
        speak(`Trace la ${isLigne ? 'ligne' : 'vague'} en touchant toutes les boules.`);
    };

    useEffect(() => {
        generateNew();
        // eslint-disable-next-line
    }, []);

    const handleNodeHit = (index: number) => {
        if (!isRunning) return;

        // Ensure sequential hitting (optional, but good for tracing)
        if (index > 0 && !hitNodes[index - 1]) {
            // they skipped a node!
            return;
        }

        if (!hitNodes[index]) {
            // Register hit
            const newHits = [...hitNodes];
            newHits[index] = true;
            setHitNodes(newHits);

            // Check win
            if (newHits.every(h => h)) {
                speak("Incroyable !");
                onSuccess();
                setTimeout(generateNew, 1500);
            }
        }
    };

    return (
        <div className={cn("w-full h-[500px] bg-emerald-900 rounded-3xl relative overflow-hidden transition-all duration-500 shadow-xl border border-emerald-700", !isRunning ? "opacity-40 blur-sm pointer-events-none grayscale" : "")}>

            {/* Helper UI */}
            <A11yAnnouncer />
            <div
                role="heading"
                aria-level={2}
                className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-white/10 backdrop-blur-md px-8 py-3 rounded-full shadow-lg border border-white/20 text-white font-bold text-lg text-center pointer-events-none tracking-widest uppercase"
            >
                Trace la {pathType}
            </div>

            {/* 3D Scene */}
            <div className="absolute inset-0 z-10 w-full h-full">
                <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }} tabIndex={-1}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[0, 5, 5]} intensity={1.5} />

                    <group position={[0, 0, 0]}>

                        {/* The guiding Line */}
                        {nodes.length > 0 && (
                            <Line
                                points={nodes}
                                color="#047857"
                                lineWidth={4}
                                dashed={true}
                                dashSize={0.2}
                                dashScale={1}
                                dashOffset={0}
                            />
                        )}

                        {/* The Nodes */}
                        {nodes.map((pos, i) => (
                            <Node
                                key={i}
                                index={i}
                                position={pos}
                                isHit={hitNodes[i]}
                                onHover={() => handleNodeHit(i)}
                            />
                        ))}
                    </group>

                    {/* Particle background */}
                    {Array.from({ length: 30 }).map((_, i) => (
                        <Sphere key={`bg-${i}`} args={[0.05, 8, 8]} position={[
                            Math.random() * 20 - 10,
                            Math.random() * 20 - 10,
                            Math.random() * -5 - 2
                        ]}>
                            <meshBasicMaterial color="#34d399" opacity={0.3} transparent />
                        </Sphere>
                    ))}

                </Canvas>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 opacity-50 text-xs font-bold text-emerald-200">
                Passe ta souris (ou ton doigt) sur les sphères dans l'ordre !
            </div>
        </div>
    )
}
