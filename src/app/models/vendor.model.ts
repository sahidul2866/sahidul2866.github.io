export interface Vendor {
  id: number;
  companyId: number;
  name: string;
  taxId?: string;
  address?: string;
  email?: string;
  phone?: string;
  contactName?: string;
  erpSource: string;
  totalSpendFY2025: number;
  totalSpendAllTime: number;
  riskScore: number;              // 0–100
  duplicateProbability: number;   // 0–1
  hasOpenInvoices: boolean;
  status: 'Active' | 'Inactive' | 'Excluded' | 'Review';
}
