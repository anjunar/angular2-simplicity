import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter, Input,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'as-scrollbar-horizontal',
  templateUrl: 'as-scrollbar-horizontal.component.html',
  styleUrls: ['as-scrollbar-horizontal.component.css'],
  encapsulation : ViewEncapsulation.None,
  changeDetection : ChangeDetectionStrategy.Default
})
export class AsScrollbarHorizontalComponent {

  @ViewChild("cursor") cursorRef! : ElementRef<HTMLDivElement>

  @Output() positionChange : EventEmitter<number> = new EventEmitter<number>();

  constructor(private elementRef: ElementRef) { }

  get cursor() {
    return this.cursorRef.nativeElement;
  }

  get element() {
    return this.elementRef.nativeElement;
  }

  @Input()
  get position() : number {
    let element = this.cursor;
    let left = Number.parseInt(element.style.left.replace("px", ""))
    return left / (this.element.offsetWidth - 16);
  }

  set position(value: number) {
    if (this.cursorRef) {
      let element = this.cursor;
      let number = (this.element.offsetWidth - 16) * value;
      element.style.left = number + "px";
    }
  }

  sliderHorizontal(event : MouseEvent) {
    let cursor = this.cursor;
    let delta = cursor.offsetLeft, pointer = cursor.offsetLeft;

    let elementDrag = (event : MouseEvent) => {
      event.preventDefault();
      delta = pointer - event.clientX;
      pointer = event.clientX;
      let computedStyle = Number.parseInt(window.getComputedStyle(cursor).left.replace("px", ""));
      let number = computedStyle - delta;
      if (number < 0) {
        number = 0;
      }
      if (number > this.element.offsetWidth - 32) {
        number = this.element.offsetWidth - 32;
      }
      let position = number / (this.element.offsetWidth - 16);
      this.position = position;
      cursor.style.left = number + "px";
      this.positionChange.emit(position);
    }

    let closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
    }

    event.preventDefault();
    pointer = event.clientX;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

}
