import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener, Optional, SkipSelf,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {
  AsScrollbarVerticalComponent,
  VerticalPositionChange
} from "../as-scrollbar-vertical/as-scrollbar-vertical.component";
import {HorizontalPositionChange} from "../as-scrollbar-horizontal/as-scrollbar-horizontal.component";

@Component({
  selector: 'as-scroll-area',
  templateUrl: 'as-scroll-area.component.html',
  styleUrls: ['as-scroll-area.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default
})
export class AsScrollAreaComponent implements AfterContentChecked {

  @ViewChild("viewport") viewportRef!: ElementRef<HTMLElement>;
  @ViewChild("content") contentRef!: ElementRef<HTMLElement>;

  @ViewChild(AsScrollbarVerticalComponent) verticalScrollBar!: AsScrollbarVerticalComponent

  scrollX: number = 0;
  scrollY: number = 0;

  scrollbarVerticalVisible: boolean = false;
  scrollbarHorizontalVisible: boolean = false;

  scrollXChange: EventEmitter<HorizontalPositionChange> = new EventEmitter<HorizontalPositionChange>();
  scrollYChange: EventEmitter<VerticalPositionChange> = new EventEmitter<VerticalPositionChange>();

  constructor(
    @SkipSelf() @Optional() private scrollArea : AsScrollAreaComponent,
    public elementRef : ElementRef,
    private changeDetector : ChangeDetectorRef) {}

  get content() {
    return this.contentRef.nativeElement;
  }

  get viewport() {
    return this.viewportRef.nativeElement;
  }

  get height() {
    return this.content.offsetHeight - this.viewport.offsetHeight;
  }

  ngAfterContentChecked(): void {
    setTimeout(() => {
      this.checkScrollBars()
      this.changeDetector.detectChanges()
    })
  }

  checkScrollBars() {
    let contentDiv = this.viewport;
    let clientOffsetHeight = contentDiv.offsetHeight - this.content.offsetHeight;
    let clientOffsetWidth = contentDiv.offsetWidth - this.content.offsetWidth;

    this.scrollbarVerticalVisible = clientOffsetHeight < 0
    this.scrollbarHorizontalVisible = clientOffsetWidth < 0
  }

  onScrollY(event: VerticalPositionChange) {
    this.scrollY = event.value;
    this.scrollYChange.emit(event);
    this.onScroll()
  }

  onScrollX(event: HorizontalPositionChange) {
    this.scrollX = event.value;
    this.scrollXChange.emit(event);
    this.onScroll()
  }

  onScroll() {
    let viewport = this.viewport;
    let clientOffsetHeight = this.content.offsetHeight - viewport.offsetHeight;
    let clientOffsetWidth = this.content.offsetWidth - viewport.offsetWidth;
    let top = clientOffsetHeight * (this.scrollY || 0);
    let left = clientOffsetWidth * (this.scrollX || 0);

    this.content.style.transition = "all 0s cubic-bezier(0.2, .84, .5, 1)"
    this.content.style.transform = `translate3d(${-left}px, ${-top}px, 0px)`
  }

  @HostListener("wheel", ["$event"])
  onWheel(event: WheelEvent) {
    if (this.scrollArea && event.shiftKey) {
      event.stopPropagation();
      event.preventDefault();
      return this.onWheelIntern(event.deltaY);
    }

    if (! this.scrollArea) {
      return this.onWheelIntern(event.deltaY);
    }

    return false;
  }

  public onWheelIntern(deltaY : number) {
    let viewport = this.viewport;

    function getMatrix(element: HTMLElement) {
      if (element.style.transform === "") {
        return {
          x: 0,
          y: 0,
          z: 0
        }
      }

      let regex = /translate3d\((-?[\d.]+)px,\s*(-?[\d.]+)px,\s*(-?[\d.]+)px\)/;
      let transform = regex.exec(element.style.transform) || [];
      return {
        x: Number.parseInt(transform[1]),
        y: Number.parseInt(transform[2]),
        z: Number.parseInt(transform[3])
      };
    }

    let matrix = getMatrix(this.content);
    let top = -matrix.y + deltaY;
    let clientOffsetHeight = this.content.offsetHeight - viewport.offsetHeight;
    if (clientOffsetHeight > 0) {
      if (top < 0) {
        top = 0;
      }
      if (top > clientOffsetHeight) {
        top = clientOffsetHeight;
      }
      let position = top / clientOffsetHeight;
      let matScrollbarVertical = this.verticalScrollBar;
      matScrollbarVertical.position = position;
      this.scrollY = position;

      this.content.style.transition = "all .5s cubic-bezier(0.2, .84, .5, 1)"
      this.content.style.transform = `translate3d(0px, ${-top}px, 0px)`

      this.scrollYChange.emit({
        value : position,
        direction : deltaY < 0 ? "top" : "bottom"
      });
    }
    return false;
  }
}
