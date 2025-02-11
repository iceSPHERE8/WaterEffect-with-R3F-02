import "./App.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <OrbitControls />
        <mesh>
          <planeGeometry />
          <meshBasicMaterial />
        </mesh>
      </Canvas>
    </>
  );
}

export default App;
