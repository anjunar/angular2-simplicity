import {Component, ViewEncapsulation} from '@angular/core';
import {AsTableInterface, TableColumn, TableQuery} from "../as-table.classes";

@Component({
  selector: 'as-table-configuration',
  templateUrl: 'as-table-configuration.component.html',
  styleUrls: ['as-table-configuration.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AsTableConfigurationComponent {

  table! : AsTableInterface

  columns(query : TableQuery, callback : (rows : TableColumn[], size : number) => void) {
    let sliced = this.table.columns.slice(query.index, query.index + query.limit);
    callback(sliced, this.table.columns.length)
  }

}
