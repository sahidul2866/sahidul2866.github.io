import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MockDataService } from '../services/mock-data.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

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

  constructor(private mockData: MockDataService) {}

  ngOnInit(): void {
    this.analytics = this.mockData.getAnalytics();
    this.spendMax = Math.max(...this.analytics.spendByERP.map((r: any) => r.amount));
    this.riskMax = Math.max(...this.analytics.riskDistribution.map((r: any) => r.count));
    this.agingMax = Math.max(...this.analytics.agingSummary.map((r: any) => r.count));
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
    this.candleMax = Math.max(...this.candles.flatMap((c: any) => [c.high, c.low])) || 1;
    this.waterfallMax = Math.max(...this.waterfall.map((w: any) => Math.abs(w.value))) || 1;
    this.sunburstGradient = this.buildSunburstGradient();
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
}
