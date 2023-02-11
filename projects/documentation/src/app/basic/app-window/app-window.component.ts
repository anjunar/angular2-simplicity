import {Component, ViewEncapsulation} from '@angular/core';
import {WindowManagerService} from "angular2-simplicity";
import {AppExampleComponent} from "./app-example/app-example.component";
import {ActivatedRoute} from "@angular/router";
import {WindowRef} from "angular2-simplicity";
import {AppView} from "angular2-simplicity";

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

  constructor(private windowManager: WindowManagerService, private activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }


  onClick() {
    let windowRef : WindowRef<AppExampleComponent> = this.windowManager.create(AppExampleComponent, {header : "Example"});
    windowRef.instance.text = "Hello World!"
  }

}
