import { PivotControls } from "@react-three/drei";
import { Bush } from "./Bush";

interface SimpleTreeProps {
  position: [number, number, number];
  floatIntensity?: number;
  floatSpeed?: number;
}

export const SimpleTree = ({
  position,
  floatSpeed,
  floatIntensity,
}: SimpleTreeProps) => {
  return (
    <>
      <PivotControls anchor={[0, 0, 0]} depthTest={false} enabled={false}>
        <group position={position}>
          <mesh castShadow position-y={1}>
            <cylinderGeometry args={[0.5, 1, 5]} />
            <meshStandardMaterial color={"#964B00"} />
          </mesh>

          <Bush debugName="bush1" defaultPosition={[0, 4.2, 0]} />
          <Bush
            debugName="bush2"
            defaultPosition={[-1.2, 2.7, 0]}
            floatIntensity={floatIntensity}
            floatSpeed={floatSpeed}
          />
          <Bush
            debugName="bush3"
            defaultPosition={[1.2, 2.7, 0]}
            floatIntensity={floatIntensity}
            floatSpeed={floatSpeed}
          />
          <Bush
            debugName="bush4"
            defaultPosition={[0, 2.7, 1.2]}
            floatIntensity={floatIntensity}
            floatSpeed={floatSpeed}
          />
          <Bush
            debugName="bush5"
            defaultPosition={[0, 2.7, -1.2]}
            floatIntensity={floatIntensity}
            floatSpeed={floatSpeed}
          />
        </group>
      </PivotControls>
    </>
  );
};
