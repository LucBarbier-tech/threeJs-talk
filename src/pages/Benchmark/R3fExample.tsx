//@ts-nocheck
import { Canvas, useFrame } from "@react-three/fiber";
import React from "react";
import { Mesh } from "three";

const RotatingCube = () => {
  const meshRef = React.useRef<Mesh>(null);

  // Rotate the cube in each frame
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = meshRef.current.rotation.y -= 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="gray" />
    </mesh>
  );
};

export const R3fExample = () => {
  return (
    <section
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        aspectRatio: 1,
      }}
    >
      <p>{"React Three Fiber"}</p>
      <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 1.5] }}>
        <RotatingCube />
      </Canvas>
    </section>
  );
};
