import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MantisCardComponent } from '../../shared/components/mantis-card/mantis-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MantisCardComponent],
  template: `
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <p class="text-gray-500 text-sm font-medium">إجمالي المبيعات</p>
          <h3 class="text-2xl font-bold text-gray-800 mt-1">$45,000</h3>
        </div>
        <div class="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
          <span class="text-xl">💰</span>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <p class="text-gray-500 text-sm font-medium">عدد الطلبات</p>
          <h3 class="text-2xl font-bold text-gray-800 mt-1">1,250</h3>
        </div>
        <div class="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
          <span class="text-xl">📦</span>
        </div>
      </div>
    </div>

    <app-mantis-card title="أحدث النشاطات">
      <p class="text-gray-600">              </p>
    </app-mantis-card>
  `
})
export class HomeComponent {}