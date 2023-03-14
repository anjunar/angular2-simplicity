import {Component, ViewEncapsulation} from '@angular/core';
import {CarouselQuery} from "angular2-simplicity";
import {AppView} from "angular2-simplicity";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-carousel',
  templateUrl: 'app-carousel.component.html',
  styleUrls: ['app-carousel.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppCarouselComponent extends AppView {

  html! : string
  typescript! : string

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  loader(query : CarouselQuery, callback : (rows : any[]) => void) {
    secureFetch("assets/materials.json")
      .then(response => {
        let rows : any[] = response.rows;
        callback(rows.slice(query.index, query.index + query.limit))
      })
  }

}
