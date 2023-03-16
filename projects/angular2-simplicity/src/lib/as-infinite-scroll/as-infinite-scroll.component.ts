import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter, HostListener, Input,
  Output, QueryList,
  TemplateRef,
  ViewChild, ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {AsScrollAreaComponent} from "../as-scroll-area/as-scroll-area.component";
import {VerticalPositionChange} from "../as-scrollbar-vertical/as-scrollbar-vertical.component";
import {TableLike} from "../app.classes";

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

  delete(value : any) {
    let index = this.window.findIndex((item) => item === value);
    this.window.splice(index, 1);
  }

  add(value : any) {
    this.window.push(value)
  }
}

@Component({
  selector: 'as-infinity-scroll',
  templateUrl: 'as-infinite-scroll.component.html',
  styleUrls: ['as-infinite-scroll.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AsInfiniteScrollComponent implements AfterViewInit, TableLike {

  index = 0;
  @Input("limit") _limit = 5;
  multiplier = 1;

  @Input() itemWidth : number = 200

  @Input() threshold = 3
  window: InfiniteScrollPart[] = [];
  loading = false;


  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>
  @ViewChildren("steps", {read : ElementRef}) steps! : QueryList<ElementRef<HTMLDivElement>>

  @Output() items = new EventEmitter<{ query: InfinityQuery, callback: (rows: any[]) => void }>();

  constructor(private scrollArea: AsScrollAreaComponent, private changeDetector : ChangeDetectorRef, private containerRef : ElementRef) {}

  private resizeId! : number;
  @HostListener('window:resize', ['$event'])
  onResized(event: Event) {
    clearTimeout(this.resizeId);
    this.resizeId = setTimeout(() => {
      let offsetWidth = this.containerRef.nativeElement.offsetWidth;
      let step = this.steps.get(0);
      if (step) {
        let stepWidth = step.nativeElement.offsetWidth;
        this.multiplier = Math.round(offsetWidth / stepWidth );
        this.index = 0;
        this.window = [];
        this.scrollArea.scrollY = 0
        this.scrollArea.onScroll();
        this.scrollArea.onWheelIntern(0)
        this.downWard();
      }
    }, 500);
  }

  get limit() {
    if (this.multiplier > 0) {
      return this._limit * this.multiplier
    }
    return this._limit;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      let offsetWidth = this.containerRef.nativeElement.offsetWidth;
      this.multiplier = Math.round(offsetWidth / this.itemWidth);
      this.downWard();
    })

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
            if (value.value > 0.8 && lowerPart.window.length === this.limit) {
              this.index = lowerPart.index + this.limit;
              this.downWard();
            }
          } break
        }
      }

    })
  }

  add(value : any) {
    let part = this.window[this.window.length -1];
    if (part.window.length < this.limit) {
      part.add(value);
    }
  }

  delete(value : any) {
    for (const part of this.window) {
      part.delete(value);
    }
  }

  upWard() {
    this.loading = true;
    this.items.emit({
      query: {index: this.index, limit: this.limit}, callback: (rows) => {
        this.window = [new InfiniteScrollPart(this.index, rows), ...this.window];
        if (this.window.length > this.threshold) {

          this.window.pop();

          this.changeDetector.detectChanges()

          let stepHeight = this.steps.reduce((prevValue, curValue, curIndex) => {
            if (curIndex <= this.limit) {
              return prevValue + curValue.nativeElement.offsetHeight;
            }
            return prevValue;
          }, 0)

          let containerHeight = this.containerRef.nativeElement.offsetHeight;
          let position = (stepHeight / this.multiplier) / (containerHeight - this.scrollArea.elementRef.nativeElement.offsetHeight);
          this.scrollArea.scrollY += position;
          this.scrollArea.onScroll();

        }

        this.loading = false;
        this.scrollArea.onWheelIntern(0)
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

          this.changeDetector.detectChanges();

          let stepHeight = this.steps.reduce((prevValue, curValue, curIndex) => {
            if (curIndex >= this.steps.length - this.limit) {
              return prevValue + curValue.nativeElement.offsetHeight;
            }
            return prevValue;
          }, 0)

          let containerHeight = this.containerRef.nativeElement.offsetHeight;
          let position = (stepHeight / this.multiplier) / (containerHeight - this.scrollArea.elementRef.nativeElement.offsetHeight);
          this.scrollArea.scrollY -= position;
          this.scrollArea.onScroll();

        }

        this.loading = false;
        this.scrollArea.onWheelIntern(0)
      }
    })
  }

}
