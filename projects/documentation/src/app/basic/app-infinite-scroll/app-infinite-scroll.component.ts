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

  scrollOnViewport = true

  data! : any[];

  loader! : (query : InfinityQuery, callback : (rows : any[]) => void) => void

    constructor(private activatedRoute: ActivatedRoute) {
      super(activatedRoute);

      this.loader = (query : InfinityQuery, callback : (rows : any[]) => void) => {
          setTimeout(() => {
            let slice = this.data.slice(query.index, query.index + query.limit);

            slice.forEach((item, index) => {
              item["position"] = index + query.index
            })

            callback(slice)
          }, 300)
      }
    }
}
