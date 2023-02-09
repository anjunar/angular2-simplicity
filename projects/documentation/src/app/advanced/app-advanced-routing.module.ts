import {AppMetaFormComponent} from "./app-meta-form/app-meta-form.component";
import {AppMetaTableComponent} from "./app-meta-table/app-meta-table.component";
import {AsGenericResolver} from "angular2-simplicity";
import {AppMetaFormLayoutComponent} from "./app-meta-form-layout/app-meta-form-layout.component";

export const routes = [
  {
    path: "form-layout",
    component: AppMetaFormLayoutComponent,
    resolve: {
      data: AsGenericResolver,
    },
    data: {
      json: [
        {
          name : "model",
          url: 'assets/user.json'
        }
      ],
      assets: [
        {
          name : "html",
          url: 'assets/advanced/app-meta-form-layout/example.html'
        },
        {
          name : "typescript",
          url: 'assets/advanced/app-meta-form-layout/example.ts'
        },
        {
          name : "json",
          url: 'assets/user.json'
        }
      ]
    }
  },
  {
    path: "form",
    component: AppMetaFormComponent,
    resolve: {
      data: AsGenericResolver,
    },
    data: {
      json: [
        {
          name : "model",
          url: 'assets/user.json'
        }
      ],
      assets: [
        {
          name : "html",
          url: 'assets/advanced/app-meta-form/example.html'
        },
        {
          name : "typescript",
          url: 'assets/advanced/app-meta-form/example.ts'
        },
        {
          name : "json",
          url: 'assets/user.json'
        }
      ]
    }
  },
  {
    path: "table",
    component: AppMetaTableComponent,
    resolve: {
      data: AsGenericResolver,
    },
    data: {
      assets: [
        {
          name : "html",
          url: 'assets/advanced/app-meta-table/example.html'
        },
        {
          name : "typescript",
          url: 'assets/advanced/app-meta-table/example.ts'
        },
        {
          name : "json",
          url: 'assets/materials.json'
        }
      ]
    }
  },
  {
    path : "**",
    redirectTo: 'table'
  }
]
