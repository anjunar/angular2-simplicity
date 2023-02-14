import {ActivatedRoute} from "@angular/router";
import {ApplicationRef, ComponentFactoryResolver, ComponentRef, createComponent, Injector, Type} from "@angular/core";
import {Window, WindowManagerService, WindowOptions, WindowRef} from "./window-manager.service";
import {ContextManagerService, ContextOptions, ContextRef} from "./context-manager.service";
import {AsViewportComponent} from "./as-viewport/as-viewport.component";
import {AsDialogComponent} from "./as-dialog/as-dialog.component";
import {AsWindowComponent} from "./as-window/as-window.component";
import {AsContextComponent} from "./as-context/as-context.component";

export abstract class AppView {

  protected constructor(activatedRoute: ActivatedRoute) {
    let self: any = this;

    activatedRoute.data.forEach((data) => {
      let assets: any[] = data["assets"];
      if (assets) {
        assets.forEach((asset: any, index) => {
          let property = asset["name"];
          self[property] = data["data"][index];
        })
      }
      let jsons: any[] = data["json"];
      if (jsons) {
        jsons.forEach((json: any, index) => {
          let property = json["name"];
          self[property] = data["data"][index + assets.length];
        })
      }
    })
  }

}

export abstract class AppMain {

  protected constructor(
    public windowManager: WindowManagerService,
    public contextManager: ContextManagerService,
    public injector: Injector,
    public application: ApplicationRef) {
  }

  abstract get viewport(): AsViewportComponent;

  initialize(): void {
    this.windowManager.create = <E>(content: Type<E>, options: WindowOptions): WindowRef<E> => {

      let headerPlaceholder = document.createElement("div");
      let contentPlaceholder = document.createElement("div");
      let footerPlaceholder = document.createElement("div");

      let window: Type<Window> = options.dialog ? AsDialogComponent : AsWindowComponent

      let windowRef = this.viewport.windowContainer.createComponent(window, {
        index: 0,
        injector: this.viewport.windowContainer.injector,
        projectableNodes: [[headerPlaceholder], [contentPlaceholder], [footerPlaceholder]]
      });

      let instance: Window = windowRef.instance;
      const injector = Injector.create({
        providers: [{provide: window, useValue: instance}],
        parent: this.injector
      });

      // @ts-ignore
      let componentRef = createComponent(content, {elementInjector: injector})
      this.application.attachView(componentRef.hostView)

      let element = componentRef.location.nativeElement;

      let headerElement = element.querySelector("[header]");
      if (headerElement) {
        headerPlaceholder.appendChild(headerElement)
      }
      let contentElement = element.querySelector("[content]");
      if (contentElement) {
        contentPlaceholder.appendChild(contentElement)
      }
      let footerElement = element.querySelector("[footer]");
      if (footerElement) {
        footerPlaceholder.appendChild(footerElement)
      }

      if (typeof options.draggable === "boolean") {
        instance.draggable = options.draggable
      }

      if (typeof options.resizeable === "boolean") {
        instance.resizable = options.resizeable
      }

      setTimeout(() => {
        if (options) {
          if (options.width) {
            instance.element.style.width = options.width + "px"
          }
          if (options.height) {
            instance.element.style.height = options.height + "px"
          }
          if (options.top || options.left || options.right || options.bottom) {
            if (options.top) {
              instance.element.style.top = options.top + "px"
            }
            if (options.left) {
              instance.element.style.left = options.left + "px"
            }
            if (options.right) {
              instance.element.style.right = options.right + "px"
            }
            if (options.bottom) {
              instance.element.style.bottom = options.bottom + "px"
            }
          } else {
            instance.element.style.left = `calc(50% - ${instance.element.offsetWidth / 2}px)`
            instance.element.style.top = `calc(50% - ${instance.element.offsetHeight / 2}px)`
          }
        }

      }, 10)

      this.windowManager.register(windowRef, options, componentRef);

      return {
        window: instance,
        instance: <E>componentRef.instance
      }
    }

    this.windowManager.delete = (windowRef: ComponentRef<Window>, componentRef: ComponentRef<any>) => {
      let windowIndexOf = this.viewport.windowContainer.indexOf(windowRef.hostView);
      this.viewport.windowContainer.remove(windowIndexOf)

      this.application.detachView(componentRef.hostView)
    }

    this.contextManager.create = <E>(content: Type<E>, options?: ContextOptions): ContextRef<E> => {

      let contentPlaceholder = document.createElement("div");

      let contextRef = this.viewport.windowContainer.createComponent(AsContextComponent, {
        index: 0,
        injector: this.viewport.windowContainer.injector,
        projectableNodes: [[contentPlaceholder]]
      });

      const injector = Injector.create({
        providers: [{provide: AsContextComponent, useValue: contextRef.instance}],
        parent: this.injector
      });

      // @ts-ignore
      let componentRef = createComponent(content, {elementInjector: injector});
      let element = componentRef.location.nativeElement;
      this.application.attachView(componentRef.hostView)
      contentPlaceholder.appendChild(element.firstElementChild);

      this.contextManager.register(contextRef, componentRef);

      if (options) {
        if (options.pageX) {
          contextRef.location.nativeElement.style.left = options.pageX + "px";
        }
        if (options.pageY) {
          contextRef.location.nativeElement.style.top = options.pageY + "px";
        }
      }

      return {
        context: contextRef.instance,
        instance: componentRef.instance
      }
    }

    this.contextManager.delete = (windowRef: ComponentRef<any>, componentRef: ComponentRef<any>) => {
      let windowIndexOf = this.viewport.windowContainer.indexOf(windowRef.hostView);
      this.viewport.windowContainer.remove(windowIndexOf)

      this.application.detachView(componentRef.hostView);
    }

  }

}
