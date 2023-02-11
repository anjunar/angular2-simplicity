import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppView} from "angular2-simplicity";

@Component({
  selector: 'app-select',
  templateUrl: 'app-select.component.html',
  styleUrls: ['app-select.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppSelectComponent extends AppView {

  html! : string
  typescript! : string
  car : string = "bmw"

  constructor(private activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

}
