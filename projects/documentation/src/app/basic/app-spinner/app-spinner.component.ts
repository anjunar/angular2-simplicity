import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppView} from "angular2-simplicity";

@Component({
  selector: 'app-spinner',
  templateUrl: 'app-spinner.component.html',
  styleUrls: ['app-spinner.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppSpinnerComponent extends AppView {

  html! : string
  typescript! : string

  constructor(private activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

}
