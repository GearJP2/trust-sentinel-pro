import { useEffect, useState } from "react";
import { AlertTriangle, Shield, CheckCircle } from "lucide-react";

interface RiskGaugeProps {
  score: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  stockTicker?: string;
}

export const RiskGauge = ({ score, riskLevel, stockTicker }: RiskGaugeProps) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const duration = 1500;
    const startTime = Date.now();
    const startScore = displayScore;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(startScore + (score - startScore) * easeOut));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  }, [score]);

  const getGaugeColor = () => {
    if (score <= 25) return "text-secondary";
    if (score <= 50) return "text-primary";
    if (score <= 75) return "text-warning";
    return "text-destructive";
  };

  const getGlowClass = () => {
    if (score <= 25) return "glow-green";
    if (score <= 50) return "";
    if (score <= 75) return "glow-amber";
    return "glow-red";
  };

  const getRiskIcon = () => {
    if (score <= 25) return <CheckCircle className="w-6 h-6" />;
    if (score <= 50) return <Shield className="w-6 h-6" />;
    return <AlertTriangle className="w-6 h-6" />;
  };

  const getRiskLabel = () => {
    if (score <= 25) return "LOW RISK";
    if (score <= 50) return "MODERATE";
    if (score <= 75) return "HIGH RISK";
    return "CRITICAL";
  };

  // Calculate stroke dash for the arc
  const circumference = 2 * Math.PI * 80;
  const arcLength = circumference * 0.75; // 270 degrees
  const filledLength = (displayScore / 100) * arcLength;

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-foreground">Manipulation Risk Score</h3>
        {stockTicker && (
          <p className="text-sm text-muted-foreground">Analyzing ${stockTicker}</p>
        )}
      </div>

      <div className="relative w-48 h-48 mx-auto">
        {/* Background arc */}
        <svg className="w-full h-full -rotate-[135deg]" viewBox="0 0 180 180">
          <circle
            cx="90"
            cy="90"
            r="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${arcLength} ${circumference}`}
            className="text-muted/30"
          />
          {/* Filled arc */}
          <circle
            cx="90"
            cy="90"
            r="80"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${filledLength} ${circumference}`}
            className={`${getGaugeColor()} transition-all duration-300`}
            style={{
              filter: score > 50 ? `drop-shadow(0 0 10px currentColor)` : undefined,
            }}
          />
        </svg>

        {/* Center content */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center ${score > 75 ? 'animate-pulse' : ''}`}>
          <span className={`text-5xl font-bold ${getGaugeColor()}`}>
            {displayScore}
          </span>
          <span className="text-lg text-muted-foreground">%</span>
        </div>
      </div>

      {/* Risk Badge */}
      <div className={`mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-full mx-auto w-fit ${
        score <= 25 ? 'bg-secondary/20 text-secondary' :
        score <= 50 ? 'bg-primary/20 text-primary' :
        score <= 75 ? 'bg-warning/20 text-warning' :
        'bg-destructive/20 text-destructive animate-pulse'
      } ${getGlowClass()}`}>
        {getRiskIcon()}
        <span className="font-bold text-sm tracking-wider">{getRiskLabel()}</span>
      </div>

      {score > 75 && (
        <p className="mt-4 text-center text-sm text-destructive animate-pulse">
          ⚠️ High manipulation probability detected
        </p>
      )}
    </div>
  );
};
