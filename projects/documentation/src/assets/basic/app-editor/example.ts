import {Component, ViewEncapsulation} from '@angular/core';
import {AsEditorModel} from "angular2-simplicity";

@Component({
  selector: 'app-editor',
  templateUrl: 'app-editor.component.html',
  styleUrls: ['app-editor.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppEditorComponent {

  model : AsEditorModel = {
    html : "test",
    text : "test"
  }

}
