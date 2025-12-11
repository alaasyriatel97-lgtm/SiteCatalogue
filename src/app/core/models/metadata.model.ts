export type FilterType = 'text' | 'number' | 'date' | 'select' | 'boolean';
export type DataSourceType = 'static' | 'api' | 'sql_query';

// 1. تعريف الفلتر الواحد
export interface ReportFilter {
  id: number;
  procedureId: number;
  key: string;           
  label: string;          
  type: FilterType;
  placeholder?: string;
  defaultValue?: string;
  isRequired: boolean;
  order: number;
  dataSourceType?: DataSourceType;  
  dataSourceValue?: string;        
  parentKey?: string;
}

// 2. تعريف العمود الواحد في الجدول
export interface ReportColumn {
  id: number;
  header: string;
  field: string;
  type: 'text' | 'date' | 'currency' | 'status' | 'actions';
  width?: string;
  isSortable: boolean;
  isActive: boolean;
}

 export interface TabPage {
  id: number;
  title: string;
  procedureName: string;  
  isActive: boolean;
  filters: ReportFilter[];
  columns: ReportColumn[];
}

 export interface GroupTabPage {
  groupId: number;
  pageTitle: string;
  tabs: TabPage[];
}