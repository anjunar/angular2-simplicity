import {AfterViewInit, ApplicationRef, Component, Injector, ViewChild, ViewEncapsulation} from '@angular/core';
import {AppMain, AsViewportComponent, ContextManagerService, WindowManagerService} from "angular2-simplicity";
import {Router} from "@angular/router";

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
    application: ApplicationRef,
    router: Router) {
    super(windowManager, contextManager, injector, application);

    let registry = new WeakMap();

    EventTarget.prototype.addEventListener = (function (_super) {
      return function (name, callback: (event: Event) => void) {
        let handler = (event: Event) => {
          callback(event)
          if (name !== "mousemove") {
            application.tick();
          }
        };

        registry.set(callback, handler);

        // @ts-ignore
        return _super.apply(this, [name, handler])
      }
    })(EventTarget.prototype.addEventListener)

    EventTarget.prototype.removeEventListener = (function (_super) {
      return function (name, callback: (event: Event) => void) {

        let handler = registry.get(callback);

        // @ts-ignore
        return _super.apply(this, [name, handler])
      }
    })(EventTarget.prototype.removeEventListener)

    window.secureFetch = function (url: string, method: string = "GET", data?: any) {
      return new Promise((resolve, reject) => {
        let options = {
          method: method
        };

        if (data) {
          Object.assign(options, {
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json"
            }
          })
        }

        fetch(url, options)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              switch (response.status) {
                case 401:
                  router.navigate(["/security/login"])
                  throw new Error(response.status + "");
                default:
                  throw new Error(response.status + "");
              }
            }
          })
          .then((response) => {
            resolve(response);
          })
          .catch((response) => {
            reject(response);
          })
          .finally(() => {
            setTimeout(() => {
              application.tick()
            })
          })
      });
    }
  }

  get viewport() {
    return this._viewport;
  }

  ngAfterViewInit(): void {
    this.initialize();
  }

  onActivate() {
    this.application.tick();
  }

}
