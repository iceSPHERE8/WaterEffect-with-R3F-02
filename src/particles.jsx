import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

import * as THREE from "three";

import { shaderMaterial, Tube } from "@react-three/drei";

import particlesVertexShader from "./shaders/water-effect/vertex.glsl";
import particlesFragmentShader from "./shaders/water-effect/fragment.glsl";

import tubeVertexShader from "./shaders/tube/vertex.glsl";
import tubeFragmentShader from "./shaders/tube/fragment.glsl";

function Particles({ count = 100 }) {
  const materialRef = useRef();
  const tubeMaterialRef = useRef();

  const positions = new Float32Array(count * 3);
  const aRandom = new Float32Array(count * 3);

  useMemo(() => {
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;

      aRandom[i * 3 + 0] = (Math.random() - 0.5) * 2;
      aRandom[i * 3 + 1] = (Math.random() - 0.5) * 2;
      aRandom[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
  }, [count]);

  useFrame(({ clock }) => {
    if (materialRef.current && tubeMaterialRef) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      tubeMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  const points = [];

  for (let i = 0; i <= 100; i++) {
    const angle = 2 * Math.PI * (i / 100);
    const x = Math.sin(angle) + 2.0 * Math.sin(2.0 * angle);
    const y = Math.cos(angle) - 2.0 * Math.cos(2.0 * angle);
    const z = -Math.sin(3.0 * angle);

    points.push(new THREE.Vector3(x, y, z));
  }

  const curve = new THREE.CatmullRomCurve3(points);

  return (
    <>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={count}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aRandom"
            array={aRandom}
            count={count}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          uniforms={{
            uTime: { value: 0 },
          }}
          vertexShader={particlesVertexShader}
          fragmentShader={particlesFragmentShader}
          blending={THREE.AdditiveBlending}
          blendAlpha={true}
          alphaHash={true}
          depthWrite={false}
        />
      </points>
      <mesh>
        <Tube args={[curve, 100, 0.35, 32, true]}>
          <shaderMaterial
            ref={tubeMaterialRef}
              uniforms={{
                uTime: { value: 0 },
              }}
            vertexShader={tubeVertexShader}
            fragmentShader={tubeFragmentShader}
            blending={THREE.AdditiveBlending}
            blendAlpha={true}
            alphaHash={true}
          />
        </Tube>
      </mesh>
    </>
  );
}

export default Particles;
