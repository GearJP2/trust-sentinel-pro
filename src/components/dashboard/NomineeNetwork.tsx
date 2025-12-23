import { useEffect, useRef, useState } from "react";
import { nomineeNetworkData } from "@/data/mockStocks";

export const NomineeNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodes, setNodes] = useState<Array<{
    id: string;
    label: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    risk: string;
    type: string;
  }>>([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize nodes with random positions
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    const initializedNodes = nomineeNetworkData.nodes.map((node, i) => {
      const angle = (i / nomineeNetworkData.nodes.length) * Math.PI * 2;
      const radius = node.id === 'main' ? 0 : 100 + Math.random() * 80;
      return {
        ...node,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
      };
    });

    setNodes(initializedNodes);

    let animationId: number;
    let time = 0;

    const animate = () => {
      if (!ctx) return;
      time += 0.02;

      ctx.fillStyle = 'rgba(13, 13, 18, 0.2)';
      ctx.fillRect(0, 0, width, height);

      // Draw connections
      nomineeNetworkData.links.forEach(link => {
        const source = initializedNodes.find(n => n.id === link.source);
        const target = initializedNodes.find(n => n.id === link.target);
        if (!source || !target) return;

        const gradient = ctx.createLinearGradient(source.x, source.y, target.x, target.y);
        const sourceRisk = source.risk === 'critical' ? '#ef4444' : source.risk === 'warning' ? '#f59e0b' : '#6b7280';
        const targetRisk = target.risk === 'critical' ? '#ef4444' : target.risk === 'warning' ? '#f59e0b' : '#6b7280';
        gradient.addColorStop(0, sourceRisk + '40');
        gradient.addColorStop(1, targetRisk + '40');

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Animated pulse along the line
        const pulsePos = (Math.sin(time * 2 + initializedNodes.indexOf(source)) + 1) / 2;
        const pulseX = source.x + (target.x - source.x) * pulsePos;
        const pulseY = source.y + (target.y - source.y) * pulsePos;
        
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
        ctx.fillStyle = source.risk === 'critical' ? '#ef444480' : '#f59e0b80';
        ctx.fill();
      });

      // Draw nodes
      initializedNodes.forEach((node, i) => {
        // Subtle floating animation
        const floatX = Math.sin(time + i) * 2;
        const floatY = Math.cos(time * 0.8 + i) * 2;
        const x = node.x + floatX;
        const y = node.y + floatY;

        const radius = node.id === 'main' ? 24 : 16;
        const riskColor = node.risk === 'critical' ? '#ef4444' : node.risk === 'warning' ? '#f59e0b' : '#034EA2';

        // Outer glow for danger nodes
        if (node.risk === 'critical') {
          const glowSize = 8 + Math.sin(time * 3 + i) * 4;
          const glow = ctx.createRadialGradient(x, y, radius, x, y, radius + glowSize);
          glow.addColorStop(0, riskColor + '60');
          glow.addColorStop(1, riskColor + '00');
          ctx.beginPath();
          ctx.arc(x, y, radius + glowSize, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        // Node background
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#1a1a23';
        ctx.fill();
        ctx.strokeStyle = riskColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Node label
        ctx.fillStyle = '#e5e5e5';
        ctx.font = node.id === 'main' ? 'bold 10px Inter' : '9px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const label = node.label.length > 10 ? node.label.slice(0, 8) + '...' : node.label;
        ctx.fillText(label, x, y);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Nominee Network</h3>
          <p className="text-sm text-muted-foreground">Suspicious ownership clusters</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
            <span className="text-muted-foreground">Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-muted-foreground">Warning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Normal</span>
          </div>
        </div>
      </div>
      <div className="relative rounded-xl overflow-hidden bg-background/50">
        <canvas
          ref={canvasRef}
          width={600}
          height={350}
          className="w-full h-auto"
        />
        <div className="absolute bottom-4 left-4 bg-popover/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2">
          <p className="text-xs text-muted-foreground">
            Detected <span className="text-destructive font-bold">8</span> suspicious nominee accounts
          </p>
        </div>
      </div>
    </div>
  );
};
