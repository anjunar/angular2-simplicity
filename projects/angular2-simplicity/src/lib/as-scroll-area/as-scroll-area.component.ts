import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {AsScrollbarVerticalComponent} from "../as-scrollbar-vertical/as-scrollbar-vertical.component";

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

  scroll: EventEmitter<number> = new EventEmitter<number>();

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
    })
  }

  checkScrollBars() {
    let contentDiv = this.viewport;
    let clientOffsetHeight = contentDiv.offsetHeight - this.content.offsetHeight;
    let clientOffsetWidth = contentDiv.offsetWidth - this.content.offsetWidth;

    this.scrollbarVerticalVisible = clientOffsetHeight < 0
    this.scrollbarHorizontalVisible = clientOffsetWidth < 0
  }

  onScrollY(event: number) {
    this.scrollY = event;
    this.scroll.emit(event);
    this.onScroll()
  }

  onScrollX(event: number) {
    this.scrollX = event;
    this.scroll.emit(event);
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

    event.preventDefault();
    let matrix = getMatrix(this.content);
    let top = -matrix.y + event.deltaY;
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

      this.scroll.emit(position);
    }
    return false;

  }

}
