import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

export interface ExpandableQuery {
  index: number
  limit: number
}

@Component({
  selector: 'as-expandable-list',
  templateUrl: 'as-expandable-list.component.html',
  styleUrls: ['as-expandable-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AsExpandableListComponent implements OnInit {

  lowerIndex = 0;
  upperIndex = 0;

  size = 0;

  @Input() limit = 5;
  @Input() windowSize = 10;

  window: any[] = [];

  @Output() items = new EventEmitter<{ query: ExpandableQuery, callback: (rows: any[], size : number) => void }>();

  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>

  ngOnInit(): void {
    this.loadNext();
  }

  prev() {
    this.lowerIndex -= this.limit;
    this.loadPrev();
  }

  next() {
    this.upperIndex += this.limit;
    this.loadNext();
  }

  loadPrev() {
    this.items.emit({
      query: {index: this.lowerIndex, limit: this.limit}, callback: (rows, size : number) => {
        this.window = [...rows, ...this.window]
        this.size = size;
        if (this.window.length > this.windowSize) {
          this.window = this.window.slice(0, this.windowSize)
          this.upperIndex = this.lowerIndex + this.windowSize - this.limit;
        }
      }
    })
  }

  loadNext() {
    this.items.emit({
      query: {index: this.upperIndex, limit: this.limit}, callback: (rows, size : number) => {
        this.window.push(...rows)
        this.size = size;

        if (this.window.length > this.windowSize) {
          this.window = this.window.slice(this.window.length - this.windowSize, this.window.length)
          this.lowerIndex = this.upperIndex - this.windowSize + this.limit
        }
      }
    })
  }

}
