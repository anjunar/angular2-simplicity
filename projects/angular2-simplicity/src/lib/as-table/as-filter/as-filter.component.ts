import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {TableColumn} from "../as-table.classes";

@Component({
  selector: 'as-filter',
  templateUrl: 'as-filter.component.html',
  styleUrls: ['as-filter.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AsFilterComponent implements OnInit{

  @Input() filter! : TableColumn

  @Input() widget! : string

  ngOnInit(): void {
    switch (this.widget) {
      case "number" : {
        this.filter.search = {
          from : 0,
          to : 0
        }
      } break
      case "text" : {
        this.filter.search = ""
      } break
    }
  }

}
