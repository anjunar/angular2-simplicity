import {Component, ElementRef, ViewEncapsulation} from '@angular/core';
import {WindowManagerService} from "angular2-simplicity";
import {AppExampleComponent} from "./app-example/app-example.component";
import {ActivatedRoute} from "@angular/router";
import {WindowRef} from "angular2-simplicity";
import {AppView} from "angular2-simplicity";
import {Window, WindowOptions} from "../../../../../angular2-simplicity/src/lib/window-manager.service";

@Component({
  selector: 'app-window',
  templateUrl: 'app-window.component.html',
  styleUrls: ['app-window.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppWindowComponent extends AppView {

  page = 0;

  html! : string
  typescript! : string

  html2! : string
  typescript2! : string

  constructor(private windowManager: WindowManagerService, private activatedRoute: ActivatedRoute, private elementRef : ElementRef) {
    super(activatedRoute);
  }


  onClick(event : Event) {
    event.stopPropagation();

    let clientRect = this.elementRef.nativeElement.getBoundingClientRect();

    let options = {
      header : "Example",
      centerFn : (window : Window) => {
        return {
          top : `calc(50% - ${window.element.offsetHeight / 2}px)`,
          left : `calc(50% - ${window.element.offsetWidth / 2}px + ${clientRect.left / 2}px)`
        }
      }
    };
    let windowRef : WindowRef<AppExampleComponent> = this.windowManager.create(AppExampleComponent, options);
    windowRef.instance.text = "Hello World!"
  }

  onClick2(event : Event) {
    event.stopPropagation();

    let options : WindowOptions = {
      header : "Example",
      top : "80px",
      right : "40px",
      resizeable : false,
      draggable : false
    };
    let windowRef : WindowRef<AppExampleComponent> = this.windowManager.create(AppExampleComponent, options);
    windowRef.instance.text = "Hello World!"
  }

}
