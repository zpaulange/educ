import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { speak, cn } from '../../../lib/utils';

// Simple "Car" representation for the Diorama
const CarDiorama = ({ position, rotation, color, animatingOut, animDelay }: any) => {
    const groupRef = useRef<THREE.Group>(null);

    useEffect(() => {
        if (groupRef.current) {
            // Drop in
            gsap.fromTo(groupRef.current.position,
                { y: 5 },
                { y: position[1], duration: 1, ease: "bounce.out", delay: animDelay }
            );
        }
    }, [position, animDelay]);

    useEffect(() => {
        if (animatingOut && groupRef.current) {
            // Drive away
            gsap.to(groupRef.current.position, { x: 10, duration: 1, ease: "power2.in" });
        }
    }, [animatingOut]);

    useFrame(() => {
        if (groupRef.current && !animatingOut) {
            // engine idle vibration
            groupRef.current.position.y = position[1] + (Math.random() * 0.02 - 0.01);
        }
    });

    return (
        <group ref={groupRef} position={position} rotation={rotation}>
            <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
                <boxGeometry args={[1.5, 0.5, 0.8]} />
                <meshStandardMaterial color={color} roughness={0.4} />
            </mesh>
            <mesh castShadow receiveShadow position={[0, 0.8, 0]}>
                <boxGeometry args={[0.8, 0.4, 0.7]} />
                <meshStandardMaterial color={color} roughness={0.4} />
            </mesh>
            {/* Wheels */}
            <mesh position={[-0.4, 0.1, 0.45]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
                <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0.4, 0.1, 0.45]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
                <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[-0.4, 0.1, -0.45]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
                <meshStandardMaterial color="#1e293b" />
            </mesh>
            <mesh position={[0.4, 0.1, -0.45]} rotation={[Math.PI / 2, 0, 0]} castShadow>
                <cylinderGeometry args={[0.2, 0.2, 0.1, 16]} />
                <meshStandardMaterial color="#1e293b" />
            </mesh>
        </group>
    );
};


export default function ProblemesGame({ onSuccess, onFail, isRunning }: any) {
    const [problemText, setProblemText] = useState("");
    const [targetAnswer, setTargetAnswer] = useState(0);
    const [cars, setCars] = useState<any[]>([]);
    const [animatingOut, setAnimatingOut] = useState<number[]>([]); // ids of cars driving away
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const generateNew = () => {
        setSelectedAnswer(null);
        setAnimatingOut([]);

        // Generate a simple subtraction word problem: 
        // e.g "There were 5 cars in the parking lot. 2 drove away. How many are left?"
        const total = Math.floor(Math.random() * 4) + 4; // 4 to 7
        const left = Math.floor(Math.random() * 2) + 1; // 1 to 2 drove away
        const answer = total - left;

        setTargetAnswer(answer);
        setProblemText(`Il y a ${total} voitures garées. ${left} voitures décident de partir. Combien en reste-t-il ?`);
        speak(`Il y a ${total} voitures garées. ${left} voitures décident de partir. Combien en reste-t-il ?`);

        // Generate the 3D cars
        const newCars = [];
        const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899'];
        colors.sort(() => Math.random() - 0.5);

        for (let i = 0; i < total; i++) {
            // roughly line them up in a parking lot
            newCars.push({
                id: i,
                position: [(-total / 2 + i) * 2, 0, Math.random() * 1 - 0.5],
                rotation: [0, Math.random() * 0.2 - 0.1, 0],
                color: colors[i],
                delay: i * 0.2
            });
        }
        setCars(newCars);

        // After a brief moment, trigger the "drive away" animation for the `left` cars to visualize the math.
        setTimeout(() => {
            const carsLeaving = [];
            for (let i = 0; i < left; i++) {
                carsLeaving.push(total - 1 - i); // take from the end
            }
            setAnimatingOut(carsLeaving);
        }, 3000);
    };

    useEffect(() => {
        generateNew();
        // eslint-disable-next-line
    }, []);

    const handleSelect = (val: number) => {
        if (!isRunning) return;
        setSelectedAnswer(val);

        if (val === targetAnswer) {
            speak("Excellente déduction !");
            onSuccess();
            setTimeout(generateNew, 1800);
        } else {
            speak("Relis bien le problème ou compte les voitures restantes.");
            onFail();
        }
    };

    return (
        <div className={cn("w-full h-[500px] bg-indigo-50 rounded-3xl relative overflow-hidden transition-all duration-500 shadow-xl border border-indigo-200", !isRunning ? "opacity-40 blur-sm pointer-events-none grayscale" : "")}>

            {/* The Word Problem */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 w-[80%]">
                <div className="bg-white/90 backdrop-blur-md px-8 py-4 rounded-2xl shadow-lg border border-indigo-100 text-indigo-900 font-bold text-lg text-center leading-relaxed">
                    {problemText}
                </div>
            </div>

            {/* Answer Options */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-4">
                {[1, 2, 3, 4, 5, 6].map(num => (
                    <button
                        key={num}
                        onClick={() => handleSelect(num)}
                        className={cn(
                            "size-14 rounded-xl text-2xl font-black border-b-4 transition-all hover:-translate-y-1 active:translate-y-0",
                            selectedAnswer === num && num !== targetAnswer ? "bg-red-500 text-white border-red-700" :
                                selectedAnswer === num && num === targetAnswer ? "bg-green-500 text-white border-green-700 shadow-[0_0_20px_rgba(34,197,94,0.6)]" :
                                    "bg-white text-indigo-700 border-indigo-300 hover:bg-indigo-50"
                        )}
                    >
                        {num}
                    </button>
                ))}
            </div>

            {/* 3D Diorama */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <Canvas shadows camera={{ position: [0, 5, 12], fov: 40 }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow shadow-mapSize={1024} />

                    <group position={[0, -1, 0]}>

                        {/* Parking Lot Floor */}
                        <mesh position={[0, 0, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                            <planeGeometry args={[30, 10]} />
                            <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
                        </mesh>

                        {/* Parking lines */}
                        <mesh position={[0, 0.01, 2]} rotation={[-Math.PI / 2, 0, 0]}>
                            <planeGeometry args={[20, 0.1]} />
                            <meshBasicMaterial color="#ffffff" />
                        </mesh>

                        {/* Cars */}
                        {cars.map(c => (
                            <CarDiorama
                                key={c.id}
                                position={c.position}
                                rotation={c.rotation}
                                color={c.color}
                                animDelay={c.delay}
                                animatingOut={animatingOut.includes(c.id)}
                            />
                        ))}
                    </group>

                    <ContactShadows position={[0, -0.95, 0]} opacity={0.5} scale={30} blur={2} far={10} />
                </Canvas>
            </div>
        </div>
    );
}
