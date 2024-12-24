import { ReactNode } from "react";

export type TableData = {
    [key: string]: any; 
  }
  
  export type Column<T extends TableData> = {
    accessor: keyof T; 
    header: string; 
    render?: (row: T) => JSX.Element | string; 
  }
  
  export type TableAction<T extends TableData> = {
    content:(row:T) => ReactNode
  }
  
  export type ReusableTableProps<T extends TableData> = {
    data: T[]; 
    columns: Column<T>[]; 
    actions?: TableAction<T>[]; 
  }