import {AfterViewInit, ApplicationRef, Component, Injector, ViewChild, ViewEncapsulation} from '@angular/core';
import {AppMain, ContextManagerService, WindowManagerService, AsViewportComponent} from "angular2-simplicity";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent extends AppMain implements AfterViewInit {

  @ViewChild(AsViewportComponent) _viewport!: AsViewportComponent;

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

  ngAfterViewInit(): void {
    this.initialize();
  }

}
