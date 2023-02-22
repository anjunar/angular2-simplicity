import {AfterViewInit, Component, ElementRef, EventEmitter, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import {Window, WindowManagerService} from "../window-manager.service";
import {AsWindowComponent} from "../as-window/as-window.component";

@Component({
  selector: 'as-dialog',
  templateUrl: 'as-dialog.component.html',
  styleUrls: ['as-dialog.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AsDialogComponent implements Window, AfterViewInit {

  draggable: boolean = false;
  resizable: boolean = false;

  afterViewInitChange = new EventEmitter<void>();

  @ViewChild("window", {read : AsWindowComponent}) window! : AsWindowComponent;

  constructor(private elementRef : ElementRef, private windowManager: WindowManagerService) {}

  ngAfterViewInit(): void {
    this.afterViewInitChange.emit();
  }

  get zIndex(): number {
    return Number.parseInt(this.elementRef.nativeElement.style.zIndex)
  }

  set zIndex(value : number) {
    this.elementRef.nativeElement.style.zIndex = value
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
