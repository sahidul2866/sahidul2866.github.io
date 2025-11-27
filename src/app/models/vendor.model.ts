export interface Vendor {
  id: number;
  name: string;
  taxId?: string;
  erpSource: string;
  totalSpendFY2025: number;
  totalSpendAllTime: number;
  riskScore: number;              // 0–100
  duplicateProbability: number;   // 0–1
  hasOpenInvoices: boolean;
  status: 'Active' | 'Inactive' | 'Excluded' | 'Review';
}
