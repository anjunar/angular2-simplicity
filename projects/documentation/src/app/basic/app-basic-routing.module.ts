import {AppTableComponent} from "./app-table/app-table.component";
import {AppWindowComponent} from "./app-window/app-window.component";
import {AppTabsComponent} from "./app-tabs/app-tabs.component";
import {AsGenericResolver} from "angular2-simplicity";
import {AppEditorComponent} from "./app-editor/app-editor.component";
import {AppImageUploadComponent} from "./app-image-upload/app-image-upload.component";
import {AppInputComponent} from "./app-input/app-input.component";
import {AppCheckboxComponent} from "./app-checkbox/app-checkbox.component";
import {AppSelectComponent} from "./app-select/app-select.component";
import {AppLazySelectComponent} from "./app-lazy-select/app-lazy-select.component";
import {AppRadioComponent} from "./app-radio/app-radio.component";
import {AppDialogComponent} from "./app-dialog/app-dialog.component";
import {AppListComponent} from "./app-list/app-list.component";
import {AppSpinnerComponent} from "./app-spinner/app-spinner.component";
import {AppProgressBarComponent} from "./app-progress-bar/app-progress-bar.component";
import {AppDrawerComponent} from "./app-drawer/app-drawer.component";
import {AppCarouselComponent} from "./app-carousel/app-carousel.component";
import {AppInfiniteScrollComponent} from "./app-infinite-scroll/app-infinite-scroll.component";

