import {Component, ViewEncapsulation} from '@angular/core';
import {WindowManagerService} from "angular2-simplicity";
import {AppExampleComponent} from "./app-example/app-example.component";

@Component({
  selector: 'app-window',
  templateUrl: 'app-window.component.html',
  styleUrls: ['app-window.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppWindowComponent {

  constructor(private windowManager: WindowManagerService) {}

  onClick() {
    let instance : AppExampleComponent = this.windowManager.create(AppExampleComponent, {header : "Example"});
    instance.text = "Hello World!"
  }

}
