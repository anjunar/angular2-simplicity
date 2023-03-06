import {Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AppView, AsVideoUploadModel} from "angular2-simplicity";

@Component({
  selector: 'app-video-upload',
  templateUrl: 'app-video-upload.component.html',
  styleUrls: ['app-video-upload.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppVideoUploadComponent extends AppView {

  html! : string;
  typescript! : string

  video! : AsVideoUploadModel | null

  constructor(private activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

}
