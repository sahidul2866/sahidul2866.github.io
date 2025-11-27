import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-governance',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './governance.component.html',
  styleUrls: ['./governance.component.scss']
})
export class GovernanceComponent {
  exportCsv() {
    const lines = [
      'Section,Details',
      'Roles,"Sponsor, Product Owner, PM, Architect, Backend, Frontend, QA, Security, Pilot Users"',
      'Risks,"Manpower, ERP variations, performance, security, adoption"',
      'Mitigations,"Contractors, templates, clustering/caching, masking/RBAC, training"',
      'Team Recommendation,"Contractual team with Snowflake/Backend/Frontend/QA/UX; knowledge transfer planned"'
    ];
    this.download(lines, 'governance.csv');
  }

  exportExcel() {
    const lines = [
      'Section,Details',
      'Roles,"Sponsor, Product Owner, PM, Architect, Backend, Frontend, QA, Security, Pilot Users"',
      'Risks,"Manpower, ERP variations, performance, security, adoption"',
      'Mitigations,"Contractors, templates, clustering/caching, masking/RBAC, training"',
      'Team Recommendation,"Contractual team with Snowflake/Backend/Frontend/QA/UX; knowledge transfer planned"'
    ];
    this.download(lines, 'governance.xlsx');
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
