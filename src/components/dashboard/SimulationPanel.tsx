import { useState } from "react";
import { Scan, AlertTriangle, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockStocks, StockData } from "@/data/mockStocks";

interface SimulationPanelProps {
  onScanComplete: (stock: StockData) => void;
  onBuyAttempt: (stock: StockData) => void;
}

export const SimulationPanel = ({ onScanComplete, onBuyAttempt }: SimulationPanelProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanPhase, setScanPhase] = useState<string>('');

  const scanPhases = [
    'Initializing Knox secure environment...',
    'Fetching SEC/SET regulatory data...',
    'Analyzing ownership structure...',
    'Running 18-Point Sentinel check...',
    'Scanning nominee network...',
    'AI fact-checking company statements...',
    'Calculating manipulation risk score...',
    'Generating security report...',
  ];

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);

    let phaseIndex = 0;
    const phaseInterval = setInterval(() => {
      if (phaseIndex < scanPhases.length) {
        setScanPhase(scanPhases[phaseIndex]);
        phaseIndex++;
      }
    }, 400);

    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(phaseInterval);
          setIsScanning(false);
          // Return the SCAM stock data
          const scamStock = mockStocks.find(s => s.ticker === 'SCAM');
          if (scamStock) {
            onScanComplete(scamStock);
          }
          return 100;
        }
        return prev + 3;
      });
    }, 100);
  };

  const scamStock = mockStocks.find(s => s.ticker === 'SCAM');

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Portfolio Simulation</h3>
          <p className="text-sm text-muted-foreground">Test the security analysis</p>
        </div>
      </div>

      {!isScanning ? (
        <div className="space-y-4">
          <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
            <p className="text-sm text-muted-foreground mb-2">Demo Stock:</p>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xl font-bold text-destructive">$SCAM</span>
                <p className="text-sm text-muted-foreground">SCAM Technology Corp</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-semibold text-secondary">+156.2%</span>
                <p className="text-sm text-muted-foreground">Today</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="cyber" 
              className="flex-1"
              onClick={startScan}
            >
              <Scan className="w-4 h-4 mr-2" />
              Simulate Portfolio Scan
            </Button>
            <Button 
              variant="success"
              onClick={() => scamStock && onBuyAttempt(scamStock)}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Buy $SCAM
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 animate-fade-in">
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-secondary transition-all duration-100"
              style={{ width: `${scanProgress}%` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan" />
          </div>

          <div className="bg-muted/30 rounded-xl p-4 min-h-[80px] flex items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Scan className="w-4 h-4 text-primary animate-pulse" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{scanPhase}</p>
                <p className="text-xs text-muted-foreground">{scanProgress}% complete</p>
              </div>
            </div>
          </div>

          {scanProgress > 50 && (
            <div className="flex items-center gap-2 text-warning animate-fade-in">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">Warning signals detected...</span>
            </div>
          )}

          {scanProgress > 80 && (
            <div className="flex items-center gap-2 text-destructive animate-fade-in">
              <AlertTriangle className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-medium">CRITICAL: High manipulation probability</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
