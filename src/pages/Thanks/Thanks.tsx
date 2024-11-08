import React from "react";

import { Center, OrbitControls, Sky, Text3D } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";

import { Blumby } from "../../components/Blumby";
import fontJson from "../../fonts/helvetiker_regular.typeface.json";
import { MATCAPS_URL } from "./constants";

const material = new THREE.MeshMatcapMaterial();

const MainScene = () => {
  const [blue] = useLoader(THREE.TextureLoader, MATCAPS_URL);

  React.useEffect(() => {
    material.matcap = blue;
    material.needsUpdate = true;
  }, [blue]);

  return (
    <>
      <OrbitControls makeDefault />
      <Sky />
      <ambientLight />

      <Center>
        <Text3D material={material} font={fontJson} position={[3.6, 0.8, 0]}>
          {"HAPPY"}
        </Text3D>
        <Blumby scale={1.5} rotation-y={Math.PI / 2} position={[5.7, -2, 0]} />
        <Text3D material={material} font={fontJson} position={[0, -5.8, 0]}>
          {" FRONTEND DAYS"}
        </Text3D>
      </Center>
    </>
  );
};

export const Thanks = () => {
  return (
    <section style={{ width: "100%", height: "95vh" }}>
      <Canvas shadows camera={{ position: [0, 0, 6] }}>
        <MainScene />
      </Canvas>
    </section>
  );
};
