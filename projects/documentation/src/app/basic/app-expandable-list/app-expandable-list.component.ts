import {Component, ViewEncapsulation} from '@angular/core';
import {
  ExpandableQuery
} from "angular2-simplicity";
import {AppView} from "angular2-simplicity";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-expandable-list',
  templateUrl: 'app-expandable-list.component.html',
  styleUrls: ['app-expandable-list.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppExpandableListComponent extends AppView {

  html! : string;
  typescript! : string

  constructor(private activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  loader(event : {query : ExpandableQuery, callback : (rows : any[], size : number) => void}) {
    secureFetch("assets/materials.json")
      .then(response => {
        let data = response.rows.slice(event.query.index, event.query.index + event.query.limit)
        event.callback(data, response.size)
      })
  }

}
