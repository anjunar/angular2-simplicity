import {Component, ViewEncapsulation} from '@angular/core';
import {SelectQuery} from "angular2-simplicity";
import {ActivatedRoute} from "@angular/router";
import {AppView} from "angular2-simplicity";

@Component({
  selector: 'app-lazy-select',
  templateUrl: 'app-lazy-select.component.html',
  styleUrls: ['app-lazy-select.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppLazySelectComponent extends AppView {

  html! : string
  typescript! : string

  value = null
  values = []

  constructor(private activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  items(event : {query : SelectQuery, callback : (rows : any[], size : number) => void}) {
    secureFetch("assets/materials.json")
      .then(response => {
        let data = response.rows.slice(event.query.index, event.query.index + event.query.limit)
        event.callback(data, response.size)
      })
  }

}
