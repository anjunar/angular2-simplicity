import {Component, ContentChild, ElementRef, TemplateRef, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'as-page',
  templateUrl: 'as-page.component.html',
  styleUrls: ['as-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AsPageComponent {

  _active = false;

  @ContentChild(TemplateRef) templateRef! : TemplateRef<any>

  constructor(private elementRef : ElementRef) {}

  get active() {
    return this._active;
  }

  set active(value)  {
    this._active = value;
    if (value) {
      this.elementRef.nativeElement.style.display = "block"
    } else {
      this.elementRef.nativeElement.style.display = "none"
    }
  }
}
