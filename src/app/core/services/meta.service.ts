import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { GroupTabPage } from '../models/metadata.model';
import { environment } from '../../../environments/environment';
import { MockDataService } from './mock-data.service';

@Injectable({ providedIn: 'root' })
export class MetaService {
  private http = inject(HttpClient);
  private mockDataService = inject(MockDataService);
  
  // 🎯 التبديل بين Mock والـ Real API
  private useMockData = true; // غيّر إلى false عند توفر API حقيقي

  /**
   * جلب تكوين الصفحة (Metadata)
   */
  getGroupConfig(slug: string): Observable<GroupTabPage | null> {
    console.log(`🔍 Fetching group config for slug: ${slug}, Mock Mode: ${this.useMockData}`);
    
    if (this.useMockData) {
      return this.mockDataService.getGroupConfig(slug).pipe(
        tap(config => {
          if (config) {
            console.log(`✅ Mock config loaded for ${slug}:`, config);
          } else {
            console.warn(`⚠️ No mock config found for slug: ${slug}`);
          }
        })
      );
    }
    
    return this.http.get<GroupTabPage>(`${environment.apiUrl}/meta/${slug}`).pipe(
      tap(config => console.log(`✅ Real API config loaded for ${slug}:`, config))
    );
  }

  /**
   * جلب بيانات التقرير
   */
  getReportData(procedureName: string, filters: any): Observable<any[]> {
    if (this.useMockData) {
      console.log(`📊 Fetching MOCK data for [${procedureName}]`, filters);
      return this.mockDataService.getReportData(procedureName, filters).pipe(
        tap(data => console.log(`✅ Mock data loaded: ${data.length} records`))
      );
    }
    
    console.log(`🌐 Fetching REAL data for [${procedureName}]`, filters);
    return this.http.post<any[]>(`${environment.apiUrl}/reports/${procedureName}`, filters).pipe(
      tap(data => console.log(`✅ Real API data loaded: ${data.length} records`))
    );
  }

  /**
   * جلب عناصر القائمة للـ Navigation
   */
  getMenuItems(): Observable<GroupTabPage[]> {
    console.log(`📋 Fetching menu items, Mock Mode: ${this.useMockData}`);
    
    if (this.useMockData) {
      return this.mockDataService.getMenuItems().pipe(
        tap(items => console.log(`✅ Mock menu items loaded: ${items.length} groups`, items))
      );
    }
    
    // في حال وجود API حقيقي:
    return this.http.get<GroupTabPage[]>(`${environment.apiUrl}/menu`).pipe(
      tap(items => console.log(`✅ Real API menu items loaded: ${items.length} groups`))
    );
  }

  /**
   * تبديل بين Mock وReal API
   */
  toggleMockMode(useMock: boolean): void {
    this.useMockData = useMock;
    console.log(`🔄 Mock Mode: ${useMock ? 'ENABLED ✅' : 'DISABLED ❌'}`);
  }

  /**
   * معرفة الوضع الحالي
   */
  isMockMode(): boolean {
    return this.useMockData;
  }
}