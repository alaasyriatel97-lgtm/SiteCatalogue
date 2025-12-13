import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MetaService } from '../../../core/services/meta.service';
import { GroupTabPage, TabPage } from '../../../core/models/metadata.model';

import { SmartFilter } from '../../../shared/components/smart-filter/smart-filter';
import { SmartTable } from '../../../shared/components/smart-table/smart-table';

@Component({
  selector: 'app-dynamic-report',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
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
  private metaService = inject(MetaService);

  // State Signals
  groupConfig = signal<GroupTabPage | null>(null);
  activeTab = signal<TabPage | null>(null);
  tableData = signal<any[]>([]);
  isLoading = signal<boolean>(false);
  isTableLoading = signal<boolean>(false);
  error = signal<string>('');
  selectedTabIndex = signal<number>(0);
  lastUpdateTime = signal<Date | null>(null);

  // Computed
  pageTitle = computed(() => this.groupConfig()?.pageTitle || 'تحميل...');
  hasFilters = computed(() => (this.activeTab()?.filters?.length || 0) > 0);
  hasData = computed(() => this.tableData().length > 0);

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      if (slug) {
        this.loadGroupConfig(slug);
      }
    });
  }

  /**
   * تحميل تكوين الصفحة من الـ API
   */
  loadGroupConfig(slug: string): void {
    this.isLoading.set(true);
    this.error.set('');
    
    this.metaService.getGroupConfig(slug).subscribe({
      next: (config) => {
        this.groupConfig.set(config);
        if (config!.tabs && config!.tabs.length > 0) {
          this.setActiveTab(config!.tabs[0], 0);
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('فشل في تحميل التقرير. يرجى المحاولة مرة أخرى.');
        this.isLoading.set(false);
        console.error('Error loading config:', err);
      }
    });
  }

  /**
   * تعيين التبويب النشط
   */
  setActiveTab(tab: TabPage, index: number): void {
    this.selectedTabIndex.set(index);
    this.activeTab.set(tab);
    this.tableData.set([]);
    
    // تحميل البيانات الافتراضية إذا لم تكن هناك فلاتر
    if (!tab.filters || tab.filters.length === 0) {
      this.fetchData(tab.procedureName, {});
    }
  }

  /**
   * عند تغيير التبويب
   */
  onTabChange(index: number): void {
    const config = this.groupConfig();
    if (config && config.tabs[index]) {
      this.setActiveTab(config.tabs[index], index);
    }
  }

  /**
   * عند البحث باستخدام الفلاتر
   */
  onSearch(filterValues: any): void {
    const currentTab = this.activeTab();
    if (currentTab) {
      this.fetchData(currentTab.procedureName, filterValues);
    }
  }

  /**
   * جلب البيانات من الـ API
   */
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

  /**
   * تحديث البيانات
   */
  refreshData(): void {
    const currentTab = this.activeTab();
    if (currentTab) {
      this.fetchData(currentTab.procedureName, {});
    }
  }

  /**
   * تصدير البيانات
   */
  exportData(): void {
    const data = this.tableData();
    if (data.length > 0) {
      console.log('Exporting data...', data);
      // هنا يمكن إضافة منطق التصدير
      alert('سيتم تصدير البيانات قريباً!');
    }
  }

  /**
   * إعادة المحاولة عند الخطأ
   */
  retry(): void {
    const slug = this.route.snapshot.params['slug'];
    if (slug) {
      this.loadGroupConfig(slug);
    }
  }
  /**
   * عند النقر على صف في الجدول
   */
   onRowClick(event: any): void {
    console.log('تم النقر على الصف:', event);
    // هنا يمكنك إضافة كود للتوجيه إلى صفحة التفاصيل مثلاً
    // example: this.router.navigate(['details', event.id]);
  }

  /**
   * عند النقر على زر إجراء (Action) داخل الجدول
   */
  onActionClick(event: any): void {
    console.log('تم النقر على إجراء:', event);
    // هنا يمكنك معالجة الأزرار مثل التعديل أو الحذف
  }
}