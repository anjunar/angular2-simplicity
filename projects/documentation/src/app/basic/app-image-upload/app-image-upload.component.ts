import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppView} from "angular2-simplicity";

@Component({
  selector: 'app-image-upload',
  templateUrl: 'app-image-upload.component.html',
  styleUrls: ['app-image-upload.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppImageUploadComponent extends AppView {

  html! : string
  typescript! : string

  image = {
    data : "",
    name : ""
  }

  constructor(private activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

}
