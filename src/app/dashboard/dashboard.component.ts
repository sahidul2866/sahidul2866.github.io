import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MockDataService } from '../services/mock-data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  stats: any;
  dupStats: { groups: number; dupVendors: number; potentialRecovery: number; openInvoices: number } | undefined;
  spendByERP: { erp: string; amount: number }[] = [];
  riskDistribution: { bucket: string; count: number }[] = [];
  spendDonutStyle = '';

  constructor(private mockData: MockDataService) {}

  ngOnInit(): void {
    this.stats = this.mockData.getStats();
    this.dupStats = this.mockData.getDuplicateRecoveryStats();
    const analytics = this.mockData.getAnalytics();
    this.spendByERP = analytics.spendByERP;
    this.riskDistribution = analytics.riskDistribution;
    this.spendDonutStyle = this.buildConicGradient(this.spendByERP);
  }

  exportCsv() {
    this.downloadExport('dashboard-summary.csv');
  }

  exportExcel() {
    this.downloadExport('dashboard-summary.xlsx');
  }

  private buildConicGradient(data: { erp: string; amount: number }[]) {
    if (!data.length) return 'conic-gradient(#e0e6f1 0deg 360deg)';
    const colors = ['#2f9d62', '#5b8def', '#f9a825', '#ef6c00'];
    const total = data.reduce((s, d) => s + d.amount, 0);
    let current = 0;
    const stops: string[] = [];
    data.forEach((d, i) => {
      const start = (current / total) * 360;
      current += d.amount;
      const end = (current / total) * 360;
      stops.push(`${colors[i % colors.length]} ${start}deg ${end}deg`);
    });
    return `conic-gradient(${stops.join(',')})`;
  }

  private downloadExport(filename: string) {
    const lines: string[] = [];
    lines.push('Metric,Value');
    lines.push(`TotalSpendFY2025,${this.stats?.totalSpendFY2025 ?? ''}`);
    lines.push(`TotalVendors,${this.stats?.totalVendors ?? ''}`);
    lines.push(`HighRiskVendors,${this.stats?.highRiskVendors ?? ''}`);
    lines.push(`DuplicateGroups,${this.stats?.duplicateGroups ?? ''}`);
    if (this.dupStats) {
      lines.push(`DuplicateVendors,${this.dupStats.dupVendors}`);
      lines.push(`PotentialRecovery,${this.dupStats.potentialRecovery}`);
      lines.push(`OpenInvoicesInDupeVendors,${this.dupStats.openInvoices}`);
    }
    lines.push('');
    lines.push('ERP,Amount');
    this.spendByERP.forEach(s => lines.push(`${s.erp},${s.amount}`));
    lines.push('');
    lines.push('RiskBucket,Count');
    this.riskDistribution.forEach(r => lines.push(`${r.bucket},${r.count}`));
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
