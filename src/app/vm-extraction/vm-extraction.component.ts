import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { VmSheet } from '../models/vm-sheet.model';
import { MockDataService } from '../services/mock-data.service';

@Component({
  selector: 'app-vm-extraction',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './vm-extraction.component.html',
  styleUrls: ['./vm-extraction.component.scss']
})
export class VmExtractionComponent implements OnInit {
  sheets: VmSheet[] = [];
  filteredSheets: VmSheet[] = [];
  loading = false;
  search = '';

  constructor(private mockData: MockDataService) {}

  ngOnInit(): void {
    this.sheets = this.mockData.getVmSheets();
    this.applyFilter();
  }

  applyFilter() {
    const q = this.search.trim().toLowerCase();
    if (!q) {
      this.filteredSheets = this.sheets;
      return;
    }
    this.filteredSheets = this.sheets.map(sheet => ({
      ...sheet,
      rows: sheet.rows.filter(row => Object.values(row).some(v => String(v || '').toLowerCase().includes(q)))
    }));
  }

  exportSheet(sheet: VmSheet) {
    const header = sheet.headers;
    const rows = sheet.rows.map(r => header.map(h => r[h] ?? ''));
    const csv = [header, ...rows]
      .map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${sheet.name}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  }
}
