import {Component, ViewEncapsulation} from '@angular/core';
import {AsVideoUploadModel} from "angular2-simplicity";

@Component({
  selector: 'app-video-upload',
  templateUrl: 'app-video-upload.component.html',
  styleUrls: ['app-video-upload.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppVideoUploadComponent {

  video! : AsVideoUploadModel | null

}
