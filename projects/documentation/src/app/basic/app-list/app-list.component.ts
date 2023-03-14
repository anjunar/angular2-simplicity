import {Component, ViewEncapsulation} from '@angular/core';
import {ListQuery} from "angular2-simplicity";
import {ActivatedRoute} from "@angular/router";
import {AppView} from "angular2-simplicity";

@Component({
  selector: 'app-list',
  templateUrl: 'app-list.component.html',
  styleUrls: ['app-list.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppListComponent extends AppView {

  html! : string
  typescript! : string

  constructor(private activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  items(event : {query : ListQuery, callback : (rows : any[], size : number) => void}) {
    secureFetch("assets/materials.json")
      .then(response => {
        let data = response.rows.slice(event.query.index, event.query.index + event.query.limit)
        event.callback(data, response.size)
      })
  }

}
