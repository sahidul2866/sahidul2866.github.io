import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  exportCsv() {
    const lines = [
      'Section,Detail',
      'Purpose,"Replace manual Excel-based VM/AP with Snowflake portal; instant duplicates, historical spend, audit-ready reports."'
    ];
    this.download(lines, 'overview.csv');
  }

  exportExcel() {
    const lines = [
      'Section,Detail',
      'Purpose,"Replace manual Excel-based VM/AP with Snowflake portal; instant duplicates, historical spend, audit-ready reports."'
    ];
    this.download(lines, 'overview.xlsx');
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
