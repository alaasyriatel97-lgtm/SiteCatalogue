import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
=======
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
>>>>>>> 40e60079cf48c0e625aeb7cd2d5fbe4c24e1c129
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
<<<<<<< HEAD
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
=======
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
>>>>>>> 40e60079cf48c0e625aeb7cd2d5fbe4c24e1c129
    MatProgressSpinnerModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
<<<<<<< HEAD
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
=======
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup;
  hidePassword = signal(true);
  isLoading = signal(false);
  errorMessage = signal('');

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage.set('');

      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage.set(
            error.error?.message || 'فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.'
          );
          this.isLoading.set(false);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword.update(val => !val);
  }
}
>>>>>>> 40e60079cf48c0e625aeb7cd2d5fbe4c24e1c129
