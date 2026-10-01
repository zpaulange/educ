import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PresentationControls, Float, ContactShadows } from '@react-three/drei';
import { A11y, A11yAnnouncer, useA11y } from '@react-three/a11y';
import * as THREE from 'three';
import { speak, cn } from '../../../lib/utils';
import gsap from 'gsap';

type ShapeType = 'sphere' | 'box' | 'cone' | 'dodecahedron';

interface ShapeObj {
    id: number;
    type: ShapeType;
    color: string;
    position: [number, number, number];
    rotation: [number, number, number];
}

const colors = {
    rose: '#f43f5e',
    blue: '#3b82f6',
    emerald: '#10b981',
    amber: '#f59e0b',
    purple: '#8b5cf6'
};
const colorKeys = Object.keys(colors) as (keyof typeof colors)[];
const shapes: ShapeType[] = ['sphere', 'box', 'cone', 'dodecahedron'];

const AccessibleShapeVisual = ({ shapeObj }: { shapeObj: ShapeObj }) => {
    const a11y = useA11y() as any;
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.005;
            meshRef.current.rotation.y += 0.01;

            // A11y visual feedback for keyboard focus
            if (a11y.focus || a11y.hover) {
                gsap.to(meshRef.current.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.1 });
            } else {
                gsap.to(meshRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.1 });
            }
        }
    });

    const handleClick = (e: any) => {
        e.stopPropagation();

        // Quick pop animation
        if (meshRef.current) {
            gsap.to(meshRef.current.scale, {
                x: 1.5, y: 1.5, z: 1.5,
                duration: 0.2,
                yoyo: true,
                repeat: 1
            });
        }

        // Trigger the parent's accessibility action
        a11y.actionCall();
    };

    const colorHex = colors[shapeObj.color as keyof typeof colors];

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2} floatingRange={[-0.2, 0.2]}>
            <mesh
                ref={meshRef}
                position={shapeObj.position}
                rotation={shapeObj.rotation}
                onClick={handleClick}
                castShadow
                receiveShadow
            >
                {shapeObj.type === 'sphere' && <sphereGeometry args={[0.5, 32, 32]} />}
                {shapeObj.type === 'box' && <boxGeometry args={[0.8, 0.8, 0.8]} />}
                {shapeObj.type === 'cone' && <coneGeometry args={[0.6, 1, 16]} />}
                {shapeObj.type === 'dodecahedron' && <dodecahedronGeometry args={[0.6]} />}

                <meshStandardMaterial
                    color={a11y.focus ? "#ffffff" : colorHex}
                    roughness={0.2}
                    metalness={0.1}
                    emissive={colorHex}
                    emissiveIntensity={a11y.focus ? 0.8 : 0.2}
                />
            </mesh>
        </Float>
    );
};

const ShapeMesh = ({ shapeObj, onSelect }: { shapeObj: ShapeObj, onSelect: () => void }) => {
    // We translate the internal object state to a spoken string for the screen reader
    let shapeNameFr = "boule";
    if (shapeObj.type === 'box') shapeNameFr = "cube";
    if (shapeObj.type === 'cone') shapeNameFr = 'cône';
    if (shapeObj.type === 'dodecahedron') shapeNameFr = 'diamant';

    let colorNameFr = "rouge";
    if (shapeObj.color === 'blue') colorNameFr = "bleu";
    if (shapeObj.color === 'emerald') colorNameFr = "vert";
    if (shapeObj.color === 'amber') colorNameFr = "jaune";
    if (shapeObj.color === 'purple') colorNameFr = "violet";

    return (
        <A11y
            role="button"
            description={`${shapeNameFr} ${colorNameFr}`}
            actionCall={() => {
                // We recreate the pop animation logic conceptually since we moved it out of the click handler above
                onSelect();
            }}
        >
            <AccessibleShapeVisual shapeObj={shapeObj} />
        </A11y>
    );
};

