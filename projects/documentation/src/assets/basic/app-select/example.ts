import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: 'app-select.component.html',
  styleUrls: ['app-select.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppSelectComponent {

  car : string = "bmw"

}
