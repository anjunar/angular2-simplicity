import {Component, ViewEncapsulation} from '@angular/core';
import {TableQuery} from "angular2-simplicity";

@Component({
  selector: 'app-meta-table',
  templateUrl: 'app-meta-table.component.html',
  styleUrls: ['app-meta-table.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppMetaTableComponent {

  items(query : TableQuery, callback : (rows : any[], size : number, schema : any) => void) {
    secureFetch("assets/materials.json")
      .then(response => response.json())
      .then(response => {
        let data = response.rows.slice(query.index, query.index + query.limit)
        callback(data, response.size, response.$schema)
      })
  }

}
