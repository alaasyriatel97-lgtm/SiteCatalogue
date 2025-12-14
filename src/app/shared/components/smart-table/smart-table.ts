import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReportColumn } from '../../../core/models/metadata.model';

@Component({
  selector: 'app-smart-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
  templateUrl: './smart-table.html',
  styleUrls: ['./smart-table.scss']
})
export class SmartTable {
  @Input() columns: ReportColumn[] = [];
  @Input() data: any[] = [];
  @Input() isLoading = false;
  @Output() rowClick = new EventEmitter<any>();
  @Output() actionClick = new EventEmitter<{ action: string; row: any }>();

  // State
  sortField = signal<string>('');
  sortDirection = signal<'asc' | 'desc' | ''>('');
  pageIndex = signal(0);
  pageSize = signal(10);

  // Computed
  displayedColumns = computed(() => 
    this.columns.filter(c => c.isActive).map(c => c.field)
  );

  sortedData = computed(() => {
    let data = [...this.data];
    const field = this.sortField();
    const direction = this.sortDirection();

    if (field && direction) {
      data.sort((a, b) => {
        const aVal = a[field];
        const bVal = b[field];
        
        if (aVal == null) return 1;
        if (bVal == null) return -1;
        
        if (typeof aVal === 'string') {
          return direction === 'asc' 
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
        
        return direction === 'asc' 
          ? (aVal > bVal ? 1 : -1)
          : (bVal > aVal ? 1 : -1);
      });
    }

    return data;
  });

  paginatedData = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();
    return this.sortedData().slice(start, end);
  });

 
  onSort(column: ReportColumn): void {
    if (!column.isSortable) return;

    const field = column.field;
    
    if (this.sortField() === field) {
      // Toggle direction
      if (this.sortDirection() === 'asc') {
        this.sortDirection.set('desc');
      } else if (this.sortDirection() === 'desc') {
        this.sortDirection.set('');
        this.sortField.set('');
      } else {
        this.sortDirection.set('asc');
      }
    } else {
      this.sortField.set(field);
      this.sortDirection.set('asc');
    }
  }
 
  getSortIcon(field: string): string {
    if (this.sortField() !== field) return 'unfold_more';
    if (this.sortDirection() === 'asc') return 'arrow_upward';
    if (this.sortDirection() === 'desc') return 'arrow_downward';
    return 'unfold_more';
  }
 
  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

 
  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }


  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'Active': 'status-success',
      'نشط': 'status-success',
      'مكتمل': 'status-success',
      'Inactive': 'status-danger',
      'غير نشط': 'status-danger',
      'ملغي': 'status-danger',
      'Pending': 'status-warning',
      'قيد المعالجة': 'status-warning',
      'Maintenance': 'status-info',
      'صيانة': 'status-info'
    };
    return statusMap[status] || 'status-default';
  }

 
  formatDate(date: string | Date): string {
    if (!date) return '-';
    const d = new Date(date);
    return d.toLocaleDateString('ar-SA');
  }
 
  formatCurrency(value: number | string): string {
    if (value == null) return '-';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'USD'
    }).format(num);
  }
}