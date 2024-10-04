export enum Weather {
  Spring = "spring",
  Summer = "summer",
  Autumn = "autumn",
  Winter = "winter",
}

export const WEATHER_CONFIG = {
  spring: {
    floor: {
      map: "src/assets/spring/floor/floor-color.jpg",
      displacementMap: "src/assets/spring/floor-height.png",
      normalMap: "src/assets/spring/floor-normal.exr",
      roughnessMap: "src/assets/spring/floor-roughness.jpg",
    },
  },
  autumn: {
    floor: {},
  },
};
