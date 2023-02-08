import {ContentChild, Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: 'as-error'
})
export class AsErrorDirective implements OnInit {

  @Input() name! : string

  originalText! : string

  constructor(private elementRef : ElementRef) {}

  ngOnInit(): void {
    this.originalText = this.element.textContent
  }

  get element() {
    return this.elementRef.nativeElement;
  }

  options(object : any) {
    let regex = /\$\((\w+)\)/g;
    this.element.textContent = this.originalText.replace(regex, (matched : string, group : string) => object[group]);
  }

}
