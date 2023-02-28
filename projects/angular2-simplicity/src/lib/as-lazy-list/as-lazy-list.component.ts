import {
  AfterContentInit,
  Component,
  ContentChild,
  EventEmitter,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

export interface ListQuery {
  index: number;
  limit: number
}

@Component({
  selector: 'as-lazy-list',
  templateUrl: 'as-lazy-list.component.html',
  styleUrls: ['as-lazy-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AsLazyListComponent implements AfterContentInit {

  window: any[] = [];
  size: number = 0;

  index: number = 0;
  limit: number = 5

  @Output() items = new EventEmitter<{ query: ListQuery, callback: (rows: any[], size: number) => void }>();

  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>

  ngAfterContentInit(): void {
    this.load();
  }

  load() {
    this.items.emit({
      query: {index: this.index, limit: this.limit}, callback: (data: any[], size: number) => {
        this.window = data;
        this.size = size;
      }
    })
  }

  skipPrevious() {
    this.index = 0;
    this.load();
  }

  arrowLeft() {
    this.index -= this.limit;
    this.load();
  }

  arrowRight() {
    this.index += this.limit;
    this.load();
  }

  skipNext() {
    let number = Math.round(this.size / this.limit);
    this.index = (number - 1) * this.limit;
    this.load();
  }


}
