import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
<<<<<<< HEAD
import { map, of, switchMap, take } from 'rxjs';
import { AccountService } from '../services/account.service';

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
=======
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
   if (!authService.isLoggedIn() || authService.isTokenExpired()) {
    router.navigate(['/login'], { 
      queryParams: { returnUrl: state.url } 
    });
    return false;
  }
  
   const requiredRoles = route.data['roles'] as string[] | undefined;
  
  if (requiredRoles && requiredRoles.length > 0) {
    if (!authService.hasRole(requiredRoles)) {
      router.navigate(['/unauthorized']);
      return false;
    }
  }
  
  return true;
};
>>>>>>> 40e60079cf48c0e625aeb7cd2d5fbe4c24e1c129
