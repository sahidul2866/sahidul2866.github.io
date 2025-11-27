export interface ApMockRecord {
  DataSource: string;
  Co: string;
  VndNum: string;
  VndName: string;
  InvNum: string;
  InvDate: string; // ISO-like string
  InvAmt: number;
  AbsInvAmt: number;
  DiscAmt: number;
  TaxAmt: number;
  CurrCode: string;
  FY: number;
  PmtNum: string;
  PmtDate: string;
  PmtAmt: number;
  PmtTypeDesc: string;
  PoNum: string;
  VndType: string;
  APStatus: string;
  applytoinvamt: number;
  Terms: string;
  SUPPLIER_NUMBER: string;
  SITE_NAME: string;
  ARIBA_PO: string;
  INVOICE_SOURCE: string;
  PAYMENT_STATUS: string;
  LOCATION_ID: string;
  bInvAmt: number;
  bDiscAmt: number;
  bTaxAmt: number;
  DupeX: number;
  MatchInvNum: string;
  APID: string;
}
