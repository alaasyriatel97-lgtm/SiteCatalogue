import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal('');


  onLogin(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');


    this.authService.login().subscribe({
      next: () => {
        // سيتم إعادة التحميل تلقائياً من داخل AuthService
         // this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage.set(
          error.error?.message || 'فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.'
        );
        this.isLoading.set(false);
      }
    });
  }
}
