import {AfterViewInit, ApplicationRef, Component, Injector, ViewChild, ViewEncapsulation} from '@angular/core';
import {AppMain, ContextManagerService, WindowManagerService, AsViewportComponent} from "angular2-simplicity";
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
    router : Router) {
    super(windowManager, contextManager, injector, application);

    window.secureFetch = function (url : string, method : string = "GET", data? : any) {
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

        fetch(url, options).then(response => {
          if (response.ok) {
            resolve(response);
          } else {
            switch (response.status) {
              case 401:
                router.navigate(["/security/login"])
                break;
              default:
                console.log('Some error occured');
                break;
            }

            reject(response);
          }
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

}
