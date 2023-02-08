import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppView} from "../../app.classes";

@Component({
  selector: 'app-input',
  templateUrl: 'app-input.component.html',
  styleUrls: ['app-input.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppInputComponent extends AppView {

  html1! : string;
  html2! : string;
  typescript! : string

  test = "Hello World!"

  constructor(private activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }


}
