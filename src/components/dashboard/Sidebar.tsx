import { useState } from "react";
import { Shield, BarChart3, Network, Settings, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "portfolio", label: "Portfolio Scan", icon: Search },
  { id: "market", label: "Market Watch", icon: BarChart3 },
  { id: "nominee", label: "Nominee Graph", icon: Network },
  { id: "settings", label: "Security Settings", icon: Settings },
];

export const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-blue">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="font-bold text-lg text-gradient-cyber">TrustSET</h1>
              <p className="text-xs text-muted-foreground">Value Investing Shield</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
              activeTab === item.id
                ? "bg-sidebar-accent text-sidebar-accent-foreground border border-primary/30 glow-blue"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 shrink-0",
              activeTab === item.id ? "text-primary" : ""
            )} />
            {!collapsed && (
              <span className="text-sm font-medium animate-fade-in">{item.label}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
