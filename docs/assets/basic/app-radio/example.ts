import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-radio',
  templateUrl: 'app-radio.component.html',
  styleUrls: ['app-radio.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppRadioComponent {

  gender : string = "male"

}
