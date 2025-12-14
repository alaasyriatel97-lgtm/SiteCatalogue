export type FilterType = 'text' | 'number' | 'date' | 'select' | 'boolean';
export type ColumnType = 'text' | 'date' | 'currency' | 'status' | 'actions';
export type DataSourceType = 'static' | 'api' | 'sql_query';

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

export interface ReportColumn {
  id: number;
  field: string;
  header: string;
  type: ColumnType;
  width?: string;
  isSortable: boolean;
  isActive: boolean;
}

export interface TabPage {
  id: number;
  title: string;
  slug: string;        
  // isActive: boolean;
  procedureName: string;
  filters: ReportFilter[];
  columns: ReportColumn[];
}

export interface GroupTabPage {
  groupId: number;
  pageTitle: string;
  description?: string; 
  slug: string;  
  icon?: string;
  tabs: TabPage[];
}
export interface MenuItem {
  label: string;
  icon: string;
  route?: string; 
  roles?: string[];
  children?: MenuItem[];
}