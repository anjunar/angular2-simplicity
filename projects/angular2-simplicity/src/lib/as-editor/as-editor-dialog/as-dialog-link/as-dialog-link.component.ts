import {Component, EventEmitter, ViewEncapsulation} from '@angular/core';
import {AsWindowComponent} from "../../../as-window/as-window.component";

@Component({
  selector: 'as-dialog-link',
  templateUrl: 'as-dialog-link.component.html',
  styleUrls: ['as-dialog-link.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AsDialogLinkComponent {

  link! : string

  onOk = new EventEmitter<string>();
  onCancel = new EventEmitter<void>();

  constructor(private window : AsWindowComponent) {}

  onOkClick() {
    this.window.close();
    this.onOk.emit(this.link)
  }


  onCancelClick() {
    this.window.close();
    this.onCancel.emit();
  }

}
