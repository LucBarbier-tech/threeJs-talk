import { OrbitControls, Sky } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";
import React from "react";
import { useRandomPosition } from "../../hooks/useRandomPositions";
import { SimpleTree } from "../SimpleTree/SimpleTree";
import { Weather } from "./constants";

interface MainSceneProps {
  selectedWeather: Weather;
}

const MainScene = ({ selectedWeather }: MainSceneProps) => {
  const { positions } = useRandomPosition({ elementLength: 100, spread: 95 });

  const { floatIntensity, floatSpeed } = useControls("Trees", {
    floatIntensity: {
      value: 4,
      min: 1,
      max: 20,
      step: 0.1,
    },
    floatSpeed: {
      value: 3,
      min: 1,
      max: 20,
      step: 0.1,
    },
  });

  return (
    <>
      <OrbitControls makeDefault />

      <Sky sunPosition={[100, 50, 3]} />

      <directionalLight
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        castShadow
        position={[100, 50, 3]}
        intensity={4.5}
      />
      <ambientLight intensity={1.5} />

      {positions.map((position) => (
        <SimpleTree
          position={[position.x, 0, position.z]}
          floatIntensity={floatIntensity}
          floatSpeed={floatSpeed}
        />
      ))}

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={100}
      >
        <circleGeometry />
        <meshStandardMaterial color={"green"} />
      </mesh>
    </>
  );
};

export const FiberDemo = () => {
  const [selectedWeather, setSelectedWeather] = React.useState(Weather.Spring);
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "80%",
        }}
      >
        <Canvas shadows={"variance"} camera={{ position: [40, 40, 100] }}>
          <MainScene selectedWeather={selectedWeather} />
        </Canvas>
      </div>

      <section
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => setSelectedWeather(Weather.Spring)}
          className="weather-button"
        >
          Spring
        </button>
        <button
          onClick={() => setSelectedWeather(Weather.Summer)}
          className="weather-button"
        >
          Summer
        </button>
        <button
          onClick={() => setSelectedWeather(Weather.Autumn)}
          className="weather-button"
        >
          Autumn
        </button>
        <button
          onClick={() => setSelectedWeather(Weather.Winter)}
          className="weather-button"
        >
          Winter
        </button>
      </section>
    </>
  );
};
