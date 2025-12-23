import { useState } from "react";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";
import { ChecklistItem } from "@/data/mockStocks";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SentinelChecklistProps {
  items: ChecklistItem[];
}

export const SentinelChecklist = ({ items }: SentinelChecklistProps) => {
  const [filter, setFilter] = useState<'all' | 'safe' | 'warning' | 'critical'>('all');

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.status === filter);

  const counts = {
    safe: items.filter(i => i.status === 'safe').length,
    warning: items.filter(i => i.status === 'warning').length,
    critical: items.filter(i => i.status === 'critical').length,
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe':
        return <CheckCircle className="w-5 h-5 text-secondary" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'critical':
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'safe':
        return 'bg-secondary/10 border-secondary/30 hover:bg-secondary/20';
      case 'warning':
        return 'bg-warning/10 border-warning/30 hover:bg-warning/20';
      case 'critical':
        return 'bg-destructive/10 border-destructive/30 hover:bg-destructive/20 animate-pulse';
      default:
        return 'bg-muted';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'governance':
        return 'bg-primary/20 text-primary';
      case 'financials':
        return 'bg-secondary/20 text-secondary';
      case 'trading':
        return 'bg-warning/20 text-warning';
      case 'ownership':
        return 'bg-purple-500/20 text-purple-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">18-Point Sentinel</h3>
          <p className="text-sm text-muted-foreground">Joe Look E-Saan Checklist</p>
        </div>
        
        {/* Filter Pills */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            All ({items.length})
          </button>
          <button
            onClick={() => setFilter('critical')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === 'critical' ? 'bg-destructive text-destructive-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            🚩 {counts.critical}
          </button>
          <button
            onClick={() => setFilter('warning')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === 'warning' ? 'bg-warning text-warning-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            ⚠️ {counts.warning}
          </button>
          <button
            onClick={() => setFilter('safe')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === 'safe' ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            ✅ {counts.safe}
          </button>
        </div>
      </div>

      {/* Grid of Checklist Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto pr-2">
        {filteredItems.map((item, index) => (
          <Tooltip key={item.id}>
            <TooltipTrigger asChild>
              <div
                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${getStatusBg(item.status)}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-3">
                  {getStatusIcon(item.status)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-foreground truncate">
                        {item.id}. {item.name}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {item.nameThai}
                    </span>
                    <div className="mt-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <Info className="w-4 h-4 text-muted-foreground/50 shrink-0" />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs bg-popover border border-border p-4">
              <p className="font-semibold text-foreground mb-1">{item.name}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
