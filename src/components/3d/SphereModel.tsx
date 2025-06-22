import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';

type SphereModelProps = {
  size?: number;
  color?: string;
  speed?: number;
  position?: [number, number, number];
};

const SphereModel = ({ 
  size = 1, 
  color = "#D946EF", 
  speed = 0.005,
  position = [0, 0, 0]
}: SphereModelProps) => {
  const meshRef = useRef<Mesh>(null!);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed;
      meshRef.current.rotation.y += speed * 1.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position as Vector3}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color={color} metalness={0.4} roughness={0.4} />
    </mesh>
  );
};

export default SphereModel;
