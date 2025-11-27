import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MockDataService } from '../../services/mock-data.service';
import { DuplicateGroup } from '../../models/duplicate-group.model';

@Component({
  selector: 'app-duplicate-groups',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './duplicate-groups.component.html',
  styleUrls: ['./duplicate-groups.component.scss']
})
export class DuplicateGroupsComponent implements OnInit {

  groups: DuplicateGroup[] = [];
  exportCsv() {
    const header = ['GroupId', 'Confidence', 'Reason', 'Vendors'];
    const rows = this.groups.map(g => [
      g.groupId,
      g.confidence,
      g.reason,
      g.vendors.map(v => v.name).join('|')
    ]);
    this.download(header, rows, 'duplicate-groups.csv');
  }

  exportExcel() {
    const header = ['GroupId', 'Confidence', 'Reason', 'Vendors'];
    const rows = this.groups.map(g => [
      g.groupId,
      g.confidence,
      g.reason,
      g.vendors.map(v => v.name).join('|')
    ]);
    this.download(header, rows, 'duplicate-groups.xlsx');
  }

  private download(header: any[], rows: any[][], filename: string) {
    const csv = [header, ...rows]
      .map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  constructor(private mockData: MockDataService) {}

  ngOnInit(): void {
    this.groups = this.mockData.getDuplicateGroups();
  }
}
