import {ApplicationRef, Component, Injector, ViewEncapsulation} from '@angular/core';
import {AppMain, ContextManagerService, WindowManagerService} from "angular2-simplicity";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent extends AppMain {

  _viewport: any;

  constructor(
    windowManager: WindowManagerService,
    contextManager: ContextManagerService,
    injector: Injector,
    application: ApplicationRef) {
    super(windowManager, contextManager, injector, application);
  }

  get viewport() {
    return this._viewport;
  }

  onActivate(event: any) {
    if (event.onViewport) {
      event.onViewport.subscribe((event: any) => {
        this._viewport = event;
        this.initialize();
      })
    }
  }

  onDeactivate(event : any) {
    if (event.onViewport) {
      event.onViewport.unsubscribe()
    }
  }

}
