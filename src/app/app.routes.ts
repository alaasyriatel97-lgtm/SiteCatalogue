import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    // Public Routes
    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/login/login')
                .then(m => m.Login)
    },
    {
        path: 'unauthorized',
        loadComponent: () =>
            import('./features/auth/unauthorized/unauthorized')
                .then(m => m.Unauthorized)
    },

    // Protected Routes
    {
        path: '',
        loadComponent: () =>
            import('./core/layout/main-layout/main-layout')
                .then(m => m.MainLayout),
        // canActivate: [authGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./features/dashboard/dashboard')
                        .then(m => m.Dashboard)
            },
            {
                path: 'reports/:slug',
                loadComponent: () =>
                    import('./features/reports/dynamic-report/dynamic-report')
                        .then(m => m.DynamicReport)
            }
        ]
    },

    // Fallback
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];