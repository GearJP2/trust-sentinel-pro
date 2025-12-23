import { Bot, AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";
import { aiAnalysisData } from "@/data/mockStocks";

interface AIFactCheckerProps {
  stockTicker: string;
}

export const AIFactChecker = ({ stockTicker }: AIFactCheckerProps) => {
  const analysis = aiAnalysisData[stockTicker as keyof typeof aiAnalysisData];

  if (!analysis) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Gemini AI Analysis</h3>
            <p className="text-sm text-muted-foreground">Story Fact-Checker</p>
          </div>
        </div>
        <p className="text-muted-foreground text-center py-8">
          Select a stock to analyze
        </p>
      </div>
    );
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'discrepancy':
        return <AlertCircle className="w-4 h-4 text-destructive shrink-0" />;
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-destructive shrink-0 animate-pulse" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning shrink-0" />;
      case 'verified':
        return <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />;
      case 'note':
        return <AlertCircle className="w-4 h-4 text-primary shrink-0" />;
      default:
        return null;
    }
  };

  const getTypeBg = (type: string) => {
    switch (type) {
      case 'discrepancy':
      case 'critical':
        return 'bg-destructive/10 border-destructive/30';
      case 'warning':
        return 'bg-warning/10 border-warning/30';
      case 'verified':
        return 'bg-secondary/10 border-secondary/30';
      default:
        return 'bg-primary/10 border-primary/30';
    }
  };

  const hasCriticalFindings = analysis.actualFindings.some(
    f => f.type === 'critical' || f.type === 'discrepancy'
  );

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            hasCriticalFindings ? 'bg-destructive/20' : 'bg-secondary/20'
          }`}>
            <Bot className={`w-5 h-5 ${hasCriticalFindings ? 'text-destructive' : 'text-secondary'}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Gemini AI Analysis</h3>
            <p className="text-sm text-muted-foreground">Story Fact-Checker for ${stockTicker}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          hasCriticalFindings 
            ? 'bg-destructive/20 text-destructive' 
            : 'bg-secondary/20 text-secondary'
        }`}>
          {hasCriticalFindings ? 'Issues Found' : 'Verified'}
        </span>
      </div>

      {/* Company PR Section */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">Company Statement:</h4>
        <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
          <p className="text-sm text-foreground italic">"{analysis.companyPR}"</p>
        </div>
      </div>

      {/* AI Findings */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">AI Findings:</h4>
        <div className="space-y-2">
          {analysis.actualFindings.map((finding, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 p-3 rounded-lg border ${getTypeBg(finding.type)} animate-fade-in`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {getTypeIcon(finding.type)}
              <p className={`text-sm ${
                finding.type === 'discrepancy' || finding.type === 'critical' 
                  ? 'text-destructive' 
                  : 'text-foreground'
              }`}>
                {finding.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className={`p-4 rounded-lg ${
        hasCriticalFindings 
          ? 'bg-destructive/10 border border-destructive/30' 
          : 'bg-secondary/10 border border-secondary/30'
      }`}>
        <p className="text-sm font-medium text-foreground">
          <span className="text-muted-foreground">Summary: </span>
          {analysis.summary}
        </p>
      </div>
    </div>
  );
};
