import {ComponentRef, Injectable, Type} from '@angular/core';
import {AsContextComponent} from "./as-context/as-context.component";

export interface ContextRef<C> {
  context : AsContextComponent
  instance : C
}

export interface ContextOptions {
  pageX : number

  pageY : number
}

const contextRegistry: ComponentRef<AsContextComponent>[] = [];
const componentRegistry : Map<ComponentRef<AsContextComponent>, ComponentRef<any>> = new Map()

@Injectable({
  providedIn: 'root'
})
export class ContextManagerService {

  create!: <E>(window: Type<E>, options? : ContextOptions) => ContextRef<E>

  delete!: (window: ComponentRef<any>, component : ComponentRef<any>) => void;

  register(context : ComponentRef<AsContextComponent>, component : ComponentRef<any>) {
    contextRegistry.push(context)
    componentRegistry.set(context, component);
  }

  close(context: AsContextComponent) {
    let indexOf = contextRegistry.findIndex((componentRef) => componentRef.instance === context);
    let windowRef = contextRegistry[indexOf];
    let componentRef = componentRegistry.get(windowRef)
    contextRegistry.splice(indexOf, 1);
    if (componentRef) {
      this.delete(windowRef, componentRef);
    }
  }

}
