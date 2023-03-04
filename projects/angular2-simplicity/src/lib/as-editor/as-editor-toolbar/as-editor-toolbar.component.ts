import {Component, Input, ViewEncapsulation} from '@angular/core';
import {AsEditorContentDirective} from "../as-editor-content.directive";

@Component({
  selector: 'as-editor-toolbar',
  templateUrl: 'as-editor-toolbar.component.html',
  styleUrls: ['as-editor-toolbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AsEditorToolbarComponent {

  @Input() content!: AsEditorContentDirective
  page = 0;

}
