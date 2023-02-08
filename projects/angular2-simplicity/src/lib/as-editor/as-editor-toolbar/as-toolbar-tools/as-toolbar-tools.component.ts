import {Component, Input, ViewEncapsulation} from '@angular/core';
import {AsEditorContentDirective} from "../../as-editor-content.directive";

@Component({
  selector: 'as-toolbar-tools',
  templateUrl: 'as-toolbar-tools.component.html',
  styleUrls: ['as-toolbar-tools.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AsToolbarToolsComponent {

  @Input() content!: AsEditorContentDirective

  copy = {
    click() {
      document.execCommand("copy")
    }
  }

  cut = {
    click() {
      document.execCommand("cut")
    }
  }

  undo = {
    click() {
      document.execCommand("undo")
    }
  }

  delete1 = {
    click() {
      document.execCommand("removeFormat")
    }
  }

  selectAll = {
    click: () => {
      let range = document.createRange();
      range.selectNodeContents(this.content.element);
      let selection = document.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("selectALl")
      }
    }
  }

  redo = {
    click() {
      document.execCommand("redo")
    }
  }


}
