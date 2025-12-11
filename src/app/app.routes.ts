import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      
       { 
        path: 'dashboard', 
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) 
      },

        {
        path: 'reports/:groupSlug',
        loadComponent: () => import('./features/dynamic-report/dynamic-report.component').then(m => m.DynamicReportComponent)
      },
      {
      path: 'reports/:slug',
      loadComponent: () => import('./features/dynamic-report/dynamic-report.component')
        .then(m => m.DynamicReportComponent),
      canActivate: [authGuard]  
    }
    ]
  },
  
 ];