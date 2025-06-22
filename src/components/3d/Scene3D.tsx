import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

type Scene3DProps = {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  controlsEnabled?: boolean;
  background?: string;
  style?: React.CSSProperties;
  className?: string;
};

const Scene3D = ({ 
  children, 
  cameraPosition = [0, 0, 5], 
  controlsEnabled = true,
  background = "transparent",
  style = {},
  className = ""
}: Scene3DProps) => {
  return (
    <div className={`w-full h-full ${className}`} style={style}>
      <Canvas 
        dpr={[1, 1.5]}
        gl={{ 
          preserveDrawingBuffer: false,
          antialias: false,
          powerPreference: "high-performance"
        }} 
        style={{ background }}
      >
        <PerspectiveCamera makeDefault position={cameraPosition} />
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={0.8}
          castShadow={false}
        />
        {children}
        {controlsEnabled && (
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
            enableDamping={false}
          />
        )}
      </Canvas>
    </div>
  );
};

export default Scene3D;
