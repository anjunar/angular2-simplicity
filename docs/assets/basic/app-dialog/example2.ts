import {Component, ViewEncapsulation} from '@angular/core';
import {AsDialogComponent} from "angular2-simplicity";

@Component({
  selector: 'app-dialog-example',
  templateUrl: 'app-dialog-example.component.html',
  styleUrls: ['app-dialog-example.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppDialogExampleComponent {

  constructor(private dialog : AsDialogComponent) {}

  onClick() {
    this.dialog.close();
  }

}
