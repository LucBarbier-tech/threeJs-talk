import React from "react";
import * as THREE from "three";

export const ThreejsExample = () => {
  const mountRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!mountRef.current) {
      return;
    }

    const ref = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(
      mountRef.current.getBoundingClientRect().width,
      mountRef.current.getBoundingClientRect().height
    );

    ref.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x808080 });
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    camera.position.z = 1.5;

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.y -= 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (!ref) {
        return;
      }
      ref.removeChild(renderer.domElement);

      geometry.dispose();
      material.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        aspectRatio: 1,
      }}
    >
      <p>{"ThreeJs"}</p>
      <div style={{ width: "100%", height: "100%" }} ref={mountRef} />
    </div>
  );
};
