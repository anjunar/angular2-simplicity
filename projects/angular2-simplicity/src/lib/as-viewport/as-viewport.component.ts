import {Component, ElementRef, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'as-viewport',
  templateUrl: 'as-viewport.component.html',
  styleUrls: ['as-viewport.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AsViewportComponent {

  @ViewChild("window", {read: ViewContainerRef}) windowContainer! : ViewContainerRef

  @ViewChild("component", {read: ViewContainerRef}) componentContainer! : ViewContainerRef

  constructor(private elementRef : ElementRef) {}

  get element() : HTMLElement  {
    return this.elementRef.nativeElement;
  }
}
