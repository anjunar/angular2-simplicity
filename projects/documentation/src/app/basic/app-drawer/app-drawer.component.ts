import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppView} from "angular2-simplicity";

@Component({
  selector: 'app-drawer',
  templateUrl: 'app-drawer.component.html',
  styleUrls: ['app-drawer.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppDrawerComponent extends AppView {

  open : boolean = true

  html! :string
  typescript! : string

  constructor(private activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }


}
