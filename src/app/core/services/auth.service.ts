import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap } from 'rxjs';
<<<<<<< HEAD
import { environment } from '../../../environments/environment';
import { TenantDto, TokenDto } from '../models/auth.model';

=======
import { LoginRequest, LoginResponse, UserInfo } from '../models/auth.model';
import { environment } from '../../../environments/environment';
>>>>>>> 40e60079cf48c0e625aeb7cd2d5fbe4c24e1c129

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
<<<<<<< HEAD

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

=======
  
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_info';
  
  // State Management
  private currentUserSubject = new BehaviorSubject<UserInfo | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  isLoggedIn = signal(false);
  
  constructor() {
    this.loadUserFromStorage();
  }
  
  /**
   * تسجيل الدخول
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/auth/login`,
      credentials
    ).pipe(
      tap(response => this.handleLoginSuccess(response))
    );
  }
  
>>>>>>> 40e60079cf48c0e625aeb7cd2d5fbe4c24e1c129
  /**
   * تسجيل الخروج
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
<<<<<<< HEAD
    this.authDataSubject.next(null);
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

=======
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
  
>>>>>>> 40e60079cf48c0e625aeb7cd2d5fbe4c24e1c129
  /**
   * الحصول على التوكن
   */
  getToken(): string | null {
<<<<<<< HEAD
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

=======
    return localStorage.getItem(this.TOKEN_KEY);
  }
  
  /**
   * الحصول على معلومات المستخدم
   */
  getCurrentUser(): UserInfo | null {
    return this.currentUserSubject.value;
  }
  
>>>>>>> 40e60079cf48c0e625aeb7cd2d5fbe4c24e1c129
  /**
   * التحقق من الصلاحية
   */
  hasRole(roles: string[]): boolean {
<<<<<<< HEAD
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

=======
    const user = this.getCurrentUser();
    if (!user) return false;
    
    return user.tenantAccesses.some(access =>
      access.roleList.some(role => roles.includes(role))
    );
  }
  
>>>>>>> 40e60079cf48c0e625aeb7cd2d5fbe4c24e1c129
  /**
   * التحقق من صلاحية التوكن
   */
  isTokenExpired(): boolean {
<<<<<<< HEAD
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
=======
    const token = this.getToken();
    if (!token) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000;
      return Date.now() >= expiry;
    } catch {
      return true;
    }
  }
  
  /**
   * معالجة نجاح تسجيل الدخول
   */
  private handleLoginSuccess(response: LoginResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.userInfo));
    this.currentUserSubject.next(response.userInfo);
    this.isLoggedIn.set(true);
  }
  
  /**
   * تحميل المستخدم من LocalStorage
   */
  private loadUserFromStorage(): void {
    const token = this.getToken();
    const userJson = localStorage.getItem(this.USER_KEY);
    
    if (token && !this.isTokenExpired() && userJson) {
      const user = JSON.parse(userJson) as UserInfo;
      this.currentUserSubject.next(user);
      this.isLoggedIn.set(true);
    }
  }
}
>>>>>>> 40e60079cf48c0e625aeb7cd2d5fbe4c24e1c129
