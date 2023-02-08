import {Component, ComponentRef, ViewEncapsulation} from '@angular/core';
import {WindowOptions, Window, WindowManagerService} from "../window-manager.service";

@Component({
  selector: 'as-taskbar',
  templateUrl: 'as-taskbar.component.html',
  styleUrls: ['as-taskbar.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AsTaskbarComponent {

  constructor(private windowManager : WindowManagerService) {}

  get tasks() {
    return this.windowManager.windows;
  }

  option(value : ComponentRef<Window>) : WindowOptions | undefined {
    return this.windowManager.options.get(value);
  }

}
