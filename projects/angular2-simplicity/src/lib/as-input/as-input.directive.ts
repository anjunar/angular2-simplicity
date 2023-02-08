import {AfterViewInit, Directive, ElementRef, HostListener, Optional, TemplateRef} from '@angular/core';
import {NgControl} from "@angular/forms";
import {AsInputService, InputElement} from "../as-input.service";

@Directive({
  selector: 'input',
  providers : [AsInputService]
})
export class AsInputDirective implements InputElement {

  constructor(private readonly elementRef: ElementRef<HTMLInputElement>,
              @Optional() private readonly ngControl: NgControl,
              private readonly service : AsInputService) {
    service.input = this;
    service.element = elementRef.nativeElement;
    service.ngControl = ngControl;
  }

  @HostListener("focus")
  onFocus() {}

  get getPlaceholder(): string {
    return this.elementRef.nativeElement.placeholder;
  }

  set setPlaceholder(value: string) {
    this.elementRef.nativeElement.placeholder = value;
  }



}
