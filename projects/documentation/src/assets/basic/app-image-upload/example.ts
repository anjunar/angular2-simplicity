import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: 'app-image-upload.component.html',
  styleUrls: ['app-image-upload.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppImageUploadComponent {

  image = {
    data : "",
    name : ""
  }

}
