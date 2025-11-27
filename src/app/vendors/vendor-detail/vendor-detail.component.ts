import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MockDataService } from '../../services/mock-data.service';
import { Vendor } from '../../models/vendor.model';
import { ApTransaction } from '../../models/ap-transaction.model';

@Component({
  selector: 'app-vendor-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule
  ],
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.scss']
})
export class VendorDetailComponent implements OnInit {

  vendor?: Vendor;
  apTransactions: ApTransaction[] = [];
  reviewerNotes: { author: string; note: string; createdAt: string }[] = [];
  newNote = '';
  newAuthor = 'Auditor (Mock)';
  highestInvoice?: ApTransaction;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mockData: MockDataService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : NaN;
    if (!isNaN(id)) {
      this.vendor = this.mockData.getVendorById(id);
      if (this.vendor) {
        this.apTransactions = this.mockData.getApTransactionsForVendor(this.vendor.id)
          .sort((a, b) => b.invoiceDate.localeCompare(a.invoiceDate));
        this.reviewerNotes = this.mockData.getReviewerNotes(this.vendor.id);
        this.highestInvoice = this.apTransactions[0];
      }
    }
  }

  goBack() {
    this.router.navigate(['/vendors']);
  }

  addNote() {
    if (!this.vendor || !this.newNote.trim()) {
      return;
    }
    this.mockData.addReviewerNote(this.vendor.id, this.newAuthor, this.newNote.trim());
    this.reviewerNotes = this.mockData.getReviewerNotes(this.vendor.id);
    this.newNote = '';
  }
}
