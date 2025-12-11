import { HttpInterceptorFn } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageServiceService } from 'src/app/theme/shared/service/local-storage-service.service';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const localStorageServiceService = inject(LocalStorageServiceService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 400) {
        console.warn('500 Internal Server Error occurred. Skipping and continuing.');
        // Return an empty response so that execution continues without failure
        localStorageServiceService.removeItem?.('auth');
        // Optional: navigate to login
        router.navigate(['/unauthorized']);
        return of({} as HttpEvent<any>);
      }
      return of(error.error || ({} as HttpEvent<any>)); // Continue execution for other errors
    })

    // ,tap(event => {
    //   console.log('API Request:', req.url, 'Method:', req.method);
    //   console.log('API Response:', event);
    // })
  );
};
