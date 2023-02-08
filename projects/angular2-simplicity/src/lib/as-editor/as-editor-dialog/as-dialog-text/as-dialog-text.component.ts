import {Component, EventEmitter, ViewEncapsulation} from '@angular/core';
import {AsWindowComponent} from "../../../as-window/as-window.component";

@Component({
  selector: 'as-dialog-text',
  templateUrl: 'as-dialog-text.component.html',
  styleUrls: ['as-dialog-text.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AsDialogTextComponent {

  text! : string;

  onOk = new EventEmitter<string>();
  onCancel = new EventEmitter<void>();

  constructor(private window : AsWindowComponent) {}

  onOkClick() {
    this.onOk.emit(this.text)
    this.window.close();
  }

  onCancelClick() {
    this.onCancel.emit();
    this.window.close();
  }

}
