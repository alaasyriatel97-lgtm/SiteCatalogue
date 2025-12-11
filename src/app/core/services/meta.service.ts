import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
 import { GroupTabPage } from '../models/metadata.model';
import { environment } from '../../environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class MetaService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl; // تأكد أن هذا المتغير موجود في environment.ts

  // 1. جلب تكوين الصفحة (Metadata)
  getGroupConfig(slug: string): Observable<GroupTabPage> {
    // ⚠️ في الوضع الحقيقي: return this.http.get<GroupTabPage>(`${this.apiUrl}/meta/${slug}`);

    // ✅ حالياً: سأستخدم Mock Data لتعمل عندك فوراً بدون باك إند
    return this.getMockMetadata(slug);
  }

  // 2. جلب داتا التقرير (Data)
  getReportData(procedureName: string, filters: any): Observable<any[]> {
    // ⚠️ في الوضع الحقيقي: return this.http.post<any[]>(`${this.apiUrl}/reports/${procedureName}`, filters);

    console.log(`Fetching data for [${procedureName}] with filters:`, filters);
    return this.getMockReportData();
  }

  // --- دالة مساعدة لبيانات وهمية (للتجربة) ---
  private getMockMetadata(slug: string): Observable<GroupTabPage> {
    const mock: GroupTabPage = {
      groupId: 1,
      pageTitle: 'دليل المواقع (Site Catalog)',
      tabs: [
        {
          id: 101,
          title: 'المواقع النشطة',
          procedureName: 'GetActiveSites',
          isActive: true,
          filters: [
            { id: 1, procedureId: 101, key: 'siteCode', label: 'كود الموقع', type: 'text', isRequired: false, order: 1, placeholder: 'مثال: DAM-001' },
            { id: 2, procedureId: 101, key: 'region', label: 'المنطقة', type: 'select', isRequired: true, order: 2, dataSourceType: 'static', dataSourceValue: 'Damascus,Aleppo,Homs,Latakia' }
          ],
          columns: [
            { id: 1, field: 'code', header: 'الكود', type: 'text', isSortable: true, isActive: true },
            { id: 2, field: 'name', header: 'الاسم', type: 'text', isSortable: true, isActive: true },
            { id: 3, field: 'activationDate', header: 'تاريخ التفعيل', type: 'date', isSortable: true, isActive: true },
            { id: 4, field: 'status', header: 'الحالة', type: 'status', isSortable: false, isActive: true }
          ]
        },
        {
          id: 102,
          title: 'أرشيف المواقع',
          procedureName: 'GetArchivedSites',
          isActive: true,
          filters: [], // لا يوجد فلاتر
          columns: [
            { id: 1, field: 'code', header: 'الكود', type: 'text', isSortable: true, isActive: true },
            { id: 2, field: 'reason', header: 'سبب الإيقاف', type: 'text', isSortable: false, isActive: true }
          ]
        }
      ]
    };
    return of(mock).pipe(delay(800)); // محاكاة تأخير الشبكة
  }

  private getMockReportData(): Observable<any[]> {
    return of([
      { code: 'DAM-101', name: 'Damascus Center', activationDate: '2023-01-15', status: 'Active', reason: 'N/A' },
      { code: 'ALP-202', name: 'Aleppo Warehouse', activationDate: '2022-11-20', status: 'Inactive', reason: 'Maintenance' },
      { code: 'LAT-303', name: 'Latakia Port', activationDate: '2024-02-01', status: 'Pending', reason: 'N/A' },
    ]).pipe(delay(500));
  }
}
