import {Component, HostListener, ViewEncapsulation} from '@angular/core';
import {ContextManagerService} from "../context-manager.service";

@Component({
  selector: 'as-context',
  templateUrl: 'as-context.component.html',
  styleUrls: ['as-context.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AsContextComponent {

  constructor(private contextManager : ContextManagerService) {}

  @HostListener("click", ["$event"])
  onClickHost(event : Event) {
    event.stopPropagation();
    event.preventDefault();
    return false;
  }

  @HostListener("window:click")
  onClickWindow() {
    this.contextManager.close(this);
  }

}
