"use client";

import { useEffect, useRef } from "react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
}

interface ClickSparkProps {
  children: React.ReactNode;
  className?: string;
}

export function ClickSpark({ children, className = "" }: ClickSparkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current.forEach((spark, index) => {
        spark.x += spark.vx;
        spark.y += spark.vy;
        spark.vy += 0.1; // gravity
        spark.life -= spark.decay;

        if (spark.life > 0) {
          ctx.globalAlpha = spark.life;
          ctx.fillStyle = "#FCE483"; // Using your highlight color
          ctx.beginPath();
          ctx.arc(spark.x, spark.y, 4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          sparksRef.current.splice(index, 1);
        }
      });

      if (sparksRef.current.length > 0) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    // Click handler
    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      console.log('Click detected at:', x, y); // Debug log

      // Create sparks
      for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12;
        const velocity = 3 + Math.random() * 3;
        
        sparksRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          life: 1,
          decay: 0.015,
        });
      }

      if (sparksRef.current.length > 0 && !animationRef.current) {
        animate();
      }
    };

    container.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      container.removeEventListener("click", handleClick);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ 
          zIndex: 10,
          width: '100%',
          height: '100%'
        }}
      />
      {children}
    </div>
  );
} 