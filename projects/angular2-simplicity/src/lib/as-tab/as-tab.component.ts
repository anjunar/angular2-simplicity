import {Component, EventEmitter, HostListener, Output, ViewEncapsulation, Input} from '@angular/core';
import {AsTabsComponent} from "../as-tabs/as-tabs.component";

@Component({
  selector: 'as-tab',
  templateUrl: 'as-tab.component.html',
  styleUrls: ['as-tab.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AsTabComponent {

  @Input() small = false;
  selected = false

  click : EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener("click")
  onClick() {
    this.selected = ! this.selected
    this.click.emit(this.selected);
  }

}
