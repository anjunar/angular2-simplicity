import {Component, ViewEncapsulation} from '@angular/core';
import {AsEditorModel} from "angular2-simplicity";
import {ActivatedRoute} from "@angular/router";
import {AppView} from "../../app.classes";

@Component({
  selector: 'app-editor',
  templateUrl: 'app-editor.component.html',
  styleUrls: ['app-editor.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppEditorComponent extends AppView {

  html! :string
  typescript! : string

  model : AsEditorModel = {
    html : "test",
    text : "test"
  }

  constructor(private activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

}
