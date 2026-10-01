import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, Stars, useCursor } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { speak, cn } from '../../../lib/utils';

const Asteroid = ({ id, value, position, onClick, isRunning }: any) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const textRef = useRef<any>(null);
    const [hovered, setHovered] = useState(false);
    useCursor(hovered);

    // Asteroids fly towards the camera
    useFrame((_, delta) => {
        if (meshRef.current && isRunning) {
            // Spin
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.02;

            // Move forward slowly if it's far away
            if (meshRef.current.position.z < 5) {
                meshRef.current.position.z += delta * 0.5;
            }
        }
    });

    useEffect(() => {
        if (meshRef.current) {
            // Entrance zoom
            gsap.fromTo(meshRef.current.scale,
                { x: 0, y: 0, z: 0 },
                { x: 1, y: 1, z: 1, duration: 1, ease: "elastic.out(1, 0.5)", delay: Math.random() * 0.5 }
            );
        }
    }, [id]);

    const handleClick = () => {
        if (!isRunning) return;

        // "Explosion" effect on click
        if (meshRef.current) {
            gsap.to(meshRef.current.scale, { x: 1.5, y: 1.5, z: 1.5, duration: 0.1, yoyo: true, repeat: 1 });
        }
        onClick(value);
    };

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh
                ref={meshRef}
                position={position}
                onClick={handleClick}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                {/* Asteroid rock shape */}
                <dodecahedronGeometry args={[1, 1]} />
                <meshStandardMaterial
                    color={hovered ? "#f87171" : "#78716c"}
                    roughness={0.8}
                    metalness={0.2}
                    emissive={hovered ? "#991b1b" : "#44403c"}
                    emissiveIntensity={0.5}
                />

                {/* The Number label floating in front of it */}
                {/* We use Billboard equivalent by not attaching it inside the rotating mesh directly, or we attach it but force rotation to face camera. Here we just attach it and let it spin for a cool 3D effect, or keep it static relative to the group. We'll attach it. */}
                <Text
                    ref={textRef}
                    position={[0, 0, 1.1]}
                    fontSize={0.8}
                    color="white"
                    outlineWidth={0.05}
                    outlineColor="black"
                    font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
                >
                    {value}
                </Text>
            </mesh>
        </Float>
    );
};

export default function CalculGame({ onSuccess, onFail, isRunning }: any) {
    const [equation, setEquation] = useState("");
    const [targetAnswer, setTargetAnswer] = useState(0);
    const [asteroids, setAsteroids] = useState<any[]>([]);

    const generateNew = () => {
        const operations = ['+', '-'];
        const op = operations[Math.random() > 0.5 ? 0 : 1];

        let a, b, answer;
        if (op === '+') {
            a = Math.floor(Math.random() * 20) + 1;
            b = Math.floor(Math.random() * 20) + 1;
            answer = a + b;
        } else {
            a = Math.floor(Math.random() * 20) + 10;
            b = Math.floor(Math.random() * 10) + 1;
            answer = a - b;
        }

        setEquation(`${a} ${op} ${b}`);
        setTargetAnswer(answer);

        // Generate Decoys
        const options = [answer];
        while (options.length < 5) {
            const decoy = answer + (Math.floor(Math.random() * 10) - 5);
            if (decoy > 0 && !options.includes(decoy)) {
                options.push(decoy);
            }
        }
        options.sort(() => Math.random() - 0.5);

        const positions: [number, number, number][] = [
            [-3, 1.5, -4], [0, 2, -6], [3, 1, -5],
            [-1.5, -1.5, -3], [1.5, -1, -4]
        ];

        setAsteroids(options.map((opt, i) => ({
            id: Math.random(),
            value: opt,
            position: positions[i]
        })));

        speak(`Combien font ${a} ${op === '+' ? 'plus' : 'moins'} ${b} ? Tire sur le bon astéroïde.`);
    };

    useEffect(() => {
        generateNew();
        // eslint-disable-next-line
    }, []);

    const handleShoot = (val: number) => {
        if (!isRunning) return;

        if (val === targetAnswer) {
            speak("Dans le mille !");
            onSuccess();
            setTimeout(generateNew, 1000);
        } else {
            speak(`Attention ! ${equation} ne fait pas ${val}.`);
            onFail();
        }
    };

    return (
        <div className={cn("w-full h-[500px] bg-slate-900 rounded-3xl relative overflow-hidden transition-all duration-500 shadow-xl border border-slate-700 cursor-crosshair", !isRunning ? "opacity-40 blur-sm pointer-events-none grayscale" : "")}>

            {/* HUD / Cockpit UI */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                <div className="bg-red-500/20 backdrop-blur-md px-12 py-3 rounded-t-xl border-t border-x border-red-500/50 text-red-200 font-bold text-sm tracking-widest uppercase">
                    CIBLE VÉROUILLÉE
                </div>
                <div className="bg-slate-900/80 backdrop-blur-xl px-16 py-4 rounded-b-xl border border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)] text-5xl font-black text-white">
                    {equation} = ?
                </div>
            </div>

            {/* 3D Scene */}
            <div className="absolute inset-0 z-10">
                <Canvas shadows camera={{ position: [0, 0, 5], fov: 60 }}>
                    <color attach="background" args={['#020617']} />
                    <ambientLight intensity={0.2} />
                    <directionalLight position={[10, 10, 5]} intensity={2} color="#fca5a5" />
                    <pointLight position={[-10, -10, -10]} intensity={1} color="#60a5fa" />

                    <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

                    <group position={[0, -0.5, 0]}>
                        {asteroids.map((ast) => (
                            <Asteroid
                                key={ast.id}
                                id={ast.id}
                                value={ast.value}
                                position={ast.position}
                                isTarget={ast.value === targetAnswer}
                                onClick={handleShoot}
                                isRunning={isRunning}
                            />
                        ))}
                    </group>
                </Canvas>
            </div>

            {/* Crosshair Overlay Helper */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-20 flex items-center justify-center">
                <div className="w-64 h-64 border-2 border-dashed border-red-500 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
        </div>
    );
}
