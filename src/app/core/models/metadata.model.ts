// أنواع الفلاتر بناءً على عمود Type في جدول MetaProcedureFilters
export type FilterType = 'text' | 'number' | 'date' | 'select' | 'boolean';

// أنواع مصادر البيانات للقوائم المنسدلة (DataSourceType)
export type DataSourceType = 'static' | 'api' | 'sql_query';

// ==========================================
// 1. تمثيل جدول MetaProcedureFilters
// ==========================================
export interface ReportFilter {
  id: number;                 // Id
  procedureId: number;        // ProcedureId
  key: string;                // Key (اسم الباراميتر المرسل للباك إند)
  label: string;              // Label (اسم الحقل الظاهر للمستخدم)
  type: FilterType;          // Type
  placeholder?: string;       // Placeholder
  defaultValue?: string;      // DefaultValue
  isRequired: boolean;        // IsRequired
  order: number;              // Order

  // للتعامل مع القوائم المنسدلة
  dataSourceType?: DataSourceType; // DataSourceType
  dataSourceValue?: string;        // DataSourceValue (رابط API أو القيم الثابتة)
  parentKey?: string;              // ParentKey (للقوائم المرتبطة ببعضها)
}

// ==========================================
// 2. تمثيل جدول MetaReportColumns
// ==========================================
export interface ReportColumn {
  id: number;
  header: string;             // Header (عنوان العمود)
  field: string;              // ColumnName (اسم الحقل في الداتا)
  type: string;               // Type (text, date, currency, badge)
  width?: string;             // Width
  isSortable: boolean;        // Sortable
  isActive: boolean;          // IsActive
}

// ==========================================
// 3. تمثيل التقرير والتاب (دمج MetaTabs و MetaReports)
// ==========================================
export interface TabDefinition {
  id: number;                 // MetaTabs.Id
  title: string;              // MetaTabs.Name
  procedureName: string;      // MetaProcedures.Name (اسم الإجراء المخزن لجلب الداتا)
  isActive: boolean;

  // هذه المصفوفات تأتينا جاهزة من الباك إند كـ JSON متداخل
  filters: ReportFilter[];
  columns: ReportColumn[];
}

// ==========================================
// 4. الكائن الرئيسي للصفحة (MetaTabsGroup)
// ==========================================
export interface PageDefinition {
  groupId: number;            // MetaTabsGroup.Id
  pageTitle: string;          // MetaTabsGroup.Name
  tabs: TabDefinition[];      // قائمة التابات داخل الصفحة
}
