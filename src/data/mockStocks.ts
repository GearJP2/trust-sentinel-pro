export interface StockData {
  ticker: string;
  name: string;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  price: number;
  change: number;
  volume: string;
  marketCap: string;
  pe: number | null;
  dividend: number;
  checklistResults: ChecklistItem[];
}

export interface ChecklistItem {
  id: number;
  name: string;
  nameThai: string;
  description: string;
  status: 'safe' | 'warning' | 'critical';
  category: 'governance' | 'financials' | 'trading' | 'ownership';
}

export const eighteenPointChecklist: Omit<ChecklistItem, 'status'>[] = [
  { id: 1, name: "Backdoor Listing", nameThai: "บริษัทเข้าตลาดทางหลังบ้าน", description: "Company acquired a listed shell to bypass IPO scrutiny. Often used to hide problematic histories.", category: 'governance' },
  { id: 2, name: "Frequent Name Changes", nameThai: "เปลี่ยนชื่อบ่อย", description: "Multiple name changes may indicate attempts to distance from past failures or scandals.", category: 'governance' },
  { id: 3, name: "Business Pivot", nameThai: "เปลี่ยนธุรกิจหลัก", description: "Drastic changes in core business without clear strategic rationale.", category: 'governance' },
  { id: 4, name: "Capital Increase", nameThai: "เพิ่มทุนบ่อย", description: "Frequent capital increases may dilute shareholders and fund questionable activities.", category: 'financials' },
  { id: 5, name: "No Dividends", nameThai: "ไม่จ่ายปันผล", description: "Profitable companies that never pay dividends raise questions about cash flow authenticity.", category: 'financials' },
  { id: 6, name: "Unusual Related Party Transactions", nameThai: "รายการระหว่างกัน", description: "Transactions with related parties that benefit insiders at shareholder expense.", category: 'governance' },
  { id: 7, name: "Auditor Changes", nameThai: "เปลี่ยนผู้สอบบัญชี", description: "Frequent auditor changes may indicate disagreements over accounting practices.", category: 'governance' },
  { id: 8, name: "Concentrated Ownership", nameThai: "ผู้ถือหุ้นกระจุกตัว", description: "Small group controls majority shares, limiting minority shareholder influence.", category: 'ownership' },
  { id: 9, name: "Nominee Shareholders", nameThai: "ผู้ถือหุ้นนอมินี", description: "Use of nominee accounts to hide true beneficial ownership.", category: 'ownership' },
  { id: 10, name: "Price Volatility", nameThai: "ราคาผันผวนผิดปกติ", description: "Unusual price movements not explained by fundamentals or news.", category: 'trading' },
  { id: 11, name: "Low Float Trading", nameThai: "หุ้นลอยตัวต่ำ", description: "Limited tradeable shares make price manipulation easier.", category: 'trading' },
  { id: 12, name: "Revenue Quality", nameThai: "คุณภาพรายได้", description: "Revenue from questionable sources or one-time gains presented as recurring.", category: 'financials' },
  { id: 13, name: "Cash vs Profit Mismatch", nameThai: "กำไรไม่เป็นเงินสด", description: "Reported profits not supported by operating cash flows.", category: 'financials' },
  { id: 14, name: "Inventory Issues", nameThai: "สินค้าคงคลังผิดปกติ", description: "Inventory levels inconsistent with sales or industry norms.", category: 'financials' },
  { id: 15, name: "Management Turnover", nameThai: "ผู้บริหารเปลี่ยนบ่อย", description: "High executive turnover may signal internal problems.", category: 'governance' },
  { id: 16, name: "Social Media Hype", nameThai: "ปั่นข่าวโซเชียล", description: "Coordinated social media campaigns to artificially boost stock price.", category: 'trading' },
  { id: 17, name: "SEC/SET Warnings", nameThai: "เตือนจาก ก.ล.ต./ตลท.", description: "Regulatory warnings or investigations from SEC or SET.", category: 'governance' },
  { id: 18, name: "Questionable Acquisitions", nameThai: "เข้าซื้อกิจการน่าสงสัย", description: "Acquisitions at inflated prices or of companies with no clear synergy.", category: 'governance' },
];

