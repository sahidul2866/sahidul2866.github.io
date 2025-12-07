import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent {
  exportCsv() {
    const lines = [
      'Section,Detail',
      'Timeline,"9 phases: Discovery/Design (3w); Data Foundation (4w); API & Duplicate Engine (5w); Frontend MVP (4w); Security Setup (2w); Master Vendor Repository (4w); Pilot & QA (3w); Launch & Training (2w); Continuous Improvement (ongoing)"',
      'Deliverables,"Snowflake CUR_VM/CUR_AP/DUP + Master Vendor Repository; portal dashboards/filters/exports; duplicate explainability; SSO/RLS/masking; audit logs; runbooks; training"',
      'Success Metrics,"60% faster audits; >=95% dupe precision; >=90% adoption; <2s queries; zero breaches"'
    ];
    this.download(lines, 'delivery.csv');
  }

  exportExcel() {
    const lines = [
      'Section,Detail',
      'Timeline,"9 phases: Discovery/Design (3w); Data Foundation (4w); API & Duplicate Engine (5w); Frontend MVP (4w); Security Setup (2w); Master Vendor Repository (4w); Pilot & QA (3w); Launch & Training (2w); Continuous Improvement (ongoing)"',
      'Deliverables,"Snowflake CUR_VM/CUR_AP/DUP + Master Vendor Repository; portal dashboards/filters/exports; duplicate explainability; SSO/RLS/masking; audit logs; runbooks; training"',
      'Success Metrics,"60% faster audits; >=95% dupe precision; >=90% adoption; <2s queries; zero breaches"'
    ];
    this.download(lines, 'delivery.xlsx');
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
