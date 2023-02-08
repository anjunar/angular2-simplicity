import {Component, ElementRef, OnChanges, SimpleChanges, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'as-page',
  templateUrl: 'as-page.component.html',
  styleUrls: ['as-page.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AsPageComponent {

  constructor(private elementRef : ElementRef) {}

  get active() {
    return this.elementRef.nativeElement.style.display === "block"
  }

  set active(value) {
    if (value) {
      this.elementRef.nativeElement.style.display = "block"
    } else {
      this.elementRef.nativeElement.style.display = "none"
    }
  }

}
