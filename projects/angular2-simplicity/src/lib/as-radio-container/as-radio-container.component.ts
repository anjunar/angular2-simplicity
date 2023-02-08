import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'as-radio-container',
  templateUrl: 'as-radio-container.component.html',
  styleUrls: ['as-radio-container.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AsRadioContainerComponent {

  @Input() placeholder : string = ""

}
