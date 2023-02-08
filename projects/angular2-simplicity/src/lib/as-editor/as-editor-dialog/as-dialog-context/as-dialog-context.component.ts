import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'as-dialog-context',
  templateUrl: 'as-dialog-context.component.html',
  styleUrls: ['as-dialog-context.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AsDialogContextComponent {

  path : HTMLElement[] = [];

  page = 0;

}
