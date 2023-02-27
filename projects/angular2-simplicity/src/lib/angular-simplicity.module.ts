import {NgModule} from '@angular/core';
import {AsToolbarComponent} from './as-toolbar/as-toolbar.component';
import {AsTableComponent} from './as-table/as-table.component';
import {CommonModule, NgClass, NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {AsScrollbarHorizontalComponent} from './as-scrollbar-horizontal/as-scrollbar-horizontal.component';
import {AsScrollbarVerticalComponent} from './as-scrollbar-vertical/as-scrollbar-vertical.component';
import {AsScrollAreaComponent} from './as-scroll-area/as-scroll-area.component';
import {AsDrawerComponent} from './as-drawer/as-drawer.component';
import {AsDrawerContainerComponent} from './as-drawer-container/as-drawer-container.component';
import {AsDrawerContentComponent} from './as-drawer-content/as-drawer-content.component';
import {AsFooterComponent} from './as-footer/as-footer.component';
import {AsWindowComponent} from './as-window/as-window.component';
import { AsTaskbarComponent } from './as-taskbar/as-taskbar.component';
import { AsTaskComponent } from './as-taskbar/as-task/as-task.component';
import { AsCodeComponent } from './as-code/as-code.component';
import { AsViewportComponent } from './as-viewport/as-viewport.component';
import { AsTableConfigurationComponent } from './as-table/as-table-configuration/as-table-configuration.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AsFilterComponent } from './as-table/as-filter/as-filter.component';
import { AsEditorComponent } from './as-editor/as-editor.component';
import { AsTabComponent } from './as-tab/as-tab.component';
import { AsTabsComponent } from './as-tabs/as-tabs.component';
import { AsPageComponent } from './as-page/as-page.component';
import { AsPagesComponent } from './as-pages/as-pages.component';
import { AsEditorToolbarComponent } from './as-editor/as-editor-toolbar/as-editor-toolbar.component';
import { AsToolbarColorsComponent } from './as-editor/as-editor-toolbar/as-toolbar-colors/as-toolbar-colors.component';
import { AsToolbarFontComponent } from './as-editor/as-editor-toolbar/as-toolbar-font/as-toolbar-font.component';
import { AsToolbarInsertsComponent } from './as-editor/as-editor-toolbar/as-toolbar-inserts/as-toolbar-inserts.component';
import { AsToolbarJustifyComponent } from './as-editor/as-editor-toolbar/as-toolbar-justify/as-toolbar-justify.component';
import { AsToolbarToolsComponent } from './as-editor/as-editor-toolbar/as-toolbar-tools/as-toolbar-tools.component';
import { AsEditorContentDirective } from './as-editor/as-editor-content.directive';
import {AsImageUploadComponent} from "./as-image-upload/as-image-upload.component";
import { AsDialogTextComponent } from './as-editor/as-editor-dialog/as-dialog-text/as-dialog-text.component';
import { AsDialogLinkComponent } from './as-editor/as-editor-dialog/as-dialog-link/as-dialog-link.component';
import { AsDialogImageUploadComponent } from './as-editor/as-editor-dialog/as-dialog-image-upload/as-dialog-image-upload.component';
import { AsDialogContextComponent } from './as-editor/as-editor-dialog/as-dialog-context/as-dialog-context.component';
import { AsEditorContextComponent } from './as-editor/as-editor-context/as-editor-context.component';
import { AsContextComponent } from './as-context/as-context.component';
import { AsContextFlexBoxComponent } from './as-editor/as-editor-dialog/as-dialog-context/as-context-flex-box/as-context-flex-box.component';
import { AsContextMarginsComponent } from './as-editor/as-editor-dialog/as-dialog-context/as-context-margins/as-context-margins.component';
import { AsContextPaddingsComponent } from './as-editor/as-editor-dialog/as-dialog-context/as-context-paddings/as-context-paddings.component';
import { AsContextSizingComponent } from './as-editor/as-editor-dialog/as-dialog-context/as-context-sizing/as-context-sizing.component';
import { AsInputContainerComponent } from './as-input-container/as-input-container.component';
import { AsInputDirective } from './as-input/as-input.directive';
import { AsCheckboxContainerComponent } from './as-checkbox-container/as-checkbox-container.component';
import { AsLazySelectComponent } from './as-lazy-select/as-lazy-select.component';
import { AsRadioContainerComponent } from './as-radio-container/as-radio-container.component';
import { AsDialogComponent } from './as-dialog/as-dialog.component';
import { AsLazyListComponent } from './as-lazy-list/as-lazy-list.component';
import { AsSpinnerComponent } from './as-spinner/as-spinner.component';
import { AsProgressBarComponent } from './as-progress-bar/as-progress-bar.component';
import { AsMetaFormComponent } from './as-meta-form/as-meta-form.component';
import { AsMetaTableComponent } from './as-meta-table/as-meta-table.component';
import { AsRepeatComponent } from './as-repeat/as-repeat.component';
import { AsErrorDirective } from './as-input-container/as-error/as-error.directive';
import { AsToolbarSizeComponent } from './as-editor/as-editor-toolbar/as-toolbar-size/as-toolbar-size.component';
import { AsCarouselComponent } from './as-carousel/as-carousel.component';
import { AsInfiniteScrollComponent } from './as-infinite-scroll/as-infinite-scroll.component';
import { AsScrollPartComponent } from './as-infinite-scroll/as-scroll-part/as-scroll-part.component';
import { AsImageBackgroundComponent } from './as-image-background/as-image-background.component';


@NgModule({
  declarations: [
    AsToolbarComponent,
    AsTableComponent,
    AsScrollbarHorizontalComponent,
    AsScrollbarVerticalComponent,
    AsScrollAreaComponent,
    AsDrawerComponent,
    AsDrawerContainerComponent,
    AsDrawerContentComponent,
    AsFooterComponent,
    AsWindowComponent,
    AsTaskbarComponent,
    AsTaskComponent,
    AsCodeComponent,
    AsViewportComponent,
    AsTableConfigurationComponent,
    AsFilterComponent,
    AsEditorComponent,
    AsEditorToolbarComponent,
    AsTabComponent,
    AsTabsComponent,
    AsPageComponent,
    AsPagesComponent,
    AsToolbarColorsComponent,
    AsToolbarFontComponent,
    AsToolbarInsertsComponent,
    AsToolbarJustifyComponent,
    AsToolbarToolsComponent,
    AsEditorContentDirective,
    AsImageUploadComponent,
    AsDialogTextComponent,
    AsDialogLinkComponent,
    AsDialogImageUploadComponent,
    AsDialogContextComponent,
    AsEditorContextComponent,
    AsContextComponent,
    AsContextFlexBoxComponent,
    AsContextMarginsComponent,
    AsContextPaddingsComponent,
    AsContextSizingComponent,
    AsInputContainerComponent,
    AsInputDirective,
    AsCheckboxContainerComponent,
    AsLazySelectComponent,
    AsRadioContainerComponent,
    AsDialogComponent,
    AsLazyListComponent,
    AsSpinnerComponent,
    AsProgressBarComponent,
    AsMetaFormComponent,
    AsMetaTableComponent,
    AsRepeatComponent,
    AsErrorDirective,
    AsToolbarSizeComponent,
    AsCarouselComponent,
    AsInfiniteScrollComponent,
    AsScrollPartComponent,
    AsImageBackgroundComponent,
  ],
    imports: [
        NgTemplateOutlet,
        NgForOf,
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        NgClass,
        CommonModule
    ],
  providers: [
  ],
  exports: [
    AsToolbarComponent,
    AsTableComponent,
    AsScrollbarHorizontalComponent,
    AsScrollbarVerticalComponent,
    AsDrawerComponent,
    AsDrawerContainerComponent,
    AsDrawerContentComponent,
    AsFooterComponent,
    AsWindowComponent,
    AsTaskbarComponent,
    AsTaskComponent,
    AsCodeComponent,
    AsViewportComponent,
    AsTableConfigurationComponent,
    AsFilterComponent,
    AsEditorComponent,
    AsEditorToolbarComponent,
    AsTabComponent,
    AsTabsComponent,
    AsPageComponent,
    AsPagesComponent,
    AsImageUploadComponent,
    AsContextComponent,
    AsInputContainerComponent,
    AsInputDirective,
    AsCheckboxContainerComponent,
    AsLazySelectComponent,
    AsRadioContainerComponent,
    AsDialogComponent,
    AsLazyListComponent,
    AsSpinnerComponent,
    AsProgressBarComponent,
    AsMetaFormComponent,
    AsMetaTableComponent,
    AsErrorDirective,
    AsCarouselComponent,
    AsInfiniteScrollComponent,
    AsImageBackgroundComponent
  ]
})
export class Angular2SimplicityModule {}
