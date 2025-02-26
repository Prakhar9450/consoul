"use client";

import React, { useEffect, useRef, useState } from "react";

interface Icon {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  id: number;
}

interface IconCloudProps {
  icons?: React.ReactNode[];
  images?: string[];
  size?: number;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function IconCloud({ icons, images, size = 400 }: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [iconPositions, setIconPositions] = useState<Icon[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [targetRotation, setTargetRotation] = useState<{
    x: number;
    y: number;
    startX: number;
    startY: number;
    distance: number;
    startTime: number;
    duration: number;
  } | null>(null);
  const animationFrameRef = useRef<number>(0);
  const rotationRef = useRef({ x: 0, y: 0 });

  const loadedImagesRef = useRef<HTMLImageElement[]>([]);
  const imagesLoadedRef = useRef<boolean[]>([]);

  // Load images directly without pre-rendering to canvas
  useEffect(() => {
    if (!images) return;
    
    const newImages: HTMLImageElement[] = [];
    const loadStates = new Array(images.length).fill(false);
    imagesLoadedRef.current = loadStates;
    
    images.forEach((src, index) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = src;
      
      img.onload = () => {
        imagesLoadedRef.current[index] = true;
        newImages[index] = img;
      };
      
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
      };
    });
    
    loadedImagesRef.current = newImages;
  }, [images]);

  // Generate initial icon positions on a sphere
  useEffect(() => {
    const items = icons || images || [];
    const numIcons = items.length;
    if (numIcons === 0) return;
    
    const newIcons: Icon[] = [];
    
    // Use Fibonacci sphere algorithm for even distribution
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians
    
    for (let i = 0; i < numIcons; i++) {
      const y = 1 - (i / (numIcons - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y); // radius at y
      
      const theta = phi * i; // golden angle increment
      
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      
      // Scale factor to make the sphere larger
      const scaleFactor = 150;
      
      newIcons.push({
        x: x * scaleFactor,
        y: y * scaleFactor,
        z: z * scaleFactor,
        scale: 1,
        opacity: 1,
        id: i,
      });
    }
    
    setIconPositions(newIcons);
    
    // Start with a slight rotation to make it more dynamic
    rotationRef.current = { x: 0.2, y: 0.3 };
  }, [icons, images]);

  // Handle mouse events
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !canvasRef.current) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if we clicked on an icon
    let iconClicked = false;
    
    iconPositions.forEach((icon) => {
      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      const rotatedX = icon.x * cosY - icon.z * sinY;
      const rotatedZ = icon.x * sinY + icon.z * cosY;
      const rotatedY = icon.y * cosX + rotatedZ * sinX;

      const screenX = canvasRef.current!.width / 2 + rotatedX;
      const screenY = canvasRef.current!.height / 2 + rotatedY;

      const scale = (rotatedZ + 200) / 300;
      const radius = 30 * scale;
      const dx = x - screenX;
      const dy = y - screenY;

      if (dx * dx + dy * dy < radius * radius) {
        iconClicked = true;
        
        // Calculate target rotation to center this icon
        const targetX = -Math.atan2(
          icon.y,
          Math.sqrt(icon.x * icon.x + icon.z * icon.z)
        );
        const targetY = Math.atan2(icon.x, icon.z);

        const currentX = rotationRef.current.x;
        const currentY = rotationRef.current.y;
        const distance = Math.sqrt(
          Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2)
        );

        const duration = Math.min(2000, Math.max(800, distance * 1000));

        setTargetRotation({
          x: targetX,
          y: targetY,
          startX: currentX,
          startY: currentY,
          distance,
          startTime: performance.now(),
          duration,
        });
        return; // Exit after finding a clicked icon
      }
    });

    if (!iconClicked) {
      // Start dragging if no icon was clicked
      setIsDragging(true);
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    }

    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;

      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.002,
        y: rotationRef.current.y + deltaX * 0.002,
      };

      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Animation and rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Adjust canvas to size
    canvas.width = size;
    canvas.height = size;

    // Slow auto-rotation
    const autoRotationSpeed = 0.0005;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (targetRotation) {
        // Animated rotation to center the clicked icon
        const elapsed = performance.now() - targetRotation.startTime;
        const progress = Math.min(1, elapsed / targetRotation.duration);
        const easedProgress = easeOutCubic(progress);

        rotationRef.current = {
          x:
            targetRotation.startX +
            (targetRotation.x - targetRotation.startX) * easedProgress,
          y:
            targetRotation.startY +
            (targetRotation.y - targetRotation.startY) * easedProgress,
        };

        if (progress >= 1) {
          setTargetRotation(null);
        }
      } else if (!isDragging) {
        // Auto rotation when not being dragged
        rotationRef.current = {
          x: rotationRef.current.x + autoRotationSpeed,
          y: rotationRef.current.y + autoRotationSpeed,
        };
      }

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Sort icons by z-index for proper rendering order
      const sortedPositions = [...iconPositions].map(icon => {
        const cosX = Math.cos(rotationRef.current.x);
        const sinX = Math.sin(rotationRef.current.x);
        const cosY = Math.cos(rotationRef.current.y);
        const sinY = Math.sin(rotationRef.current.y);

        const rotatedX = icon.x * cosY - icon.z * sinY;
        const rotatedZ = icon.x * sinY + icon.z * cosY;
        const rotatedY = icon.y * cosX + rotatedZ * sinX;

        return {
          ...icon,
          rotatedX,
          rotatedY,
          rotatedZ,
          screenX: centerX + rotatedX,
          screenY: centerY + rotatedY
        };
      }).sort((a, b) => a.rotatedZ - b.rotatedZ);

      // Draw icons from back to front
      sortedPositions.forEach(icon => {
        const { screenX, screenY, rotatedZ, id } = icon;
        
        // Better scale and opacity calculation based on z-position
        const scale = 0.5 + ((rotatedZ + 200) / 300) * 0.5; // Range from 0.5 to 1.0
        const opacity = Math.max(0.15, Math.min(1, (rotatedZ + 200) / 300));
        
        ctx.save();
        ctx.globalAlpha = opacity;
        
        // Draw the logo image if it's loaded
        if (images && loadedImagesRef.current[id] && imagesLoadedRef.current[id]) {
          const img = loadedImagesRef.current[id];
          
          // Calculate logo dimensions while preserving aspect ratio
          const maxSize = 150;
          const imgWidth = img.width;
          const imgHeight = img.height;
          let drawWidth, drawHeight;
          
          if (imgWidth > imgHeight) {
            drawWidth = maxSize;
            drawHeight = (imgHeight / imgWidth) * maxSize;
          } else {
            drawHeight = maxSize;
            drawWidth = (imgWidth / imgHeight) * maxSize;
          }
          
          // Scale based on z-position
          drawWidth *= scale;
          drawHeight *= scale;
          
          // Draw the full logo centered at its position
          ctx.drawImage(
            img, 
            screenX - drawWidth / 2, 
            screenY - drawHeight / 2, 
            drawWidth, 
            drawHeight
          );
        } else {
          // Fallback for unloaded icons
          const radius = 20 * scale;
          ctx.beginPath();
          ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(100, 100, 220, 0.8)";
          ctx.fill();
          
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = `${Math.floor(12 * scale)}px Arial`;
          ctx.fillText(`${id + 1}`, screenX, screenY);
        }
        
        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [size, iconPositions, isDragging, mousePos, targetRotation, images]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="rounded-lg cursor-grab"
      aria-label="Interactive 3D Logo Cloud"
      role="img"
      style={{ touchAction: "none" }}
    />
  );
}