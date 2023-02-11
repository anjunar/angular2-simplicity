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

  parent = (query : TableQuery, callback : (rows : any[], size : number) => void) => {
    this.items(query, (rows, size, schema) => {
      this.schema = schema;
      callback(rows, size)
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
    let label = this.lazySelectLabel(properties);
    return label.map(value => model[value]).join(" ")
  }

  lazyMultiSelectLabel(properties: { key: string, value: any }) {
    return Object.entries(properties).filter(([key, value]) => value.naming).map(([key, value]) => key)
  }

  lazyMultiSelectName(properties: { key: string, value: any }, model: any[]) {
    let label = this.lazyMultiSelectLabel(properties);
    return model.map(model => label.map(value => model[value]).join(" ")).join(" ")
  }

  repeat(properties : { key: string, value: any }, model : any[]) {
    let label = Object.entries(properties).filter(([key, value]) => value.naming).map(([key, value]) => key)
    return model.map(model => label.map(value => model[value]).join(" ")).join(" ")
  }

}
