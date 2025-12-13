import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    if (this.useMockData) {
      return this.mockDataService.getGroupConfig(slug);
    }
    return this.http.get<GroupTabPage>(`${environment.apiUrl}/meta/${slug}`);
  }

  /**
   * جلب بيانات التقرير
   */
  getReportData(procedureName: string, filters: any): Observable<any[]> {
    if (this.useMockData) {
      console.log(`📊 Fetching MOCK data for [${procedureName}]`, filters);
      return this.mockDataService.getReportData(procedureName, filters);
    }
    console.log(`🌐 Fetching REAL data for [${procedureName}]`, filters);
    return this.http.post<any[]>(`${environment.apiUrl}/reports/${procedureName}`, filters);
  }

  /**
   * تبديل بين Mock وReal API
   */
  toggleMockMode(useMock: boolean): void {
    this.useMockData = useMock;
    console.log(`🔄 Mock Mode: ${useMock ? 'ENABLED' : 'DISABLED'}`);
  }
  getMenuItems(): Observable<any[]> {
    if (this.useMockData) {
      return this.mockDataService.getMenuItems();
    }
    // في حال وجود API حقيقي:
    return this.http.get<any[]>(`${environment.apiUrl}/menu`);
  }
}