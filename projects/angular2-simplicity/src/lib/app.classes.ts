import {ActivatedRoute} from "@angular/router";
import {ApplicationRef, ComponentRef, createComponent, Injector, Type} from "@angular/core";
import {Window, WindowManagerService, WindowOptions, WindowRef} from "./window-manager.service";
import {ContextManagerService, ContextOptions, ContextRef} from "./context-manager.service";
import {AsViewportComponent} from "./as-viewport/as-viewport.component";
import {AsDialogComponent} from "./as-dialog/as-dialog.component";
import {AsWindowComponent} from "./as-window/as-window.component";
import {AsContextComponent} from "./as-context/as-context.component";

export interface TableLike {
  add(value : any) : void;
  delete(value : any) : void
}

export function generateURL(value : string) {
  if (value.startsWith("/")) {
    return new URL(window.location.origin + value)
  }
  return new URL(window.location.origin + "/" + value)
}

export function updateValues(form : any, model : any) {
  for (const key of Object.keys(form)) {
    let formProperty = form[key];
    let modelProperty = model[key];

    if (! modelProperty) {
      if (formProperty instanceof Array) {
        modelProperty = model[key] = [];
      } else if (formProperty instanceof Object) {
        modelProperty = model[key] = {}
      }
    }

    if (formProperty instanceof Array) {
      formProperty.forEach((element, index) => {
        if (modelProperty[index]) {
          updateValues(element, modelProperty[index])
        } else {
          modelProperty.push(element);
        }
      })
    } else {
      if (formProperty instanceof Object) {
        updateValues(formProperty, modelProperty)
      } else {
        model[key] = form[key];
      }
    }
  }
}

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

      contentPlaceholder.style.height = "100%"

      let window: Type<Window> = options.dialog ? AsDialogComponent : AsWindowComponent

      let windowRef = this.viewport.windowContainer.createComponent(window, {
        index: 0,
        injector: this.viewport.windowContainer.injector,
        projectableNodes: [[headerPlaceholder], [contentPlaceholder], [footerPlaceholder]]
      });

      let instance: Window = windowRef.instance;
      const injector = Injector.create({
        providers: [
          {provide: window, useValue: instance},
          {provide: AsViewportComponent, useValue : this.viewport}
        ],
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

      windowRef.instance.afterViewInitChange.subscribe(() => {

        if (options) {
          if (options.width) {
            instance.element.style.width = options.width;
          }
          if (options.height) {
            instance.element.style.height = options.height;
          }

          if (options.minWidth) {
            instance.element.style.minWidth = options.minWidth;
          }
          if (options.minHeight) {
            instance.element.style.minHeight = options.minHeight;
          }

          if (options.maxWidth) {
            instance.element.style.maxWidth = options.maxWidth;
          }
          if (options.maxHeight) {
            instance.element.style.maxHeight = options.maxHeight;
          }

          if (options.top || options.left || options.right || options.bottom) {
            if (options.top) {
              instance.element.style.top = options.top;
            }
            if (options.left) {
              instance.element.style.left = options.left;
            }
            if (options.right) {
              instance.element.style.right = options.right;
            }
            if (options.bottom) {
              instance.element.style.bottom = options.bottom;
            }
          } else {
            if (options.centerFn) {
              let centerFn = options.centerFn(instance);
              instance.element.style.left = centerFn.left;
              instance.element.style.top = centerFn.top;
            } else {
              instance.element.style.left = `calc(50% - ${instance.element.offsetWidth / 2}px)`
              instance.element.style.top = `calc(50% - ${instance.element.offsetHeight / 2}px)`
            }
          }
        }

      })

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
      componentRef.destroy();
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
      componentRef.destroy();
    }

  }

}
