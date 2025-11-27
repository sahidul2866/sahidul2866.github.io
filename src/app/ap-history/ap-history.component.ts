import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApMockRecord } from '../models/ap-mock-record.model';
import { MockDataService } from '../services/mock-data.service';

@Component({
  selector: 'app-ap-history',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  templateUrl: './ap-history.component.html',
  styleUrls: ['./ap-history.component.scss']
})
export class ApHistoryComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'VndName',
    'InvNum',
    'InvDate',
    'InvAmt',
    'CurrCode',
    'FY',
    'PmtDate',
    'PmtAmt',
    'DupeX'
  ];

  dataSource = new MatTableDataSource<ApMockRecord>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filters = {
    search: '',
    vendor: 'all',
    dupeOnly: false,
    minInv: '',
    maxInv: ''
  };

  vendorOptions: string[] = [];
  constructor(private mockData: MockDataService) {}

  ngOnInit(): void {
    const data = this.mockData.getApMockData();
    this.dataSource.data = data;
    this.dataSource.filterPredicate = (row, json) => this.matches(row, json);
    this.vendorOptions = ['all', ...new Set(data.map(d => d.VndName))];
    this.applyFilters();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyTextFilter(event: Event) {
    this.filters.search = (event.target as HTMLInputElement).value.toLowerCase().trim();
    this.applyFilters();
  }

  applyFilters() {
    this.dataSource.filter = JSON.stringify(this.filters);
  }

  resetFilters() {
    this.filters = { search: '', vendor: 'all', dupeOnly: false, minInv: '', maxInv: '' };
    this.applyFilters();
  }

  exportCsv() {
    this.download('ap-history.csv');
  }

  exportExcel() {
    this.download('ap-history.xlsx');
  }

  private matches(row: ApMockRecord, json: string): boolean {
    const f = JSON.parse(json) as typeof this.filters;
    if (f.search) {
      const haystack = `${row.VndName} ${row.VndNum} ${row.InvNum} ${row.MatchInvNum}`.toLowerCase();
      if (!haystack.includes(f.search)) return false;
    }
    if (f.vendor !== 'all' && row.VndName !== f.vendor) return false;
    if (f.dupeOnly && row.DupeX === 0) return false;
    const min = f.minInv ? parseFloat(f.minInv) : undefined;
    const max = f.maxInv ? parseFloat(f.maxInv) : undefined;
    if (min !== undefined && row.InvAmt < min) return false;
    if (max !== undefined && row.InvAmt > max) return false;
    return true;
  }

  private download(filename: string) {
    const header = this.displayedColumns;
    const rows = this.dataSource.filteredData.map(r =>
      this.displayedColumns.map(col => (r as any)[col] ?? '')
    );
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
}
