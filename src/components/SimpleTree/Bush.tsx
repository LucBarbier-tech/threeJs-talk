import { Float, PivotControls } from "@react-three/drei";
import { useControls } from "leva";

interface BushProps {
  debugName: string;
  defaultPosition: [number, number, number];
  enablePivot?: boolean;
  floatIntensity?: number;
  floatSpeed?: number;
}

export const Bush = ({
  debugName,
  defaultPosition,
  enablePivot = false,
  floatIntensity,
  floatSpeed,
}: BushProps) => {
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
            <meshStandardMaterial color="green" />
          </mesh>
        </Float>
      </PivotControls>
    </>
  );
};
