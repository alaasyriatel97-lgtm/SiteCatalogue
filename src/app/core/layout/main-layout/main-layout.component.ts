import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  template: `
    <mat-sidenav-container class="h-full bg-[#f4f6f8]">
      
      <mat-sidenav #sidenav mode="side" opened class="w-64 border-r border-gray-200 bg-white shadow-sm">
        
        <div class="h-16 flex items-center px-6 border-b border-gray-100">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              DZ
            </div>
            <span class="text-lg font-bold text-gray-800 tracking-wide">Dar Alzaibak</span>
          </div>
        </div>

        <mat-nav-list class="pt-4 px-3">
          @for (item of menuItems(); track item.label) {
            <a mat-list-item 
               [routerLink]="item.link" 
               routerLinkActive="bg-blue-50 text-blue-600 rounded-lg" 
               class="mb-1 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
              <mat-icon matListItemIcon class="text-gray-400 group-hover:text-blue-500">{{ item.icon }}</mat-icon>
              <span matListItemTitle class="font-medium text-sm">{{ item.label }}</span>
            </a>
          }
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content class="flex flex-col h-full">
        
        <mat-toolbar class="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10 px-6 justify-between h-16 shadow-sm">
          <div class="flex items-center">
            <button mat-icon-button (click)="sidenav.toggle()" class="text-gray-500">
              <mat-icon>menu</mat-icon>
            </button>
            <div class="hidden md:flex items-center ml-4 bg-gray-100 rounded-md px-3 py-1.5 w-64 border border-transparent focus-within:border-blue-400 focus-within:bg-white transition-all">
              <mat-icon class="text-gray-400 text-sm scale-75">search</mat-icon>
              <input type="text" placeholder="بحث..." class="bg-transparent border-none outline-none text-sm text-gray-600 w-full ml-2">
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button mat-icon-button class="text-gray-500">
              <mat-icon>notifications_none</mat-icon>
            </button>
            <div class="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs cursor-pointer">
              AD
            </div>
          </div>
        </mat-toolbar>

        <main class="p-6 flex-1 overflow-auto">
          <div class="mb-6 flex items-center text-sm text-gray-500">
            <span>الرئيسية</span>
            <mat-icon class="text-xs mx-2 scale-75">chevron_left</mat-icon>
            <span class="text-gray-800 font-semibold">لوحة التحكم</span>
          </div>

          <router-outlet></router-outlet>
        </main>

      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    /* تخصيصات Material لجعلها تشبه Mantis أكثر */
    :host ::ng-deep .mat-mdc-list-item-icon { margin-right: 12px !important; }
    :host ::ng-deep .mat-drawer-inner-container { overflow-x: hidden; }
  `]
})
export class MainLayoutComponent {
  // قائمة مبدئية للتجريب (لاحقاً ستأتي من الصلاحيات)
  menuItems = signal([
    { label: 'الرئيسية', icon: 'dashboard', link: '/dashboard' },
    { label: 'المبيعات', icon: 'attach_money', link: '/reports/sales' },
    { label: 'المخزون', icon: 'inventory_2', link: '/reports/inventory' },
    { label: 'المستخدمين', icon: 'people', link: '/settings/users' },
  ]);
}