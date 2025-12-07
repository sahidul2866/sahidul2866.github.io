import { Injectable } from '@angular/core';
import { ApTransaction } from '../models/ap-transaction.model';
import { ApMockRecord } from '../models/ap-mock-record.model';
import { DuplicateGroup } from '../models/duplicate-group.model';
import { Company } from '../models/company.model';
import { Vendor } from '../models/vendor.model';
import { VmSheet } from '../models/vm-sheet.model';

interface ReviewerNote {
  author: string;
  note: string;
  createdAt: string; // ISO string
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  private vmSheets: VmSheet[] = [];

  private companies: Company[] = [
    {
      id: 201,
      name: 'McCain',
      region: 'US & Canada',
      industry: 'Retail & E-commerce',
      erpSystems: ['SAP', 'Oracle'],
      vendorCount: 3,
      annualSpend: 5200000
    },
    {
      id: 202,
      name: 'Alorica',
      region: 'US East',
      industry: 'Business Services',
      erpSystems: ['NetSuite'],
      vendorCount: 2,
      annualSpend: 4300000
    },
    {
      id: 203,
      name: 'ABM',
      region: 'US Central',
      industry: 'Facilities',
      erpSystems: ['SAP'],
      vendorCount: 2,
      annualSpend: 4100000
    },
    {
      id: 204,
      name: 'Citizens',
      region: 'US',
      industry: 'Financial Services',
      erpSystems: ['Oracle'],
      vendorCount: 3,
      annualSpend: 3750000
    },
    {
      id: 205,
      name: 'Aestella',
      region: 'EU',
      industry: 'Professional Services',
      erpSystems: ['QuickBooks'],
      vendorCount: 4,
      annualSpend: 3600000
    }
  ];

  private vendors: Vendor[] = [
    {
      id: 1,
      companyId: 202,
      name: 'Alorica Inc.',
      taxId: '12-3456789',
      address: '100 Pine St, San Francisco, CA',
      email: 'finance@alorica.com',
      phone: '+1 415-555-1001',
      contactName: 'Lisa Chan',
      erpSource: 'NetSuite',
      totalSpendFY2025: 1250000,
      totalSpendAllTime: 7850000,
      riskScore: 82,
      duplicateProbability: 0.76,
      hasOpenInvoices: true,
      status: 'Review'
    },
    {
      id: 2,
      companyId: 203,
      name: 'ABM Services LLC',
      taxId: '98-7654321',
      address: '200 Market St, Chicago, IL',
      email: 'ap@abmservices.com',
      phone: '+1 312-555-2200',
      erpSource: 'SAP',
      totalSpendFY2025: 980000,
      totalSpendAllTime: 15200000,
      riskScore: 35,
      duplicateProbability: 0.12,
      hasOpenInvoices: false,
      status: 'Active'
    },
    {
      id: 3,
      companyId: 201,
      name: 'TFG Supplies',
      taxId: '45-1112233',
      email: 'orders@tfgsupplies.com',
      phone: '+1 512-555-4401',
      erpSource: 'QuickBooks',
      totalSpendFY2025: 310000,
      totalSpendAllTime: 1250000,
      riskScore: 55,
      duplicateProbability: 0.43,
      hasOpenInvoices: true,
      status: 'Review'
    },
    {
      id: 4,
      companyId: 205,
      name: 'Northwind Traders',
      taxId: '78-2223344',
      address: '12 River Rd, Dublin, IE',
      erpSource: 'Oracle',
      totalSpendFY2025: 565000,
      totalSpendAllTime: 3400000,
      riskScore: 28,
      duplicateProbability: 0.08,
      hasOpenInvoices: false,
      status: 'Active'
    },
    {
      id: 5,
      companyId: 204,
      name: 'Urban Logistics Co.',
      taxId: '91-5551234',
      address: '780 Hudson Ave, Newark, NJ',
      email: 'ops@urbanlogistics.co',
      erpSource: 'SAP',
      totalSpendFY2025: 1780000,
      totalSpendAllTime: 9200000,
      riskScore: 74,
      duplicateProbability: 0.32,
      hasOpenInvoices: true,
      status: 'Review'
    },
    {
      id: 6,
      companyId: 205,
      name: 'Brighton University',
      taxId: '81-6655334',
      address: '1 College Rd, Brighton, MA',
      contactName: 'Alicia Parker',
      erpSource: 'NetSuite',
      totalSpendFY2025: 220000,
      totalSpendAllTime: 890000,
      riskScore: 18,
      duplicateProbability: 0.05,
      hasOpenInvoices: false,
      status: 'Active'
    },
    {
      id: 7,
      companyId: 204,
      name: 'First National Bank',
      taxId: '99-0044221',
      phone: '+1 212-555-9944',
      erpSource: 'QuickBooks',
      totalSpendFY2025: 430000,
      totalSpendAllTime: 2100000,
      riskScore: 65,
      duplicateProbability: 0.21,
      hasOpenInvoices: true,
      status: 'Review'
    },
    {
      id: 8,
      companyId: 201,
      name: 'Urban Logistics Co.',
      taxId: '91-5551234',
      phone: '+1 973-555-8877',
      erpSource: 'QuickBooks',
      totalSpendFY2025: 240000,
      totalSpendAllTime: 910000,
      riskScore: 58,
      duplicateProbability: 0.36,
      hasOpenInvoices: false,
      status: 'Active'
    },
    {
      id: 9,
      companyId: 205,
      name: 'Alorica Inc.',
      taxId: '12-3456789',
      email: 'ap@alorica.com',
      erpSource: 'NetSuite',
      totalSpendFY2025: 355000,
      totalSpendAllTime: 1200000,
      riskScore: 44,
      duplicateProbability: 0.41,
      hasOpenInvoices: true,
      status: 'Review'
    },
    {
      id: 10,
      companyId: 203,
      name: 'Brighton University',
      taxId: '81-6655334',
      email: 'finance@brighton.edu',
      phone: '+44 20 7946 0012',
      erpSource: 'Oracle',
      totalSpendFY2025: 125000,
      totalSpendAllTime: 450000,
      riskScore: 22,
      duplicateProbability: 0.12,
      hasOpenInvoices: false,
      status: 'Active'
    },
    {
      id: 11,
      companyId: 204,
      name: 'Citizens Medical Partners',
      taxId: '55-8899001',
      address: '99 Broad St, Boston, MA',
      email: 'info@citizensmed.com',
      phone: '+1 617-555-1900',
      erpSource: 'Oracle',
      totalSpendFY2025: 290000,
      totalSpendAllTime: 980000,
      riskScore: 48,
      duplicateProbability: 0.18,
      hasOpenInvoices: true,
      status: 'Review'
    },
    {
      id: 12,
      companyId: 205,
      name: 'Aestella Creative Co.',
      taxId: '66-2299113',
      address: '14 Shoreline Ave, Lisbon, PT',
      email: 'hello@aestella.co',
      phone: '+351 21 555 1000',
      erpSource: 'QuickBooks',
      totalSpendFY2025: 175000,
      totalSpendAllTime: 620000,
      riskScore: 31,
      duplicateProbability: 0.11,
      hasOpenInvoices: false,
      status: 'Active'
    },
    {
      id: 13,
      companyId: 201,
      name: 'McCain Foods Supply',
      taxId: '21-5558899',
      address: '250 Commerce Rd, Denver, CO',
      email: 'supply@mccainfoods.com',
      phone: '+1 720-555-4455',
      erpSource: 'SAP',
      totalSpendFY2025: 640000,
      totalSpendAllTime: 2100000,
      riskScore: 52,
      duplicateProbability: 0.19,
      hasOpenInvoices: true,
      status: 'Active'
    },
    {
      id: 14,
      companyId: 202,
      name: 'ABM Services LLC',
      taxId: '98-7654321',
      email: 'hq@abmservices.com',
      erpSource: 'NetSuite',
      totalSpendFY2025: 510000,
      totalSpendAllTime: 1670000,
      riskScore: 39,
      duplicateProbability: 0.22,
      hasOpenInvoices: true,
      status: 'Review'
    }
  ];