export const mockStocks: StockData[] = [
  {
    ticker: "PTT",
    name: "PTT Public Company Limited",
    riskScore: 8,
    riskLevel: 'low',
    price: 35.25,
    change: 0.75,
    volume: "45.2M",
    marketCap: "1.01T",
    pe: 8.5,
    dividend: 4.2,
    checklistResults: eighteenPointChecklist.map((item) => ({
      ...item,
      status: 'safe' as const,
    })),
  },
  {
    ticker: "KBANK",
    name: "Kasikornbank PCL",
    riskScore: 12,
    riskLevel: 'low',
    price: 142.50,
    change: -1.25,
    volume: "28.7M",
    marketCap: "340.8B",
    pe: 9.2,
    dividend: 3.8,
    checklistResults: eighteenPointChecklist.map((item, idx) => ({
      ...item,
      status: idx === 7 ? 'warning' as const : 'safe' as const,
    })),
  },
  {
    ticker: "JUNK-CO",
    name: "Junk Holdings International",
    riskScore: 95,
    riskLevel: 'critical',
    price: 2.45,
    change: 28.5,
    volume: "892.4M",
    marketCap: "4.2B",
    pe: null,
    dividend: 0,
    checklistResults: eighteenPointChecklist.map((item, idx) => ({
      ...item,
      status: [0, 1, 2, 3, 4, 5, 8, 9, 10, 12, 15, 16, 17].includes(idx) 
        ? 'critical' as const 
        : [6, 7, 11, 13, 14].includes(idx)
          ? 'warning' as const
          : 'safe' as const,
    })),
  },
  {
    ticker: "SCAM",
    name: "SCAM Technology Corp",
    riskScore: 98,
    riskLevel: 'critical',
    price: 0.85,
    change: 156.2,
    volume: "1.2B",
    marketCap: "850M",
    pe: null,
    dividend: 0,
    checklistResults: eighteenPointChecklist.map((item) => ({
      ...item,
      status: 'critical' as const,
    })),
  },
];

export const nomineeNetworkData = {
  nodes: [
    { id: "main", label: "JUNK-CO", type: "company", risk: "critical" },
    { id: "n1", label: "Nominee A", type: "nominee", risk: "critical" },
    { id: "n2", label: "Nominee B", type: "nominee", risk: "critical" },
    { id: "n3", label: "Shell Corp 1", type: "shell", risk: "warning" },
    { id: "n4", label: "Shell Corp 2", type: "shell", risk: "warning" },
    { id: "n5", label: "Offshore Ltd", type: "offshore", risk: "critical" },
    { id: "n6", label: "Trust Account", type: "trust", risk: "warning" },
    { id: "n7", label: "Nominee C", type: "nominee", risk: "critical" },
    { id: "n8", label: "Unknown Entity", type: "unknown", risk: "critical" },
    { id: "n9", label: "Family Member", type: "related", risk: "warning" },
    { id: "n10", label: "Nominee D", type: "nominee", risk: "critical" },
  ],
  links: [
    { source: "main", target: "n1" },
    { source: "main", target: "n2" },
    { source: "n1", target: "n3" },
    { source: "n1", target: "n4" },
    { source: "n2", target: "n5" },
    { source: "n3", target: "n6" },
    { source: "n4", target: "n7" },
    { source: "n5", target: "n8" },
    { source: "n6", target: "n9" },
    { source: "n7", target: "n10" },
    { source: "n8", target: "n10" },
    { source: "n9", target: "n1" },
    { source: "n10", target: "n3" },
  ],
};

export const aiAnalysisData = {
  "JUNK-CO": {
    companyPR: "We are excited to announce our revolutionary blockchain-AI-metaverse platform that will transform the digital economy. Our Q3 revenue grew 500% and we expect exponential growth.",
    actualFindings: [
      { type: "discrepancy", text: "Revenue increase is from one-time asset sales, not operations" },
      { type: "discrepancy", text: "Cash flow is negative despite reported profits" },
      { type: "discrepancy", text: "No verifiable blockchain or AI products found" },
      { type: "warning", text: "CEO previously involved in 2 failed penny stock companies" },
      { type: "critical", text: "SEC investigation pending for market manipulation" },
    ],
    summary: "High probability of promotional scheme. Claims are unsubstantiated by financial data.",
  },
  "PTT": {
    companyPR: "PTT continues its strategic transformation toward clean energy while maintaining stable returns for shareholders.",
    actualFindings: [
      { type: "verified", text: "Strong cash flow supports dividend payments" },
      { type: "verified", text: "Clean energy investments align with stated strategy" },
      { type: "note", text: "Government ownership provides stability but limits upside" },
    ],
    summary: "Low manipulation risk. Fundamentals align with public statements.",
  },
  "KBANK": {
    companyPR: "Kasikornbank maintains strong capital adequacy and continues digital banking innovation.",
    actualFindings: [
      { type: "verified", text: "NPL ratios within industry norms" },
      { type: "verified", text: "Digital transaction volume growth substantiated" },
      { type: "note", text: "Interest rate sensitivity is a sector-wide risk" },
    ],
    summary: "Low manipulation risk. Transparent financials with regulatory oversight.",
  },
};
