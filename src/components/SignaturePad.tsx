import React, { useRef, useEffect } from 'react';

export default function SignaturePad({
  value,
  onChange,
}: {
  value?: string;
  onChange: (dataUrl: string | null) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    if (value) {
      const img = new Image();
      img.src = value;
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [value]);

  function toLocal(e: PointerEvent | MouseEvent) {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const clientX = (e as PointerEvent).clientX ?? (e as MouseEvent).clientX;
    const clientY = (e as PointerEvent).clientY ?? (e as MouseEvent).clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;
    function start(e: PointerEvent) {
      drawing.current = true;
      const ctx = canvas.getContext('2d')!;
      const p = toLocal(e);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      e.preventDefault();
    }
    function move(e: PointerEvent) {
      if (!drawing.current) return;
      const ctx = canvas.getContext('2d')!;
      const p = toLocal(e);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
    function up() {
      if (!drawing.current) return;
      drawing.current = false;
      const data = canvas.toDataURL();
      onChange(data);
    }
    canvas.addEventListener('pointerdown', start);
    canvas.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      canvas.removeEventListener('pointerdown', start);
      canvas.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clear() {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onChange(null);
  }

  return (
    <div className="border rounded p-2 bg-white">
      <canvas
        ref={canvasRef}
        width={600}
        height={120}
        className="w-full h-24 bg-white"
        style={{ touchAction: 'none' }}
      />
      <div className="flex gap-2 mt-2">
        <button onClick={clear} className="px-2 py-1 rounded bg-gray-100">
          Clear
        </button>
      </div>
    </div>
  );
}
