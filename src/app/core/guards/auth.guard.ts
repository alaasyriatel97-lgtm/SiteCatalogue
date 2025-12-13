import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // التحقق من تسجيل الدخول
  if (!authService.isLoggedIn() || authService.isTokenExpired()) {
    router.navigate(['/login'], { 
      queryParams: { returnUrl: state.url } 
    });
    return false;
  }
  
  // التحقق من الأدوار المطلوبة
  const requiredRoles = route.data['roles'] as string[] | undefined;
  
  if (requiredRoles && requiredRoles.length > 0) {
    if (!authService.hasRole(requiredRoles)) {
      router.navigate(['/unauthorized']);
      return false;
    }
  }
  
  return true;
};