import {Component, ViewEncapsulation} from '@angular/core';
import {WindowManagerService} from "angular2-simplicity";
import {AppDialogExampleComponent} from "./app-dialog-example/app-dialog-example.component";
import {ActivatedRoute} from "@angular/router";
import {AppView} from "angular2-simplicity";

@Component({
  selector: 'app-dialog',
  templateUrl: 'app-dialog.component.html',
  styleUrls: ['app-dialog.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppDialogComponent extends AppView {

  html1! : string;
  html2! : string;

  typescript1! : string;
  typescript2! : string;

  page = 0;

  constructor(private activatedRoute: ActivatedRoute, private windowManager : WindowManagerService) {
    super(activatedRoute);
  }


  onClick() {
    this.windowManager.create(AppDialogExampleComponent, {header : "Header", width : 640, height : 480, dialog : true})
  }

}
