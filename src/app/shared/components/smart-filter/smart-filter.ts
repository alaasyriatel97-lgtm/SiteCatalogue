import { Component, Input, Output, EventEmitter, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReportFilter } from '../../../core/models/metadata.model';

@Component({
  selector: 'app-smart-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './smart-filter.html',
  styleUrls: ['./smart-filter.scss']
})
export class SmartFilter implements OnChanges {
  @Input() filters: ReportFilter[] = [];
  @Output() filterSubmit = new EventEmitter<any>();
  @Output() filterReset = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  filterForm: FormGroup = this.fb.group({});

  ngOnChanges(): void {
    this.buildForm();
  }

  /**
   * بناء النموذج ديناميكياً
   */
  private buildForm(): void {
    const group: any = {};
    
    // ترتيب الفلاتر
    const sortedFilters = [...this.filters].sort((a, b) => a.order - b.order);
    
    sortedFilters.forEach(filter => {
      const validators = filter.isRequired ? [Validators.required] : [];
      group[filter.key] = [filter.defaultValue || '', validators];
    });
    
    this.filterForm = this.fb.group(group);
  }

  /**
   * الحصول على خيارات القائمة المنسدلة
   */
  getSelectOptions(filter: ReportFilter): string[] {
    if (filter.dataSourceType === 'static' && filter.dataSourceValue) {
      return filter.dataSourceValue.split(',').map(v => v.trim());
    }
    return [];
  }

  /**
   * إرسال النموذج
   */
  onSubmit(): void {
    if (this.filterForm.valid) {
      this.filterSubmit.emit(this.filterForm.value);
    } else {
      this.filterForm.markAllAsTouched();
    }
  }

  /**
   * إعادة تعيين النموذج
   */
  onReset(): void {
    this.filterForm.reset();
    this.filterReset.emit();
  }

  /**
   * التحقق من وجود أخطاء
   */
  hasError(key: string): boolean {
    const control = this.filterForm.get(key);
    return !!(control && control.invalid && control.touched);
  }

  /**
   * الحصول على رسالة الخطأ
   */
  getErrorMessage(key: string): string {
    const control = this.filterForm.get(key);
    if (control?.hasError('required')) {
      return 'هذا الحقل مطلوب';
    }
    return '';
  }
}