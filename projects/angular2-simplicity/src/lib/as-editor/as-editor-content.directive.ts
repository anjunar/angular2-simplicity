import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {AsEditorModel} from "./as-editor.classes";

@Directive({
  selector: 'as-editor-content'
})
export class AsEditorContentDirective {

  @Output() modelChange = new EventEmitter<AsEditorModel>();
  @Output() clickChange = new EventEmitter<Event>()

  constructor(private elementRef : ElementRef) {
    elementRef.nativeElement.contentEditable = "true"
  }

  get element() {
    return this.elementRef.nativeElement;
  }

  @Input()
  get model() {
    return {
      html : this.element.innerHTML,
      text : this.element.textContent
    }
  }

  set model(value : AsEditorModel) {
    if (this.element.innerHTML !== value.html) {
      this.element.innerHTML = value.html;
    }
  }

  @HostListener("input")
  onInput() {
    if (this.element.innerHTML !== this.model) {
      this.modelChange.emit(this.model)
    }
  }

  @HostListener("click", ["$event"])
  onClLick(event : Event) {
    this.clickChange.emit(event)
  }

}
