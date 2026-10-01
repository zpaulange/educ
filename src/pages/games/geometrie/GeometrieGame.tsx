import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useCursor } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { speak, cn } from '../../../lib/utils';

// Clickable Vertex (Sommet)
const VertexPoint = ({ position, onClick, isHovered, onHover, isHit }: any) => {
    useCursor(isHovered);
    const meshRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
        if (isHit && meshRef.current) {
            gsap.to(meshRef.current.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.2, yoyo: true, repeat: 1 });
        }
    }, [isHit]);

    return (
        <mesh
            ref={meshRef}
            position={position}
            onClick={(e) => { e.stopPropagation(); onClick(); }}
            onPointerOver={onHover}
        >
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial
                color={isHit ? "#22c55e" : (isHovered ? "#fcd34d" : "#ef4444")}
                emissive={isHit ? "#16a34a" : (isHovered ? "#d97706" : "#000000")}
                emissiveIntensity={isHit ? 0.8 : 0}
                roughness={0.2}
            />
        </mesh>
    );
};

// Main rotating Wireframe shape
const GeometryShape = ({ type, vertices, hitVertices, onVertexClick, setHoverIndex, hoverIndex }: any) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.x += 0.005;
            groupRef.current.rotation.y += 0.008;
        }
    });

    let geometry: THREE.BufferGeometry;

    if (type === 'cube') {
        geometry = new THREE.BoxGeometry(3, 3, 3);
    } else if (type === 'pyramid') {
        geometry = new THREE.ConeGeometry(2, 3, 4); // 4 sided pyramid
    } else {
        geometry = new THREE.DodecahedronGeometry(2);
    }

    return (
        <group ref={groupRef}>
            {/* Solid semi-transparent interior */}
            <mesh geometry={geometry}>
                <meshStandardMaterial color="#3b82f6" transparent opacity={0.2} depthWrite={false} />
            </mesh>

            {/* Wireframe outline */}
            <mesh geometry={geometry}>
                <meshBasicMaterial color="#60a5fa" wireframe />
            </mesh>

            {/* Vertices */}
            {vertices.map((v: any, i: number) => (
                <VertexPoint
                    key={i}
                    position={v}
                    isHovered={hoverIndex === i}
                    isHit={hitVertices[i]}
                    onClick={() => onVertexClick(i)}
                    onHover={(e: any) => { e.stopPropagation(); setHoverIndex(e !== null ? i : null); }}
                />
            ))}
        </group>
    );
}

export default function GeometrieGame({ onSuccess, isRunning }: any) {
    const [shapeType, setShapeType] = useState<'cube' | 'pyramid' | 'dodecahedron'>('cube');
    const [vertices, setVertices] = useState<[number, number, number][]>([]);
    const [hitVertices, setHitVertices] = useState<boolean[]>([]);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    const generateNew = () => {
        const types: ('cube' | 'pyramid' | 'dodecahedron')[] = ['cube', 'pyramid', 'dodecahedron'];
        const type = types[Math.floor(Math.random() * types.length)];
        setShapeType(type);

        // Derive vertices positions manually for testing
        let verts: [number, number, number][] = [];
        if (type === 'cube') {
            const s = 1.5;
            verts = [
                [-s, -s, -s], [s, -s, -s], [-s, s, -s], [s, s, -s],
                [-s, -s, s], [s, -s, s], [-s, s, s], [s, s, s]
            ];
            speak("Trouve et clique sur les 8 sommets de ce cube.");
        } else if (type === 'pyramid') {
            // approximating a 4-sided pyramid bounds (radius 2, height 3)
            verts = [
                [0, 1.5, 0], // top
                [-1.4, -1.5, -1.4], [1.4, -1.5, -1.4],
                [-1.4, -1.5, 1.4], [1.4, -1.5, 1.4]
            ];
            speak("Trouve et clique sur les 5 sommets de cette pyramide.");
        } else {
            // Just plot a few key points for dodecahedron to not overwhelm
            verts = [
                [0, 2, 0], [0, -2, 0], [1.8, 1, 0.8], [-1.8, 1, 0.8],
                [1.8, -1, -0.8], [-1.8, -1, -0.8]
            ];
            speak("Trouve et clique sur les sommets rouges de cette forme.");
        }

        setVertices(verts);
        setHitVertices(new Array(verts.length).fill(false));
    };

    useEffect(() => {
        generateNew();
        // eslint-disable-next-line
    }, []);

    const handleVertexClick = (index: number) => {
        if (!isRunning) return;

        if (!hitVertices[index]) {
            const newHits = [...hitVertices];
            newHits[index] = true;
            setHitVertices(newHits);

            if (newHits.every(h => h)) {
                speak("Bravo ! Tu as trouvé tous les sommets.");
                onSuccess();
                setTimeout(generateNew, 1000);
            }
        }
    };

    const shapeName = shapeType === 'cube' ? 'Cube' : shapeType === 'pyramid' ? 'Pyramide' : 'Dodécaèdre';

    return (
        <div className={cn("w-full h-[500px] bg-slate-100 rounded-3xl relative overflow-hidden transition-all duration-500 shadow-xl border border-slate-300", !isRunning ? "opacity-40 blur-sm pointer-events-none grayscale" : "")}>

            {/* Helper UI */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-white/80 backdrop-blur-md px-8 py-3 rounded-full shadow-lg border border-slate-200 text-slate-700 font-bold text-lg text-center flex items-center gap-4">
                <span>Touchez les Sommets :</span>
                <span className="text-primary font-black uppercase tracking-widest bg-blue-100 px-4 py-1 rounded-full">{shapeName}</span>
            </div>

            {/* Score HUD */}
            <div className="absolute top-6 right-6 z-20 flex flex-col gap-1 items-end">
                <span className="text-slate-500 text-xs font-bold uppercase">Trouvés</span>
                <span className="text-3xl font-black text-emerald-500">
                    {hitVertices.filter(h => h).length} <span className="text-xl text-slate-400">/ {vertices.length}</span>
                </span>
            </div>

            {/* 3D Scene */}
            <div className="absolute inset-0 z-10">
                <Canvas camera={{ position: [0, 2, 7], fov: 50 }}>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />

                    <GeometryShape
                        type={shapeType}
                        vertices={vertices}
                        hitVertices={hitVertices}
                        onVertexClick={handleVertexClick}
                        hoverIndex={hoverIndex}
                        setHoverIndex={setHoverIndex}
                    />

                </Canvas>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 opacity-50 text-xs font-bold text-slate-500">
                Tu peux faire pivoter la forme en glissant la souris !
            </div>
        </div>
    );
}
