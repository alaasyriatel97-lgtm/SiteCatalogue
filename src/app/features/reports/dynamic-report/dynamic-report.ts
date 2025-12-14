import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { combineLatest } from 'rxjs'; // ضروري جداً لمراقبة المسار والبارامترات معاً

import { MetaService } from '../../../core/services/meta.service';
import { GroupTabPage, TabPage } from '../../../core/models/metadata.model';

import { SmartFilter } from '../../../shared/components/smart-filter/smart-filter';
import { SmartTable } from '../../../shared/components/smart-table/smart-table';

@Component({
  selector: 'app-dynamic-report',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    SmartFilter,
    SmartTable
  ],
  templateUrl: './dynamic-report.html',
  styleUrls: ['./dynamic-report.scss']
})
export class DynamicReport implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private metaService = inject(MetaService);

  // State Signals
  groupConfig = signal<GroupTabPage | null>(null);
  activeTab = signal<TabPage | null>(null);
  tableData = signal<any[]>([]);
  
  isLoading = signal<boolean>(false);
  isTableLoading = signal<boolean>(false);
  error = signal<string>('');
  lastUpdateTime = signal<Date | null>(null);

  // Computed
  pageTitle = computed(() => {
    const group = this.groupConfig();
    const tab = this.activeTab();
    return group && tab ? `${group.pageTitle} – ${tab.title}` : 'Loading...';
  });
  
  hasFilters = computed(() => (this.activeTab()?.filters?.length || 0) > 0);
  hasData = computed(() => this.tableData().length > 0);

  ngOnInit() {
     combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ]).subscribe(([params, queryParams]) => {
      const slug = params.get('slug');  
      const tabId = queryParams.get('tabId'); 

      if (slug) {
        this.loadReportData(slug, tabId ? Number(tabId) : null);
      }
    });
  }

  
  loadReportData(slug: string, tabId: number | null): void {
    this.isLoading.set(true);
    this.error.set('');

    this.metaService.getGroupConfig(slug).subscribe({
      next: (config) => {
        if (!config) {
          this.error.set('Page not found');
          this.isLoading.set(false);
          return;
        }

        this.groupConfig.set(config);

         let targetTab: TabPage | undefined;

        if (tabId) {
          targetTab = config.tabs.find(t => t.id === tabId);
        }

         if (!targetTab && config.tabs.length > 0) {
          targetTab = config.tabs[0];
           this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { tabId: targetTab.id },
            replaceUrl: true
          });
        }

        if (targetTab) {
          this.activeTab.set(targetTab);
          this.tableData.set([]);  
          
            if (!targetTab.filters || targetTab.filters.length === 0) {
             this.fetchData(targetTab.procedureName, {});
          }
        } else {
          this.error.set('There are no available tabs in this group');
        }

        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Failed to load report settings');
        this.isLoading.set(false);
      }
    });
  }

  // ========== Data Actions ==========

  onSearch(filterValues: any): void {
    const currentTab = this.activeTab();
    if (currentTab) {
      this.fetchData(currentTab.procedureName, filterValues);
    }
  }

  fetchData(procedureName: string, filters: any): void {
    this.isTableLoading.set(true);
    
    this.metaService.getReportData(procedureName, filters).subscribe({
      next: (data) => {
        this.tableData.set(data);
        this.lastUpdateTime.set(new Date());
        this.isTableLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching data:', err);
        this.tableData.set([]);
        this.isTableLoading.set(false);
      }
    });
  }

  refreshData(): void {
    const currentTab = this.activeTab();
    if (currentTab) {
      this.fetchData(currentTab.procedureName, {});
    }
  }

  exportData(): void {
    const data = this.tableData();
    if (data.length > 0) {
      console.log('Exporting data...', data);
     }
  }

  retry(): void {
    const slug = this.route.snapshot.params['slug'];
    const tabId = this.route.snapshot.queryParams['tabId'];
    if (slug) {
      this.loadReportData(slug, tabId ? Number(tabId) : null);
    }
  }

  onRowClick(event: any): void {
    console.log('Row Click:', event);
  }

  onActionClick(event: any): void {
    console.log('Action Click:', event);
  }
}