import {Component, ViewEncapsulation} from '@angular/core';
import {SelectQuery} from "angular2-simplicity";
import {ActivatedRoute} from "@angular/router";
import {AppView} from "../../app.classes";

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

  items(query : SelectQuery, callback : (rows : any[], size : number) => void) {
    fetch("assets/materials.json")
      .then(response => response.json())
      .then(response => {
        let data = response.rows.slice(query.index, query.index + query.limit)
        callback(data, response.size)
      })
  }

}
