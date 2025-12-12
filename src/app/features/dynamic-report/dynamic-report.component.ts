import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

// 1. استيراد المكونات الصحيحة (التي تملكها بالفعل)
import { SmartFilterComponent } from '../../shared/components/smart-filter/smart-filter.component';
import { SmartTableComponent } from '../../shared/components/smart-table/smart-table.component';
import { MantisCardComponent } from '../../shared/components/mantis-card/mantis-card.component'; // 👈 استيراد المكون الصحيح

import { MetaService } from '../../core/services/meta.service';
import { GroupTabPage, TabPage } from '../../core/models/metadata.model';

@Component({
  selector: 'app-dynamic-report',
  standalone: true,
  // 2. إضافة MantisCardComponent إلى قائمة imports بدلاً من SharedModule المعطوب
  imports: [
    CommonModule,
    MantisCardComponent,
    SmartFilterComponent,
    SmartTableComponent
  ],
  template: `
    <div class="row">
      <div class="col-sm-12">

        <app-mantis-card [title]="groupConfig()?.pageTitle || 'Loading...'">

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
            <div class="flex justify-center p-5">
              <div class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }

        </app-mantis-card>
      </div>
    </div>
  `,
  styles: [`
    .nav-link {
      cursor: pointer;
      padding: 0.5rem 1rem;
      border-bottom: 2px solid transparent;
      transition: all 0.3s ease;
    }
    .nav-link.active {
      color: #2563eb; /* Blue-600 */
      border-bottom-color: #2563eb;
      font-weight: 600;
    }
    .animate-fadeIn {
      animation: fadeIn 0.4s ease-in-out;
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

  // State Signals
  groupConfig = signal<GroupTabPage | null>(null);
  activeTab = signal<TabPage | null>(null);
  tableData = signal<any[]>([]);
  isTableLoading = signal<boolean>(false);

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      if (slug) this.loadGroupConfig(slug);
    });
  }

  loadGroupConfig(slug: string) {
    this.groupConfig.set(null);
    this.metaService.getGroupConfig(slug).subscribe({
      next: (config) => {
        this.groupConfig.set(config);
        if (config.tabs && config.tabs.length > 0) {
          this.setActiveTab(config.tabs[0]);
        }
      },
      error: (err) => console.error('Failed to load config', err)
    });
  }

  setActiveTab(tab: TabPage) {
    this.activeTab.set(tab);
    this.tableData.set([]);
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
