import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { RefreshTokenService } from '../auth/refresh-token.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LocalStorageServiceService } from '../../core/services/local-storage-service.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const refreshService = inject(RefreshTokenService);
  const router = inject(Router);
  const localStorageServiceService = inject(LocalStorageServiceService);

  //  Handle token or refresh requests separately
  if (req.url.toLowerCase().endsWith('/token') || req.url.toLowerCase().endsWith('/refreshtoken')) {
    console.log('Token request intercepted');
    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.status);

        if (error.status === 400) {
          console.warn('Token request failed with 400 - treating as Unauthorized');
          // Optional: clear tokens or session
          localStorageServiceService.removeItem?.('auth');
          // Optional: navigate to login
          router.navigate(['/login']);
        }

        // Re-throw the error so other handlers can still catch it if needed
        return throwError(() => error);
      })
    );
  }

  //  All other requests
  return refreshService.handleRequest(req, next).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(error.status);

      if (error.status === 400) {
        // Convert 400 to 401 for consistency
        error = new HttpErrorResponse({
          error: error.error,
          headers: error.headers,
          status: 401,
          statusText: 'Unauthorized',
          url: error.url || req.url
        });
      }

      if (error.status === 401) {
        localStorageServiceService.removeItem?.('token');
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};