export const routes = [
  {
    path : "infinite",
    component: AppInfiniteScrollComponent,
    resolve: {
      data: AsGenericResolver,
    },
    data: {
      assets: [
        {
          name : "html",
          url: 'assets/basic/app-infinity-scroll/example.html'
        },
        {
          name : "typescript",
          url: 'assets/basic/app-infinity-scroll/example.ts'
        }
      ],
      json : [
        {
          name : "data",
          url : "assets/large-file.json"
        }
      ]
    }
  },
  {
    path : "carousel",
    component: AppCarouselComponent,
    resolve: {
      data: AsGenericResolver,
    },
    data: {
      assets: [
        {
          name : "html",
          url: 'assets/basic/app-carousel/example.html'
        },
        {
          name : "typescript",
          url: 'assets/basic/app-carousel/example.ts'
        }
      ]
    }
  },
  {
    path: "drawer",
    component: AppDrawerComponent,
    resolve: {
      data: AsGenericResolver,
    },
    data: {
      assets: [
        {
          name : "html",
          url: 'assets/basic/app-drawer/example.html'
        },
        {
          name : "typescript",
          url: 'assets/basic/app-drawer/example.ts'
        }
      ]
    }
  },
  {
    path: "progress-bar",
    component: AppProgressBarComponent,
    resolve: {
      data: AsGenericResolver,
    },
    data: {
      assets: [
        {
          name : "html",
          url: 'assets/basic/app-progress-bar/example.html'
        },
        {
          name : "typescript",
          url: 'assets/basic/app-progress-bar/example.ts'
        }
      ]
    }
  },
  {
    path : "spinner",
    component: AppSpinnerComponent,
    resolve: {
      data: AsGenericResolver,
    },
    data: {
      assets: [
        {
          name : "html",
          url: 'assets/basic/app-spinner/example.html'
        },
        {
          name : "typescript",
          url: 'assets/basic/app-spinner/example.ts'
        }
      ]
    }
  },
  {
    path : "list",
    component: AppListComponent,
    resolve: {
      data: AsGenericResolver,
    },
    data: {
      assets: [
        {
          name : "html",
          url: 'assets/basic/app-list/example.html'
        },
        {
          name : "typescript",
          url: 'assets/basic/app-list/example.ts'
        }
      ]
    }
  },
  {
    path : "dialog",
    component: AppDialogComponent,
    resolve: {
      data: AsGenericResolver,
    },
    data: {
      assets: [
        {
          name : "html1",
          url: 'assets/basic/app-dialog/example1.html'
        },
        {
          name : "typescript1",
          url: 'assets/basic/app-dialog/example1.ts'
        },
        {
          name : "html2",
          url: 'assets/basic/app-dialog/example2.html'
        },
        {
          name : "typescript2",
          url: 'assets/basic/app-dialog/example2.ts'
        }
      ]
    }
  },
  {
    path : "radio",
    component: AppRadioComponent,
    resolve: {
      data: AsGenericResolver,
    },
    data: {
      assets: [
        {
          name : "html",
          url: 'assets/basic/app-radio/example.html'
        },
        {
          name : "typescript",
          url: 'assets/basic/app-radio/example.ts'
        }
      ]
    }
  },
  {
    path: "lazy-select",
    component: AppLazySelectComponent,
    resolve: {
      data: AsGenericResolver,
    },
    data: {
      assets: [
        {
          name : "html",
          url: 'assets/basic/app-lazy-select/example.html'
        },
        {
          name : "typescript",
          url: 'assets/basic/app-lazy-select/example.ts'
        }
      ]
    }
  },
  {
    path : "select",
    component: AppSelectComponent,
    resolve: {
      data: AsGenericResolver,
    },
    data: {
      assets: [
        {
          name : "html",
          url: 'assets/basic/app-select/example.html'
        },
        {
          name : "typescript",
          url: 'assets/basic/app-select/example.ts'
        }
      ]
    }
  },
  {
    path : "checkbox",
    component: AppCheckboxComponent,
    resolve: {
      data: AsGenericResolver,
    },
    data: {
      assets: [
        {
          name : "html",
          url: 'assets/basic/app-checkbox/example.html'
        },
        {
          name : "typescript",
          url: 'assets/basic/app-checkbox/example.ts'
        }
      ]
    }

  },
  {
    path : "input",
    component: AppInputComponent,
    resolve: {
      data: AsGenericResolver,
    },
    data: {
      assets: [
        {
          name : "html1",
          url: 'assets/basic/app-input/example1.html'
        },
        {
          name : "html2",
          url: 'assets/basic/app-input/example2.html'
        },
        {
          name : "typescript",
          url: 'assets/basic/app-input/example.ts'
        }
      ]
    }
  },
  {
    path : "editor",
    component: AppEditorComponent,
    resolve: {
      data: AsGenericResolver,
    },
    data: {
      assets: [
        {
          name : "html",
          url: 'assets/basic/app-editor/example.html'
        },
        {
          name : "typescript",
          url: 'assets/basic/app-editor/example.ts'
        }
      ]
    }
  },
  {
    path : "upload",
    component: AppImageUploadComponent,
    resolve: {
      data: AsGenericResolver,
    },
    data: {
      assets: [
        {
          name : "html",
          url: 'assets/basic/app-image-upload/example.html'
        },
        {
          name : "typescript",
          url: 'assets/basic/app-image-upload/example.ts'
        }
      ]
    }
  },
  {
    path: 'table',
    component: AppTableComponent,
    resolve: {
      data: AsGenericResolver,
    },
    data: {
      assets: [
        {
          name : "html",
          url: 'assets/basic/app-table/example.html'
        },
        {
          name : "typescript",
          url: 'assets/basic/app-table/example.ts'
        }
      ]
    }
  },
  {
    path: 'window',
    component: AppWindowComponent,
    resolve: {
      data: AsGenericResolver,
    },
    data: {
      assets: [
        {
          name : "html",
          url: 'assets/basic/app-window/example.html'
        },
        {
          name : "typescript",
          url: 'assets/basic/app-window/example.ts'
        },
        {
          name : "html2",
          url: 'assets/basic/app-window/example2.html'
        },
        {
          name : "typescript2",
          url: 'assets/basic/app-window/example2.ts'
        }
      ]
    }
  },
  {
    path: 'tabs',
    component: AppTabsComponent,
    resolve: {
      data: AsGenericResolver,
    },
    data: {
      assets: [
        {
          name : "html",
          url: 'assets/basic/app-tabs/example.html'
        },
        {
          name : "typescript",
          url: 'assets/basic/app-tabs/example.ts'
        }
      ]
    }
  }, {
    path: "**",
    redirectTo: 'editor'
  }
]
