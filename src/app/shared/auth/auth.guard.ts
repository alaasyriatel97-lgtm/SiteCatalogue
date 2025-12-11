import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, of, switchMap, take } from 'rxjs';
import { AccountService } from './account.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AccountService);
  const router = inject(Router);

  //  1. Check if user has token
  const token = localStorage.getItem('auth');
  if (!token) {
    router.navigate(['/unauthorized']);
    return of(false); // stop immediately
  }

  //  2. Check route roles (if specified)
  const requiredRoles = route.data?.['roles'] as string[] | undefined;

  return authService.getDistinctRoles$().pipe(
    take(1),
    map((userRoles) => {
      // If no roles required → allow access
      if (!requiredRoles || requiredRoles.length === 0) {
        return true;
      }

      // If user has at least one required role → allow access
      const hasAccess = requiredRoles.some((role) => userRoles.includes(role));

      if (!hasAccess) {
        router.navigate(['/unauthorized']);
      }

      return hasAccess;
    })
  );
};
