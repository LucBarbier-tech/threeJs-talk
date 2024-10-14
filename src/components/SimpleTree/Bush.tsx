import { Float, PivotControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import { TextureLoader } from "three";
import { LEAFS_TEXTURES } from "../Fiber/constants";

interface BushProps {
  debugName: string;
  defaultPosition: [number, number, number];
  enablePivot?: boolean;
  floatIntensity?: number;
  floatSpeed?: number;
  color?: string;
}

export const Bush = ({
  debugName,
  defaultPosition,
  enablePivot = false,
  floatIntensity,
  floatSpeed,
  color,
}: BushProps) => {
  const [, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(
    TextureLoader,
    LEAFS_TEXTURES
  );

  const { position: BushPosition } = useControls(debugName, {
    position: {
      value: defaultPosition,
      step: 0.3,
    },
  });

  return (
    <>
      <PivotControls anchor={[0, 0, 0]} depthTest={false} enabled={enablePivot}>
        <Float
          floatIntensity={floatIntensity}
          speed={floatSpeed}
          enabled={Boolean(floatIntensity)}
        >
          <mesh scale={1.5} castShadow position={BushPosition}>
            <sphereGeometry />
            <meshStandardMaterial
              aoMap={aoMap}
              roughnessMap={roughnessMap}
              normalMap={normalMap}
              displacementMap={displacementMap}
              displacementScale={0.01}
              color={color}
            />
          </mesh>
        </Float>
      </PivotControls>
    </>
  );
};
