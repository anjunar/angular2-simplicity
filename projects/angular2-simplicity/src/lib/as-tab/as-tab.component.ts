import {Component, EventEmitter, HostListener, inject, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AsTabsComponent} from "../as-tabs/as-tabs.component";

@Component({
  selector: 'as-tab',
  templateUrl: 'as-tab.component.html',
  styleUrls: ['as-tab.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AsTabComponent {

  horizontal = true;

  @Input() small = false;
  selected = false

  click: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener("click")
  onClick() {
    this.selected = !this.selected
    this.click.emit(this.selected);
  }

}
