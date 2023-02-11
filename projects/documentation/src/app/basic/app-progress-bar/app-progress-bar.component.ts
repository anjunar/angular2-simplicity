import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppView} from "angular2-simplicity";

@Component({
  selector: 'app-progress-bar',
  templateUrl: 'app-progress-bar.component.html',
  styleUrls: ['app-progress-bar.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppProgressBarComponent extends AppView {

  html! : string
  typescript! : string

  constructor(private activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

}