  private apTransactions: ApTransaction[] = [
    {
      id: 101,
      vendorId: 1,
      invoiceNumber: 'INV-2025-001',
      invoiceDate: '2025-01-15',
      amount: 120000,
      currency: 'USD',
      fiscalYear: 2025,
      glAccount: '6000 – Professional Services',
      status: 'Paid'
    },
    {
      id: 102,
      vendorId: 1,
      invoiceNumber: 'INV-2025-052',
      invoiceDate: '2025-03-01',
      amount: 250000,
      currency: 'USD',
      fiscalYear: 2025,
      glAccount: '6000 – Professional Services',
      status: 'Open'
    },
    {
      id: 103,
      vendorId: 2,
      invoiceNumber: 'ABM-8892',
      invoiceDate: '2025-02-10',
      amount: 450000,
      currency: 'USD',
      fiscalYear: 2025,
      glAccount: '6100 – Facilities',
      status: 'Paid'
    },
    {
      id: 104,
      vendorId: 3,
      invoiceNumber: 'TFG-7755',
      invoiceDate: '2025-04-22',
      amount: 145000,
      currency: 'USD',
      fiscalYear: 2025,
      glAccount: '6200 – Office Supplies',
      status: 'Open'
    },
    {
      id: 105,
      vendorId: 4,
      invoiceNumber: 'ORC-9901',
      invoiceDate: '2024-11-18',
      amount: 98000,
      currency: 'USD',
      fiscalYear: 2024,
      glAccount: '6100 – Facilities',
      status: 'Paid'
    },
    {
      id: 106,
      vendorId: 5,
      invoiceNumber: 'ULC-5567',
      invoiceDate: '2025-02-09',
      amount: 625000,
      currency: 'USD',
      fiscalYear: 2025,
      glAccount: '6300 – Logistics',
      status: 'Open'
    },
    {
      id: 107,
      vendorId: 5,
      invoiceNumber: 'ULC-2101',
      invoiceDate: '2024-12-30',
      amount: 1100000,
      currency: 'USD',
      fiscalYear: 2024,
      glAccount: '6300 – Logistics',
      status: 'Paid'
    },
    {
      id: 108,
      vendorId: 6,
      invoiceNumber: 'BU-1001',
      invoiceDate: '2025-01-09',
      amount: 52000,
      currency: 'USD',
      fiscalYear: 2025,
      glAccount: '6400 – Training',
      status: 'Paid'
    },
    {
      id: 109,
      vendorId: 7,
      invoiceNumber: 'FNB-0099',
      invoiceDate: '2025-03-11',
      amount: 330000,
      currency: 'USD',
      fiscalYear: 2025,
      glAccount: '6500 – Financial Services',
      status: 'Reversed'
    },
    {
      id: 110,
      vendorId: 7,
      invoiceNumber: 'FNB-0190',
      invoiceDate: '2025-03-25',
      amount: 410000,
      currency: 'USD',
      fiscalYear: 2025,
      glAccount: '6500 – Financial Services',
      status: 'Open'
    }
  ];

  private duplicateGroups: DuplicateGroup[] = [
    {
      groupId: 1001,
      confidence: 0.91,
      reason: 'Matched on tax ID + email + name similarity',
      vendors: [] // will set in constructor
    },
    {
      groupId: 1002,
      confidence: 0.73,
      reason: 'Bank account + address similarity',
      vendors: []
    },
    {
      groupId: 1003,
      confidence: 0.61,
      reason: 'Fuzzy name + GL overlap, different ERP',
      vendors: []
    }
  ];

