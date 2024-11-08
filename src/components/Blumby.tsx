import { useGLTF } from "@react-three/drei";
import { MeshProps } from "@react-three/fiber";

import blumbyModel from "../assets/blumby.glb";

export const Blumby = (props: MeshProps) => {
  const { scene } = useGLTF(blumbyModel);
  return (
    <mesh {...props}>
      <primitive object={scene} />
    </mesh>
  );
};

useGLTF.preload(blumbyModel);
