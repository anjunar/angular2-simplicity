import {Component} from '@angular/core';
import {Query} from "angular2-simplicity";

@Component({
  selector: 'app-table',
  templateUrl: 'app-table.component.html',
  styleUrls: ['app-table.component.css']
})
export class AppTableComponent {

  items(query : Query, callback : (rows : any[], size : number) => void) {
    fetch("assets/materials.json")
      .then(response => response.json())
      .then(response => {
        let data = response.rows.slice(query.index, query.index + query.limit)
        callback(data, response.size)
      })
  }

}
