import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface AdminLog {
  time: string;
  message: string;
  type: 'info' | 'success' | 'warn';
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  ingestionTarget = 'CUR_VM';
  procedureName = 'SP_REFRESH_DUPES';
  procedureParams = '();';
  uploadTable = 'CUR_AP';
  uploadFile?: File;
  logs: AdminLog[] = [];

  pipelines = ['CUR_VM', 'CUR_AP', 'DUP_REFRESH'];
  tables = ['CUR_VM', 'CUR_AP', 'DUP_STAGE', 'CUSTOM_STAGE'];

  runIngestion() {
    this.addLog(`Triggered ingestion for pipeline ${this.ingestionTarget}`, 'info');
    setTimeout(() => this.addLog(`Ingestion for ${this.ingestionTarget} completed (mock)`, 'success'), 600);
  }

  runProcedure() {
    this.addLog(`Executing procedure ${this.procedureName} ${this.procedureParams}`, 'info');
    setTimeout(() => this.addLog(`Procedure ${this.procedureName} finished (mock)`, 'success'), 600);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.uploadFile = input.files[0];
      this.addLog(`Selected file ${this.uploadFile.name}`, 'info');
    }
  }

  uploadToSnowflake() {
    if (!this.uploadFile) {
      this.addLog('No file selected for upload', 'warn');
      return;
    }
    this.addLog(`Uploading ${this.uploadFile.name} to ${this.uploadTable} (mock)`, 'info');
    setTimeout(() => this.addLog(`Upload to ${this.uploadTable} completed (mock)`, 'success'), 800);
  }

  private addLog(message: string, type: AdminLog['type']) {
    const time = new Date().toLocaleTimeString();
    this.logs.unshift({ time, message, type });
    if (this.logs.length > 20) {
      this.logs.pop();
    }
  }
}
