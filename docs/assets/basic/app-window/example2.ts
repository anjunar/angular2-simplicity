import {Component, ViewEncapsulation} from '@angular/core';
import {AsWindowComponent} from "angular2-simplicity";

@Component({
  selector: 'app-example',
  templateUrl: 'app-example.component.html',
  styleUrls: ['app-example.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppExampleComponent {

  text : string = "Test"

  constructor(private window : AsWindowComponent) {}

  onOk() {
    this.window.close()
  }

}
