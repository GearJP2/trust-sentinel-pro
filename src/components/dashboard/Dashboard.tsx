import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { RiskGauge } from "./RiskGauge";
import { SentinelChecklist } from "./SentinelChecklist";
import { NomineeNetwork } from "./NomineeNetwork";
import { AIFactChecker } from "./AIFactChecker";
import { SimulationPanel } from "./SimulationPanel";
import { StockCard } from "./StockCard";
import { KnoxAlertModal } from "./KnoxAlertModal";
import { mockStocks, StockData } from "@/data/mockStocks";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("portfolio");
  const [selectedStock, setSelectedStock] = useState<StockData>(mockStocks[0]);
  const [showKnoxModal, setShowKnoxModal] = useState(false);
  const [alertStock, setAlertStock] = useState<StockData | null>(null);

  const handleBuyAttempt = (stock: StockData) => {
    if (stock.riskScore > 50) {
      setAlertStock(stock);
      setShowKnoxModal(true);
    }
  };

  const handleScanComplete = (stock: StockData) => {
    setSelectedStock(stock);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        <Header onStockSelect={setSelectedStock} selectedStock={selectedStock} />
        
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === "portfolio" && (
            <div className="space-y-6 animate-fade-in">
              {/* Stock Selector Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mockStocks.map((stock) => (
                  <StockCard
                    key={stock.ticker}
                    stock={stock}
                    onClick={() => setSelectedStock(stock)}
                    isSelected={selectedStock?.ticker === stock.ticker}
                  />
                ))}
              </div>

              {/* Main Analysis Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Risk Gauge */}
                <div className="lg:col-span-1">
                  <RiskGauge 
                    score={selectedStock?.riskScore || 0} 
                    riskLevel={selectedStock?.riskLevel || 'low'}
                    stockTicker={selectedStock?.ticker}
                  />
                  
                  {/* Simulation Panel */}
                  <div className="mt-6">
                    <SimulationPanel 
                      onScanComplete={handleScanComplete}
                      onBuyAttempt={handleBuyAttempt}
                    />
                  </div>
                </div>

                {/* 18-Point Checklist */}
                <div className="lg:col-span-2">
                  <SentinelChecklist items={selectedStock?.checklistResults || []} />
                </div>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Nominee Network */}
                <NomineeNetwork />
                
                {/* AI Fact Checker */}
                <AIFactChecker stockTicker={selectedStock?.ticker || ''} />
              </div>
            </div>
          )}

          {activeTab === "market" && (
            <div className="flex items-center justify-center h-[60vh] animate-fade-in">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Market Watch</h2>
                <p className="text-muted-foreground">Real-time SET market monitoring coming soon</p>
              </div>
            </div>
          )}

          {activeTab === "nominee" && (
            <div className="animate-fade-in">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">Nominee Network Analysis</h2>
                <p className="text-muted-foreground">Deep-dive into ownership structures</p>
              </div>
              <NomineeNetwork />
            </div>
          )}

          {activeTab === "settings" && (
            <div className="flex items-center justify-center h-[60vh] animate-fade-in">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-secondary/20 flex items-center justify-center">
                  <svg className="w-10 h-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Security Settings</h2>
                <p className="text-muted-foreground">Samsung Knox configuration & preferences</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Knox Alert Modal */}
      <KnoxAlertModal
        isOpen={showKnoxModal}
        onClose={() => setShowKnoxModal(false)}
        stockTicker={alertStock?.ticker || ''}
        riskScore={alertStock?.riskScore || 0}
      />
    </div>
  );
};
