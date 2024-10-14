import { PivotControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import React from "react";
import { TextureLoader } from "three";
import { BARK_TEXTURES, LEAF_COLORS, Weather } from "../Fiber/constants";
import { Bush } from "./Bush";

interface SimpleTreeProps {
  position: [number, number, number];
  floatIntensity?: number;
  floatSpeed?: number;
  selectedWeather: Weather;
}

export const SimpleTree = ({
  position,
  floatSpeed,
  floatIntensity,
  selectedWeather,
}: SimpleTreeProps) => {
  const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(
    TextureLoader,
    BARK_TEXTURES
  );

  const leafColor = React.useMemo(
    () => LEAF_COLORS[selectedWeather],
    [selectedWeather]
  );

  return (
    <>
      <PivotControls anchor={[0, 0, 0]} depthTest={false} enabled={false}>
        <group position={position}>
          <mesh castShadow position-y={1}>
            <cylinderGeometry args={[0.5, 1, 5]} />
            <meshStandardMaterial
              aoMap={aoMap}
              roughnessMap={roughnessMap}
              normalMap={normalMap}
              displacementMap={displacementMap}
              map={colorMap}
            />
          </mesh>

          <Bush
            color={leafColor}
            debugName="bush1"
            defaultPosition={[0, 4.2, 0]}
          />
          <Bush
            debugName="bush2"
            defaultPosition={[-1.2, 2.7, 0]}
            floatIntensity={floatIntensity}
            floatSpeed={floatSpeed}
            color={leafColor}
          />
          <Bush
            debugName="bush3"
            defaultPosition={[1.2, 2.7, 0]}
            floatIntensity={floatIntensity}
            floatSpeed={floatSpeed}
            color={leafColor}
          />
          <Bush
            debugName="bush4"
            defaultPosition={[0, 2.7, 1.2]}
            floatIntensity={floatIntensity}
            floatSpeed={floatSpeed}
            color={leafColor}
          />
          <Bush
            debugName="bush5"
            defaultPosition={[0, 2.7, -1.2]}
            floatIntensity={floatIntensity}
            floatSpeed={floatSpeed}
            color={leafColor}
          />
        </group>
      </PivotControls>
    </>
  );
};
