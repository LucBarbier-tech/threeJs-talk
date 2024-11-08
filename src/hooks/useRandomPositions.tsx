import { useMemo } from "react";

interface UseRandomPositionProps {
  elementLength: number;
  spread: number;
}

export const useRandomPosition = ({
  elementLength,
  spread,
}: UseRandomPositionProps) => {
  const positions = useMemo(() => {
    const positionsArr: { x: number; z: number }[] = [];

    for (let i = 0; i < elementLength; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * spread;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      positionsArr.push({ x, z });
    }
    return positionsArr;
  }, [elementLength, spread]);

  return { positions };
};
