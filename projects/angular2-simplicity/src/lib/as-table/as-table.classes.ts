import {TemplateRef} from "@angular/core";

export interface QueryInterval {
  from : number,
  to : number
}

export interface TableColumn {
  property: string,
  index: number,
  visible: boolean,
  sort: string,
  search: string | QueryInterval | string[]
}

export interface TableQuery {
  index: number,
  limit: number,
  filter: any,
  sort: string[]
}

export interface AsTableInterface {
  columns: TableColumn[];

  left(index: number): void;

  right(index: number): void;

  templateRefHeader(index: number): TemplateRef<any> | null;

  templateRefFilter(index: number): TemplateRef<any> | null;
}
