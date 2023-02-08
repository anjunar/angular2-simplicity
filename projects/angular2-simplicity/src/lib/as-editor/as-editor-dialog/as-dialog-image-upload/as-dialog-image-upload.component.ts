import {Component, EventEmitter, ViewEncapsulation} from '@angular/core';
import {AsImageModel} from "../../../as-image-upload/as-image-upload.component";
import {AsWindowComponent} from "../../../as-window/as-window.component";

@Component({
  selector: 'as-dialog-image-upload',
  templateUrl: 'as-dialog-image-upload.component.html',
  styleUrls: ['as-dialog-image-upload.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AsDialogImageUploadComponent {

  image! : AsImageModel

  onOk = new EventEmitter<AsImageModel>();

  constructor(private window : AsWindowComponent) {}

  onOkClick() {
    this.onOk.emit(this.image)
    this.window.close();
  }

  onCancelClick() {
    this.window.close();
  }

}
