import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
    MatIconModule
    // تمت إزالة MatCardModule و MatButtonModule للاعتماد على Tailwind
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {
  stats = signal<StatCard[]>([
    {
      title: 'Total Sites',
      value: '248',
      change: '+4.2%',
      trend: 'up',
      icon: 'cell_tower',
      color: 'blue'
    },
    {
      title: 'Active Sites',
      value: '221',
      change: '+2.1%',
      trend: 'up',
      icon: 'check_circle',
      color: 'green'
    },
    {
      title: 'Sites with Power Issues',
      value: '17',
      change: '-5.6%',
      trend: 'down',
      icon: 'bolt',
      color: 'orange'
    },
    {
      title: 'Current Outages',
      value: '10',
      change: '-12.3%',
      trend: 'down',
      icon: 'warning',
      color: 'red'
    }
  ]);

  quickActions = signal([
    { title: 'Site Overview', icon: 'cell_tower', route: '/reports/sites' },
    { title: 'Availability Reports', icon: 'check_circle', route: '/reports/availability' },
    { title: 'Power Status', icon: 'bolt', route: '/reports/power' }
  ]);
}