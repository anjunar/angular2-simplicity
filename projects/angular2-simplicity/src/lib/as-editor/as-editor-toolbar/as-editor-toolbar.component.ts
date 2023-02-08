import {ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {AsEditorInterface} from "../as-editor.classes";
import {AsEditorContentDirective} from "../as-editor-content.directive";

@Component({
  selector: 'as-editor-toolbar',
  templateUrl: 'as-editor-toolbar.component.html',
  styleUrls: ['as-editor-toolbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AsEditorToolbarComponent implements OnInit {

  @Input() content!: AsEditorContentDirective
  page = 0;

  ngOnInit(): void {


  }


}
