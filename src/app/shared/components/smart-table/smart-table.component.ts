import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportColumn } from 'src/app/core/models/metadata.model';

@Component({
  selector: 'app-smart-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 border-b">
          <tr>
            @for (col of columns; track col.id) {
              @if(col.isActive) {
                <th scope="col" class="px-6 py-3 font-bold cursor-pointer hover:bg-gray-100 transition">
                  {{ col.header }}
                  @if(col.isSortable) { <span class="text-gray-400">↕</span> }
                </th>
              }
            }
          </tr>
        </thead>
        <tbody>
          @if(isLoading) {
            <tr>
              <td [attr.colspan]="columns.length" class="text-center py-8">
                <div class="spinner-border text-primary" role="status"></div>
                <p class="mt-2 text-gray-500">جاري تحميل البيانات...</p>
              </td>
            </tr>
          } @else if (data.length === 0) {
            <tr>
              <td [attr.colspan]="columns.length" class="text-center py-8 text-gray-500 font-medium">
                لا توجد بيانات للعرض
              </td>
            </tr>
          } @else {
            @for (row of data; track $index) {
              <tr class="border-b hover:bg-gray-50 transition">
                @for (col of columns; track col.id) {
                  @if(col.isActive) {
                    <td class="px-6 py-4 whitespace-nowrap">
                      
                      @if(col.type === 'status') {
                        <span [ngClass]="{
                          'bg-green-100 text-green-800': row[col.field] === 'Active',
                          'bg-red-100 text-red-800': row[col.field] === 'Inactive',
                          'bg-yellow-100 text-yellow-800': row[col.field] === 'Pending'
                        }" class="px-2 py-1 rounded-full text-xs font-semibold">
                          {{ row[col.field] }}
                        </span>
                      } 
                      
                      @else if (col.type === 'date') {
                        {{ row[col.field] | date:'mediumDate' }}
                      } 
                      
                      @else {
                        {{ row[col.field] }}
                      }

                    </td>
                  }
                }
              </tr>
            }
          }
        </tbody>
      </table>
    </div>
  `
})
export class SmartTableComponent {
  @Input() columns: ReportColumn[] = [];
  @Input() data: any[] = [];
  @Input() isLoading: boolean = false;
}