import {Component, EventEmitter, HostListener, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'as-tab',
  templateUrl: 'as-tab.component.html',
  styleUrls: ['as-tab.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AsTabComponent {

  selected = false

  click : EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener("click")
  onClick() {
    this.selected = ! this.selected
    this.click.emit(this.selected);
  }

}
