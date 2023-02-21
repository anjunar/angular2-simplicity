import {Component, ViewEncapsulation} from '@angular/core';
import {AppView, InfinityQuery} from "angular2-simplicity";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-infinity-scroll',
  templateUrl: 'app-infinite-scroll.component.html',
  styleUrls: ['app-infinite-scroll.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppInfiniteScrollComponent extends AppView {

  html!: string
  typescript!: string

  scrollOnViewport = true

  data!: any[];

  constructor(private activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  loader(event: { query: InfinityQuery, callback: (rows: any[]) => void }) {
    setTimeout(() => {
      let slice = this.data.slice(event.query.index, event.query.index + event.query.limit);

      slice.forEach((item, index) => {
        item["position"] = index + event.query.index
      })

      event.callback(slice)
    }, 300)
  }
}
