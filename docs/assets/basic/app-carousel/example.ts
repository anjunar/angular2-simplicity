import {Component, ViewEncapsulation} from '@angular/core';
import {CarouselQuery} from "angular2-simplicity";

@Component({
  selector: 'app-carousel',
  templateUrl: 'app-carousel.component.html',
  styleUrls: ['app-carousel.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppCarouselComponent {

  loader(query : CarouselQuery, callback : (rows : any[]) => void) {
    secureFetch("assets/materials.json")
      .then(response => {
        let rows : any[] = response.rows;
        callback(rows.slice(query.index, query.index + query.limit))
      })
  }

}
