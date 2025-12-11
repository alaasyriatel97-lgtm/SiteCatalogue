import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mantis-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mantis-card bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
      @if (title) {
        <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h5 class="text-lg font-semibold text-gray-800">{{ title }}</h5>
          <ng-content select="[action]"></ng-content>
        </div>
      }

      <div class="p-6">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .mantis-card {
      transition: box-shadow 0.3s ease-in-out;
    }
    .mantis-card:hover {
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    }
  `]
})
export class MantisCardComponent {
  @Input() title: string = '';
}