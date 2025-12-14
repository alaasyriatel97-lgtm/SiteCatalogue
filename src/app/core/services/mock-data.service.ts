import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import {
  GroupTabPage,
  TabPage,
  ReportFilter,
  ReportColumn
} from '../models/metadata.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  // ===============================
  // Metadata Configuration
  // ===============================

  private mockPages: { [key: string]: GroupTabPage } = {

    // ======================================================
    // 2.1 Site Information
    // ======================================================
    'site-info': {
      groupId: 1,
      slug: 'site-info',
      pageTitle: 'Site Information',
      icon: 'cell_tower',
      tabs: [

        // ---------- Main Info ----------
        {
          id: 101,
          slug: 'main-info',
          title: 'Main Info',
          procedureName: 'GetSiteMainInfo',
          filters: [
            {
              id: 1,
              procedureId: 101,
              key: 'region',
              label: 'Region',
              type: 'select',
              isRequired: false,
              order: 1,
              dataSourceType: 'static',
              dataSourceValue: 'North,South,East,West'
            },
            {
              id: 2,
              procedureId: 101,
              key: 'city',
              label: 'City',
              type: 'text',
              isRequired: false,
              order: 2,
              placeholder: 'Enter city name'
            },
            {
              id: 3,
              procedureId: 101,
              key: 'siteCode',
              label: 'Site Code',
              type: 'text',
              isRequired: false,
              order: 3
            },
            {
              id: 4,
              procedureId: 101,
              key: 'status2G',
              label: '2G Status',
              type: 'select',
              isRequired: false,
              order: 4,
              dataSourceType: 'static',
              dataSourceValue: 'Active,Inactive'
            }
          ],
          columns: [
            { id: 1, field: 'siteCode', header: 'Site Code', type: 'text', isSortable: true, isActive: true },
            { id: 2, field: 'region', header: 'Region', type: 'text', isSortable: true, isActive: true },
            { id: 3, field: 'city', header: 'City', type: 'text', isSortable: true, isActive: true },
            { id: 4, field: 'area', header: 'Area', type: 'text', isSortable: true, isActive: true },
            { id: 5, field: 'zone', header: 'Zone', type: 'text', isSortable: true, isActive: true },
            { id: 6, field: 'subArea', header: 'Sub Area', type: 'text', isSortable: true, isActive: true },
            { id: 7, field: 'status2G', header: '2G Status', type: 'status', isSortable: true, isActive: true }
          ]
        },

        // ---------- Bands ----------
        {
          id: 102,
          slug: 'bands',
          title: 'Bands',
          procedureName: 'GetSiteBands',
          filters: [
            {
              id: 5,
              procedureId: 102,
              key: 'bandType',
              label: 'Band Type',
              type: 'select',
              isRequired: false,
              order: 1,
              dataSourceType: 'static',
              dataSourceValue: 'GSM,UMTS,LTE,NR'
            }
          ],
          columns: [
            { id: 1, field: 'band', header: 'Band', type: 'text', isSortable: true, isActive: true },
            { id: 2, field: 'status', header: 'Status', type: 'status', isSortable: true, isActive: true },
            { id: 3, field: 'fromDate', header: 'Status From', type: 'date', isSortable: true, isActive: true },
            { id: 4, field: 'toDate', header: 'Status To', type: 'date', isSortable: true, isActive: true }
          ]
        },

        // ---------- Power ----------
        {
          id: 103,
          slug: 'power',
          title: 'Power',
          procedureName: 'GetSitePower',
          filters: [
            {
              id: 6,
              procedureId: 103,
              key: 'powerType',
              label: 'Power Type',
              type: 'select',
              isRequired: false,
              order: 1,
              dataSourceType: 'static',
              dataSourceValue: 'Generator,Solar,TP,GEE'
            }
          ],
          columns: [
            { id: 1, field: 'solutionType', header: 'Solution Type', type: 'text', isSortable: true, isActive: true },
            { id: 2, field: 'availability', header: 'Availability', type: 'status', isSortable: true, isActive: true },
            { id: 3, field: 'status', header: 'Status', type: 'status', isSortable: true, isActive: true },
            { id: 4, field: 'fromDate', header: 'Status From', type: 'date', isSortable: true, isActive: true },
            { id: 5, field: 'toDate', header: 'Status To', type: 'date', isSortable: true, isActive: true }
          ]
        }
      ]
    },

    // ======================================================
    // 2.2 Outage & Availability
    // ======================================================
    'outage': {
      groupId: 2,
      slug: 'outage',
      pageTitle: 'Outage & Availability',
      icon: 'warning',
      tabs: [
        {
          id: 201,
          slug: 'records',
          title: 'Outage Records',
          procedureName: 'GetOutageData',
          filters: [
            { id: 7, procedureId: 201, key: 'fromDate', label: 'From Date', type: 'date', isRequired: false, order: 1 },
            { id: 8, procedureId: 201, key: 'toDate', label: 'To Date', type: 'date', isRequired: false, order: 2 },
            {
              id: 9,
              procedureId: 201,
              key: 'technology',
              label: 'Technology',
              type: 'select',
              isRequired: false,
              order: 3,
              dataSourceType: 'static',
              dataSourceValue: '2G,3G,4G,5G'
            }
          ],
          columns: [
            { id: 1, field: 'siteCode', header: 'Site Code', type: 'text', isSortable: true, isActive: true },
            { id: 2, field: 'technology', header: 'Technology', type: 'text', isSortable: true, isActive: true },
            { id: 3, field: 'outagePercent', header: 'Outage %', type: 'text', isSortable: true, isActive: true },
            { id: 4, field: 'havePower', header: 'Have Power', type: 'status', isSortable: true, isActive: true },
            { id: 5, field: 'lastTrafficDate', header: 'Last Traffic Date', type: 'date', isSortable: true, isActive: true }
          ]
        }
      ]
    },

    // ======================================================
    // 2.4 Top Outage
    // ======================================================
    'top-outage': {
      groupId: 3,
      slug: 'top-outage',
      pageTitle: 'Top Outage',
      icon: 'priority_high',



      tabs: [
        {
          id: 301,
          title: 'Top Outages',
          procedureName: 'GetTopOutages',
          slug: 'Orecords',
          filters: [
            {
              id: 10,
              procedureId: 301,
              key: 'limit',
              label: 'Top',
              type: 'select',
              isRequired: true,
              order: 1,
              dataSourceType: 'static',
              dataSourceValue: '50,100'
            }
          ],
          columns: [
            { id: 1, field: 'siteCode', header: 'Site Code', type: 'text', isSortable: true, isActive: true },
            { id: 2, field: 'outageHours', header: 'Outage Hours', type: 'text', isSortable: true, isActive: true },
            { id: 3, field: 'impact', header: 'Impact Level', type: 'status', isSortable: true, isActive: true }
          ]
        }
      ]
    }
  };

  // ===============================
  // Public APIs
  // ===============================

  getGroupConfig(slug: string): Observable<GroupTabPage | null> {
    return of(this.mockPages[slug] || null).pipe(delay(400));
  }

  getMenuItems(): Observable<GroupTabPage[]> {
    return of(Object.values(this.mockPages)).pipe(delay(300));
  }

  getReportData(procedureName: string, filters: any): Observable<any[]> {
    let data: any[] = [];

    switch (procedureName) {
      case 'GetSiteMainInfo':
        data = this.generateSiteMainInfo();
        break;
      case 'GetSiteBands':
        data = this.generateBands();
        break;
      case 'GetSitePower':
        data = this.generatePower();
        break;
      case 'GetOutageData':
        data = this.generateOutages();
        break;
      case 'GetTopOutages':
        data = this.generateTopOutages();
        break;
      default:
        data = [];
    }

    return of(data).pipe(delay(600));
  }

  // ===============================
  // Mock Generators
  // ===============================

  private generateSiteMainInfo(): any[] {
    return Array.from({ length: 15 }, (_, i) => ({
      siteCode: `SITE-${100 + i}`,
      region: ['North', 'South', 'East', 'West'][i % 4],
      city: `City ${i + 1}`,
      area: `Area ${i % 3 + 1}`,
      zone: `Zone ${i % 5 + 1}`,
      subArea: `Sub ${i % 4 + 1}`,
      status2G: i % 2 === 0 ? 'Active' : 'Inactive'
    }));
  }

  private generateBands(): any[] {
    return [
      { band: 'LTE 1800', status: 'Active', fromDate: new Date(2023, 1, 1), toDate: null },
      { band: 'NR 3500', status: 'Inactive', fromDate: new Date(2022, 5, 10), toDate: new Date(2024, 2, 1) }
    ];
  }

  private generatePower(): any[] {
    return [
      { solutionType: 'Generator', availability: 'Available', status: 'Active', fromDate: new Date(), toDate: null },
      { solutionType: 'Solar', availability: 'Available', status: 'Active', fromDate: new Date(), toDate: null }
    ];
  }

  private generateOutages(): any[] {
    return Array.from({ length: 10 }, (_, i) => ({
      siteCode: `SITE-${200 + i}`,
      technology: ['2G', '3G', '4G', '5G'][i % 4],
      outagePercent: `${Math.floor(Math.random() * 30)}%`,
      havePower: i % 2 === 0 ? 'Yes' : 'No',
      lastTrafficDate: new Date()
    }));
  }

  private generateTopOutages(): any[] {
    return Array.from({ length: 10 }, (_, i) => ({
      siteCode: `SITE-${300 + i}`,
      outageHours: Math.floor(Math.random() * 200),
      impact: ['Low', 'Medium', 'High'][i % 3]
    }));
  }
}
