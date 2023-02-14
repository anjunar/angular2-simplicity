import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {Angular2SimplicityModule} from "angular2-simplicity";
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppTableComponent} from "./basic/app-table/app-table.component";
import {AppWindowComponent} from './basic/app-window/app-window.component';
import {AppExampleComponent} from './basic/app-window/app-example/app-example.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppBasicComponent } from './basic/app-basic/app-basic.component';
import { AppTabsComponent } from './basic/app-tabs/app-tabs.component';
import { AppHomeComponent } from './home/app-home/app-home.component';
import { AppEditorComponent } from './basic/app-editor/app-editor.component';
import { AppImageUploadComponent } from './basic/app-image-upload/app-image-upload.component';
import { AppInputComponent } from './basic/app-input/app-input.component';
import { AppCheckboxComponent } from './basic/app-checkbox/app-checkbox.component';
import { AppSelectComponent } from './basic/app-select/app-select.component';
import { AppLazySelectComponent } from './basic/app-lazy-select/app-lazy-select.component';
import { AppRadioComponent } from './basic/app-radio/app-radio.component';
import { AppDialogComponent } from './basic/app-dialog/app-dialog.component';
import { AppDialogExampleComponent } from './basic/app-dialog/app-dialog-example/app-dialog-example.component';
import { AppListComponent } from './basic/app-list/app-list.component';
import { AppSpinnerComponent } from './basic/app-spinner/app-spinner.component';
import { AppProgressBarComponent } from './basic/app-progress-bar/app-progress-bar.component';
import { AppDrawerComponent } from './basic/app-drawer/app-drawer.component';
import { AppAdvancedComponent } from './advanced/app-advanced/app-advanced.component';
import { AppMetaFormComponent } from './advanced/app-meta-form/app-meta-form.component';
import { AppMetaTableComponent } from './advanced/app-meta-table/app-meta-table.component';
import { AppMetaFormLayoutComponent } from './advanced/app-meta-form-layout/app-meta-form-layout.component';
import { AppCarouselComponent } from './basic/app-carousel/app-carousel.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppInfiniteScrollComponent} from "./basic/app-infinite-scroll/app-infinite-scroll.component";

@NgModule({
  declarations: [
    AppComponent,
    AppTableComponent,
    AppWindowComponent,
    AppExampleComponent,
    AppBasicComponent,
    AppTabsComponent,
    AppHomeComponent,
    AppEditorComponent,
    AppImageUploadComponent,
    AppInputComponent,
    AppCheckboxComponent,
    AppSelectComponent,
    AppLazySelectComponent,
    AppRadioComponent,
    AppDialogComponent,
    AppDialogExampleComponent,
    AppListComponent,
    AppSpinnerComponent,
    AppProgressBarComponent,
    AppDrawerComponent,
    AppAdvancedComponent,
    AppMetaFormComponent,
    AppMetaTableComponent,
    AppMetaFormLayoutComponent,
    AppCarouselComponent,
    AppInfiniteScrollComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        Angular2SimplicityModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
