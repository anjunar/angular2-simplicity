import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

export interface AsImageModel {
  data: string,
  name: string
}

@Component({
  selector: 'as-image-upload',
  templateUrl: 'as-image-upload.component.html',
  styleUrls: ['as-image-upload.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsImageUploadComponent),
      multi: true
    }
  ]
})
export class AsImageUploadComponent implements ControlValueAccessor {

  @ViewChild("input") inputRef!: ElementRef<HTMLInputElement>

  @Output() ngModelChange = new EventEmitter<AsImageModel>();

  @Input() name! : string

  model!: AsImageModel

  @Input() placeholder = ""
  disabled = false;

  @Input()
  get ngModel() {
    return this.model;
  }

  set ngModel(value: AsImageModel) {
    this.model = value;
    if (this.onChange) {
      this.onChange(value);
    }
  }

  onChange!: (value: any) => void

  get input() {
    return this.inputRef.nativeElement;
  }

  onAreaClick() {
    if (!this.disabled) {
      this.input.click()
    }
  }

  onLoad(event: Event) {
    let input = <HTMLInputElement>event.target;
    let files = input.files;
    if (files) {
      let file = files[0];

      let reader = new FileReader();

      reader.addEventListener("load", (event) => {
        if (event.target) {
          if (event.target.result) {
            this.model = {
              data: <string>event.target.result,
              name: file.name
            }
            this.onChange(this.model);
            this.ngModelChange.emit(this.model);
          }
        }
      })

      reader.readAsDataURL(file);

    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: any): void {
    if (value) {
      this.model = value;
    }
  }


}
