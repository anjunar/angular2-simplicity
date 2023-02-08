import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppView} from "../../app.classes";

@Component({
  selector: 'app-radio',
  templateUrl: 'app-radio.component.html',
  styleUrls: ['app-radio.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppRadioComponent extends AppView {

  html! : string;
  typescript! : string

  gender : string = "male"

  constructor(private activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }


}
