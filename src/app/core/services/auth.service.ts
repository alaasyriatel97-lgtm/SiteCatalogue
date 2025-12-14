import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TenantDto, TokenDto } from '../models/auth.model';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly TOKEN_KEY = 'auth';

  // State Management
  private authDataSubject = new BehaviorSubject<TokenDto | null>(null);
  public authData$ = this.authDataSubject.asObservable();

  private loggingSubject = new BehaviorSubject<boolean>(false);
  public logging$ = this.loggingSubject.asObservable();

  isLoggedIn = signal(false);

  constructor() {
    this.loadAuthFromStorage();
  }

  /**
   * تسجيل الدخول (يستدعي /token من Backend)
   */
  login(): Observable<TokenDto> {
    this.loggingSubject.next(true);

    return this.http.get<TokenDto>(`${environment.apiUrl}/token`, {
      withCredentials: true
    }).pipe(
      tap(response => {
        this.storeAuth(response);
        // إعادة تحميل الصفحة بعد تسجيل الدخول
        window.location.reload();
      }),
      tap(() => this.loggingSubject.next(false))
    );
  }

  /**
   * إعادة تسجيل الدخول (Refresh Token)
   */
  reLogin(): Observable<TokenDto> {
    this.loggingSubject.next(true);

    return this.http.get<TokenDto>(`${environment.apiUrl}/token`, {
      withCredentials: true
    }).pipe(
      tap(response => this.storeAuth(response)),
      tap(() => this.loggingSubject.next(false))
    );
  }

  /**
   * تسجيل الخروج
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.authDataSubject.next(null);
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  /**
   * الحصول على التوكن
   */
  getToken(): string | null {
    const auth = this.getAuth();
    return auth?.token || null;
  }

  /**
   * الحصول على بيانات Auth كاملة
   */
  getAuth(): TokenDto | null {
    const authString = localStorage.getItem(this.TOKEN_KEY);
    if (!authString) return null;

    try {
      return JSON.parse(authString) as TokenDto;
    } catch {
      return null;
    }
  }

  /**
   * الحصول على معلومات المستخدم
   */
  getCurrentUser(): TenantDto | null {
    const auth = this.authDataSubject.value;
    return auth?.userInfo || null;
  }

  /**
   * التحقق من الصلاحية
   */
  hasRole(roles: string[]): boolean {
    const auth = this.authDataSubject.value;
    if (!auth) return false;

    return auth.userInfo.tenantAccesses.some(access =>
      access.roleList.some(role => roles.includes(role))
    );
  }

  /**
   * الحصول على جميع الصلاحيات (مميزة)
   */
  getDistinctRoles(): string[] {
    const auth = this.authDataSubject.value;
    if (!auth?.userInfo?.tenantAccesses) return [];

    const allRoles = auth.userInfo.tenantAccesses.flatMap(access => access.roleList);
    return [...new Set(allRoles)];
  }

  /**
   * التحقق من صلاحية التوكن
   */
  isTokenExpired(): boolean {
    const auth = this.getAuth();
    if (!auth) return true;

    return Date.now() >= new Date(auth.expiryTime).getTime();
  }

  /**
   * حفظ بيانات Auth في LocalStorage
   */
  private storeAuth(auth: TokenDto): void {
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify(auth));
    this.authDataSubject.next(auth);
    this.isLoggedIn.set(true);
  }

  /**
   * تحميل بيانات Auth من LocalStorage
   */
  private loadAuthFromStorage(): void {
    const auth = this.getAuth();

    if (auth && !this.isTokenExpired()) {
      this.authDataSubject.next(auth);
      this.isLoggedIn.set(true);
    }
  }
}
