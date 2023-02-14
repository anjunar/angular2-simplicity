import {Component, ElementRef, TemplateRef, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'as-scroll-part',
  templateUrl: 'as-scroll-part.component.html',
  styleUrls: ['as-scroll-part.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AsScrollPartComponent {

  index = 0;
  items: any[] = []
  templateRef!: TemplateRef<any>

  constructor(private elementRef : ElementRef) {}

  onScroll() : DOMRect {
    let element : HTMLElement = this.elementRef.nativeElement;
    return element.getBoundingClientRect()
  }

}
