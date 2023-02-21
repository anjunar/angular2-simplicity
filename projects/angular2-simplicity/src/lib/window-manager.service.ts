import {ComponentRef, EventEmitter, Injectable, Type} from '@angular/core';

export interface Window {

  afterViewInitChange : EventEmitter<void>
  resizable: boolean;
  draggable: boolean;

  get zIndex(): number;

  set zIndex(value : number);

  readonly element : HTMLElement;

}

export interface WindowOptions {

  header : string
  width? : number
  height? : number
  top? : number
  left? : number
  right? : number
  bottom? : number
  dialog? : boolean,
  draggable? : boolean
  resizeable? : boolean
  hasHeader? : boolean
  hasFooter? : boolean
}

interface Maximized {
  left : number,
  top : number,
  width : number,
  height : number

}

export interface WindowRef<W> {
  window : Window,

  instance : W

}

const windowsRegistry: ComponentRef<Window>[] = [];
const maximizedRegistry : Map<ComponentRef<Window>, Maximized> = new Map()
const optionsRegistry : Map<ComponentRef<Window>, WindowOptions> = new Map()
const componentRegistry : Map<ComponentRef<Window>, ComponentRef<any>> = new Map()
function zIndexSorted() {
  return Array.from(windowsRegistry).sort((lhs, rhs) => lhs.instance.zIndex - rhs.instance.zIndex);
}



@Injectable({
  providedIn: 'root'
})
export class WindowManagerService {

  create!: <E>(window: Type<E>, options : WindowOptions) => WindowRef<E>

  delete!: (window: ComponentRef<Window>, component : ComponentRef<any>) => void;

  get windows() {
    return windowsRegistry;
  }

  get options() {
    return optionsRegistry;
  }

  register(window : ComponentRef<Window>, options : WindowOptions, component : ComponentRef<any>) {
    windowsRegistry.push(window);
    optionsRegistry.set(window, options);
    componentRegistry.set(window, component)
  }

  minimize(window: Window) {
    let componentRef = windowsRegistry.find((componentRef) => componentRef.instance === window);
    if (componentRef) {
      componentRef.location.nativeElement.style.display = "none"
    }
  }

  maximize(window: Window) {
    let componentRef = windowsRegistry.find((componentRef) => componentRef.instance === window);

    if (componentRef) {
      let element = componentRef.location.nativeElement;

      let maximized = maximizedRegistry.get(componentRef);
      if (maximized) {
        element.style.left = maximized.left
        element.style.top = maximized.top;
        element.style.width = maximized.width;
        element.style.height = maximized.height;

        maximizedRegistry.delete(componentRef);
      } else {
        let maximized = {
          left: element.style.left,
          top: element.style.top,
          width: element.style.width,
          height: element.style.height
        }

        maximizedRegistry.set(componentRef, maximized);

        element.style.left = "0";
        element.style.top = "0";
        element.style.width = element.parentElement.offsetWidth + "px";
        element.style.height = element.parentElement.offsetHeight + "px"
      }
    }
  }

  clickWindow(window: Window) {
    let sort = Array.from(zIndexSorted());

    let componentRef = sort.find((componentRef) => componentRef.instance === window);
    if (componentRef) {
      let indexOf = sort.indexOf(componentRef);
      sort.splice(indexOf, 1);

      sort.push(componentRef);

      for (let i = 0; i < sort.length; i++) {
        const sortElement = sort[i];
        sortElement.instance.zIndex = (i + 1) * 10;
      }
    }
  }

  clickTask(componentRef : ComponentRef<Window>) {
    let style = componentRef.location.nativeElement.style;

    if (this.isTopWindow(componentRef.instance)) {
      if (style.display === "none") {
        style.display = "block"
        this.clickWindow(componentRef.instance)
      } else {
        style.display = "none"
      }
    } else {
      this.clickWindow(componentRef.instance)
    }
  }

  close(window: Window) {
    let indexOf = windowsRegistry.findIndex((componentRef) => componentRef.instance === window);
    let windowRef = windowsRegistry[indexOf];
    let componentRef = componentRegistry.get(windowRef)
    windowsRegistry.splice(indexOf, 1);
    if (componentRef) {
      this.delete(windowRef, componentRef);
    }
  }

  isTopWindow(window : Window) {
    let sorted = zIndexSorted();
    let componentRef = sorted[sorted.length - 1];
    if (componentRef) {
      return componentRef.instance === window;
    }
    return false;
  }

}
