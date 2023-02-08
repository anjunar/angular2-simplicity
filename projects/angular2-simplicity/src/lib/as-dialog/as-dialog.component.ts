import {AfterViewInit, Component, ElementRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {Window, WindowManagerService} from "../window-manager.service";
import {AsWindowComponent} from "../as-window/as-window.component";

@Component({
  selector: 'as-dialog',
  templateUrl: 'as-dialog.component.html',
  styleUrls: ['as-dialog.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AsDialogComponent implements Window {

  @ViewChild("window", {read : AsWindowComponent}) window! : AsWindowComponent;

  constructor(private elementRef : ElementRef, private windowManager: WindowManagerService) {}

  get zIndex(): number {
    return Number.parseInt(this.elementRef.nativeElement.style.zIndex)
  }

  get modal() {
    return this;
  }

  get element() {
    return this.window.element;
  }

  close() {
    this.windowManager.close(this);
  }

}
