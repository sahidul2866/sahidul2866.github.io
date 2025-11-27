export interface ApTransaction {
  id: number;
  vendorId: number;
  invoiceNumber: string;
  invoiceDate: string;    // ISO string
  amount: number;
  currency: string;
  fiscalYear: number;
  glAccount: string;
  status: 'Open' | 'Paid' | 'Reversed';
}
