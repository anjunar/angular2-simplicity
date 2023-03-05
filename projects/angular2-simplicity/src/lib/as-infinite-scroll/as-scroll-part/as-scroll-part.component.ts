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

  idExtractor = (model : any) => {
    return model["id"];
  }

  constructor(private elementRef : ElementRef) {}

  onScroll() : DOMRect {
    let element : HTMLElement = this.elementRef.nativeElement;
    return element.getBoundingClientRect()
  }

  delete(value : string) {
    let indexOf = this.items.findIndex((item : any) => this.idExtractor(item) === value);
    this.items.splice(indexOf, 1);
  }

}
