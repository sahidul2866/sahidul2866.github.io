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
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ApMockRecord } from '../models/ap-mock-record.model';
import { Company } from '../models/company.model';
import { MockDataService } from '../services/mock-data.service';

@Component({
  selector: 'app-ap-mock',
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
  templateUrl: './ap-mock.component.html',
  styleUrls: ['./ap-mock.component.scss']
})
export class ApMockComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'DataSource',
    'VndNum',
    'VndName',
    'InvNum',
    'InvDate',
    'InvAmt',
    'CurrCode',
    'FY',
    'PmtDate',
    'PmtAmt',
    'PmtTypeDesc',
    'ARIBA_PO',
    'INVOICE_SOURCE',
    'PAYMENT_STATUS',
    'DupeX',
    'Decision',
    'APID'
  ];

  dataSource = new MatTableDataSource<ApMockRecord>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filters = {
    search: '',
    currency: 'all',
    fy: 'all',
    paymentStatus: 'all',
    dupeOnly: false
  };

  companies: Company[] = [];
  selectedCompany: 'all' | number = 'all';
  currencyOptions: string[] = [];
  fyOptions: string[] = [];
  paymentStatusOptions: string[] = [];
  dupeDecisions: Record<string, 'pending' | 'accepted' | 'declined'> = {};

  constructor(private mockData: MockDataService) {}

  ngOnInit(): void {
    this.companies = this.mockData.getCompanies();
    this.dataSource.filterPredicate = (row, json) => this.matches(row, json);
    this.loadData();
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
    this.filters = { search: '', currency: 'all', fy: 'all', paymentStatus: 'all', dupeOnly: false };
    this.applyFilters();
  }

  applyCompanyFilter() {
    this.loadData();
  }

  setDecision(row: ApMockRecord, decision: 'accepted' | 'declined') {
    this.dupeDecisions[row.APID] = decision;
  }

  rowClasses(row: ApMockRecord) {
    return {
      'dupe-row': row.DupeX > 0,
      'dupe-row--accepted': row.DupeX > 0 && this.dupeDecisions[row.APID] === 'accepted',
      'dupe-row--declined': row.DupeX > 0 && this.dupeDecisions[row.APID] === 'declined'
    };
  }

  exportCsv() {
    this.download('ap-mock-data.csv');
  }

  exportExcel() {
    this.download('ap-mock-data.xlsx');
  }

  private matches(row: ApMockRecord, json: string): boolean {
    const f = JSON.parse(json) as typeof this.filters;
    if (f.search) {
      const haystack = `${row.VndName} ${row.VndNum} ${row.InvNum} ${row.MatchInvNum} ${row.PmtTypeDesc} ${row.ARIBA_PO}`.toLowerCase();
      if (!haystack.includes(f.search)) return false;
    }
    if (f.currency !== 'all' && row.CurrCode !== f.currency) return false;
    if (f.fy !== 'all' && row.FY.toString() !== f.fy) return false;
    if (f.paymentStatus !== 'all' && (row.PAYMENT_STATUS || 'Unknown') !== f.paymentStatus) return false;
    if (f.dupeOnly && row.DupeX === 0) return false;
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

  private loadData() {
    const companyId = this.selectedCompany === 'all' ? undefined : this.selectedCompany;
    const data = this.mockData.getApMockData(companyId);
    this.dataSource.data = data;
    this.currencyOptions = ['all', ...new Set(data.map(d => d.CurrCode))];
    this.fyOptions = ['all', ...new Set(data.map(d => d.FY.toString()))];
    this.paymentStatusOptions = ['all', ...new Set(data.map(d => d.PAYMENT_STATUS || 'Unknown'))];
    data.forEach(r => {
      if (!this.dupeDecisions[r.APID]) {
        this.dupeDecisions[r.APID] = 'pending';
      }
    });
    this.applyFilters();
  }
}
