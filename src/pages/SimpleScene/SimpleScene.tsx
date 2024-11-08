import { OrbitControls, Sky } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React from "react";
import { Mesh, TextureLoader } from "three";
import { MATCAPS_URL } from "./constants";

const MainScene = () => {
  const blueRef = React.useRef<Mesh>(null);
  const redRef = React.useRef<Mesh>(null);

  useFrame((state) => {
    if (blueRef.current && redRef.current) {
      blueRef.current.position.x = Math.cos(state.clock.elapsedTime) * 40;
      blueRef.current.position.z = Math.sin(state.clock.elapsedTime) * 40;

      redRef.current.position.x = Math.cos(-state.clock.elapsedTime) * 20;
      redRef.current.position.z = Math.sin(-state.clock.elapsedTime) * 20;
    }
  });

  const [blue, red] = useLoader(TextureLoader, MATCAPS_URL);

  return (
    <>
      <OrbitControls makeDefault />

      <Sky rayleigh={0.08} sunPosition={[0, 100, 0]} />

      <spotLight position={[0, 100, 0]} intensity={20000} castShadow />

      <ambientLight intensity={1} />

      <mesh receiveShadow rotation-x={-Math.PI * 0.5} scale={100}>
        <planeGeometry args={[2, 2, 200, 200]} />
        <meshStandardMaterial color="green" />
      </mesh>

      <mesh ref={redRef} castShadow position={[10, 5, 30]} scale={5}>
        <sphereGeometry />
        <meshMatcapMaterial matcap={red} />
      </mesh>

      <mesh ref={blueRef} castShadow position={[-10, 5, -30]} scale={5}>
        <sphereGeometry />
        <meshMatcapMaterial matcap={blue} />
      </mesh>
    </>
  );
};

export const SimpleScene = () => {
  return (
    <>
      <section
        style={{
          width: "100%",
          height: "95vh",
        }}
      >
        <Canvas shadows camera={{ position: [40, 40, 100] }}>
          <MainScene />
        </Canvas>
      </section>
    </>
  );
};
