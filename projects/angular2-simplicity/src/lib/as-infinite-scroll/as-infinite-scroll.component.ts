import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Output, QueryList,
  TemplateRef,
  ViewChild, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {AsScrollAreaComponent} from "../as-scroll-area/as-scroll-area.component";
import {VerticalPositionChange} from "../as-scrollbar-vertical/as-scrollbar-vertical.component";

export interface InfinityQuery {
  index: number
  limit: number
}

class InfiniteScrollPart {
  readonly index;
  readonly window : any[];

  constructor(index: number, window: any[]) {
    this.index = index;
    this.window = window;
  }
}

@Component({
  selector: 'as-infinity-scroll',
  templateUrl: 'as-infinite-scroll.component.html',
  styleUrls: ['as-infinite-scroll.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AsInfiniteScrollComponent implements AfterViewInit {

  index = 0;
  limit = 10;
  threshold = 3
  window: InfiniteScrollPart[] = [];
  loading = false;

  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>
  @ViewChild("container", {read: ElementRef}) containerRef!: ElementRef<HTMLDivElement>
  @ViewChildren("steps", {read : ElementRef}) steps! : QueryList<ElementRef<HTMLDivElement>>

  @Output() items = new EventEmitter<{ query: InfinityQuery, callback: (rows: any[]) => void }>();

  constructor(private scrollArea: AsScrollAreaComponent) {}

  ngAfterViewInit(): void {
    this.downWard();

    this.scrollArea.scrollYChange.subscribe((value : VerticalPositionChange) => {
      if (! this.loading) {
        let upperPart = this.window[0];
        let lowerPart = this.window[this.window.length - 1];

        switch (value.direction) {
          case "top" : {
            if (value.value < 0.2 && upperPart.index > 0) {
              this.index = upperPart.index - this.limit;
              this.upWard();
            }
          } break
          case "bottom" : {
            if (value.value > 0.8) {
              this.index = lowerPart.index + this.limit;
              this.downWard();
            }
          } break
        }
      }

    })
  }

  upWard() {
    this.loading = true;
    this.items.emit({
      query: {index: this.index, limit: this.limit}, callback: (rows) => {
        this.window = [new InfiniteScrollPart(this.index, rows), ...this.window];
        if (this.window.length > this.threshold) {

          this.window.pop();

          let lastStep = this.steps.get(this.steps.length - 1);
          if (lastStep) {
            let containerHeight = this.containerRef.nativeElement.offsetHeight;
            let stepHeight = lastStep.nativeElement.offsetHeight;
            let position = stepHeight / (containerHeight - this.scrollArea.elementRef.nativeElement.offsetHeight);
            this.scrollArea.scrollY += position;
            this.scrollArea.onScroll();
          }

        }

        this.loading = false;
      }
    })
  }

  downWard() {
    this.loading = true;
    this.items.emit({
      query: {index: this.index, limit: this.limit}, callback: (rows) => {
        this.window.push(new InfiniteScrollPart(this.index, rows));

        if (this.window.length > this.threshold) {

          this.window.shift();

          let firstStep = this.steps.get(0);
          if (firstStep) {
            let containerHeight = this.containerRef.nativeElement.offsetHeight;
            let stepHeight = firstStep.nativeElement.offsetHeight;
            let position = stepHeight / (containerHeight - this.scrollArea.elementRef.nativeElement.offsetHeight);
            this.scrollArea.scrollY -= position;
            this.scrollArea.onScroll();
          }

        }

        this.loading = false;
      }
    })
  }

}