  private reviewerNotes: Record<number, ReviewerNote[]> = {};
  private apMock: ApMockRecord[] = [
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '10569-SYRACUSE-2',
      VndName: 'DUPLI ENVELOPE AND GRAPHICS',
      InvNum: '052501572600',
      InvDate: '2024-01-02',
      InvAmt: 43.56,
      AbsInvAmt: 43.56,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '25358',
      PmtDate: '2024-01-03',
      PmtAmt: 8895.18,
      PmtTypeDesc: 'PAYMODE-X',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 43.56,
      Terms: '',
      SUPPLIER_NUMBER: '10569',
      SITE_NAME: 'SYRACUSE-2',
      ARIBA_PO: 'PO330070',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 43.56,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 1,
      MatchInvNum: '52501572600',
      APID: '127870'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '38706-BOSTON-2',
      VndName: 'WB MASON CO INC',
      InvNum: '245379767',
      InvDate: '2024-03-21',
      InvAmt: 21.47,
      AbsInvAmt: 21.47,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '25378',
      PmtDate: '2024-03-25',
      PmtAmt: 15172.29,
      PmtTypeDesc: 'AAP',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 21.47,
      Terms: '',
      SUPPLIER_NUMBER: '38706',
      SITE_NAME: 'BOSTON-2',
      ARIBA_PO: 'C12335-V4-R102569',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 21.47,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 1,
      MatchInvNum: '245379767',
      APID: '127996'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '122706-WILMINGTON-1',
      VndName: 'STANDARD ELECTRIC SUPPLY',
      InvNum: 'S124761837.002',
      InvDate: '2024-02-12',
      InvAmt: 1428.88,
      AbsInvAmt: 1428.88,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '25639',
      PmtDate: '2024-02-16',
      PmtAmt: 30576.76,
      PmtTypeDesc: 'PAYMODE-X',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 1428.88,
      Terms: '',
      SUPPLIER_NUMBER: '122706',
      SITE_NAME: 'WILMINGTON-1',
      ARIBA_PO: 'PO339599',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 1428.88,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 1,
      MatchInvNum: '124761837002',
      APID: '140426'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '115531-CINCINNATI-1',
      VndName: 'GEIGER',
      InvNum: '5644748',
      InvDate: '2024-09-13',
      InvAmt: 190.18,
      AbsInvAmt: 190.18,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '2139025',
      PmtDate: '2024-10-24',
      PmtAmt: 13030.54,
      PmtTypeDesc: 'EFT',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 190.18,
      Terms: '',
      SUPPLIER_NUMBER: '115531',
      SITE_NAME: 'CINCINNATI-1',
      ARIBA_PO: 'C13568-V5-R23962',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 190.18,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 2,
      MatchInvNum: '5644748',
      APID: '128032'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '125159-PITTSBURGH-1',
      VndName: 'MTS GROUP LLC',
      InvNum: 'A67361',
      InvDate: '2024-03-29',
      InvAmt: 599.0,
      AbsInvAmt: 599.0,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '2115404',
      PmtDate: '2024-05-09',
      PmtAmt: 1797.0,
      PmtTypeDesc: 'EFT',
      PoNum: '',
      VndType: 'BI ONLY',
      APStatus: '',
      applytoinvamt: 599.0,
      Terms: '',
      SUPPLIER_NUMBER: '125159',
      SITE_NAME: 'PITTSBURGH-1',
      ARIBA_PO: '',
      INVOICE_SOURCE: 'EMW',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 599.0,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 0,
      MatchInvNum: '67361',
      APID: '140470'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '38706-BOSTON-2',
      VndName: 'WB MASON CO INC',
      InvNum: '243830554',
      InvDate: '2024-01-12',
      InvAmt: 70.02,
      AbsInvAmt: 70.02,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '24881',
      PmtDate: '2024-01-16',
      PmtAmt: 27103.57,
      PmtTypeDesc: 'AAP',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 70.02,
      Terms: '',
      SUPPLIER_NUMBER: '38706',
      SITE_NAME: 'BOSTON-2',
      ARIBA_PO: 'C12335-V4-R91892',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 70.02,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 1,
      MatchInvNum: '243830554',
      APID: '128061'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '38706-BOSTON-2',
      VndName: 'WB MASON CO INC',
      InvNum: '249441396',
      InvDate: '2024-09-30',
      InvAmt: 53.75,
      AbsInvAmt: 53.75,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '26957',
      PmtDate: '2024-10-01',
      PmtAmt: 43663.77,
      PmtTypeDesc: 'AAP',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 53.75,
      Terms: '',
      SUPPLIER_NUMBER: '38706',
      SITE_NAME: 'BOSTON-2',
      ARIBA_PO: 'C12335-V4-R124522',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 53.75,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 2,
      MatchInvNum: '249441396',
      APID: '140497'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '21655-DALLAS-6',
      VndName: 'KPMG LLP',
      InvNum: '7000435232',
      InvDate: '2023-12-15',
      InvAmt: 392000.0,
      AbsInvAmt: 392000.0,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2023,
      PmtNum: '2099083',
      PmtDate: '2024-01-10',
      PmtAmt: 410000.0,
      PmtTypeDesc: 'EFT',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 392000.0,
      Terms: '',
      SUPPLIER_NUMBER: '21655',
      SITE_NAME: 'DALLAS-6',
      ARIBA_PO: 'BPO15322',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 392000.0,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 1,
      MatchInvNum: '7000435232',
      APID: '128107'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '86393-AUSTIN-1',
      VndName: 'MOOD MEDIA',
      InvNum: '5591093',
      InvDate: '2024-02-22',
      InvAmt: 514.42,
      AbsInvAmt: 514.42,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '2105624',
      PmtDate: '2024-02-29',
      PmtAmt: 954.23,
      PmtTypeDesc: 'EFT',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 514.42,
      Terms: '',
      SUPPLIER_NUMBER: '86393',
      SITE_NAME: 'AUSTIN-1',
      ARIBA_PO: '',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 514.42,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 1,
      MatchInvNum: '5591093',
      APID: '140516'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '38706-BOSTON-2',
      VndName: 'WB MASON CO INC',
      InvNum: '250638384',
      InvDate: '2024-11-21',
      InvAmt: 8.25,
      AbsInvAmt: 8.25,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '27436',
      PmtDate: '2024-11-25',
      PmtAmt: 44069.58,
      PmtTypeDesc: 'AAP',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 8.25,
      Terms: '',
      SUPPLIER_NUMBER: '38706',
      SITE_NAME: 'BOSTON-2',
      ARIBA_PO: 'C12335-V4-R133693',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 8.25,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 0,
      MatchInvNum: '250638384',
      APID: '128127'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '38706-BOSTON-2',
      VndName: 'WB MASON CO INC',
      InvNum: '244490713',
      InvDate: '2024-02-12',
      InvAmt: 72.61,
      AbsInvAmt: 72.61,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '25075',
      PmtDate: '2024-02-13',
      PmtAmt: 47222.31,
      PmtTypeDesc: 'AAP',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 72.61,
      Terms: '',
      SUPPLIER_NUMBER: '38706',
      SITE_NAME: 'BOSTON-2',
      ARIBA_PO: 'C12335-V4-R97477',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 72.61,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 0,
      MatchInvNum: '244490713',
      APID: '140557'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '98107-PHILADELPHIA-1',
      VndName: 'HELLYER LEWIS SMITH INC',
      InvNum: '0082846',
      InvDate: '2024-07-15',
      InvAmt: 3120.0,
      AbsInvAmt: 3120.0,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '2129765',
      PmtDate: '2024-08-26',
      PmtAmt: 65313.8,
      PmtTypeDesc: 'EFT',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 3120.0,
      Terms: '',
      SUPPLIER_NUMBER: '98107',
      SITE_NAME: 'PHILADELPHIA-1',
      ARIBA_PO: 'C17147-R6',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 3120.0,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 0,
      MatchInvNum: '82846',
      APID: '128146'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '38706-BOSTON-2',
      VndName: 'WB MASON CO INC',
      InvNum: '249346819',
      InvDate: '2024-09-24',
      InvAmt: 137.67,
      AbsInvAmt: 137.67,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '26920',
      PmtDate: '2024-09-26',
      PmtAmt: 20289.77,
      PmtTypeDesc: 'AAP',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 137.67,
      Terms: '',
      SUPPLIER_NUMBER: '38706',
      SITE_NAME: 'BOSTON-2',
      ARIBA_PO: 'C12335-V4-R126328',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 137.67,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 0,
      MatchInvNum: '249346819',
      APID: '140614'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '31147-CONCORD-1',
      VndName: 'SKS MAINTENANCE SERVICES INC',
      InvNum: '5636',
      InvDate: '2024-10-22',
      InvAmt: 7800.0,
      AbsInvAmt: 7800.0,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '2139007',
      PmtDate: '2024-10-24',
      PmtAmt: 10873.05,
      PmtTypeDesc: 'EFT',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 7800.0,
      Terms: '',
      SUPPLIER_NUMBER: '31147',
      SITE_NAME: 'CONCORD-1',
      ARIBA_PO: 'C14856-R372',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 7800.0,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 0,
      MatchInvNum: '5636',
      APID: '128208'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '38706-BOSTON-2',
      VndName: 'WB MASON CO INC',
      InvNum: '248587087',
      InvDate: '2024-08-20',
      InvAmt: 7.4,
      AbsInvAmt: 7.4,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '26618',
      PmtDate: '2024-08-22',
      PmtAmt: 108089.29,
      PmtTypeDesc: 'AAP',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 7.4,
      Terms: '',
      SUPPLIER_NUMBER: '38706',
      SITE_NAME: 'BOSTON-2',
      ARIBA_PO: 'C12335-V4-R121793',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 7.4,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 0,
      MatchInvNum: '248587087',
      APID: '140636'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '38706-BOSTON-2',
      VndName: 'WB MASON CO INC',
      InvNum: '247267891',
      InvDate: '2024-06-18',
      InvAmt: 64.72,
      AbsInvAmt: 64.72,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '26057',
      PmtDate: '2024-06-20',
      PmtAmt: 33378.37,
      PmtTypeDesc: 'AAP',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 64.72,
      Terms: '',
      SUPPLIER_NUMBER: '38706',
      SITE_NAME: 'BOSTON-2',
      ARIBA_PO: 'C12335-V4-R114283',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 64.72,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 0,
      MatchInvNum: '247267891',
      APID: '128244'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '68405-SAN DIEGO-4',
      VndName: 'INTERNATIONAL VALUATION GROUP LLC',
      InvNum: '1237868',
      InvDate: '2024-12-04',
      InvAmt: 770.0,
      AbsInvAmt: 770.0,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '2149686',
      PmtDate: '2024-12-30',
      PmtAmt: 11483.0,
      PmtTypeDesc: 'EFT',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 770.0,
      Terms: '',
      SUPPLIER_NUMBER: '68405',
      SITE_NAME: 'SAN DIEGO-4',
      ARIBA_PO: '',
      INVOICE_SOURCE: 'EMW',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 770.0,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 0,
      MatchInvNum: '1237868',
      APID: '140687'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '38706-BOSTON-2',
      VndName: 'WB MASON CO INC',
      InvNum: '248301180',
      InvDate: '2024-08-07',
      InvAmt: 12.94,
      AbsInvAmt: 12.94,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '26511',
      PmtDate: '2024-08-09',
      PmtAmt: 26234.9,
      PmtTypeDesc: 'AAP',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 12.94,
      Terms: '',
      SUPPLIER_NUMBER: '38706',
      SITE_NAME: 'BOSTON-2',
      ARIBA_PO: 'C12335-V4-R118232',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 12.94,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 0,
      MatchInvNum: '248301180',
      APID: '128279'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '48684-CHICAGO-1',
      VndName: 'RR DONNELLEY',
      InvNum: '421600137R',
      InvDate: '2024-06-09',
      InvAmt: 73838.88,
      AbsInvAmt: 73838.88,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '2123380',
      PmtDate: '2024-07-03',
      PmtAmt: 100273.0,
      PmtTypeDesc: 'EFT',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 73838.88,
      Terms: '',
      SUPPLIER_NUMBER: '48684',
      SITE_NAME: 'CHICAGO-1',
      ARIBA_PO: 'BPO10680',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 73838.88,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 0,
      MatchInvNum: '421600137',
      APID: '140695'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '139948-MANCHESTER-1',
      VndName: 'GYK ANTLER LLC',
      InvNum: '29580',
      InvDate: '2024-01-24',
      InvAmt: 65034.0,
      AbsInvAmt: 65034.0,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '2101603',
      PmtDate: '2024-01-29',
      PmtAmt: 65034.0,
      PmtTypeDesc: 'EFT',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 65034.0,
      Terms: '',
      SUPPLIER_NUMBER: '139948',
      SITE_NAME: 'MANCHESTER-1',
      ARIBA_PO: '',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 65034.0,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 0,
      MatchInvNum: '29580',
      APID: '128304'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '55501-NYC-1',
      VndName: 'ACME CLEANING CO',
      InvNum: 'AC-5521',
      InvDate: '2024-05-05',
      InvAmt: 820.5,
      AbsInvAmt: 820.5,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '26550',
      PmtDate: '2024-05-10',
      PmtAmt: 820.5,
      PmtTypeDesc: 'ACH',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 820.5,
      Terms: '',
      SUPPLIER_NUMBER: '55501',
      SITE_NAME: 'NYC-1',
      ARIBA_PO: '',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 820.5,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 0,
      MatchInvNum: 'AC5521',
      APID: '150001'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '77788-DENVER-1',
      VndName: 'ROCKY OFFICE SUPPLY',
      InvNum: 'ROS-9088',
      InvDate: '2024-07-02',
      InvAmt: 142.75,
      AbsInvAmt: 142.75,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '27123',
      PmtDate: '2024-07-07',
      PmtAmt: 142.75,
      PmtTypeDesc: 'AAP',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 142.75,
      Terms: '',
      SUPPLIER_NUMBER: '77788',
      SITE_NAME: 'DENVER-1',
      ARIBA_PO: '',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 142.75,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 1,
      MatchInvNum: 'ROS9088',
      APID: '150002'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '21655-DALLAS-6',
      VndName: 'KPMG LLP',
      InvNum: '7000999999',
      InvDate: '2024-02-18',
      InvAmt: 185000.0,
      AbsInvAmt: 185000.0,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '2110011',
      PmtDate: '2024-03-01',
      PmtAmt: 185000.0,
      PmtTypeDesc: 'EFT',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 185000.0,
      Terms: '',
      SUPPLIER_NUMBER: '21655',
      SITE_NAME: 'DALLAS-6',
      ARIBA_PO: 'BPO15322',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 185000.0,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 2,
      MatchInvNum: '7000999999',
      APID: '150003'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '90110-MIAMI-1',
      VndName: 'SUNSHINE PRINTING',
      InvNum: 'SP-4501',
      InvDate: '2023-11-29',
      InvAmt: 380.2,
      AbsInvAmt: 380.2,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2023,
      PmtNum: '2055001',
      PmtDate: '2023-12-05',
      PmtAmt: 380.2,
      PmtTypeDesc: 'CHECK',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 380.2,
      Terms: '',
      SUPPLIER_NUMBER: '90110',
      SITE_NAME: 'MIAMI-1',
      ARIBA_PO: '',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 380.2,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 0,
      MatchInvNum: 'SP4501',
      APID: '150004'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '86393-AUSTIN-1',
      VndName: 'MOOD MEDIA',
      InvNum: '5591093-DUP',
      InvDate: '2024-03-02',
      InvAmt: 514.42,
      AbsInvAmt: 514.42,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '2107777',
      PmtDate: '2024-03-08',
      PmtAmt: 514.42,
      PmtTypeDesc: 'EFT',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 514.42,
      Terms: '',
      SUPPLIER_NUMBER: '86393',
      SITE_NAME: 'AUSTIN-1',
      ARIBA_PO: '',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 514.42,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 1,
      MatchInvNum: '5591093',
      APID: '150005'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '64001-SEATTLE-1',
      VndName: 'PACIFIC IT SERVICES',
      InvNum: 'PIT-8891',
      InvDate: '2024-04-18',
      InvAmt: 12950.75,
      AbsInvAmt: 12950.75,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '2123456',
      PmtDate: '2024-04-25',
      PmtAmt: 12950.75,
      PmtTypeDesc: 'EFT',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 12950.75,
      Terms: '',
      SUPPLIER_NUMBER: '64001',
      SITE_NAME: 'SEATTLE-1',
      ARIBA_PO: '',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 12950.75,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 0,
      MatchInvNum: 'PIT8891',
      APID: '150006'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '88012-CHICAGO-2',
      VndName: 'WINDY CITY LOGISTICS',
      InvNum: 'WCL-4412',
      InvDate: '2024-06-03',
      InvAmt: 245000,
      AbsInvAmt: 245000,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '2134004',
      PmtDate: '2024-06-12',
      PmtAmt: 245000,
      PmtTypeDesc: 'ACH',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 245000,
      Terms: '',
      SUPPLIER_NUMBER: '88012',
      SITE_NAME: 'CHICAGO-2',
      ARIBA_PO: '',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 245000,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 2,
      MatchInvNum: 'WCL4412',
      APID: '150007'
    },
    {
      DataSource: 'Ora250403',
      Co: '',
      VndNum: '99001-LA-1',
      VndName: 'SUNSET MEDIA LABS',
      InvNum: 'SML-2024-09',
      InvDate: '2024-09-09',
      InvAmt: 9875.4,
      AbsInvAmt: 9875.4,
      DiscAmt: 0,
      TaxAmt: 0,
      CurrCode: 'USD',
      FY: 2024,
      PmtNum: '2151010',
      PmtDate: '2024-09-15',
      PmtAmt: 9875.4,
      PmtTypeDesc: 'EFT',
      PoNum: '',
      VndType: 'VENDOR',
      APStatus: '',
      applytoinvamt: 9875.4,
      Terms: '',
      SUPPLIER_NUMBER: '99001',
      SITE_NAME: 'LA-1',
      ARIBA_PO: '',
      INVOICE_SOURCE: 'ARINP',
      PAYMENT_STATUS: 'NEGOTIABLE',
      LOCATION_ID: '',
      bInvAmt: 9875.4,
      bDiscAmt: 0,
      bTaxAmt: 0,
      DupeX: 1,
      MatchInvNum: 'SML202409',
      APID: '150008'
    }
  ];

  constructor() {
    // wire vendors into duplicate group safely after vendors are defined
    const byName = (name: string) => this.vendors.filter(v => v.name === name);
    this.duplicateGroups[0].vendors = byName('Alorica Inc.');
    this.duplicateGroups[1].vendors = byName('ABM Services LLC');
    this.duplicateGroups[2].vendors = byName('Urban Logistics Co.');
    this.reviewerNotes[1] = [
      { author: 'Auditor A', note: 'Validate tax ID vs W9 before payment.', createdAt: '2025-03-03' }
    ];
    // distribute AP mock records across companies for filtering
    let i = 0;
    this.apMock = this.apMock.map(r => ({
      ...r,
      companyId: this.companies[i++ % this.companies.length].id
    }));
    this.vmSheets = this.buildVmSheets();
  }

  getCompanies(): Company[] {
    return this.companies;
  }

  getCompanyById(id: number): Company | undefined {
    return this.companies.find(c => c.id === id);
  }

  getVendors(): Vendor[] {
    return this.vendors;
  }

  getVendorsByCompany(companyId: number): Vendor[] {
    return this.vendors.filter(v => v.companyId === companyId);
  }

  getVendorById(id: number): Vendor | undefined {
    return this.vendors.find(v => v.id === id);
  }

  updateVendor(partial: Partial<Vendor> & { id: number }): Vendor | undefined {
    const idx = this.vendors.findIndex(v => v.id === partial.id);
    if (idx === -1) return undefined;
    this.vendors[idx] = { ...this.vendors[idx], ...partial };
    return this.vendors[idx];
  }

  getCentralVendorGroups(): { name: string; vendors: Vendor[] }[] {
    const groups: Record<string, Vendor[]> = {};
    this.vendors.forEach(v => {
      const key = v.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (!groups[key]) groups[key] = [];
      groups[key].push(v);
    });
    return Object.keys(groups)
      .map(key => ({
        name: groups[key][0].name,
        vendors: groups[key]
      }))
      .filter(g => g.vendors.length > 1);
  }

  getApTransactionsForVendor(vendorId: number): ApTransaction[] {
    return this.apTransactions.filter(tx => tx.vendorId === vendorId);
  }

  getApMockData(companyId?: number): ApMockRecord[] {
    if (!companyId) return this.apMock;
    return this.apMock.filter(r => r.companyId === companyId);
  }

  getDuplicateGroups(companyId?: number): DuplicateGroup[] {
    const base = this.duplicateGroups.map(g => ({ ...g, vendors: [...g.vendors] }));
    if (!companyId) {
      return base;
    }
    return base
      .map(g => ({ ...g, vendors: g.vendors.filter(v => v.companyId === companyId) }))
      .filter(g => g.vendors.length > 1);
  }

  keepOnlyVendorInGroup(groupId: number, vendorId: number): { group: DuplicateGroup; mergeSummary?: any } | undefined {
    const idx = this.duplicateGroups.findIndex(g => g.groupId === groupId);
    if (idx === -1) return undefined;
    const keep = this.duplicateGroups[idx].vendors.find(v => v.id === vendorId);
    if (!keep) return undefined;
    const toMerge = this.duplicateGroups[idx].vendors.filter(v => v.id !== vendorId).map(v => v.id);
    const mergeSummary = this.mergeVendors(keep.id, toMerge);
    this.duplicateGroups[idx] = { ...this.duplicateGroups[idx], vendors: [keep] };
    return { group: this.duplicateGroups[idx], mergeSummary };
  }

  getReviewerNotes(vendorId: number): ReviewerNote[] {
    return this.reviewerNotes[vendorId] ?? [];
  }

  addReviewerNote(vendorId: number, author: string, note: string) {
    const entry: ReviewerNote = {
      author,
      note,
      createdAt: new Date().toISOString().slice(0, 10)
    };
    if (!this.reviewerNotes[vendorId]) {
      this.reviewerNotes[vendorId] = [];
    }
    this.reviewerNotes[vendorId].unshift(entry);
  }

  getStats() {
    const totalSpend = this.vendors.reduce((sum, v) => sum + v.totalSpendFY2025, 0);
    const totalVendors = this.vendors.length;
    const highRisk = this.vendors.filter(v => v.riskScore >= 70).length;
    const duplicates = this.duplicateGroups.length;

    return {
      totalSpendFY2025: totalSpend,
      totalVendors,
      highRiskVendors: highRisk,
      duplicateGroups: duplicates
    };
  }

  getDuplicateRecoveryStats() {
    const dupVendorIds = new Set<number>();
    this.duplicateGroups.forEach(g => g.vendors.forEach(v => dupVendorIds.add(v.id)));
    const dupTx = this.apTransactions.filter(tx => dupVendorIds.has(tx.vendorId));
    const potentialRecovery = dupTx.reduce((sum, tx) => sum + tx.amount, 0);
    const openInvoices = dupTx.filter(tx => tx.status === 'Open').length;
    const totalDupVendors = Array.from(dupVendorIds).length;
    return {
      groups: this.duplicateGroups.length,
      dupVendors: totalDupVendors,
      potentialRecovery,
      openInvoices
    };
  }

  getVmSheets(): VmSheet[] {
    return this.vmSheets;
  }

  private buildVmSheets(): VmSheet[] {
    const headers = [
      'ExcludeReason',
      'DataSource',
      'VendorTagConfidence',
      'Co',
      'vendor_id',
      'company_name',
      'company_name_alt',
      'parent_vendor_id',
      'parent_company_name',
      'tax_id',
      'TaxIDSource',
      'TaxIDMatchLogic',
      'country',
      'CountrySource',
      'Data_Quality_Score',
      'supplier_group',
      'SupplierGroupSource',
      'vendor_type',
      'VendorTypeSource',
      'VMSupplierID',
      'vm_supplier_name',
      'vm_supplier_name_alt',
      'vm_vendor_type',
      'vm_tax_id',
      'vm_country',
      'vm_Data_Quality_Score',
      'FY2015_spend',
      'FY2016_spend',
      'FY2017_spend',
      'FY2018_spend',
      'FY2019_spend',
      'FY2020_spend',
      'FY2021_spend',
      'FY2022_spend',
      'FY2023_spend',
      'FY2024_spend',
      'FY2025_spend',
      'persistentVendorFlag',
      'groupbySupplierFlag',
      'grouping1',
      'grouping2',
      'grouping3',
      'grouping4',
      'grouping5',
      'grouping6',
      'grouping7',
      'grouping8',
      'grouping9',
      'GroupingReason',
      'GroupId',
      'Duplicate Total Spend1',
      'IsHighestSpendInGroup'
    ];

    const rows: Record<string, any>[] = [
      {
        ExcludeReason: null,
        DataSource: 241008,
        VendorTagConfidence: null,
        Co: 'Dropbox INC BU',
        vendor_id: 'V02381-Dropbox INC BU',
        company_name: 'Keller Preece PLLC US',
        company_name_alt: null,
        parent_vendor_id: null,
        parent_company_name: null,
        tax_id: '46-1913568',
        TaxIDSource: null,
        TaxIDMatchLogic: null,
        country: 'US',
        CountrySource: null,
        Data_Quality_Score: 0,
        supplier_group: null,
        SupplierGroupSource: null,
        vendor_type: null,
        VendorTypeSource: null,
        VMSupplierID: null,
        vm_supplier_name: null,
        vm_supplier_name_alt: null,
        vm_vendor_type: null,
        vm_tax_id: null,
        vm_country: null,
        vm_Data_Quality_Score: 0,
        FY2015_spend: 551930,
        FY2016_spend: 593018,
        FY2017_spend: 564164,
        FY2018_spend: 551930,
        FY2019_spend: 635729,
        FY2020_spend: 598401,
        FY2021_spend: 527107,
        FY2022_spend: 523947,
        FY2023_spend: 561662,
        FY2024_spend: 651784,
        FY2025_spend: 607364,
        persistentVendorFlag: null,
        groupbySupplierFlag: null,
        grouping1: null,
        grouping2: null,
        grouping3: null,
        grouping4: null,
        grouping5: null,
        grouping6: null,
        grouping7: null,
        grouping8: null,
        grouping9: null,
        GroupingReason: 'Matched on company_name; Matched on Email',
        GroupId: 'V02381-Dropbox INC BU',
        'Duplicate Total Spend1': 6231036.22,
        IsHighestSpendInGroup: 'Yes'
      },
      {
        ExcludeReason: null,
        DataSource: 241008,
        VendorTagConfidence: null,
        Co: 'Dropbox INC BU',
        vendor_id: 'V02385-Dropbox INC BU',
        company_name: 'Monotype Imaging Inc',
        company_name_alt: null,
        parent_vendor_id: null,
        parent_company_name: null,
        tax_id: '02-0386861',
        TaxIDSource: null,
        TaxIDMatchLogic: null,
        country: 'US',
        CountrySource: null,
        Data_Quality_Score: 0,
        supplier_group: null,
        SupplierGroupSource: null,
        vendor_type: null,
        VendorTypeSource: null,
        VMSupplierID: null,
        vm_supplier_name: null,
        vm_supplier_name_alt: null,
        vm_vendor_type: null,
        vm_tax_id: null,
        vm_country: null,
        vm_Data_Quality_Score: 0,
        FY2015_spend: 145302,
        FY2016_spend: 145302,
        FY2017_spend: 145302,
        FY2018_spend: 145302,
        FY2019_spend: 145302,
        FY2020_spend: 145302,
        FY2021_spend: 145302,
        FY2022_spend: 145302,
        FY2023_spend: 145302,
        FY2024_spend: 145302,
        FY2025_spend: 145302,
        persistentVendorFlag: null,
        groupbySupplierFlag: null,
        grouping1: null,
        grouping2: null,
        grouping3: null,
        grouping4: null,
        grouping5: null,
        grouping6: null,
        grouping7: null,
        grouping8: null,
        grouping9: null,
        GroupingReason: null,
        GroupId: null,
        'Duplicate Total Spend1': null,
        IsHighestSpendInGroup: null
      },
      {
        ExcludeReason: null,
        DataSource: 241008,
        VendorTagConfidence: null,
        Co: 'Dropbox INC BU',
        vendor_id: 'V02560-Dropbox INC BU',
        company_name: 'Northland Control Systems Inc',
        company_name_alt: null,
        parent_vendor_id: null,
        parent_company_name: null,
        tax_id: '94-3031305',
        TaxIDSource: null,
        TaxIDMatchLogic: null,
        country: 'US',
        CountrySource: null,
        Data_Quality_Score: 0,
        supplier_group: null,
        SupplierGroupSource: null,
        vendor_type: null,
        VendorTypeSource: null,
        VMSupplierID: null,
        vm_supplier_name: null,
        vm_supplier_name_alt: null,
        vm_vendor_type: null,
        vm_tax_id: null,
        vm_country: null,
        vm_Data_Quality_Score: 0,
        FY2015_spend: 46704,
        FY2016_spend: 46704,
        FY2017_spend: 46704,
        FY2018_spend: 46704,
        FY2019_spend: 46704,
        FY2020_spend: 46704,
        FY2021_spend: 46704,
        FY2022_spend: 46704,
        FY2023_spend: 46704,
        FY2024_spend: 46704,
        FY2025_spend: 46704,
        persistentVendorFlag: null,
        groupbySupplierFlag: null,
        grouping1: null,
        grouping2: null,
        grouping3: null,
        grouping4: null,
        grouping5: null,
        grouping6: null,
        grouping7: null,
        grouping8: null,
        grouping9: null,
        GroupingReason: 'Matched on company_name',
        GroupId: 'V02560-Dropbox AU BU',
        'Duplicate Total Spend1': 140522.3,
        IsHighestSpendInGroup: 'Yes'
      },
      {
        ExcludeReason: null,
        DataSource: 241008,
        VendorTagConfidence: null,
        Co: 'Dropbox INC BU',
        vendor_id: 'V02572-Dropbox INC BU',
        company_name: 'Evanta Ventures Inc.',
        company_name_alt: null,
        parent_vendor_id: null,
        parent_company_name: null,
        tax_id: '26-0339145',
        TaxIDSource: null,
        TaxIDMatchLogic: null,
        country: 'US',
        CountrySource: null,
        Data_Quality_Score: 0,
        supplier_group: null,
        SupplierGroupSource: null,
        vendor_type: null,
        VendorTypeSource: null,
        VMSupplierID: null,
        vm_supplier_name: null,
        vm_supplier_name_alt: null,
        vm_vendor_type: null,
        vm_tax_id: null,
        vm_country: null,
        vm_Data_Quality_Score: 0,
        FY2015_spend: 80855,
        FY2016_spend: 80855,
        FY2017_spend: 80855,
        FY2018_spend: 80855,
        FY2019_spend: 80855,
        FY2020_spend: 80855,
        FY2021_spend: 80855,
        FY2022_spend: 80855,
        FY2023_spend: 80855,
        FY2024_spend: 80855,
        FY2025_spend: 80855,
        persistentVendorFlag: null,
        groupbySupplierFlag: null,
        grouping1: null,
        grouping2: null,
        grouping3: null,
        grouping4: null,
        grouping5: null,
        grouping6: null,
        grouping7: null,
        grouping8: null,
        grouping9: null,
        GroupingReason: null,
        GroupId: null,
        'Duplicate Total Spend1': null,
        IsHighestSpendInGroup: null
      },
      {
        ExcludeReason: null,
        DataSource: 241008,
        VendorTagConfidence: null,
        Co: 'Dropbox INC BU',
        vendor_id: 'V02737-Dropbox INC BU',
        company_name: 'Digicert Inc',
        company_name_alt: null,
        parent_vendor_id: null,
        parent_company_name: null,
        tax_id: '87-0570204',
        TaxIDSource: null,
        TaxIDMatchLogic: null,
        country: 'US',
        CountrySource: null,
        Data_Quality_Score: 0,
        supplier_group: null,
        SupplierGroupSource: null,
        vendor_type: null,
        VendorTypeSource: null,
        VMSupplierID: null,
        vm_supplier_name: null,
        vm_supplier_name_alt: null,
        vm_vendor_type: null,
        vm_tax_id: null,
        vm_country: null,
        vm_Data_Quality_Score: 0,
        FY2015_spend: 157861,
        FY2016_spend: 157861,
        FY2017_spend: 157861,
        FY2018_spend: 157861,
        FY2019_spend: 157861,
        FY2020_spend: 157861,
        FY2021_spend: 157861,
        FY2022_spend: 157861,
        FY2023_spend: 157861,
        FY2024_spend: 157861,
        FY2025_spend: 157861,
        persistentVendorFlag: null,
        groupbySupplierFlag: null,
        grouping1: null,
        grouping2: null,
        grouping3: null,
        grouping4: null,
        grouping5: null,
        grouping6: null,
        grouping7: null,
        grouping8: null,
        grouping9: null,
        GroupingReason: null,
        GroupId: null,
        'Duplicate Total Spend1': null,
        IsHighestSpendInGroup: null
      }
    ];

    const sheetNames = [
      'Full_VM',
      'Summary',
      'ExculdedVM',
      'VMCleandVendors',
      'InvalidCompanyNameVM',
      'ZeroSpendVM',
      'ZeroSpendInLast3Years',
      'NoMatch',
      'ExistingAuditVendors',
      'DupVendors',
      'VMExtractedFromAP',
      'NegativeSpendVM'
    ];

    return sheetNames.map(name => ({
      name,
      headers,
      rows
    }));
  }

  getAnalytics(companyId?: number) {
    const vendors = companyId ? this.vendors.filter(v => v.companyId === companyId) : this.vendors;
    const vendorIds = new Set(vendors.map(v => v.id));
    const apTx = companyId ? this.apTransactions.filter(tx => vendorIds.has(tx.vendorId)) : this.apTransactions;
    const spendByERP = this.aggregateSpendByErp(vendors);
    const riskDistribution = [
      { bucket: '0-30', count: vendors.filter(v => v.riskScore <= 30).length },
      { bucket: '31-70', count: vendors.filter(v => v.riskScore > 30 && v.riskScore <= 70).length },
      { bucket: '71-100', count: vendors.filter(v => v.riskScore > 70).length }
    ];

    return {
      spendByERP,
      riskDistribution,
      agingSummary: this.buildAging(),
      spendStats: this.spendStats(vendors),
      topVendors: [...vendors].sort((a, b) => b.totalSpendFY2025 - a.totalSpendFY2025).slice(0, 5),
      anomalies: this.findAnomalies(apTx),
      processStats: this.processStats(apTx),
      activity: this.activityStats(),
      dupeGroups: this.getDuplicateGroups(companyId),
      spendTrend: this.mockTrend(),
      riskTrend: this.mockRiskTrend(),
      candles: this.mockCandles(),
      sunburst: this.mockSunburst(),
      waterfall: this.mockWaterfall()
    };
  }

  private aggregateSpendByErp(vendors: Vendor[]) {
    const result: Record<string, number> = {};
    for (const v of vendors) {
      result[v.erpSource] = (result[v.erpSource] ?? 0) + v.totalSpendFY2025;
    }
    return Object.entries(result).map(([erp, amount]) => ({ erp, amount }));
  }

  private buildAging() {
    // Mocked aging buckets aligned with proposal
    return [
      { bucket: '0-30', count: 7 },
      { bucket: '31-60', count: 4 },
      { bucket: '61-90', count: 2 },
      { bucket: '90+', count: 2 }
    ];
  }

  private spendStats(vendors: Vendor[]) {
    if (!vendors.length) {
      return { mean: 0, median: 0, variance: 0, stdDev: 0 };
    }
    const spends = vendors.map(v => v.totalSpendFY2025).sort((a, b) => a - b);
    const mean = spends.reduce((a, b) => a + b, 0) / spends.length;
    const median = spends[Math.floor(spends.length / 2)];
    const variance = spends.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) / spends.length;
    const stdDev = Math.sqrt(variance);
    return {
      mean,
      median,
      variance,
      stdDev
    };
  }

  private findAnomalies(apTx: ApTransaction[]) {
    const anomalies = apTx
      .filter(tx => tx.amount >= 500000 || tx.status === 'Reversed')
      .map(tx => ({
        ...tx,
        reason: tx.status === 'Reversed' ? 'Reversal flagged' : 'High-value invoice'
      }));
    return anomalies;
  }

  private processStats(apTx: ApTransaction[]) {
    // Mocked operational stats
    return {
      daysToPay: 28,
      latePaymentPct: 7,
      reversalCount: apTx.filter(tx => tx.status === 'Reversed').length,
      creditMemos: 2,
      lifecycleStats: {
        average: 24,
        p95: 45
      }
    };
  }

  private activityStats() {
    return {
      reviewed: 42,
      pending: 13,
      comments: 19,
      reviewerPerformance: [
        { name: 'Auditor A', items: 18 },
        { name: 'Auditor B', items: 14 },
        { name: 'Auditor C', items: 10 }
      ]
    };
  }

  private mockTrend() {
    return [
      { month: 'Jan', amount: 420000 },
      { month: 'Feb', amount: 510000 },
      { month: 'Mar', amount: 495000 },
      { month: 'Apr', amount: 560000 },
      { month: 'May', amount: 610000 },
      { month: 'Jun', amount: 585000 }
    ];
  }

  private mockRiskTrend() {
    return [
      { month: 'Jan', highRisk: 4, mediumRisk: 8 },
      { month: 'Feb', highRisk: 3, mediumRisk: 9 },
      { month: 'Mar', highRisk: 5, mediumRisk: 7 },
      { month: 'Apr', highRisk: 6, mediumRisk: 8 },
      { month: 'May', highRisk: 5, mediumRisk: 9 },
      { month: 'Jun', highRisk: 4, mediumRisk: 8 }
    ];
  }

  private mockCandles() {
    return [
      { label: 'Mon', open: 40, high: 72, low: 32, close: 68 },
      { label: 'Tue', open: 68, high: 82, low: 58, close: 62 },
      { label: 'Wed', open: 62, high: 90, low: 55, close: 88 },
      { label: 'Thu', open: 88, high: 95, low: 70, close: 74 },
      { label: 'Fri', open: 74, high: 86, low: 60, close: 82 }
    ];
  }

  private mockSunburst() {
    return [
      { label: 'ERP', value: 40, color: '#2f9d62' },
      { label: 'Payments', value: 25, color: '#5b8def' },
      { label: 'Vendors', value: 20, color: '#f9a825' },
      { label: 'Controls', value: 15, color: '#ef6c00' }
    ];
  }

  private mockWaterfall() {
    return [
      { label: 'Opening', value: 500000, type: 'base' },
      { label: 'Add: New Spend', value: 220000, type: 'positive' },
      { label: 'Less: Savings', value: -80000, type: 'negative' },
      { label: 'Add: Adjustments', value: 45000, type: 'positive' },
      { label: 'Closing', value: 685000, type: 'total' }
    ];
  }

  mergeVendors(keepVendorId: number, removeVendorIds: number[]) {
    const keepIdx = this.vendors.findIndex(v => v.id === keepVendorId);
    if (keepIdx === -1 || !removeVendorIds.length) return undefined;
    const keep = this.vendors[keepIdx];
    const toRemove = this.vendors.filter(v => removeVendorIds.includes(v.id));
    if (!toRemove.length) return undefined;

    const mergedSpendFY = toRemove.reduce((sum, v) => sum + v.totalSpendFY2025, 0);
    const mergedSpendAll = toRemove.reduce((sum, v) => sum + v.totalSpendAllTime, 0);
    keep.totalSpendFY2025 += mergedSpendFY;
    keep.totalSpendAllTime += mergedSpendAll;
    keep.hasOpenInvoices = keep.hasOpenInvoices || toRemove.some(v => v.hasOpenInvoices);
    keep.riskScore = Math.max(keep.riskScore, ...toRemove.map(v => v.riskScore));
    keep.duplicateProbability = Math.max(keep.duplicateProbability, ...toRemove.map(v => v.duplicateProbability));

    this.apTransactions = this.apTransactions.map(tx =>
      removeVendorIds.includes(tx.vendorId) ? { ...tx, vendorId: keepVendorId } : tx
    );
    this.vendors = this.vendors.filter(v => !removeVendorIds.includes(v.id));
    this.duplicateGroups = this.duplicateGroups.map(g => ({
      ...g,
      vendors: g.vendors.filter(v => !removeVendorIds.includes(v.id))
    }));

    return {
      mergedCount: toRemove.length,
      mergedSpendFY2025: mergedSpendFY,
      mergedSpendAllTime: mergedSpendAll,
      newTotalSpendFY2025: keep.totalSpendFY2025,
      newTotalSpendAllTime: keep.totalSpendAllTime,
      keptVendor: keep
    };
  }
}
