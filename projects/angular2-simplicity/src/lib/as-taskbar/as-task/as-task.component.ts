import {Component, ComponentRef, Input, ViewEncapsulation} from '@angular/core';
import {WindowOptions, Window, WindowManagerService} from "../../window-manager.service";

@Component({
  selector: 'as-task',
  templateUrl: './as-task.component.html',
  styleUrls: ['./as-task.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AsTaskComponent {

  constructor(private windowManager : WindowManagerService) {}

  @Input() task! : ComponentRef<Window>

  @Input() options! : WindowOptions | undefined

  onClick() {
    this.windowManager.clickTask(this.task)
  }

  isTopWindow() {
    return this.windowManager.isTopWindow(this.task.instance);
  }


}
