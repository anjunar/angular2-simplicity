import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input, OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {Window, WindowManagerService} from "../window-manager.service";
import {AsScrollAreaComponent} from "../as-scroll-area/as-scroll-area.component";

@Component({
  selector: 'as-window',
  templateUrl: 'as-window.component.html',
  styleUrls: ['as-window.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AsWindowComponent implements Window, OnInit, OnDestroy, AfterViewInit {

  @Input() modal!: Window

  @Input() resizable = true;
  @Input() draggable = true;
  maximized = false;
  minimized = false;
  @ViewChild(AsScrollAreaComponent) asScrollArea!: AsScrollAreaComponent

  @ViewChild("header") header! : ElementRef<HTMLDivElement>;
  @ViewChild("footer") footer! : ElementRef<HTMLDivElement>;

  destroy = new EventEmitter<any>();

  afterViewInitChange = new EventEmitter<void>();

  windowEndResize: EventEmitter<void> = new EventEmitter<void>();
  windowDrag: EventEmitter<void> = new EventEmitter<void>();
  windowEndDrag: EventEmitter<void> = new EventEmitter<void>();
  windowStartDrag: EventEmitter<void> = new EventEmitter<void>();
  windowResize: EventEmitter<void> = new EventEmitter<void>();
  windowStartResize: EventEmitter<void> = new EventEmitter<void>();

  constructor(private windowManager: WindowManagerService, private elementRef: ElementRef) {}

  count(element : HTMLElement) {
    let count = 0;
    let iterator = document.createNodeIterator(element, NodeFilter.SHOW_ELEMENT);
    let node : HTMLElement | null = iterator.nextNode() as HTMLElement;
    while (node !== null) {
      node = iterator.nextNode() as HTMLElement;
      if (node && ! (node.hasAttribute("header") || node.hasAttribute("footer"))) {
        count++
      }
    }
    return count;
  }

  get element() {
    return this.elementRef.nativeElement;
  }

  minimize() {
    this.windowManager.minimize(this.modal || this);
  }

  maximize() {
    this.windowManager.maximize(this.modal || this);
  }

  close() {
    this.windowManager.close(this.modal || this);
  }

  isTopWindow() {
    return this.windowManager.isTopWindow(this.modal || this);
  }

  @HostListener("click")
  onClick() {
    this.windowManager.clickWindow(this.modal || this);
  }

  ngAfterViewInit(): void {
    this.afterViewInitChange.emit();
  }

  get zIndex(): number {
    return Number.parseInt(getComputedStyle(this.element).zIndex)
  }

  set zIndex(value: number) {
    this.element.style.zIndex = value;
  }

  dragElementMouseDown(event: MouseEvent) {
    let element = this.element;
    let deltaX = 0, deltaY = 0, pointerX = 0, pointerY = 0;

    let elementDrag = (e: MouseEvent) => {
      e.preventDefault();
      deltaX = pointerX - e.clientX;
      deltaY = pointerY - e.clientY;
      pointerX = e.clientX;
      pointerY = e.clientY;
      let top = element.offsetTop - deltaY;
      if (top < 0) {
        top = 0;
      }
      let left = element.offsetLeft - deltaX;
      element.style.top = top + "px";
      element.style.left = left + "px";
      this.windowDrag.emit();
    }

    let closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
      this.windowEndDrag.emit();
    }

    if (!this.maximized && this.draggable) {
      event.preventDefault();
      pointerX = event.clientX;
      pointerY = event.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
      this.windowStartDrag.emit();
    }
  }

  nResizeTopMouseDown(event: MouseEvent) {
    let element = this.element;
    let delta = element.offsetTop, pointer = element.offsetTop;

    let elementDrag = (event: MouseEvent) => {
      event.preventDefault();
      delta = pointer - event.clientY;
      pointer = event.clientY;
      element.style.height = ((element.offsetHeight - 2) + delta) + "px";
      element.style.top = (element.offsetTop - delta) + "px";
      this.windowResize.emit();
    }

    let closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
      this.windowEndResize.emit();
    }

    if (this.resizable && !this.maximized) {
      event.preventDefault();
      pointer = event.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
      this.windowStartResize.emit();
    }
  }

  seResizeMouseDown(event: MouseEvent) {
    let element = this.element;
    let deltaY = element.offsetTop, pointerY = element.offsetTop;
    let deltaX = element.offsetLeft, pointerX = element.offsetLeft;

    let elementDrag = (event: MouseEvent) => {
      event.preventDefault();
      deltaY = pointerY - event.clientY;
      pointerY = event.clientY;
      element.style.height = ((element.offsetHeight - 2) + deltaY) + "px";
      element.style.top = (element.offsetTop - deltaY) + "px";

      deltaX = pointerX - event.clientX;
      pointerX = event.clientX;
      element.style.width = ((element.offsetWidth - 2) + deltaX) + "px";
      element.style.left = (element.offsetLeft - deltaX) + "px";
      this.windowResize.emit();
    }

    let closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
      this.windowEndResize.emit();
    }

    if (this.resizable && !this.maximized) {
      event.preventDefault();
      pointerY = event.clientY;
      pointerX = event.clientX;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
      this.windowStartResize.emit();
    }
  }

  eResizeLeftMouseDown(event: MouseEvent) {
    let element = this.element;
    let delta = element.offsetLeft, pointer = element.offsetLeft;

    let elementDrag = (event: MouseEvent) => {
      event.preventDefault();
      delta = pointer - event.clientX;
      pointer = event.clientX;
      element.style.width = ((element.offsetWidth - 2) + delta) + "px";
      element.style.left = (element.offsetLeft - delta) + "px";
      this.windowResize.emit();
    }

    let closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
      this.windowEndResize.emit();
    }

    if (this.resizable && !this.maximized) {
      event.preventDefault();
      pointer = event.clientX;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
      this.windowStartResize.emit()
    }
  }

  neResizeMouseDown(event: MouseEvent) {
    let element = this.element;
    let deltaY = element.offsetTop, pointerY = element.offsetTop;
    let deltaX = element.offsetLeft, pointerX = element.offsetLeft;

    let elementDrag = (event: MouseEvent) => {
      event.preventDefault();
      deltaY = pointerY - event.clientY;
      pointerY = event.clientY;
      element.style.height = ((element.offsetHeight - 2) - deltaY) + "px";
      element.style.bottom = ((element.offsetTop + (element.offsetHeight - 2)) - deltaY) + "px";

      deltaX = pointerX - event.clientX;
      pointerX = event.clientX;
      element.style.width = ((element.offsetWidth - 2) + deltaX) + "px";
      element.style.left = (element.offsetLeft - deltaX) + "px";
      this.windowResize.emit();
    }

    let closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
      this.windowEndResize.emit();
    }

    if (this.resizable && !this.maximized) {
      event.preventDefault();
      pointerY = event.clientY;
      pointerX = event.clientX;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
      this.windowStartResize.emit();
    }
  }

  swResizeMouseDown(event: MouseEvent) {
    let element = this.element;
    let deltaY = element.offsetTop, pointerY = element.offsetTop;
    let deltaX = element.offsetLeft, pointerX = element.offsetLeft;

    let elementDrag = (event: MouseEvent) => {
      event.preventDefault();
      deltaY = pointerY - event.clientY;
      pointerY = event.clientY;
      element.style.height = ((element.offsetHeight - 2) + deltaY) + "px";
      element.style.top = (element.offsetTop - deltaY) + "px";

      deltaX = pointerX - event.clientX;
      pointerX = event.clientX;
      element.style.width = ((element.offsetWidth - 2) - deltaX) + "px";
      element.style.right = ((element.offsetLeft + (element.offsetWidth - 2)) - deltaX) + "px";
      this.windowResize.emit();
    }

    let closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
      this.windowEndResize.emit();
    }

    if (this.resizable && !this.maximized) {
      event.preventDefault();
      pointerY = event.clientY;
      pointerX = event.clientX;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
      this.windowStartResize.emit();
    }
  }

  eResizeRightMouseDown(event: MouseEvent) {
    let element = this.element;
    let delta = element.offsetLeft, pointer = element.offsetLeft;

    let elementDrag = (event: MouseEvent) => {
      event.preventDefault();
      delta = pointer - event.clientX;
      pointer = event.clientX;
      element.style.width = ((element.offsetWidth - 2) - delta) + "px";
      element.style.right = ((element.offsetLeft + (element.offsetWidth - 2)) - delta) + "px";
      this.windowResize.emit();
    }

    let closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
      this.windowEndResize.emit();
    }

    if (this.resizable && !this.maximized) {
      event.preventDefault();
      pointer = event.clientX;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
      this.windowStartResize.emit();
    }
  }

  nwResizeMouseDown(event: MouseEvent) {
    let element = this.element;
    let deltaY = element.offsetTop, pointerY = element.offsetTop;
    let deltaX = element.offsetLeft, pointerX = element.offsetLeft;

    let elementDrag = (event: MouseEvent) => {
      event.preventDefault();
      deltaY = pointerY - event.clientY;
      pointerY = event.clientY;
      element.style.height = ((element.offsetHeight - 2) - deltaY) + "px";
      element.style.bottom = ((element.offsetTop + (element.offsetHeight - 2)) - deltaY) + "px";

      deltaX = pointerX - event.clientX;
      pointerX = event.clientX;
      element.style.width = ((element.offsetWidth - 2) - deltaX) + "px";
      element.style.right = ((element.offsetLeft + (element.offsetWidth - 2)) - deltaX) + "px";
      this.windowResize.emit();
    }

    let closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
      this.windowEndResize.emit();
    }

    if (this.resizable && !this.maximized) {
      event.preventDefault();
      pointerY = event.clientY;
      pointerX = event.clientX;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
      this.windowStartResize.emit();
    }
  }

  nResizeBottomMouseDown(event: MouseEvent) {
    let element = this.element;
    let delta = element.offsetTop, pointer = element.offsetTop;

    let elementDrag = (event: MouseEvent) => {
      event.preventDefault();
      delta = pointer - event.clientY;
      pointer = event.clientY;
      element.style.height = ((element.offsetHeight - 2) - delta) + "px";
      element.style.bottom = ((element.offsetTop + (element.offsetHeight - 2)) - delta) + "px";
      this.windowResize.emit();
    }

    let closeDragElement = () => {
      document.onmouseup = null;
      document.onmousemove = null;
      this.windowEndResize.emit();
    }

    if (this.resizable && !this.maximized) {
      event.preventDefault();
      pointer = event.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
      this.windowStartResize.emit();
    }
  }

  ngOnInit(): void {
    this.windowEndResize.subscribe(() => {
      this.asScrollArea.checkScrollBars();
    })
  }

  ngOnDestroy(): void {
    this.destroy.emit();
  }

}
