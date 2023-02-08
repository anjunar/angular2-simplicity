import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'as-checkbox-container',
  templateUrl: 'as-checkbox-container.component.html',
  styleUrls: ['as-checkbox-container.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AsCheckboxContainerComponent {

  @Input() placeholder = "";

}
