import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SmartFilterComponent } from '../../shared/components/smart-filter/smart-filter.component';
import { SmartTableComponent } from '../../shared/components/smart-table/smart-table.component';
import { MetaService } from '../../core/services/meta.service';
import { GroupTabPage, TabPage } from '../../core/models/metadata.model';
import { SharedModule } from '../../theme/shared/shared.module';

@Component({
  selector: 'app-dynamic-report',
  standalone: true,
  imports: [CommonModule, SharedModule, SmartFilterComponent, SmartTableComponent],
  template: `
    <div class="row">
      <div class="col-sm-12">

        <app-card [headerContent]="titleTemplate" [options]="false">
          <ng-template #titleTemplate>
            <h5>{{ groupConfig()?.pageTitle || 'Loading...' }}</h5>
          </ng-template>

          @if (groupConfig(); as config) {

            <ul class="nav nav-tabs mb-4 border-b border-gray-200">
              @for (tab of config.tabs; track tab.id) {
                <li class="nav-item cursor-pointer">
                  <a class="nav-link"
                     [class.active]="activeTab()?.id === tab.id"
                     [class.font-bold]="activeTab()?.id === tab.id"
                     (click)="setActiveTab(tab)">
                    {{ tab.title }}
                  </a>
                </li>
              }
            </ul>

            @if (activeTab(); as tab) {
              <div class="animate-fadeIn">

                @if (tab.filters.length > 0) {
                  <app-smart-filter
                    [filters]="tab.filters"
                    (filterSubmit)="onSearch($event)">
                  </app-smart-filter>
                }

                <app-smart-table
                  [columns]="tab.columns"
                  [data]="tableData()"
                  [isLoading]="isTableLoading()">
                </app-smart-table>

              </div>
            }

          } @else {
            <div class="d-flex justify-content-center p-5">
              <div class="spinner-border text-primary" role="status"></div>
            </div>
          }

        </app-card>
      </div>
    </div>
  `,
  styles: [`
    .nav-link.active {
      color: #0d6efd;
      border-bottom: 2px solid #0d6efd;
      background: transparent;
    }
    .animate-fadeIn {
      animation: fadeIn 0.3s ease-in-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(5px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class DynamicReportComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private metaService = inject(MetaService);

  // State Signals (أفضل ممارسة في Angular 17+)
  groupConfig = signal<GroupTabPage | null>(null);
  activeTab = signal<TabPage | null>(null);
  tableData = signal<any[]>([]);
  isTableLoading = signal<boolean>(false);

  ngOnInit() {
    // الاستماع لتغيير الرابط
    this.route.params.subscribe(params => {
      const slug = params['slug']; // e.g., 'sites-catalog'
      this.loadGroupConfig(slug);
    });
  }

  loadGroupConfig(slug: string) {
    this.groupConfig.set(null); // Reset UI
    this.metaService.getGroupConfig(slug).subscribe(config => {
      this.groupConfig.set(config);

      // تفعيل أول تاب تلقائياً
      if (config.tabs && config.tabs.length > 0) {
        this.setActiveTab(config.tabs[0]);
      }
    });
  }

  setActiveTab(tab: TabPage) {
    this.activeTab.set(tab);
    this.tableData.set([]); // تصفير الجدول القديم

    // إذا لم يكن هناك فلاتر، حمل البيانات مباشرة
    if (!tab.filters || tab.filters.length === 0) {
      this.fetchData(tab.procedureName, {});
    }
  }

  onSearch(filterValues: any) {
    const currentTab = this.activeTab();
    if (currentTab) {
      this.fetchData(currentTab.procedureName, filterValues);
    }
  }

  fetchData(procName: string, filters: any) {
    this.isTableLoading.set(true);
    this.metaService.getReportData(procName, filters).subscribe({
      next: (data) => {
        this.tableData.set(data);
        this.isTableLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isTableLoading.set(false);
      }
    });
  }
}
