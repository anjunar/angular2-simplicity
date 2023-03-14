import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter, Input,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

export interface VerticalPositionChange {
  value : number;
  direction : "top" | "bottom"
}

@Component({
  selector: 'as-scrollbar-vertical',
  templateUrl: 'as-scrollbar-vertical.component.html',
  styleUrls: ['as-scrollbar-vertical.component.css'],
  encapsulation : ViewEncapsulation.None,
  changeDetection : ChangeDetectionStrategy.Default
})
export class AsScrollbarVerticalComponent {

  @ViewChild("cursor") cursorRef! : ElementRef<HTMLDivElement>

  @Output() positionChange : EventEmitter<VerticalPositionChange> = new EventEmitter<VerticalPositionChange>();

  constructor(private elementRef: ElementRef) { }

  get cursor() {
    return this.cursorRef.nativeElement;
  }

  get element() {
    return this.elementRef.nativeElement;
  }

  @Input()
  get position() {
    let element = this.cursor;
    let top = Number.parseInt(element.style.top.replace("px", ""))
    return top / (this.element.offsetHeight - 16)
  }

  set position(value) {
    if (this.cursorRef) {
      let element = this.cursor;
      let number = (this.element.offsetHeight - 16) * value;
      element.style.top = number + "px";
    }
  }

  sliderVertical(event : MouseEvent) {
    let cursor = this.cursor;
    let delta = cursor.offsetTop, pointer = cursor.offsetTop;

    let elementDrag = (event : MouseEvent) => {
      event.preventDefault();
      delta = pointer - event.clientY;
      pointer = event.clientY;
      let computedStyle = Number.parseInt(window.getComputedStyle(cursor).top.replace("px", ""));
      let number = computedStyle - delta;
      if (number < 0) {
        number = 0;
      }
      if (number > this.element.offsetHeight - 16) {
        number = this.element.offsetHeight - 16;
      }
      let position = number / (this.element.offsetHeight - 16);
      this.position = position;
      cursor.style.top = number + "px";
      this.positionChange.emit({
        value : position,
        direction : delta > 0 ? "top" : "bottom"
      });
    }

    let closeDragElement = () => {
      document.removeEventListener("mouseup", closeDragElement)
      document.removeEventListener("mousemove", elementDrag)
    }

    event.preventDefault();
    pointer = event.clientY;
    document.addEventListener("mouseup", closeDragElement)
    document.addEventListener("mousemove", elementDrag)

  }

}
