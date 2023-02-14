import {Component, ViewEncapsulation} from '@angular/core';
import {
  InfinityQuery
} from "angular2-simplicity";
import {ActivatedRoute} from "@angular/router";
import {AppView} from "angular2-simplicity";

@Component({
  selector: 'app-infinity-scroll',
  templateUrl: 'app-infinite-scroll.component.html',
  styleUrls: ['app-infinite-scroll.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppInfiniteScrollComponent extends AppView {

  html! : string
  typescript! : string

  constructor(private activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  loader(query : InfinityQuery, callback : (rows : any[]) => void) {
    fetch(`assets/materials.json?query=${query.index}&limit=${query.limit}`)
      .then(response => response.json())
      .then(response => {
        let rows: any[] = response.rows;
        let slice = rows.slice(query.index, query.index + query.limit);
        callback(slice)
      })
  }

}
