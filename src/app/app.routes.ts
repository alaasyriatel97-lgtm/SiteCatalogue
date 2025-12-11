import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { authGuard } from './shared/auth/auth.guard'; // 👈 هذا السطر كان ناقصاً

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

      // هذا هو الرابط الصحيح (احذف المكرر)
      {
        path: 'reports/:slug',
        loadComponent: () => import('./features/dynamic-report/dynamic-report.component')
          .then(m => m.DynamicReportComponent),
        canActivate: [authGuard] // الآن سيعمل لأننا قمنا بعمل Import
      }
    ]
  },

  // أضف صفحة تسجيل الدخول وإلا سيدخل الـ Guard في حلقة لا نهائية
  {
     path: 'login',
     loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
     path: 'unauthorized',
     loadComponent: () => import('./features/auth/unauthorized/unauthorized.component').then(m => m.UnauthorizedComponent)
  }
];
