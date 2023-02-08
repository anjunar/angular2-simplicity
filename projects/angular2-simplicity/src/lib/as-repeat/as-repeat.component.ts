import {
  Component,
  ContentChild,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'as-repeat',
  templateUrl: 'as-repeat.component.html',
  styleUrls: ['as-repeat.component.css'],
  encapsulation : ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsRepeatComponent),
      multi: true
    }
  ]
})
export class AsRepeatComponent implements ControlValueAccessor {

  @Input() ngModel : any[] = []
  @Output() ngModelChange = new EventEmitter<any[]>();

  @Input() factory : () => any = () => {}

  disabled : boolean = false;

  onChange!: (_: any) => {}

  @ContentChild(TemplateRef) templateRef! : TemplateRef<any>

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {}

  addItem() {
    let newItem = this.factory();
    this.ngModel.push(newItem);
    this.ngModelChange.emit(this.ngModel);
    this.onChange(this.ngModel);
  }

  removeItem(index : number) {
    this.ngModel.splice(index, 1);
    this.ngModelChange.emit(this.ngModel);
    this.onChange(this.ngModel);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    if (obj) {
      this.ngModel = obj;
    }
  }



}
