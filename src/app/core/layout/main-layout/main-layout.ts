import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../../services/auth.service';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles?: string[];
}

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
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule
  ],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss']
})
export class MainLayout {
  private authService = inject(AuthService);
  private router = inject(Router);
  private breakpointObserver = inject(BreakpointObserver);

  // State
  isSidebarOpen = signal(true);
  isMobile = signal(false);
  currentUser = computed(() => this.authService.getCurrentUser());

  menuItems: MenuItem[] = [
    { label: 'الرئيسية', icon: 'dashboard', route: '/dashboard' },
    { label: 'المبيعات', icon: 'shopping_cart', route: '/reports/sales' },
    { label: 'المخزون', icon: 'inventory_2', route: '/reports/inventory' },
    { label: 'دليل المواقع', icon: 'location_on', route: '/reports/sites' },
    { label: 'الإعدادات', icon: 'settings', route: '/settings', roles: ['Admin'] }
  ];

  constructor() {
    // Detect mobile
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile.set(result.matches);
      this.isSidebarOpen.set(!result.matches);
    });
  }

  toggleSidebar(): void {
    this.isSidebarOpen.update(val => !val);
  }

  logout(): void {
    this.authService.logout();
  }

  hasRole(roles?: string[]): boolean {
    if (!roles || roles.length === 0) return true;
    return this.authService.hasRole(roles);
  }
}