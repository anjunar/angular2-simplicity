import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppView} from "../../app.classes";

@Component({
  selector: 'app-home',
  templateUrl: 'app-home.component.html',
  styleUrls: ['app-home.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppHomeComponent extends AppView {

  html! : string

  constructor(private activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

}
