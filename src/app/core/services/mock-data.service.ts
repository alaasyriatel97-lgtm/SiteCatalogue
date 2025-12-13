import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { GroupTabPage, TabPage, ReportFilter, ReportColumn } from '../models/metadata.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService  {
  
  /**
   * قاعدة بيانات الـ Metadata الوهمية
   */
  private mockPages: { [key: string]: GroupTabPage } = {
    
    // تقرير المبيعات
    'sales': {
      groupId: 1,
      pageTitle: 'تقارير fdgdfg والإيرادات',
      tabs: [
        {
          id: 101,
          title: 'المبيعات الشهرية',
          procedureName: 'GetMonthlySales',
          isActive: true,
          filters: [
            {
              id: 1,
              procedureId: 101,
              key: 'year',
              label: 'السنة',
              type: 'select',
              isRequired: true,
              order: 1,
              dataSourceType: 'static',
              dataSourceValue: '2022,2023,2024,2025',
              defaultValue: '2024'
            },
            {
              id: 2,
              procedureId: 101,
              key: 'month',
              label: 'الشهر',
              type: 'select',
              isRequired: false,
              order: 2,
              dataSourceType: 'static',
              dataSourceValue: 'يناير,فبراير,مارس,أبريل,مايو,يونيو,يوليو,أغسطس,سبتمبر,أكتوبر,نوفمبر,ديسمبر'
            },
            {
              id: 3,
              procedureId: 101,
              key: 'region',
              label: 'المنطقة',
              type: 'select',
              isRequired: false,
              order: 3,
              dataSourceType: 'static',
              dataSourceValue: 'دمشق,حلب,حمص,اللاذقية,طرطوس,حماة'
            },
            {
              id: 4,
              procedureId: 101,
              key: 'searchTerm',
              label: 'بحث',
              type: 'text',
              isRequired: false,
              order: 4,
              placeholder: 'ابحث في المنتجات...'
            }
          ],
          columns: [
            { id: 1, field: 'id', header: '#', type: 'text', isSortable: false, isActive: true, width: '60px' },
            { id: 2, field: 'productName', header: 'اسم المنتج', type: 'text', isSortable: true, isActive: true },
            { id: 3, field: 'category', header: 'الفئة', type: 'text', isSortable: true, isActive: true },
            { id: 4, field: 'quantity', header: 'الكمية', type: 'text', isSortable: true, isActive: true },
            { id: 5, field: 'unitPrice', header: 'السعر', type: 'currency', isSortable: true, isActive: true },
            { id: 6, field: 'totalAmount', header: 'الإجمالي', type: 'currency', isSortable: true, isActive: true },
            { id: 7, field: 'saleDate', header: 'تاريخ البيع', type: 'date', isSortable: true, isActive: true },
            { id: 8, field: 'status', header: 'الحالة', type: 'status', isSortable: true, isActive: true },
            { id: 9, field: 'actions', header: 'الإجراءات', type: 'actions', isSortable: false, isActive: true }
          ]
        },
        {
          id: 102,
          title: 'المبيعات حسب المنتج',
          procedureName: 'GetSalesByProduct',
          isActive: true,
          filters: [
            {
              id: 5,
              procedureId: 102,
              key: 'category',
              label: 'الفئة',
              type: 'select',
              isRequired: false,
              order: 1,
              dataSourceType: 'static',
              dataSourceValue: 'إلكترونيات,ملابس,أطعمة,كتب,منزلية'
            },
            {
              id: 6,
              procedureId: 102,
              key: 'dateFrom',
              label: 'من تاريخ',
              type: 'date',
              isRequired: false,
              order: 2
            },
            {
              id: 7,
              procedureId: 102,
              key: 'dateTo',
              label: 'إلى تاريخ',
              type: 'date',
              isRequired: false,
              order: 3
            }
          ],
          columns: [
            { id: 1, field: 'productName', header: 'المنتج', type: 'text', isSortable: true, isActive: true },
            { id: 2, field: 'category', header: 'الفئة', type: 'text', isSortable: true, isActive: true },
            { id: 3, field: 'totalSales', header: 'إجمالي المبيعات', type: 'currency', isSortable: true, isActive: true },
            { id: 4, field: 'soldQuantity', header: 'الكمية المباعة', type: 'text', isSortable: true, isActive: true },
            { id: 5, field: 'avgPrice', header: 'متوسط السعر', type: 'currency', isSortable: true, isActive: true }
          ]
        }
      ]
    },
    'sss': {
      groupId: 1,
      pageTitle: 'تقارير المبيعات والإيرادات',
      tabs: [
        {
          id: 101,
          title: 'المبيعات الشهرية',
          procedureName: 'GetMonthlySales',
          isActive: true,
          filters: [
            {
              id: 1,
              procedureId: 101,
              key: 'year',
              label: 'السنة',
              type: 'select',
              isRequired: true,
              order: 1,
              dataSourceType: 'static',
              dataSourceValue: '2022,2023,2024,2025',
              defaultValue: '2024'
            },
            {
              id: 2,
              procedureId: 101,
              key: 'month',
              label: 'الشهر',
              type: 'select',
              isRequired: false,
              order: 2,
              dataSourceType: 'static',
              dataSourceValue: 'يناير,فبراير,مارس,أبريل,مايو,يونيو,يوليو,أغسطس,سبتمبر,أكتوبر,نوفمبر,ديسمبر'
            },
            {
              id: 3,
              procedureId: 101,
              key: 'region',
              label: 'المنطقة',
              type: 'select',
              isRequired: false,
              order: 3,
              dataSourceType: 'static',
              dataSourceValue: 'دمشق,حلب,حمص,اللاذقية,طرطوس,حماة'
            },
            {
              id: 4,
              procedureId: 101,
              key: 'searchTerm',
              label: 'بحث',
              type: 'text',
              isRequired: false,
              order: 4,
              placeholder: 'ابحث في المنتجات...'
            }
          ],
          columns: [
            { id: 1, field: 'id', header: '#', type: 'text', isSortable: false, isActive: true, width: '60px' },
            { id: 2, field: 'productName', header: 'اسم المنتج', type: 'text', isSortable: true, isActive: true },
            { id: 3, field: 'category', header: 'الفئة', type: 'text', isSortable: true, isActive: true },
            { id: 4, field: 'quantity', header: 'الكمية', type: 'text', isSortable: true, isActive: true },
            { id: 5, field: 'unitPrice', header: 'السعر', type: 'currency', isSortable: true, isActive: true },
            { id: 6, field: 'totalAmount', header: 'الإجمالي', type: 'currency', isSortable: true, isActive: true },
            { id: 7, field: 'saleDate', header: 'تاريخ البيع', type: 'date', isSortable: true, isActive: true },
            { id: 8, field: 'status', header: 'الحالة', type: 'status', isSortable: true, isActive: true },
            { id: 9, field: 'actions', header: 'الإجراءات', type: 'actions', isSortable: false, isActive: true }
          ]
        },
        {
          id: 102,
          title: 'المبيعات حسب المنتج',
          procedureName: 'GetSalesByProduct',
          isActive: true,
          filters: [
            {
              id: 5,
              procedureId: 102,
              key: 'category',
              label: 'الفئة',
              type: 'select',
              isRequired: false,
              order: 1,
              dataSourceType: 'static',
              dataSourceValue: 'إلكترونيات,ملابس,أطعمة,كتب,منزلية'
            },
            {
              id: 6,
              procedureId: 102,
              key: 'dateFrom',
              label: 'من تاريخ',
              type: 'date',
              isRequired: false,
              order: 2
            },
            {
              id: 7,
              procedureId: 102,
              key: 'dateTo',
              label: 'إلى تاريخ',
              type: 'date',
              isRequired: false,
              order: 3
            }
          ],
          columns: [
            { id: 1, field: 'productName', header: 'المنتج', type: 'text', isSortable: true, isActive: true },
            { id: 2, field: 'category', header: 'الفئة', type: 'text', isSortable: true, isActive: true },
            { id: 3, field: 'totalSales', header: 'إجمالي المبيعات', type: 'currency', isSortable: true, isActive: true },
            { id: 4, field: 'soldQuantity', header: 'الكمية المباعة', type: 'text', isSortable: true, isActive: true },
            { id: 5, field: 'avgPrice', header: 'متوسط السعر', type: 'currency', isSortable: true, isActive: true }
          ]
        }
      ]
    },

    // تقرير المخزون
    'inventory': {
      groupId: 2,
      pageTitle: 'إدارة المخزون',
      tabs: [
        {
          id: 201,
          title: 'المنتجات المتوفرة',
          procedureName: 'GetAvailableInventory',
          isActive: true,
          filters: [
            {
              id: 8,
              procedureId: 201,
              key: 'warehouse',
              label: 'المستودع',
              type: 'select',
              isRequired: false,
              order: 1,
              dataSourceType: 'static',
              dataSourceValue: 'المستودع الرئيسي,المستودع الفرعي,الفرع 1,الفرع 2'
            },
            {
              id: 9,
              procedureId: 201,
              key: 'minStock',
              label: 'الحد الأدنى للمخزون',
              type: 'number',
              isRequired: false,
              order: 2,
              placeholder: 'مثال: 10'
            },
            {
              id: 10,
              procedureId: 201,
              key: 'lowStock',
              label: 'إظهار المنتجات قليلة المخزون فقط',
              type: 'boolean',
              isRequired: false,
              order: 3
            }
          ],
          columns: [
            { id: 1, field: 'productCode', header: 'كود المنتج', type: 'text', isSortable: true, isActive: true },
            { id: 2, field: 'productName', header: 'اسم المنتج', type: 'text', isSortable: true, isActive: true },
            { id: 3, field: 'warehouse', header: 'المستودع', type: 'text', isSortable: true, isActive: true },
            { id: 4, field: 'quantity', header: 'الكمية المتوفرة', type: 'text', isSortable: true, isActive: true },
            { id: 5, field: 'minStock', header: 'الحد الأدنى', type: 'text', isSortable: true, isActive: true },
            { id: 6, field: 'status', header: 'الحالة', type: 'status', isSortable: true, isActive: true },
            { id: 7, field: 'actions', header: 'الإجراءات', type: 'actions', isSortable: false, isActive: true }
          ]
        },
        {
          id: 202,
          title: 'التنبيهات والنواقص',
          procedureName: 'GetLowStockAlerts',
          isActive: true,
          filters: [],
          columns: [
            { id: 1, field: 'productName', header: 'المنتج', type: 'text', isSortable: true, isActive: true },
            { id: 2, field: 'currentStock', header: 'المخزون الحالي', type: 'text', isSortable: true, isActive: true },
            { id: 3, field: 'requiredStock', header: 'المخزون المطلوب', type: 'text', isSortable: true, isActive: true },
            { id: 4, field: 'alertLevel', header: 'مستوى التنبيه', type: 'status', isSortable: true, isActive: true }
          ]
        }
      ]
    },

    // دليل المواقع
    'sites': {
      groupId: 3,
      pageTitle: 'دليل المواقع (Site Catalog)',
      tabs: [
        {
          id: 301,
          title: 'المواقع النشطة',
          procedureName: 'GetActiveSites',
          isActive: true,
          filters: [
            {
              id: 11,
              procedureId: 301,
              key: 'siteCode',
              label: 'كود الموقع',
              type: 'text',
              isRequired: false,
              order: 1,
              placeholder: 'مثال: SITE-001'
            },
            {
              id: 12,
              procedureId: 301,
              key: 'region',
              label: 'المنطقة',
              type: 'select',
              isRequired: false,
              order: 2,
              dataSourceType: 'static',
              dataSourceValue: 'دمشق,حلب,حمص,اللاذقية,طرطوس,حماة,إدلب,دير الزور'
            },
            {
              id: 13,
              procedureId: 301,
              key: 'status',
              label: 'الحالة',
              type: 'select',
              isRequired: false,
              order: 3,
              dataSourceType: 'static',
              dataSourceValue: 'نشط,غير نشط,قيد المعالجة,صيانة'
            }
          ],
          columns: [
            { id: 1, field: 'code', header: 'الكود', type: 'text', isSortable: true, isActive: true },
            { id: 2, field: 'name', header: 'اسم الموقع', type: 'text', isSortable: true, isActive: true },
            { id: 3, field: 'region', header: 'المنطقة', type: 'text', isSortable: true, isActive: true },
            { id: 4, field: 'type', header: 'النوع', type: 'text', isSortable: true, isActive: true },
            { id: 5, field: 'activationDate', header: 'تاريخ التفعيل', type: 'date', isSortable: true, isActive: true },
            { id: 6, field: 'capacity', header: 'السعة', type: 'text', isSortable: true, isActive: true },
            { id: 7, field: 'status', header: 'الحالة', type: 'status', isSortable: true, isActive: true },
            { id: 8, field: 'actions', header: 'الإجراءات', type: 'actions', isSortable: false, isActive: true }
          ]
        },
        {
          id: 302,
          title: 'أرشيف المواقع',
          procedureName: 'GetArchivedSites',
          isActive: true,
          filters: [
            {
              id: 14,
              procedureId: 302,
              key: 'archiveYear',
              label: 'سنة الأرشفة',
              type: 'select',
              isRequired: false,
              order: 1,
              dataSourceType: 'static',
              dataSourceValue: '2020,2021,2022,2023,2024'
            }
          ],
          columns: [
            { id: 1, field: 'code', header: 'الكود', type: 'text', isSortable: true, isActive: true },
            { id: 2, field: 'name', header: 'اسم الموقع', type: 'text', isSortable: true, isActive: true },
            { id: 3, field: 'closureDate', header: 'تاريخ الإغلاق', type: 'date', isSortable: true, isActive: true },
            { id: 4, field: 'reason', header: 'سبب الإيقاف', type: 'text', isSortable: false, isActive: true }
          ]
        }
      ]
    }
  };

  /**
   * جلب Metadata للصفحة
   */
  getGroupConfig(slug: string): Observable<GroupTabPage | null> {
    const config = this.mockPages[slug] || null;
    return of(config).pipe(delay(500)); // محاكاة تأخير الشبكة
  }

  /**
   * جلب بيانات التقرير
   */
  getReportData(procedureName: string, filters: any): Observable<any[]> {
    let data: any[] = [];

    switch (procedureName) {
      case 'GetMonthlySales':
        data = this.generateMonthlySalesData(filters);
        break;
      case 'GetSalesByProduct':
        data = this.generateProductSalesData(filters);
        break;
      case 'GetAvailableInventory':
        data = this.generateInventoryData(filters);
        break;
      case 'GetLowStockAlerts':
        data = this.generateLowStockData();
        break;
      case 'GetActiveSites':
        data = this.generateActiveSitesData(filters);
        break;
      case 'GetArchivedSites':
        data = this.generateArchivedSitesData(filters);
        break;
      default:
        data = [];
    }

    return of(data).pipe(delay(600));
  }

  // ========== Data Generators ==========

  private generateMonthlySalesData(filters: any): any[] {
    const products = [
      { name: 'لابتوب HP ProBook', category: 'إلكترونيات' },
      { name: 'موبايل Samsung Galaxy', category: 'إلكترونيات' },
      { name: 'قميص قطني', category: 'ملابس' },
      { name: 'كتاب تاريخ سوريا', category: 'كتب' },
      { name: 'طاولة خشبية', category: 'منزلية' }
    ];

    const statuses = ['مكتمل', 'قيد المعالجة', 'ملغي'];

    return Array.from({ length: 15 }, (_, i) => {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 50) + 1;
      const unitPrice = Math.random() * 1000 + 100;
      const totalAmount = quantity * unitPrice;

      return {
        id: i + 1,
        productName: product.name,
        category: product.category,
        quantity,
        unitPrice: unitPrice.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
        saleDate: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        status: statuses[Math.floor(Math.random() * statuses.length)]
      };
    });
  }

  private generateProductSalesData(filters: any): any[] {
    const products = [
      { name: 'لابتوب HP ProBook', category: 'إلكترونيات' },
      { name: 'موبايل Samsung Galaxy', category: 'إلكترونيات' },
      { name: 'قميص قطني', category: 'ملابس' },
      { name: 'كتاب تاريخ سوريا', category: 'كتب' },
      { name: 'طاولة خشبية', category: 'منزلية' }
    ];

    return products.map(p => ({
      productName: p.name,
      category: p.category,
      totalSales: (Math.random() * 100000 + 10000).toFixed(2),
      soldQuantity: Math.floor(Math.random() * 500) + 50,
      avgPrice: (Math.random() * 1000 + 100).toFixed(2)
    }));
  }

  private generateInventoryData(filters: any): any[] {
    const warehouses = ['المستودع الرئيسي', 'المستودع الفرعي', 'الفرع 1'];
    const statuses = ['متوفر', 'ناقص', 'غير متوفر'];

    return Array.from({ length: 12 }, (_, i) => ({
      productCode: `PROD-${1000 + i}`,
      productName: `منتج ${i + 1}`,
      warehouse: warehouses[Math.floor(Math.random() * warehouses.length)],
      quantity: Math.floor(Math.random() * 200),
      minStock: 20,
      status: statuses[Math.floor(Math.random() * statuses.length)]
    }));
  }

  private generateLowStockData(): any[] {
    const alertLevels = ['حرج', 'تحذير', 'متوسط'];

    return Array.from({ length: 8 }, (_, i) => ({
      productName: `منتج ${i + 1}`,
      currentStock: Math.floor(Math.random() * 15),
      requiredStock: 50,
      alertLevel: alertLevels[Math.floor(Math.random() * alertLevels.length)]
    }));
  }

  private generateActiveSitesData(filters: any): any[] {
    const regions = ['دمشق', 'حلب', 'حمص', 'اللاذقية'];
    const types = ['مركز رئيسي', 'فرع', 'مستودع', 'نقطة بيع'];
    const statuses = ['نشط', 'قيد المعالجة', 'صيانة'];

    return Array.from({ length: 20 }, (_, i) => ({
      code: `SITE-${100 + i}`,
      name: `موقع ${regions[Math.floor(Math.random() * regions.length)]} ${i + 1}`,
      region: regions[Math.floor(Math.random() * regions.length)],
      type: types[Math.floor(Math.random() * types.length)],
      activationDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      capacity: `${Math.floor(Math.random() * 500) + 100} متر مربع`,
      status: statuses[Math.floor(Math.random() * statuses.length)]
    }));
  }

  private generateArchivedSitesData(filters: any): any[] {
    const reasons = ['انتهاء العقد', 'إعادة هيكلة', 'تكاليف عالية', 'نقل الموقع'];

    return Array.from({ length: 8 }, (_, i) => ({
      code: `ARCH-${200 + i}`,
      name: `موقع قديم ${i + 1}`,
      closureDate: new Date(2022, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      reason: reasons[Math.floor(Math.random() * reasons.length)]
    }));
  }
}