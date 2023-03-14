import {Component, ViewEncapsulation} from '@angular/core';
import {ListQuery} from "angular2-simplicity";

@Component({
  selector: 'app-list',
  templateUrl: 'app-list.component.html',
  styleUrls: ['app-list.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppListComponent {

  items(query : ListQuery, callback : (rows : any[], size : number) => void) {
    secureFetch("assets/materials.json")
      .then(response => {
        let data = response.rows.slice(query.index, query.index + query.limit)
        callback(data, response.size)
      })
  }

}
