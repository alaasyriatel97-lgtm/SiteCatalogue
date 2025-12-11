import { Component, Input, Output, EventEmitter, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ReportFilter } from '../../../core/models/metadata.model';
 
@Component({
  selector: 'app-smart-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="filterForm" (ngSubmit)="onSubmit()" class="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        
        @for (filter of filters; track filter.id) {
          <div class="flex flex-col">
            <label class="mb-1 text-sm font-semibold text-gray-700">
              {{ filter.label }}
              @if(filter.isRequired) { <span class="text-red-500">*</span> }
            </label>

            @if (filter.type === 'text' || filter.type === 'number') {
              <input 
                [type]="filter.type" 
                [formControlName]="filter.key" 
                [placeholder]="filter.placeholder || ''"
                class="form-control px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            }

            @if (filter.type === 'date') {
              <input type="date" [formControlName]="filter.key" class="form-control px-3 py-2 border rounded-md text-sm" />
            }

            @if (filter.type === 'select') {
              <select [formControlName]="filter.key" class="form-select px-3 py-2 border rounded-md text-sm bg-white">
                <option value="">الكل</option>
                @if (filter.dataSourceType === 'static' && filter.dataSourceValue) {
                  @for (opt of filter.dataSourceValue.split(','); track opt) {
                    <option [value]="opt">{{ opt }}</option>
                  }
                }
              </select>
            }
          </div>
        }

        <div class="flex items-end">
          <button type="submit" 
            [disabled]="filterForm.invalid"
            class="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed">
            بحث <i class="feather icon-search ml-1"></i>
          </button>
        </div>

      </div>
    </form>
  `
})
export class SmartFilterComponent implements OnChanges {
  @Input() filters: ReportFilter[] = [];
  @Output() filterSubmit = new EventEmitter<any>();

  private fb = inject(FormBuilder);
  filterForm: FormGroup = this.fb.group({});

  ngOnChanges() {
    this.buildForm();
  }

  private buildForm() {
    const group: any = {};
    // ترتيب الفلاتر حسب الـ Order
    this.filters.sort((a, b) => a.order - b.order).forEach(f => {
      // هنا يمكن إضافة Validators.required إذا كان f.isRequired true
      group[f.key] = [f.defaultValue || ''];
    });
    this.filterForm = this.fb.group(group);
  }

  onSubmit() {
    if (this.filterForm.valid) {
      this.filterSubmit.emit(this.filterForm.value);
    }
  }
}