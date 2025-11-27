import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent {
  exportCsv() {
    const sections = [
      ['Core features', 'Duplicate detection, AP history, KPIs, filters, pagination, export/import, security, audit trail'],
      ['Advanced analytics', 'Spend profiling, anomalies, risk scoring, payment analysis, GL trends, aging, lifecycle stats, user activity'],
      ['ML options', 'ML dupes, AI classification, AI reasons, forecasting, fraud probability, semantic search'],
      ['Executive dashboards', 'Spend overview, vendor health, AP process, audit activity, duplicate analysis']
    ];
    this.download(sections, 'features.csv');
  }

  exportExcel() {
    const sections = [
      ['Core features', 'Duplicate detection, AP history, KPIs, filters, pagination, export/import, security, audit trail'],
      ['Advanced analytics', 'Spend profiling, anomalies, risk scoring, payment analysis, GL trends, aging, lifecycle stats, user activity'],
      ['ML options', 'ML dupes, AI classification, AI reasons, forecasting, fraud probability, semantic search'],
      ['Executive dashboards', 'Spend overview, vendor health, AP process, audit activity, duplicate analysis']
    ];
    this.download(sections, 'features.xlsx');
  }

  private download(sections: string[][], filename: string) {
    const lines = ['Section,Details', ...sections.map(s => `"${s[0]}","${s[1]}"`)];
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
