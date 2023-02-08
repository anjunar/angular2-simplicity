import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import {AsInputService} from "../as-input.service";
import {AsErrorDirective} from "./as-error/as-error.directive";

@Component({
  selector: 'as-input-container',
  templateUrl: 'as-input-container.component.html',
  styleUrls: ['as-input-container.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AsInputContainerComponent implements AfterContentInit {

  @Input() placeholder!: string
  @ContentChild(AsInputService) service!: AsInputService
  @ContentChildren(AsErrorDirective) errors!: QueryList<AsErrorDirective>

  get hasFocus() {
    return this.service.isActive;
  }

  get hasErrors() {
    return this.service.hasErrors
  }

  get inputEmpty() {
    return this.service.isEmpty
  }

  ngAfterContentInit(): void {
    this.service.placeholder = this.placeholder

    for (const error of this.errors) {
      error.element.style.display = "none"
    }


    if (this.service.valueChanges) {
      this.service.valueChanges.forEach(() => {
        let errors = this.service.errors;
        if (errors) {
          let errorNames = Object.keys(errors);
          for (const errorName of errorNames) {
            this.errors.forEach((error) => {
              if (error.name === errorName) {
                error.element.style.display = "inline"
                if (errors) {
                  let object = errors[errorName];
                  error.options(object)
                }
              } else {
                error.element.style.display = "none"
              }
            })
          }
        } else {
          this.errors.forEach((error) => {
            error.element.style.display = "none"
          })
        }
      })
    }

  }

}
