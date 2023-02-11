import {AfterViewInit, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {AsViewportComponent, ContextManagerService, WindowManagerService, AppMain} from "angular2-simplicity";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent extends AppMain implements AfterViewInit {

  @ViewChild(AsViewportComponent) _viewport!: AsViewportComponent

  constructor(windowManager: WindowManagerService, contextManager: ContextManagerService) {
    super(windowManager, contextManager);
  }

  get viewport() {
    return this._viewport;
  }

  ngAfterViewInit(): void {
    this.initialize();
  }

}
