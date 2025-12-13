import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../../services/auth.service';
import { MetaService } from '../../services/meta.service';
import { MenuItem } from '../../models/metadata.model';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule
    // تمت إزالة MatDividerModule واستخدام HTML عادي بدلاً منه
  ],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.scss']
})
export class MainLayout implements OnInit {
  private authService = inject(AuthService);
  private metaService = inject(MetaService);
  private router = inject(Router);
  private breakpointObserver = inject(BreakpointObserver);

  // State
  isSidebarOpen = signal(true);
  isMobile = signal(false);
  currentUser = computed(() => this.authService.getCurrentUser());

  // القائمة كـ Signal
  menuItems = signal<MenuItem[]>([]);
  
  // متغير لتتبع أي قائمة مفتوحة حالياً
  expandedItem = signal<string | null>(null);

  constructor() {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isMobile.set(result.matches);
      this.isSidebarOpen.set(!result.matches);
    });
  }

  ngOnInit() {
    this.loadMenu();
  }

  loadMenu() {
    const staticItems: MenuItem[] = [
      { label: 'الرئيسية', icon: 'dashboard', route: '/dashboard' }
    ];

    this.metaService.getMenuItems().subscribe({
      next: (groups: any[]) => {
        
        const dynamicItems: MenuItem[] = groups.map(group => ({
          label: group.pageTitle,
          icon: group.icon || 'folder',
          route: undefined, 
          children: group.tabs.map((tab: any) => ({
            label: tab.title,
            icon: 'circle',
            // التصحيح: الرابط هو المسار فقط (بدون ؟ وبدون بارامترات)
            route: `/reports/${group.slug}`, 
            // التصحيح: البارامترات توضع هنا ككائن منفصل
            queryParams: { tabId: tab.id }, 
            roles: []
          }))
        }));

        this.menuItems.set([...staticItems, ...dynamicItems]);
      },
      error: (err) => console.error('Error loading menu:', err)
    });
  }

  toggleSubmenu(label: string): void {
    if (this.expandedItem() === label) {
      this.expandedItem.set(null);
    } else {
      this.expandedItem.set(label);
    }
  }

  isExpanded(label: string): boolean {
    return this.expandedItem() === label;
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