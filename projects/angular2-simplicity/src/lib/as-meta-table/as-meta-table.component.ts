import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {TableQuery} from "../as-table/as-table.classes";

@Component({
  selector: 'as-meta-table',
  templateUrl: 'as-meta-table.component.html',
  styleUrls: ['as-meta-table.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AsMetaTableComponent {

  schema : any;
  @Output() rowClick = new EventEmitter<any>();
  @Output() load = new EventEmitter<any>();

  parent = (query : TableQuery, callback : (rows : any[], size : number) => void) => {
    this.items(query, (rows, size, schema) => {
      this.schema = schema;
      callback(rows, size)
      this.load.emit({rows : rows, size : size, $schema : schema})
    })
  }

  onRowClick(event : any) {
    this.rowClick.emit(event);
  }

  @Input() items! : (query : TableQuery, callback : (rows : any[], size : number, schema : any) => void) => void;

  lazySelectLabel(properties: { key: string, value: any }) {
    return Object.entries(properties).filter(([key, value]) => value.naming).map(([key, value]) => key)
  }

  lazySelectName(properties: { key: string, value: any }, model: any) {
    if (model) {
      let label = this.lazySelectLabel(properties);
      return label.map(value => model[value]).join(" ")
    }
    return ""

  }

  lazyMultiSelectName(properties: { key: string, value: any }, model: any[]) {
    if (model) {
      let label = this.lazySelectLabel(properties);
      return model.map(model => label.map(value => model[value]).join(" ")).join(" ")
    }
    return ""
  }

  repeat(properties : { key: string, value: any }, model : any[]) {
    if (model) {
      let label = Object.entries(properties).filter(([key, value]) => value.naming).map(([key, value]) => key)
      return model.map(model => label.map(value => model[value]).join(" ")).join(" ")
    }
    return ""
  }

}
