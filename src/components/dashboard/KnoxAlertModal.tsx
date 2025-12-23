import { useState, useEffect } from "react";
import { Shield, Fingerprint, X, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface KnoxAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  stockTicker: string;
  riskScore: number;
}

export const KnoxAlertModal = ({ isOpen, onClose, stockTicker, riskScore }: KnoxAlertModalProps) => {
  const [verificationStep, setVerificationStep] = useState<'warning' | 'scanning' | 'denied'>('warning');
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    if (verificationStep === 'scanning') {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setVerificationStep('denied'), 300);
            return 100;
          }
          return prev + 5;
        });
      }, 80);
      return () => clearInterval(interval);
    }
  }, [verificationStep]);

  const handleVerify = () => {
    setVerificationStep('scanning');
    setScanProgress(0);
  };

  const handleClose = () => {
    setVerificationStep('warning');
    setScanProgress(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-destructive/50 max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center animate-pulse">
                <Shield className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <DialogTitle className="text-destructive">Samsung Knox Alert</DialogTitle>
                <p className="text-sm text-muted-foreground">Security Verification Required</p>
              </div>
            </div>
          </div>
        </DialogHeader>

        {verificationStep === 'warning' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-destructive mb-1">High-Risk Transaction Blocked</p>
                  <p className="text-sm text-muted-foreground">
                    You are attempting to purchase <span className="text-foreground font-medium">${stockTicker}</span> which has a manipulation risk score of <span className="text-destructive font-bold">{riskScore}%</span>.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-4 space-y-3">
              <p className="text-sm font-medium text-foreground">Security flags detected:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-destructive">🚩</span>
                  Multiple 18-Point checklist failures
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-destructive">🚩</span>
                  Suspicious nominee network detected
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-destructive">🚩</span>
                  AI fact-checker found discrepancies
                </li>
              </ul>
            </div>

            <p className="text-sm text-center text-muted-foreground">
              To proceed, you must verify your identity with Samsung Knox biometric authentication.
            </p>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="danger" className="flex-1" onClick={handleVerify}>
                <Fingerprint className="w-4 h-4 mr-2" />
                Verify with Knox
              </Button>
            </div>
          </div>
        )}

        {verificationStep === 'scanning' && (
          <div className="space-y-6 py-8 animate-fade-in">
            <div className="w-24 h-24 mx-auto relative">
              <div className="absolute inset-0 rounded-full border-4 border-primary/30" />
              <div 
                className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"
                style={{ animationDuration: '1s' }}
              />
              <div className="absolute inset-4 rounded-full bg-primary/20 flex items-center justify-center">
                <Fingerprint className="w-10 h-10 text-primary" />
              </div>
            </div>
            <div className="text-center">
              <p className="font-medium text-foreground mb-2">Scanning biometrics...</p>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-100"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">{scanProgress}% complete</p>
            </div>
          </div>
        )}

        {verificationStep === 'denied' && (
          <div className="space-y-6 py-4 animate-fade-in">
            <div className="w-20 h-20 mx-auto rounded-full bg-destructive/20 flex items-center justify-center">
              <X className="w-10 h-10 text-destructive" />
            </div>
            <div className="text-center">
              <p className="font-semibold text-destructive text-lg mb-2">Transaction Blocked</p>
              <p className="text-sm text-muted-foreground">
                Samsung Knox has blocked this high-risk transaction to protect your portfolio. 
                This decision is logged for security compliance.
              </p>
            </div>
            <div className="bg-muted/30 rounded-xl p-4 text-center">
              <p className="text-xs text-muted-foreground">
                Knox Security Event ID: <span className="font-mono text-foreground">KNX-{Date.now()}</span>
              </p>
            </div>
            <Button variant="outline" className="w-full" onClick={handleClose}>
              Return to Dashboard
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
