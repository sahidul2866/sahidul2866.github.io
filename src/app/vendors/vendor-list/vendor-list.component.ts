import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MockDataService } from '../../services/mock-data.service';
import { Vendor } from '../../models/vendor.model';
import { Company } from '../../models/company.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-list',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCardModule
  ],
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit, AfterViewInit {

  companies: Company[] = [];
  selectedCompany?: Company;
  companyVendors: Vendor[] = [];
  displayedColumns: string[] = [
    'name',
    'erpSource',
    'totalSpendFY2025',
    'riskScore',
    'duplicateProbability',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<Vendor>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filters = {
    search: '',
    erp: 'all',
    status: 'all',
    riskMin: 0,
    duplicateMin: 0,
    openOnly: false
  };

  erpOptions: string[] = ['all'];
  statusOptions = ['all', 'Active', 'Review', 'Inactive', 'Excluded'];

  totalSpend = 0;
  reviewCount = 0;
  activeCount = 0;
  openInvoiceCount = 0;
  averageRisk = 0;

  constructor(
    private mockData: MockDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.companies = this.mockData.getCompanies();
    this.dataSource.filterPredicate = (data, filter) => this.matchesFilter(data, filter);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  selectCompany(company: Company) {
    this.selectedCompany = company;
    this.resetFilters(false);
    const vendors = this.mockData.getVendorsByCompany(company.id);
    this.setVendors(vendors);
  }

  clearSelection() {
    this.selectedCompany = undefined;
    this.companyVendors = [];
    this.dataSource.data = [];
    this.resetFilters(false);
    this.resetStats();
  }

  applyTextFilter(event: Event) {
    this.filters.search = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.applyFilters();
  }

  applyFilters() {
    this.dataSource.filter = JSON.stringify(this.filters);
  }

  resetFilters(apply = true) {
    this.filters = { search: '', erp: 'all', status: 'all', riskMin: 0, duplicateMin: 0, openOnly: false };
    if (apply) {
      this.applyFilters();
    }
  }

  exportCsv() {
    if (!this.selectedCompany) return;
    this.download('vendors.csv');
  }

  exportExcel() {
    if (!this.selectedCompany) return;
    this.download('vendors.xlsx');
  }

  private download(filename: string) {
    const header = ['Vendor', 'ERP', 'FY2025 Spend', 'Risk', 'Dup Prob', 'Status', 'Open Invoices'];
    const rows = this.dataSource.filteredData.map(v => [
      v.name,
      v.erpSource,
      v.totalSpendFY2025,
      v.riskScore,
      v.duplicateProbability,
      v.status,
      v.hasOpenInvoices ? 'Yes' : 'No'
    ]);
    const csv = [header, ...rows]
      .map(r => r.map(value => `"${String(value).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  openVendor(vendor: Vendor) {
    this.router.navigate(['/vendors', vendor.id]);
  }

  private setVendors(vendors: Vendor[]) {
    this.companyVendors = vendors;
    this.erpOptions = ['all', ...new Set(vendors.map(v => v.erpSource))];
    this.dataSource.data = vendors;
    this.refreshStats(vendors);
    this.applyFilters();
  }

  private refreshStats(vendors: Vendor[]) {
    this.totalSpend = vendors.reduce((sum, v) => sum + v.totalSpendFY2025, 0);
    this.reviewCount = vendors.filter(v => v.status.toLowerCase() === 'review').length;
    this.activeCount = vendors.filter(v => v.status.toLowerCase() === 'active').length;
    this.openInvoiceCount = vendors.filter(v => v.hasOpenInvoices).length;
    this.averageRisk = vendors.length
      ? Math.round(vendors.reduce((sum, v) => sum + v.riskScore, 0) / vendors.length)
      : 0;
  }

  private resetStats() {
    this.totalSpend = 0;
    this.reviewCount = 0;
    this.activeCount = 0;
    this.openInvoiceCount = 0;
    this.averageRisk = 0;
  }

  private matchesFilter(v: Vendor, filterJson: string) {
    const f = JSON.parse(filterJson) as typeof this.filters;
    if (f.search) {
      const haystack = `${v.name} ${v.erpSource} ${v.status}`.toLowerCase();
      if (!haystack.includes(f.search)) return false;
    }
    if (f.erp !== 'all' && v.erpSource !== f.erp) return false;
    if (f.status !== 'all' && v.status !== f.status) return false;
    if (v.riskScore < f.riskMin) return false;
    if (v.duplicateProbability * 100 < f.duplicateMin) return false;
    if (f.openOnly && !v.hasOpenInvoices) return false;
    return true;
  }
}
