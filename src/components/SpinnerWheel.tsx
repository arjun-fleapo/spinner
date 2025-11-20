import { useEffect, useRef, useState } from 'react';
import { Segment } from '../types';
import './SpinnerWheel.css';

interface SpinnerWheelProps {
  segments: Segment[];
  onSpinComplete: (segmentIndex: number) => void;
}

export function SpinnerWheel({ segments, onSpinComplete }: SpinnerWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const isSpinningRef = useRef(false);
  const currentRotationRef = useRef(0);
  const zoomLogoRef = useRef<HTMLImageElement | null>(null);
  const [zoomLogoLoaded, setZoomLogoLoaded] = useState(false);

  useEffect(() => {
    const zoomLogo = new Image();
    zoomLogo.crossOrigin = 'anonymous';
    zoomLogo.src = 'https://logo.svgcdn.com/logos/zoom.png';
    zoomLogo.onload = () => {
      setZoomLogoLoaded(true);
      drawWheel();
    };
    zoomLogo.onerror = () => {
      console.warn('Failed to load Zoom logo');
      setZoomLogoLoaded(false);
    };
    zoomLogoRef.current = zoomLogo;
  }, []);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;
    const centerRadius = 75;
    const arcSize = (2 * Math.PI) / segments.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    segments.forEach((segment, index) => {
      const startAngle = index * arcSize - Math.PI / 2;
      const endAngle = (index + 1) * arcSize - Math.PI / 2;

      const gradient = ctx.createLinearGradient(
        centerX + Math.cos(startAngle) * radius,
        centerY + Math.sin(startAngle) * radius,
        centerX + Math.cos(endAngle) * radius,
        centerY + Math.sin(endAngle) * radius
      );
      gradient.addColorStop(0, segment.gradient[0]);
      gradient.addColorStop(1, segment.gradient[1]);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.lineTo(centerX, centerY);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius - 2, startAngle, endAngle);
      ctx.stroke();

      const segmentMiddleAngle = startAngle + arcSize / 2;
      const textRadius = (centerRadius + radius) / 2;
      const textX = centerX + Math.cos(segmentMiddleAngle) * textRadius;
      const textY = centerY + Math.sin(segmentMiddleAngle) * textRadius;

      ctx.save();
      ctx.translate(textX, textY);

      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#fff';

      const maxWidth = radius - centerRadius - 30;
      let fontSize = 16;
      if (segment.text.length > 50) {
        fontSize = 12;
      } else if (segment.text.length > 40) {
        fontSize = 14;
      } else if (segment.text.length > 30) {
        fontSize = 15;
      }

      ctx.font = `bold ${fontSize}px 'Poppins', sans-serif`;

      const words = segment.text.split(' ');
      const lines: string[] = [];
      let currentLine = words[0];

      for (let i = 1; i < words.length; i++) {
        const testLine = currentLine + ' ' + words[i];
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && currentLine.length > 0) {
          lines.push(currentLine);
          currentLine = words[i];
        } else {
          currentLine = testLine;
        }
      }
      lines.push(currentLine);

      const lineHeight = fontSize + 6;
      const startY = (-(lines.length - 1) * lineHeight) / 2;
      const logoSize = fontSize * 3.2;

      lines.forEach((line, lineIndex) => {
        if (line.includes('Zoom') && zoomLogoLoaded && index === 2 && zoomLogoRef.current) {
          const parts = line.split('Zoom');
          const beforeZoom = parts[0].trim();
          const afterZoom = parts[1] ? parts[1].trim() : '';

          const beforeWidth = beforeZoom ? ctx.measureText(beforeZoom + ' ').width : 0;
          const afterWidth = afterZoom ? ctx.measureText(' ' + afterZoom).width : 0;
          const totalWidth = beforeWidth + logoSize + afterWidth;

          ctx.textAlign = 'left';
          let xPos = -totalWidth / 2;

          if (beforeZoom) {
            ctx.fillText(beforeZoom + ' ', xPos, startY + lineIndex * lineHeight);
            xPos += beforeWidth;
          }

          try {
            ctx.drawImage(
              zoomLogoRef.current,
              xPos,
              startY + lineIndex * lineHeight - logoSize / 2,
              logoSize,
              logoSize
            );
            xPos += logoSize;
          } catch (e) {
            const zoomTextWidth = ctx.measureText('Zoom ').width;
            ctx.fillText('Zoom', xPos, startY + lineIndex * lineHeight);
            xPos += zoomTextWidth;
          }

          if (afterZoom) {
            ctx.fillText(' ' + afterZoom, xPos, startY + lineIndex * lineHeight);
          }

          ctx.textAlign = 'center';
        } else {
          ctx.fillText(line, 0, startY + lineIndex * lineHeight);
        }
      });

      ctx.restore();
    });

    const centerGradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      centerRadius
    );
    centerGradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    centerGradient.addColorStop(1, 'rgba(255, 255, 255, 0.85)');

    ctx.beginPath();
    ctx.arc(centerX, centerY, centerRadius, 0, 2 * Math.PI);
    ctx.fillStyle = centerGradient;
    ctx.fill();

    ctx.strokeStyle = 'rgba(102, 126, 234, 0.3)';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, centerRadius - 2, 0, 2 * Math.PI);
    ctx.stroke();
  };

  useEffect(() => {
    drawWheel();
  }, [segments, zoomLogoLoaded]);

  const createSparkle = (x: number, y: number) => {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = x - 4 + 'px';
    sparkle.style.top = y - 4 + 'px';
    const colors = ['#FFD700', '#FF69B4', '#00CED1', '#FF1493', '#9370DB', '#FFA500'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.background = color;
    sparkle.style.boxShadow = `0 0 10px ${color}`;

    const container = document.querySelector('.wheel-container');
    if (container) {
      container.appendChild(sparkle);
      setTimeout(() => {
        sparkle.remove();
      }, 1000);
    }
  };

  const createSparkles = () => {
    const container = document.querySelector('.wheel-container');
    if (!container) return;

    const centerX = container.clientWidth / 2;
    const centerY = container.clientHeight / 2;
    const radius = 200;

    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI * 2) / 12;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      setTimeout(() => createSparkle(x, y), i * 50);
    }
  };

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    isSpinningRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.classList.add('spinning');
    createSparkles();

    const sparkleInterval = setInterval(() => {
      if (!isSpinningRef.current) {
        clearInterval(sparkleInterval);
        return;
      }
      const container = document.querySelector('.wheel-container');
      if (container) {
        const x = Math.random() * container.clientWidth;
        const y = Math.random() * container.clientHeight;
        createSparkle(x, y);
      }
    }, 200);

    const spins = 5 + Math.random() * 5;
    let mod = currentRotationRef.current % 360;
    if (mod < 0) mod += 360;

    const targetMod = 162 + Math.random() * 36;

    let rotationToTarget;
    if (mod <= targetMod) {
      rotationToTarget = targetMod - mod;
    } else {
      rotationToTarget = 360 - mod + targetMod;
    }

    if (rotationToTarget < 360) {
      rotationToTarget += 360;
    }

    const totalRotation = spins * 360 + rotationToTarget;
    currentRotationRef.current = currentRotationRef.current + totalRotation;

    const finalMod = currentRotationRef.current % 360;
    if (finalMod < 144 || finalMod > 216) {
      const target = 162 + Math.random() * 36;
      const adjustment = target - finalMod;
      currentRotationRef.current += adjustment;
    }

    canvas.style.transform = `rotate(${currentRotationRef.current}deg)`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

      const handleTransitionEnd = () => {
        if (!isSpinning) return;

        setIsSpinning(false);
        isSpinningRef.current = false;

      const finalMod = currentRotationRef.current % 360;
      const targetMod = 162 + Math.random() * 36;

      let adjustment = targetMod - finalMod;
      if (adjustment > 180) adjustment -= 360;
      if (adjustment < -180) adjustment += 360;

      currentRotationRef.current = currentRotationRef.current + adjustment;

      canvas.style.transition = 'none';
      canvas.style.transform = `rotate(${currentRotationRef.current}deg)`;

      setTimeout(() => {
        canvas.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
      }, 100);

      canvas.classList.remove('spinning');
      for (let i = 0; i < 20; i++) {
        setTimeout(() => {
          const container = document.querySelector('.wheel-container');
          if (container) {
            const centerX = container.clientWidth / 2;
            const centerY = container.clientHeight / 2;
            const angle = Math.random() * Math.PI * 2;
            const distance = 150 + Math.random() * 100;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;
            createSparkle(x, y);
          }
        }, i * 30);
      }

      const segmentAtTop = 1; // AI Fiesta segment (index 1)
      onSpinComplete(segmentAtTop);
    };

    canvas.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      canvas.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [isSpinning, onSpinComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.style.transition = 'none';
    currentRotationRef.current = 0;
    canvas.style.transform = 'rotate(0deg)';

    setTimeout(() => {
      canvas.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
    }, 100);
  }, []);

  return (
    <div className="wheel-container">
      <div className="pointer"></div>
      <canvas
        ref={canvasRef}
        id="wheelCanvas"
        width={500}
        height={500}
        className={isSpinning ? 'spinning' : ''}
      />
      <button
        id="spinButton"
        onClick={spinWheel}
        disabled={isSpinning}
      >
        SPIN
      </button>
    </div>
  );
}

