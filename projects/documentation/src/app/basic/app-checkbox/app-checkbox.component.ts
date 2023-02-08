import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppView} from "../../app.classes";

@Component({
  selector: 'app-checkbox',
  templateUrl: 'app-checkbox.component.html',
  styleUrls: ['app-checkbox.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppCheckboxComponent extends AppView {

  html! : string
  typescript! : string

  checked = true

  constructor(private activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }


}
