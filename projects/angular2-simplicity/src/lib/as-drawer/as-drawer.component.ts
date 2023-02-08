import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'as-drawer',
  templateUrl: 'as-drawer.component.html',
  styleUrls: ['as-drawer.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AsDrawerComponent {

  @Input() open = false;

}
