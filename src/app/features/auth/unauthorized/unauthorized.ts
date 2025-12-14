import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './unauthorized.html',
  styleUrls: ['./unauthorized.scss']
})
export class Unauthorized {
  private router = inject(Router);
  private location = inject(Location);

  /**
   * العودة للصفحة السابقة
   */
  goBack(): void {
    this.location.back();
  }

  /**
   * الذهاب لصفحة تسجيل الدخول
   */
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  /**
   * الذهاب للصفحة الرئيسية
   */
  goToHome(): void {
    this.router.navigate(['/dashboard']);
  }
}