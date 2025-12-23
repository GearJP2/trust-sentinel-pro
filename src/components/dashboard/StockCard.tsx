import { TrendingUp, TrendingDown, AlertTriangle, Shield } from "lucide-react";
import { StockData } from "@/data/mockStocks";

interface StockCardProps {
  stock: StockData;
  onClick: () => void;
  isSelected: boolean;
}

export const StockCard = ({ stock, onClick, isSelected }: StockCardProps) => {
  const isPositive = stock.change >= 0;
  
  const getRiskBadge = () => {
    switch (stock.riskLevel) {
      case 'low':
        return (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/20 text-secondary text-xs">
            <Shield className="w-3 h-3" />
            <span>{stock.riskScore}%</span>
          </div>
        );
      case 'critical':
        return (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-destructive/20 text-destructive text-xs animate-pulse">
            <AlertTriangle className="w-3 h-3" />
            <span>{stock.riskScore}%</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-warning/20 text-warning text-xs">
            <AlertTriangle className="w-3 h-3" />
            <span>{stock.riskScore}%</span>
          </div>
        );
    }
  };

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl border transition-all duration-200 text-left ${
        isSelected 
          ? 'bg-primary/10 border-primary/50 glow-blue' 
          : 'bg-card/50 border-border/50 hover:bg-card hover:border-border'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-foreground">${stock.ticker}</span>
          {getRiskBadge()}
        </div>
        <div className={`flex items-center gap-1 ${isPositive ? 'text-secondary' : 'text-destructive'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span className="font-semibold">{isPositive ? '+' : ''}{stock.change}%</span>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground truncate mb-3">{stock.name}</p>
      
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <p className="text-muted-foreground">Price</p>
          <p className="font-medium text-foreground">฿{stock.price}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Volume</p>
          <p className="font-medium text-foreground">{stock.volume}</p>
        </div>
        <div>
          <p className="text-muted-foreground">P/E</p>
          <p className="font-medium text-foreground">{stock.pe ?? 'N/A'}</p>
        </div>
      </div>
    </button>
  );
};
