import {Component, ViewEncapsulation} from '@angular/core';
import {AppView} from "../../app.classes";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-meta-form',
  templateUrl: 'app-meta-form.component.html',
  styleUrls: ['app-meta-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppMetaFormComponent extends AppView {

  html! : string;
  typescript! : string
  json! : string

  model!: any;

  constructor(private activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  onChange(event : any) {
    alert(JSON.stringify(event.model.form, null, 4))
  }

}
