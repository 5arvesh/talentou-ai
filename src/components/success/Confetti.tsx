
import { useEffect, useRef } from "react";

export function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    
    canvas.width = W;
    canvas.height = H;
    
    const confettiPieces: Array<{
      x: number;
      y: number;
      width: number;
      height: number;
      colors: string[];
      rotation: number;
      velocity: { x: number; y: number };
      rotationSpeed: number;
    }> = [];
    
    const colors = ["#f97316", "#10b981", "#3b82f6", "#eab308", "#ec4899"];
    
    const MAX_PIECES = 200;
    
    // Fill the confetti array with random pieces
    for (let i = 0; i < MAX_PIECES; i++) {
      const size = Math.random() * 15 + 5;
      confettiPieces.push({
        x: Math.random() * W,
        y: Math.random() * H - H,
        width: size,
        height: size / 2,
        colors: [colors[Math.floor(Math.random() * colors.length)]],
        rotation: Math.random() * 360,
        velocity: {
          x: Math.random() * 2 - 1,
          y: Math.random() * 5 + 2
        },
        rotationSpeed: Math.random() * 0.1 - 0.05
      });
    }
    
    let animationFrameId: number;
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      
      confettiPieces.forEach((piece, index) => {
        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate(piece.rotation * Math.PI / 180);
        
        ctx.fillStyle = piece.colors[0];
        ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
        
        ctx.restore();
        
        // Update position
        piece.x += piece.velocity.x;
        piece.y += piece.velocity.y;
        piece.rotation += piece.rotationSpeed;
        
        // Loop confetti
        if (piece.y > H) {
          confettiPieces[index].y = -100;
          confettiPieces[index].x = Math.random() * W;
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Set a timeout to stop the animation after 5 seconds
    const timeoutId = setTimeout(() => {
      cancelAnimationFrame(animationFrameId);
      ctx.clearRect(0, 0, W, H);
    }, 5000);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none"
    />
  );
}
