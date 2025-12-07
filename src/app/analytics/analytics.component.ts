import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MockDataService } from '../services/mock-data.service';
import { Company } from '../models/company.model';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  companies: Company[] = [];
  selectedCompany: 'all' | number = 'all';
  analytics: any;
  spendMax = 0;
  riskMax = 0;
  agingMax = 0;
  topVendors: any[] = [];
  anomalies: any[] = [];
  processStats: any;
  activity: any;
  spendStats: any;
  dupeGroups: any[] = [];
  spendTrend: { month: string; amount: number }[] = [];
  riskTrend: { month: string; highRisk: number; mediumRisk: number }[] = [];
  candles: any[] = [];
  sunburst: any[] = [];
  waterfall: any[] = [];
  candleMax = 0;
  waterfallMax = 0;
  sunburstGradient = '';
  metricTableColumns: string[] = ['All', '251024-EBM', '251024-PS', '251024-TFG', '251024-RNA', '251024-NS', '251024-BFS', '251024-TFC', '251024-HWI'];
  metricTable: { metric: string; values: number[] }[] = [
    { metric: 'AP Records', values: [968537, 4698, 86317, 760696, 6193, 105039, 15, 2930, 2649] },
    { metric: 'VM Records', values: [23617, 240, 975, 13751, 494, 7449, 141, 320, 247] },
    { metric: 'Count of phone', values: [16839, 42, 761, 11723, 241, 3849, 67, 52, 104] },
    { metric: 'Count of address1', values: [22465, 139, 837, 13747, 369, 6938, 121, 153, 161] },
    { metric: 'Count of contact_email', values: [13857, 47, 430, 10129, 176, 2946, 50, 40, 39] },
    { metric: 'Count of contact_name', values: [16283, 48, 676, 12838, 128, 2128, 67, 231, 167] },
    { metric: 'Total Spend', values: [8448250883, 7036873.98, 143535044.5, 8031425847, 12450338.04, 246978193.2, 22460.46, 1076905.85, 5725220.34] },
    { metric: 'FY2025_spend', values: [2752233633, 0, 16817552.03, 2668803687, 0, 66612393.66, 0, 0, 0] },
    { metric: 'FY2024_spend', values: [2698927817, 0, 19565157.25, 2584019969, 0, 95342690.61, 0, 0, 0] },
    { metric: 'FY2023_spend', values: [850364761.2, 0, 14412995.49, 763081088.1, 0, 72350016.6, 0, 520661.04, 0] },
    { metric: 'FY2022_spend', values: [995456717.7, 5024830.37, 9073640.9, 959115062.5, 7787647.63, 12638162.32, 3409.19, 556244.81, 1257719.98] },
    { metric: 'FY2021_spend', values: [912195786.9, 2012043.61, 16318203.29, 887424680.7, 4632547.49, 7891.5, 19051.27, 0, 1781369.04] },
    { metric: 'FY2020_spend', values: [187143465.3, 0, 15459512.68, 168981359.4, 30142.92, 1261.32, 0, 0, 2671189.01] },
    { metric: 'FY2019_spend', values: [5346951.67, 0, 5332009.36, 0, 0, 0, 0, 0, 14942.31] },
    { metric: 'FYBefore2019_spend', values: [46581750.62, 0, 46555973.48, 0, 0, 25777.14, 0, 0, 0] },
    { metric: 'Vendors With No Spends', values: [17120, 147, 183, 11004, 215, 5147, 131, 251, 42] },
    { metric: 'Excluded Vendors', values: [20380, 208, 615, 11682, 420, 6787, 141, 304, 223] },
    { metric: 'Total duplicate Vendors', values: [6115, 215, 398, 1903, 442, 2922, 125, 54, 56] },
    { metric: 'Vendors With No Spends in last 3 years', values: [18251, 168, 667, 11458, 282, 5095, 135, 251, 195] }
  ];
  qaStats = [
    { label: 'Total Invoices', value: 105635 },
    { label: 'Unique Invoices', value: 105634, note: '(99.99%)' },
    { label: 'Blank VendorNumber', value: 0 },
    { label: 'Blank VendorName', value: 0 },
    { label: 'Blank InvoiceNumber', value: 0 },
    { label: 'Blank InvoiceDate', value: 0 },
    { label: 'Zero InvoiceAmt', value: 1490 },
    { label: 'Credits', value: 2867 },
    { label: 'Open Invoices', value: 1380 },
    { label: 'Unique Payments', value: 54850 },
    { label: 'Blank CheckNumber', value: 1027 },
    { label: 'Blank CheckDate', value: 0 },
    { label: 'Zero CheckAmount', value: 2378 },
    { label: 'Voids', value: 0 },
    { label: 'Total Vendors', value: 7907 },
    { label: 'Unique Vendors', value: 7907 },
    { label: 'Blank Address1', value: 533 },
    { label: 'Spend', value: 4117247889, currency: true },
    { label: 'Payments', value: 3814541885, currency: true }
  ];
  months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  invoiceDistribution = [
    { year: 2017, values: [5,4,3,12,20,21,20,41,78,135,238,629] },
    { year: 2018, values: [1292,1325,1661,1303,1459,1520,1401,1373,1514,1353,1435,1561] },
    { year: 2019, values: [1233,1263,1482,1293,1525,1479,1400,1556,1550,1524,1448,1585] },
    { year: 2020, values: [1274,1374,1481,1314,1135,1266,1290,1199,1313,1231,1246,1461] },
    { year: 2021, values: [1150,983,1237,1192,1175,1286,1256,1222,1377,1221,1218,1284] },
    { year: 2022, values: [1196,1094,1335,1206,1151,1242,1174,1201,1232,1197,1231,1383] },
    { year: 2023, values: [1128,1050,1151,1132,1057,1132,1139,1148,1091,1149,1217,1219] },
    { year: 2024, values: [1151,1010,1033,1070,1100,996,706,10,0,2,3,4] },
    { year: 2025, values: [7,6,8,20,29,86,602,1364,1515,731,1,0] }
  ];
  paymentDistribution = [
    { year: 1900, values: [1027,0,0,0,0,0,0,0,0,0,0,0] },
    { year: 2018, values: [287,463,622,759,783,664,815,778,580,737,677,681] },
    { year: 2019, values: [820,578,651,733,839,525,912,803,658,752,744,129] },
    { year: 2020, values: [1107,726,659,777,773,704,746,644,627,700,599,698] },
    { year: 2021, values: [697,554,603,606,643,566,736,639,642,622,616,630] },
    { year: 2022, values: [650,599,678,593,651,655,634,646,607,653,603,676] },
    { year: 2023, values: [649,550,582,559,617,591,622,610,592,608,594,618] },
    { year: 2024, values: [615,572,651,533,631,519,602,790,117,27,4,3] },
    { year: 2025, values: [0,0,0,0,10,0,0,516,989,1099,0,0] }
  ];

  constructor(private mockData: MockDataService) {}

  ngOnInit(): void {
    this.companies = this.mockData.getCompanies();
    this.loadAnalytics();
  }

  wickTop(c: any) {
    return 100 - (c.high / this.candleMax) * 100;
  }

  wickHeight(c: any) {
    return ((c.high - c.low) / this.candleMax) * 100;
  }

  bodyTop(c: any) {
    return 100 - (Math.max(c.open, c.close) / this.candleMax) * 100;
  }

  bodyHeight(c: any) {
    return (Math.abs(c.close - c.open) / this.candleMax) * 100 || 2;
  }

  waterfallHeight(w: any) {
    return (Math.abs(w.value) / this.waterfallMax) * 100;
  }

  private buildSunburstGradient() {
    const total = this.sunburst.reduce((s, v) => s + v.value, 0) || 1;
    let current = 0;
    const stops: string[] = [];
    this.sunburst.forEach((s) => {
      const start = (current / total) * 100;
      current += s.value;
      const end = (current / total) * 100;
      stops.push(`${s.color} ${start}% ${end}%`);
    });
    return `conic-gradient(${stops.join(',')})`;
  }

  exportCsv() {
    const lines: string[] = [];
    lines.push('SpendByERP');
    lines.push('ERP,Amount');
    this.analytics.spendByERP.forEach((r: any) => lines.push(`${r.erp},${r.amount}`));
    lines.push('');
    lines.push('RiskDistribution');
    lines.push('Bucket,Count');
    this.analytics.riskDistribution.forEach((r: any) => lines.push(`${r.bucket},${r.count}`));
    lines.push('');
    lines.push('TopVendors');
    lines.push('Vendor,ERP,Spend');
    this.topVendors.forEach((v: any) => lines.push(`${v.name},${v.erpSource},${v.totalSpendFY2025}`));
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'analytics-summary.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  exportExcel() {
    this.exportGeneric('analytics-summary.xlsx');
  }

  applyCompanyFilter() {
    this.loadAnalytics();
  }

  private exportGeneric(filename: string) {
    const lines: string[] = [];
    lines.push('SpendByERP');
    lines.push('ERP,Amount');
    this.analytics.spendByERP.forEach((r: any) => lines.push(`${r.erp},${r.amount}`));
    lines.push('');
    lines.push('RiskDistribution');
    lines.push('Bucket,Count');
    this.analytics.riskDistribution.forEach((r: any) => lines.push(`${r.bucket},${r.count}`));
    lines.push('');
    lines.push('TopVendors');
    lines.push('Vendor,ERP,Spend');
    this.topVendors.forEach((v: any) => lines.push(`${v.name},${v.erpSource},${v.totalSpendFY2025}`));
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  private loadAnalytics() {
    const companyId = this.selectedCompany === 'all' ? undefined : this.selectedCompany;
    this.analytics = this.mockData.getAnalytics(companyId);
    this.spendMax = Math.max(...this.analytics.spendByERP.map((r: any) => r.amount), 1);
    this.riskMax = Math.max(...this.analytics.riskDistribution.map((r: any) => r.count), 1);
    this.agingMax = Math.max(...this.analytics.agingSummary.map((r: any) => r.count), 1);
    this.topVendors = this.analytics.topVendors;
    this.anomalies = this.analytics.anomalies;
    this.processStats = this.analytics.processStats;
    this.activity = this.analytics.activity;
    this.spendStats = this.analytics.spendStats;
    this.dupeGroups = this.analytics.dupeGroups;
    this.spendTrend = this.analytics.spendTrend;
    this.riskTrend = this.analytics.riskTrend;
    this.candles = this.analytics.candles;
    this.sunburst = this.analytics.sunburst;
    this.waterfall = this.analytics.waterfall;
    this.candleMax = Math.max(...this.candles.flatMap((c: any) => [c.high, c.low]), 1);
    this.waterfallMax = Math.max(...this.waterfall.map((w: any) => Math.abs(w.value)), 1);
    this.sunburstGradient = this.buildSunburstGradient();
  }
}
