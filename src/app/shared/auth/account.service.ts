import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, finalize, map, of, tap } from 'rxjs';

import { TokenDto } from './models/account';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private url = environment.apiUrl + '/token';
  private http = inject(HttpClient);
  private Logging = new BehaviorSubject<boolean>(false);
  private authData = new BehaviorSubject<TokenDto | null>(null);
  get logging$(): Observable<boolean> {
    return this.Logging.asObservable();
  }
  get authData$(): Observable<TokenDto | null> {
    return this.authData.asObservable();
  }
  constructor() {
    this.authData.next(this.auth);
  }
  private storeAuth(model: TokenDto) {
    this.authData.next(model);
    localStorage.setItem('auth', JSON.stringify(model));
  }
  get auth(): TokenDto | null {
    const authString = localStorage.getItem('auth');
    if (!authString) {
      return null;
    }
    const auth = JSON.parse(authString) as TokenDto;
    return auth;
  }
  login(): Observable<TokenDto> {
    this.Logging.next(true);

    return this.http.get<TokenDto>(this.url, { withCredentials: true }).pipe(
      tap((x) => this.storeAuth(x)), // Store token
      tap(() => window.location.reload()), // Reload after successful login
      finalize(() => this.Logging.next(false)) // Reset loading flag
    );
  }

  isTokenExpired(): boolean {
    return !this.auth || Date.now() >= new Date(this.auth.expiryTime).getTime();
  }

  hasRole$(roles: string[]): Observable<boolean> {
    return this.authData$.pipe(
      map((authData) => {
        if (!authData) return false;
        return authData.userInfo.tenantAccesses.some((access) => roles.some((role) => access.roleList.includes(role)));
      })
    );
  }

  getDistinctRoles$(): Observable<string[]> {
    return this.authData$.pipe(
      map((authData) => {
        if (!authData?.userInfo?.tenantAccesses) return [];

        const allRoles = authData.userInfo.tenantAccesses.flatMap((access) => access.roleList);

        return [...new Set(allRoles)];
      })
    );
  }

  reLogin(): Observable<TokenDto> {
    this.Logging.next(true);

    return this.http.get<TokenDto>(this.url, { withCredentials: true }).pipe(
      tap((x) => this.storeAuth(x)), // Store token
      finalize(() => this.Logging.next(false)) // Reset loading flag
    );
  }
}
