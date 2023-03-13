import {Component, ViewEncapsulation} from '@angular/core';
import {TableQuery} from "angular2-simplicity";
import {AppView} from "angular2-simplicity";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-meta-table',
  templateUrl: 'app-meta-table.component.html',
  styleUrls: ['app-meta-table.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppMetaTableComponent extends AppView {

  html! : string;
  typescript! : string
  json! : string

  constructor(private activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  onRowClick(event : any) {
    alert(JSON.stringify(event, null, 4))
  }

  items(event : {query : TableQuery, callback : (rows : any[], size : number, schema : any) => void}) {
    secureFetch("assets/materials.json")
      .then(response => response.json())
      .then(response => {
        let data = response.rows.slice(event.query.index, event.query.index + event.query.limit)
        event.callback(data, response.size, response.$schema)
      })
  }

}
