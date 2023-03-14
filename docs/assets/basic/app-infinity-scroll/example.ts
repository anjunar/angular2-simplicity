import {Component, ViewEncapsulation} from '@angular/core';
import {InfinityQuery} from "angular2-simplicity";

@Component({
  selector: 'app-infinity-scroll',
  templateUrl: 'app-infinite-scroll.component.html',
  styleUrls: ['app-infinite-scroll.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppInfinityScrollComponent {

  loader(query: InfinityQuery, callback: (rows: any[]) => void) {
    secureFetch(`assets/materials.json?query=${query.index}&limit=${query.limit}`)
      .then(response => {
        let rows: any[] = response.rows;
        let slice = rows.slice(query.index, query.index + query.limit);
        callback(slice)
      })
  }

}
