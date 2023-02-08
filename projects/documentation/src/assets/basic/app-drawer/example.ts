import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-drawer',
  templateUrl: 'app-drawer.component.html',
  styleUrls: ['app-drawer.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppDrawerComponent {

  open : boolean = true

}
