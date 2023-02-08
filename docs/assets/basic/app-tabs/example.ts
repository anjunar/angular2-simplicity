import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'app-tabs.component.html',
  styleUrls: ['app-tabs.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppTabsComponent {

  page = 0;

}
