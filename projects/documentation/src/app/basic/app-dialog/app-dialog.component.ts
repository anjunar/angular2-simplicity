import {Component, ElementRef, ViewEncapsulation} from '@angular/core';
import {WindowManagerService} from "angular2-simplicity";
import {AppDialogExampleComponent} from "./app-dialog-example/app-dialog-example.component";
import {ActivatedRoute} from "@angular/router";
import {AppView} from "angular2-simplicity";
import {AsDrawerComponent} from "../../../../../angular2-simplicity/src/lib/as-drawer/as-drawer.component";
import {Window} from "../../../../../angular2-simplicity/src/lib/window-manager.service";
import {AppComponent} from "../../app.component";

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

  constructor(private activatedRoute: ActivatedRoute, private windowManager : WindowManagerService, private elementRef : ElementRef) {
    super(activatedRoute);
  }

  onClick(event : Event) {
    event.stopPropagation();

    let clientRect = this.elementRef.nativeElement.getBoundingClientRect();

    let options = {
      header : "Header",
      width : 320,
      height : 200,
      dialog : true,
      centerFn : (window : Window) => {
        return {
          top : `calc(50% - ${window.element.offsetHeight / 2}px)`,
          left : `calc(50% - ${window.element.offsetWidth / 2}px + ${clientRect.left / 2}px)`
        }
      }
    };

    this.windowManager.create(AppDialogExampleComponent, options)
  }

}
