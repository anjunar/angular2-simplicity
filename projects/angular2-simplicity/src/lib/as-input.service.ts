import { Injectable } from '@angular/core';
import {NgControl} from "@angular/forms";

export interface InputElement {

  get getPlaceholder() : string;

  set setPlaceholder(value : string);

}

@Injectable()
export class AsInputService {

  input! : InputElement
  element! : HTMLElement
  ngControl!: NgControl


  get valueChanges() {
    return this.ngControl.valueChanges
  }

  get errors() {
    return this.ngControl.errors;
  }
  get hasErrors() {
    if (this.ngControl.touched) {
      let errors = this.ngControl.errors;
      if (errors) {
        return Object.keys(errors).length > 0
      }
      return false;
    }
    return false;
  }

  get isActive() {
    return document.activeElement === this.element;
  }

  get isEmpty() {
    return ! this.ngControl.value
  }

  get placeholder() {
    return this.input.getPlaceholder;
  }

  set placeholder(value : string) {
    this.input.setPlaceholder = value;
  }

}
