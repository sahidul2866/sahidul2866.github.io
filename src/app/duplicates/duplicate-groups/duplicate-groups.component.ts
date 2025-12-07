import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MockDataService } from '../../services/mock-data.service';
import { DuplicateGroup } from '../../models/duplicate-group.model';
import { Company } from '../../models/company.model';

@Component({
  selector: 'app-duplicate-groups',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatDialogModule],
  templateUrl: './duplicate-groups.component.html',
  styleUrls: ['./duplicate-groups.component.scss']
})
export class DuplicateGroupsComponent implements OnInit {

  filteredGroups: DuplicateGroup[] = [];
  companies: Company[] = [];
  selectedCompany: 'all' | number = 'all';

  exportCsv() {
    const header = ['GroupId', 'Confidence', 'Reason', 'Vendors'];
    const rows = this.filteredGroups.map(g => [
      g.groupId,
      g.confidence,
      g.reason,
      g.vendors.map(v => v.name).join('|')
    ]);
    this.download(header, rows, 'duplicate-groups.csv');
  }

  exportExcel() {
    const header = ['GroupId', 'Confidence', 'Reason', 'Vendors'];
    const rows = this.filteredGroups.map(g => [
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

  constructor(private mockData: MockDataService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.companies = this.mockData.getCompanies();
    this.applyFilter();
  }

  applyFilter() {
    const companyId = this.selectedCompany === 'all' ? undefined : this.selectedCompany;
    this.filteredGroups = this.mockData.getDuplicateGroups(companyId);
  }

  keepOnlyVendor(groupId: number, vendorId: number) {
    const group = this.filteredGroups.find(g => g.groupId === groupId);
    if (!group) return;
    const keepVendor = group.vendors.find(v => v.id === vendorId);
    const removeVendors = group.vendors.filter(v => v.id !== vendorId);
    const names = removeVendors.map(v => v.name).join(', ');
    const message = `Keep ${keepVendor?.name} and merge spend/AP from: ${names}?`;
    const proceed = window.confirm(message);
    if (!proceed) return;

    const result = this.mockData.keepOnlyVendorInGroup(groupId, vendorId);
    const summary = result?.mergeSummary;
    this.dialog.open(MergeSummaryDialog, {
      width: '440px',
      data: {
        keepName: keepVendor?.name ?? 'Kept vendor',
        mergedNames: removeVendors.map(v => v.name),
        mergedCount: removeVendors.length,
        spendFY: summary?.mergedSpendFY2025 ?? 0,
        spendAll: summary?.mergedSpendAllTime ?? 0
      }
    });
    this.applyFilter();
  }
}

@Component({
  selector: 'app-merge-summary-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  template: `
    <div class="dialog">
      <div class="dialog__header">
        <div>
          <p class="eyebrow">Merge complete</p>
          <h3>Vendors merged</h3>
        </div>
        <button mat-icon-button (click)="close()" aria-label="Close">
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <p class="lede">Spend and AP were reassigned to <strong>{{ data.keepName }}</strong>.</p>
      <div class="summary">
        <div><span class="label">Merged vendors</span><span>{{ data.mergedNames.join(', ') }}</span></div>
        <div><span class="label">Count</span><span>{{ data.mergedCount }}</span></div>
        <div><span class="label">FY2025 spend moved</span><span>{{ data.spendFY | currency:'USD':'symbol':'1.0-0' }}</span></div>
        <div><span class="label">All-time spend moved</span><span>{{ data.spendAll | currency:'USD':'symbol':'1.0-0' }}</span></div>
      </div>
      <div class="actions">
        <button mat-stroked-button color="primary" (click)="close()">
          <mat-icon>check</mat-icon>
          Close
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dialog {
      display: flex;
      flex-direction: column;
      gap: 12px;
      color: #0f172a;
      background: linear-gradient(180deg, #ffffff 0%, #f7f9ff 100%);
      border-radius: 16px;
      padding: 6px;
    }
    .dialog__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      background: linear-gradient(90deg, rgba(91, 141, 239, 0.08), rgba(47, 157, 98, 0.08));
      border-radius: 12px;
    }
    .lede { color: #475569; margin: 0; }
    .summary {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      padding: 8px 4px;
    }
    .label { color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
    .actions { display: flex; justify-content: flex-end; margin-top: 8px; }
  `]
})
export class MergeSummaryDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { keepName: string; mergedNames: string[]; mergedCount: number; spendFY: number; spendAll: number },
    private dialogRef: MatDialogRef<MergeSummaryDialog>
  ) {}

  close() {
    this.dialogRef.close();
  }
}
