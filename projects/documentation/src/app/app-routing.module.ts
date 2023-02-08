import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppBasicComponent} from "./basic/app-basic/app-basic.component";
import {routes as basic} from "./basic/app-basic-routing.module"
import {routes as advanced} from "./advanced/app-advanced-routing.module"
import {AppHomeComponent} from "./home/app-home/app-home.component";
import {AsGenericResolver} from "../../../angular2-simplicity/src/lib/as-generic.resolver";
import {AppAdvancedComponent} from "./advanced/app-advanced/app-advanced.component";

const routes: Routes = [
  {
    path : "home",
    component : AppHomeComponent,
    resolve: {
      data: AsGenericResolver,
    },
    data: {
      assets: [
        {
          name : "html",
          url: 'assets/home/app-home/example.html'
        }
      ]
    }
  },
  {
    path: 'basic',
    component: AppBasicComponent,
    children: basic
  },
  {
    path: 'advanced',
    component: AppAdvancedComponent,
    children: advanced
  },
  {
    path : "**",
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
