import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: 'app-input.component.html',
  styleUrls: ['app-input.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppInputComponent {

  test = "Hello World!"
}
