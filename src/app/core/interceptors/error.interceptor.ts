import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      
      if (error.status === 401) {
        // Unauthorized - تسجيل الخروج
        authService.logout();
        router.navigate(['/login']);
      } else if (error.status === 403) {
        // Forbidden - لا توجد صلاحية
        router.navigate(['/unauthorized']);
      } else if (error.status === 0) {
        // Network error
        console.error('خطأ في الاتصال بالخادم');
      }
      
      return throwError(() => error);
    })
  );
};