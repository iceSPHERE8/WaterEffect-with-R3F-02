import "./App.css";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import Particles from "./particles";

function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <OrbitControls />
        <Particles count={100000} />
      </Canvas>
    </>
  );
}

export default App;