export default function FormesGame({ onSuccess, onFail, isRunning }: any) {
    const [targetShape, setTargetShape] = useState<ShapeType>('sphere');
    const [targetColor, setTargetColor] = useState<keyof typeof colors>('rose');
    const [boardShapes, setBoardShapes] = useState<ShapeObj[]>([]);

    const uiOverlayRef = useRef<HTMLDivElement>(null);

    const generateNew = () => {
        const newTargetShape = shapes[Math.floor(Math.random() * shapes.length)];
        const newTargetColor = colorKeys[Math.floor(Math.random() * colorKeys.length)];
        setTargetShape(newTargetShape);
        setTargetColor(newTargetColor);

        const newBoard: ShapeObj[] = [];

        // Spread positions roughly in a 3D grid/circle
        const positions: [number, number, number][] = [
            [-2, 1, 0], [0, 1.5, -1], [2, 1, 0],
            [-1.5, -1, 1], [0, -1.5, 0], [1.5, -1, 1],
            [-3, 0, -2], [3, 0, -2]
        ];

        // Shuffle positions
        positions.sort(() => Math.random() - 0.5);

        // 1 Target
        newBoard.push({
            id: 0,
            type: newTargetShape,
            color: newTargetColor,
            position: positions.pop() || [0, 0, 0],
            rotation: [
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2,
                Math.random() * Math.PI * 2
            ]
        });

        // 5 Decoys
        for (let i = 1; i <= 5; i++) {
            let decoyType = shapes[Math.floor(Math.random() * shapes.length)];
            let decoyColor = colorKeys[Math.floor(Math.random() * colorKeys.length)];

            // Ensure not identical to target
            if (decoyType === newTargetShape && decoyColor === newTargetColor) {
                decoyColor = colorKeys[(colorKeys.indexOf(decoyColor) + 1) % colorKeys.length];
            }

            newBoard.push({
                id: i,
                type: decoyType,
                color: decoyColor,
                position: positions.pop() || [0, 0, 0],
                rotation: [
                    Math.random() * Math.PI * 2,
                    Math.random() * Math.PI * 2,
                    Math.random() * Math.PI * 2
                ]
            });
        }

        setBoardShapes(newBoard);

        // TTS Instructions
        let shapeNameFr = "la boule";
        if (newTargetShape === 'box') shapeNameFr = "le cube";
        if (newTargetShape === 'cone') shapeNameFr = 'le cône';
        if (newTargetShape === 'dodecahedron') shapeNameFr = 'le diamant';

        let colorNameFr = "rouge";
        if (newTargetColor === 'blue') colorNameFr = "bleu";
        if (newTargetColor === 'emerald') colorNameFr = "vert";
        if (newTargetColor === 'amber') colorNameFr = "jaune";
        if (newTargetColor === 'purple') colorNameFr = "violet";

        speak(`Trouve ${shapeNameFr} ${colorNameFr}.`);

        // GSAP Overlay sequence
        if (uiOverlayRef.current) {
            gsap.fromTo(uiOverlayRef.current,
                { y: -50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
            );
        }
    };

    useEffect(() => {
        generateNew();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSelect = (s: ShapeObj) => {
        if (!isRunning) return;

        if (s.type === targetShape && s.color === targetColor) {
            speak("Super ! Tu as trouvé.");
            onSuccess(); // Tug-of-war proceeds

            // Wait briefly then next question
            setTimeout(() => {
                if (uiOverlayRef.current) {
                    gsap.to(uiOverlayRef.current, { y: -50, opacity: 0, duration: 0.3, onComplete: generateNew });
                } else {
                    generateNew();
                }
            }, 1500);

        } else {
            speak("Oops, regarde bien la forme et la couleur !");
            onFail();
        }
    };

    // Helper translations for UI
    const translateShape = (s: ShapeType) => {
        switch (s) {
            case 'box': return 'Cube';
            case 'sphere': return 'Boule';
            case 'cone': return 'Cône';
            case 'dodecahedron': return 'Diamant';
        }
    }

    const translateColor = (c: string) => {
        switch (c) {
            case 'rose': return 'Rouge';
            case 'blue': return 'Bleu';
            case 'emerald': return 'Vert';
            case 'amber': return 'Jaune';
            case 'purple': return 'Violet';
            default: return '';
        }
    }

    const targetColorHex = colors[targetColor];

    return (
        <div className={cn("w-full h-[500px] bg-slate-900 rounded-3xl relative overflow-hidden transition-all duration-500 shadow-2xl", !isRunning ? "opacity-30 blur-sm pointer-events-none grayscale" : "")}>

            {/* 2D HTML Overlay for Clue */}
            <div
                ref={uiOverlayRef}
                className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-4 rounded-full shadow-2xl flex items-center gap-4"
            >
                <span className="text-white font-bold text-xl uppercase tracking-widest opacity-80">Objectif:</span>
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-black" style={{ color: targetColorHex }}>
                        {translateShape(targetShape)} {translateColor(targetColor)}
                    </span>
                </div>
            </div>

            {/* 3D WebGL Canvas Area */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <Canvas shadows camera={{ position: [0, 5, 12], fov: 45 }} tabIndex={-1} className="pointer-events-auto">
                    <ambientLight intensity={0.8} />
                    <color attach="background" args={['#0f172a']} />
                    <ambientLight intensity={0.6} />
                    <directionalLight
                        position={[5, 5, 5]}
                        intensity={1}
                        castShadow
                        shadow-mapSize={1024}
                    />
                    <pointLight position={[-5, -5, -5]} color="#f43f5e" intensity={0.5} />
                    <pointLight position={[5, -5, 5]} color="#3b82f6" intensity={0.5} />

                    <PresentationControls
                        global
                        snap={true}
                        rotation={[0, 0, 0]}
                        polar={[-Math.PI / 3, Math.PI / 3]}
                        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
                    >
                        <group position={[0, -0.5, 0]}>
                            {boardShapes.map(s => (
                                <ShapeMesh
                                    key={s.id}
                                    shapeObj={s}
                                    onSelect={() => handleSelect(s)}
                                />
                            ))}

                            <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={20} blur={2} far={10} />
                        </group>
                    </PresentationControls>
                </Canvas>
            </div>

            {/* UI Overlay */}
            <A11yAnnouncer />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-between p-6 pointer-events-none">
                {/* Helper text */}
                <div className="absolute bottom-4 right-4 z-20 opacity-50 text-xs font-bold text-slate-400">
                    Click & Drag to rotate the 3D space!
                </div>
            </div>
        </div>
    );
}
