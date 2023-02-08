import {
  AfterContentInit, AfterViewInit,
  Component,
  ContentChildren,
  Input, OnChanges, OnInit,
  QueryList, SimpleChanges,
  TemplateRef, ViewChild, ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {AsPageComponent} from "../as-page/as-page.component";

@Component({
  selector: 'as-pages',
  templateUrl: 'as-pages.component.html',
  styleUrls: ['as-pages.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AsPagesComponent implements AfterContentInit, OnChanges {

  @Input() page = 0;
  @ContentChildren(AsPageComponent) pages!: QueryList<AsPageComponent>


  ngOnChanges(changes: SimpleChanges): void {
    if (this.pages) {
      this.pages.forEach((asPage, index) => {
        asPage.active = this.page === index
      })
    }
  }

  ngAfterContentInit(): void {
    let page = this.pages.get(this.page);
    if (page) {
      page.active = true
    }
  }

}
