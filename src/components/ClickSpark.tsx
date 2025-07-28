"use client";

import { useEffect, useRef } from "react";

interface ClickSparkProps {
  children: React.ReactNode;
  className?: string;
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
}

export function ClickSpark({ 
  children, 
  className = "",
  sparkColor = "#4E633D",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400
}: ClickSparkProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createSpark = (x: number, y: number) => {
      const spark = document.createElement("div");
      spark.style.position = "absolute";
      spark.style.left = x + "px";
      spark.style.top = y + "px";
      spark.style.width = sparkSize + "px";
      spark.style.height = sparkSize + "px";
      spark.style.backgroundColor = sparkColor;
      spark.style.borderRadius = "50%";
      spark.style.pointerEvents = "none";
      spark.style.zIndex = "1000";
      spark.style.transition = `all ${duration}ms ease-out`;

      container.appendChild(spark);

      // Trigger animation
      requestAnimationFrame(() => {
        const angle = (Math.PI * 2 * Math.random());
        const distance = sparkRadius + Math.random() * sparkRadius;
        const translateX = Math.cos(angle) * distance;
        const translateY = Math.sin(angle) * distance;

        spark.style.transform = `translate(${translateX}px, ${translateY}px) scale(0)`;
        spark.style.opacity = "0";
      });

      // Remove spark after animation
      setTimeout(() => {
        if (spark.parentNode) {
          spark.parentNode.removeChild(spark);
        }
      }, duration);
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      for (let i = 0; i < sparkCount; i++) {
        createSpark(x, y);
      }
    };

    container.addEventListener("click", handleClick);

    return () => {
      container.removeEventListener("click", handleClick);
    };
  }, [sparkColor, sparkSize, sparkRadius, sparkCount, duration]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {children}
    </div>
  );
} 