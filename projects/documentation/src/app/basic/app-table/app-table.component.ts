import {Component, ViewEncapsulation} from '@angular/core';
import {TableQuery} from "angular2-simplicity";
import {ActivatedRoute} from "@angular/router";
import {AppView} from "angular2-simplicity";

@Component({
  selector: 'app-table',
  templateUrl: 'app-table.component.html',
  styleUrls: ['app-table.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppTableComponent extends AppView {

  html! : string
  typescript! : string

  constructor(private activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  items(event : {query : TableQuery, callback : (rows : any[], size : number) => void}) {
    fetch("assets/materials.json")
      .then(response => response.json())
      .then(response => {
        let data = response.rows.slice(event.query.index, event.query.index + event.query.limit)
        event.callback(data, response.size)
      })
  }

}
