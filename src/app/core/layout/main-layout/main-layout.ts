import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../../services/auth.service';
import { MetaService } from '../../services/meta.service';
import { MenuItem } from '../../models/metadata.model';
<<<<<<< HEAD
import { TenantDto } from '../../models/auth.model';
=======
>>>>>>> 40e60079cf48c0e625aeb7cd2d5fbe4c24e1c129

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule
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
<<<<<<< HEAD
currentUser = computed((): TenantDto | null => this.authService.getCurrentUser());

   menuItems = signal<MenuItem[]>([]);

=======
  currentUser = computed(() => this.authService.getCurrentUser());

   menuItems = signal<MenuItem[]>([]);
  
>>>>>>> 40e60079cf48c0e625aeb7cd2d5fbe4c24e1c129
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
<<<<<<< HEAD
      {
        label: 'الرئيسية',
        icon: 'dashboard',
=======
      { 
        label: 'الرئيسية', 
        icon: 'dashboard', 
>>>>>>> 40e60079cf48c0e625aeb7cd2d5fbe4c24e1c129
        route: '/dashboard'
      }
    ];

     this.metaService.getMenuItems().subscribe({
      next: (groups) => {
        console.log('📋 Menu Groups loaded:', groups);
<<<<<<< HEAD

=======
        
>>>>>>> 40e60079cf48c0e625aeb7cd2d5fbe4c24e1c129
         const dynamicItems: MenuItem[] = groups.map(group => ({
          label: group.pageTitle,
          icon: group.icon || 'folder',
          route: undefined, // لا يوجد رابط مباشر للمجموعة
          children: group.tabs.map((tab: { title: any; id: any; }) => ({
            label: tab.title,
            icon: 'circle',
            route: `/reports/${group.slug}`,
            queryParams: { tabId: tab.id },
            roles: []
          }))
        }));

         this.menuItems.set([...staticItems, ...dynamicItems]);
        console.log('✅ Final menu items:', this.menuItems());
      },
      error: (err) => {
        console.error('❌ Error loading menu:', err);
         this.menuItems.set(staticItems);
      }
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 40e60079cf48c0e625aeb7cd2d5fbe4c24e1c129
