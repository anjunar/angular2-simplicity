import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import {TableQuery} from "../as-table/as-table.classes";

@Component({
  selector: 'as-meta-table',
  templateUrl: 'as-meta-table.component.html',
  styleUrls: ['as-meta-table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AsMetaTableComponent {

  schema: any;
  @Output() rowClick = new EventEmitter<any>();
  @Output() load = new EventEmitter<any>();

  parent = (event: { query: TableQuery, callback: (rows: any[], size: number) => void }) => {
    this.items.emit({
      query: event.query, callback: (rows: any[], size: number, schema: any) => {
        this.schema = schema;
        event.callback(rows, size)
        this.load.emit({rows : rows, size : size, $schema : schema})
      }
    })
  }

  onRowClick(event: any) {
    this.rowClick.emit(event);
  }

  @Output() items = new EventEmitter<{ query: TableQuery, callback: (rows: any[], size: number, schema: any) => void }>;

  lazySelectLabel(properties: { key: string, value: any }) {
    return Object.entries(properties).filter(([key, value]) => value.naming).map(([key, value]) => key)
  }

  lazySelectName(properties: any, model: any) {
    if (!model) {
      return ""
    }
    let label = this.lazySelectLabel(properties);
    return label.map(value => model[value]).join(" ")
  }

  lazyMultiSelectName(properties: any, model: any[]) {
    if (!model) {
      return ""
    }
    let label = this.lazySelectLabel(properties);
    return model.map(model => label.map(value => model[value]).join(" ")).join(" ")
  }

  repeat(properties: { key: string, value: any }, model: any[]) {
    if (!model) {
      return "";
    }
    let label = Object.entries(properties).filter(([key, value]) => value.naming).map(([key, value]) => key)
    return model.map(model => label.map(value => model[value]).join(" ")).join(" ")
  }

}
