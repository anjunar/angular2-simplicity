import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
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
    this.window.element.addEventListener("click", (event : Event) => {
      event.stopPropagation()
    })
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

  @HostListener("document:click")
  onDocumentClick() {
    this.windowManager.close(this);
  }

  close() {
    this.windowManager.close(this);
  }

}
