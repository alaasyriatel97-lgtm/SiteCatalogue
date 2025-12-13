import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { LoginRequest, LoginResponse, UserInfo } from '../models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
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
  
  /**
   * تسجيل الخروج
   */
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }
  
  /**
   * الحصول على التوكن
   */
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  
  /**
   * الحصول على معلومات المستخدم
   */
  getCurrentUser(): UserInfo | null {
    return this.currentUserSubject.value;
  }
  
  /**
   * التحقق من الصلاحية
   */
  hasRole(roles: string[]): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;
    
    return user.tenantAccesses.some(access =>
      access.roleList.some(role => roles.includes(role))
    );
  }
  
  /**
   * التحقق من صلاحية التوكن
   */
  isTokenExpired(): boolean {
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