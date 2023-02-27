import {Component, ViewEncapsulation} from '@angular/core';
import {AppView} from "angular2-simplicity";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-image-background',
  templateUrl: 'app-image-background.component.html',
  styleUrls: ['app-image-background.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppImageBackgroundComponent extends AppView {

  html! :string
  typescript! : string

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }
}
