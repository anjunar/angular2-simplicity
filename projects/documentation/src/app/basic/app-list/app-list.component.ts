import {Component, ViewEncapsulation} from '@angular/core';
import {ListQuery} from "angular2-simplicity";
import {ActivatedRoute} from "@angular/router";
import {AppView} from "../../app.classes";

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

  items(query : ListQuery, callback : (rows : any[], size : number) => void) {
    fetch("assets/materials.json")
      .then(response => response.json())
      .then(response => {
        let data = response.rows.slice(query.index, query.index + query.limit)
        callback(data, response.size)
      })
  }

}
