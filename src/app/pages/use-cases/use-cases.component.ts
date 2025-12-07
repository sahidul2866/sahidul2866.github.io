import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-use-cases',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './use-cases.component.html',
  styleUrls: ['./use-cases.component.scss']
})
export class UseCasesComponent {
  exportCsv() {
    const lines = [
      'Use Case,Outcome',
      'Duplicate remediation,"Cluster, review, and resolve dupes with explainability, notes, and assignments"',
      'Audit packet prep,"Generate audit-ready exports with lineage, approvals, and locked views"',
      'Vendor onboarding,"Validate identities against Master Vendor Repository; auto-map to reduce redundancy"',
      'Fraud/abuse detection,"Flag risky patterns: same bank/different vendor, split invoices, reversals, late spikes"',
      'AP operations,"Track days-to-pay, late %, recurring payments; surface backlog and SLA breaches"'
    ];
    this.download(lines, 'use-cases.csv');
  }

  exportExcel() {
    const lines = [
      'Use Case,Outcome',
      'Duplicate remediation,"Cluster, review, and resolve dupes with explainability, notes, and assignments"',
      'Audit packet prep,"Generate audit-ready exports with lineage, approvals, and locked views"',
      'Vendor onboarding,"Validate identities against Master Vendor Repository; auto-map to reduce redundancy"',
      'Fraud/abuse detection,"Flag risky patterns: same bank/different vendor, split invoices, reversals, late spikes"',
      'AP operations,"Track days-to-pay, late %, recurring payments; surface backlog and SLA breaches"'
    ];
    this.download(lines, 'use-cases.xlsx');
  }

  private download(lines: string[], filename: string) {
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
