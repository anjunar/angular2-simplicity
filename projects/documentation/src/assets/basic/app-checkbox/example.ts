import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: 'app-checkbox.component.html',
  styleUrls: ['app-checkbox.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppCheckboxComponent {

  checked = true

}
