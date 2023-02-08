import {Component, ViewEncapsulation} from '@angular/core';
import {WindowManagerService} from "angular2-simplicity";
import {AppDialogExampleComponent} from "./app-dialog-example/app-dialog-example.component";

@Component({
  selector: 'app-dialog',
  templateUrl: 'app-dialog.component.html',
  styleUrls: ['app-dialog.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppDialogComponent {

  constructor(private windowManager : WindowManagerService) {}

  onClick() {
    this.windowManager.create(AppDialogExampleComponent, {header : "Header", width : 640, height : 480, dialog : true})
  }

}
