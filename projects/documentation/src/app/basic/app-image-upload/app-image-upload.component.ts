import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppView, AsImageModel} from "angular2-simplicity";

@Component({
  selector: 'app-image-upload',
  templateUrl: 'app-image-upload.component.html',
  styleUrls: ['app-image-upload.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppImageUploadComponent extends AppView {

  html! : string
  typescript! : string

  image : AsImageModel = {
    data : "",
    name : "",
    width : 0,
    height : 0
  }

  constructor(private activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

}
