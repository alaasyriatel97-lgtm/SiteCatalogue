import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface StatCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
  color: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard{
  stats = signal<StatCard[]>([
    {
      title: 'إجمالي المبيعات',
      value: '$45,231',
      change: '+12.5%',
      trend: 'up',
      icon: 'attach_money',
      color: 'green'
    },
    {
      title: 'عدد الطلبات',
      value: '1,258',
      change: '+8.2%',
      trend: 'up',
      icon: 'shopping_cart',
      color: 'blue'
    },
    {
      title: 'المخزون',
      value: '3,542',
      change: '-3.1%',
      trend: 'down',
      icon: 'inventory_2',
      color: 'orange'
    },
    {
      title: 'المستخدمين',
      value: '892',
      change: '+15.3%',
      trend: 'up',
      icon: 'people',
      color: 'purple'
    }
  ]);

  quickActions = signal([
    { title: 'تقارير المبيعات', icon: 'analytics', route: '/reports/sales' },
    { title: 'إدارة المخزون', icon: 'inventory', route: '/reports/inventory' },
    { title: 'دليل المواقع', icon: 'location_on', route: '/reports/sites' }
  ]);
}