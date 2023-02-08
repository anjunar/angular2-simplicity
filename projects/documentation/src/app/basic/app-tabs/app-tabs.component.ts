import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppView} from "../../app.classes";

@Component({
  selector: 'app-tabs',
  templateUrl: 'app-tabs.component.html',
  styleUrls: ['app-tabs.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppTabsComponent extends AppView {

  html! : string;
  typescript! : string

  page = 0;

  constructor(private activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

}
