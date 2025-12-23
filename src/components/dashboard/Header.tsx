import { useState } from "react";
import { Search, Shield, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockStocks, StockData } from "@/data/mockStocks";

interface HeaderProps {
  onStockSelect: (stock: StockData) => void;
  selectedStock: StockData | null;
}

export const Header = ({ onStockSelect, selectedStock }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredStocks = mockStocks.filter(
    (stock) =>
      stock.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectStock = (stock: StockData) => {
    onStockSelect(stock);
    setSearchQuery(stock.ticker);
    setShowDropdown(false);
  };

  return (
    <header className="h-16 bg-card/50 backdrop-blur-xl border-b border-border px-6 flex items-center justify-between">
      {/* Search Section */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search Thai stocks (e.g., $PTT, $KBANK)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            className="pl-10 bg-muted/50 border-border/50 focus:border-primary/50 transition-colors"
          />
          
          {/* Dropdown */}
          {showDropdown && searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-2xl overflow-hidden z-50 animate-scale-in">
              {filteredStocks.length > 0 ? (
                filteredStocks.map((stock) => (
                  <button
                    key={stock.ticker}
                    onClick={() => handleSelectStock(stock)}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors border-b border-border/30 last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-primary">${stock.ticker}</span>
                      <span className="text-sm text-muted-foreground truncate max-w-[200px]">{stock.name}</span>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      stock.riskLevel === 'low' ? 'bg-secondary/20 text-secondary' :
                      stock.riskLevel === 'medium' ? 'bg-warning/20 text-warning' :
                      'bg-destructive/20 text-destructive'
                    }`}>
                      {stock.riskScore}% Risk
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-muted-foreground text-sm">No stocks found</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Knox Badge & Actions */}
      <div className="flex items-center gap-4">
        {/* Samsung Knox Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full">
          <Shield className="w-4 h-4 text-primary" />
          <span className="text-xs font-medium text-primary">Samsung Knox Verified</span>
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[10px] font-bold flex items-center justify-center">
            3
          </span>
        </Button>

        {/* User */}
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};
