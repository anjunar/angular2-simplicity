import {Component, Input, ViewEncapsulation} from '@angular/core';
import {TableQuery} from "../as-table/as-table.classes";

@Component({
  selector: 'as-meta-table',
  templateUrl: 'as-meta-table.component.html',
  styleUrls: ['as-meta-table.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AsMetaTableComponent {

  schema : any;

  parent = (query : TableQuery, callback : (rows : any[], size : number) => void) => {
    this.items(query, (rows, size, schema) => {
      this.schema = schema;
      callback(rows, size)
    })
  }

  @Input() items! : (query : TableQuery, callback : (rows : any[], size : number, schema : any) => void) => void;

  header(node : any) {
    return node.title;
  }

}
