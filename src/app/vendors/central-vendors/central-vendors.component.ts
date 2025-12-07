import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MockDataService } from '../../services/mock-data.service';
import { Vendor } from '../../models/vendor.model';
import { Company } from '../../models/company.model';

interface CentralGroup {
  name: string;
  vendors: Vendor[];
}

type DetailField = 'taxId' | 'address' | 'email' | 'phone' | 'contactName';

@Component({
  selector: 'app-central-vendors',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatListModule, MatProgressBarModule],
  templateUrl: './central-vendors.component.html',
  styleUrls: ['./central-vendors.component.scss']
})
export class CentralVendorsComponent implements OnInit {
  groups: (CentralGroup & { completeness: number })[] = [];
  selectedGroup?: CentralGroup & { completeness: number };
  companies: Company[] = [];
  copiedVendorId?: number;

  constructor(private mockData: MockDataService) {}

  ngOnInit(): void {
    this.companies = this.mockData.getCompanies();
    this.loadGroups();
  }

  selectGroup(group: (CentralGroup & { completeness: number })) {
    this.selectedGroup = { ...group, vendors: [...group.vendors] };
    this.copiedVendorId = undefined;
  }

  copyRicherProfile(targetVendor: Vendor) {
    if (!this.selectedGroup) return;
    const richest = this.getRichestVendor(this.selectedGroup.vendors);
    if (!richest || richest.id === targetVendor.id) return;

    const fields: DetailField[] = ['taxId', 'address', 'email', 'phone', 'contactName'];
    const updated = { ...targetVendor };
    fields.forEach(f => {
      if (!updated[f] && richest[f]) {
        updated[f] = richest[f] as string;
      }
    });
    this.mockData.updateVendor(updated);
    this.loadGroups(this.selectedGroup.name);

    this.copiedVendorId = targetVendor.id;
    setTimeout(() => (this.copiedVendorId = undefined), 1200);
  }

  companyName(companyId: number) {
    return this.companies.find(c => c.id === companyId)?.name ?? 'Unknown';
  }

  companyNames(group: CentralGroup) {
    return group.vendors.map(v => this.companyName(v.companyId)).join(' • ');
  }

  private getRichestVendor(vendors: Vendor[]): Vendor | undefined {
    const fields: DetailField[] = ['taxId', 'address', 'email', 'phone', 'contactName'];
    return vendors
      .map(v => ({
        vendor: v,
        score: fields.reduce((acc, f) => (v[f] ? acc + 1 : acc), 0)
      }))
      .sort((a, b) => b.score - a.score)[0]?.vendor;
  }

  private completenessScore(vendors: Vendor[]) {
    const fields: DetailField[] = ['taxId', 'address', 'email', 'phone', 'contactName'];
    const totalSlots = vendors.length * fields.length;
    const filled = vendors.reduce(
      (sum, v) => sum + fields.reduce((acc, f) => (v[f] ? acc + 1 : acc), 0),
      0
    );
    return Math.round((filled / totalSlots) * 100);
  }

  private loadGroups(selectedName?: string) {
    const rawGroups = this.mockData.getCentralVendorGroups();
    this.groups = rawGroups.map(g => ({
      ...g,
      completeness: this.completenessScore(g.vendors)
    }));
    const match = selectedName
      ? this.groups.find(g => g.name === selectedName)
      : this.groups[0];
    this.selectedGroup = match ? { ...match, vendors: [...match.vendors] } : undefined;
  }
}
