import { useMemo } from "react";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Particles({ count = 1000 }) {

    const points = useMemo(() => {
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < 1000; i++) {
            positions[i * 3 + 0] = (Math.random() - 0.5) * 2;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
        }

        return positions;
    }, [count])

    return (
        <>
            <Canvas camera={{ position: [0, 0, 1] }}>
                <OrbitControls />
                <points>
                    <bufferGeometry>
                        <bufferAttribute attach='attributes-position' array={points} count={count} itemSize={3}  />
                    </bufferGeometry>
                    <pointsMaterial size={0.1} color={'white'} sizeAttenuation />
                </points>
            </Canvas>
        </>
    );
}

export default Particles;
