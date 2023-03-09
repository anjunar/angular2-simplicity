import {AfterViewInit, Component, Input, OnDestroy, ViewEncapsulation} from '@angular/core';
import {AsEditorContentDirective} from "../../as-editor-content.directive";
import {WindowManagerService} from "../../../window-manager.service";
import {AsDialogLinkComponent} from "../../as-editor-dialog/as-dialog-link/as-dialog-link.component";
import {
  AsDialogImageUploadComponent
} from "../../as-editor-dialog/as-dialog-image-upload/as-dialog-image-upload.component";
import {AsDialogTextComponent} from "../../as-editor-dialog/as-dialog-text/as-dialog-text.component";

@Component({
  selector: 'as-toolbar-inserts',
  templateUrl: 'as-toolbar-inserts.component.html',
  styleUrls: ['as-toolbar-inserts.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AsToolbarInsertsComponent implements AfterViewInit {

  @Input() content!: AsEditorContentDirective

  constructor(private windowManager : WindowManagerService) {}

  link = {
    value: "",
    active: false,
    click : (link : string) => {
      let selection = document.getSelection();
      if (selection) {
        let rangeAt = selection.getRangeAt(0);

        let windowRef = this.windowManager.create(AsDialogLinkComponent, {header : "Link insert"});
        windowRef.instance.onOk.subscribe((value : string) => {
          let selection = document.getSelection();
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(rangeAt);
            document.execCommand("createLink", false, value);
          }
        })
      }
    },
    handler(event : Event) {}
  }
  unLink = {
    active: false,
    click() {
      document.execCommand("unlink")
    },
    handler(event : Event) {}
  }
  insertDivFlex = {
    disabled: false,
    click(columns = 2) {
      let columnsHTML = ""
      for (let i = 0; i < columns; i++) {
        columnsHTML += "<div></div>"
      }

      let html = "<div class='flex' style='width: 100%'>" + columnsHTML + "</div>"

      document.execCommand("insertHTML", false, html)
    }
  }
  insertTable = {
    click(columns = 2, rows = 2) {
      let columnsHTML = "";
      for (let i = 0; i < columns; i++) {
        columnsHTML += "<td></td>"
      }

      let rowsHTML = "";
      for (let i = 0; i < rows; i++) {
        rowsHTML += "<tr>" + columnsHTML + "</tr>"
      }

      let table = "<table style='width: 100%'><tbody>" + rowsHTML + "</tbody></table>";

      document.execCommand("insertHTML", false, table)
    }
  }
  image = {
    active: false,
    click : () => {
      let selection = document.getSelection();
      if (selection) {
        let rangeAt = selection.getRangeAt(0);

        let windowRef = this.windowManager.create(AsDialogImageUploadComponent, {header : "Image Upload", width : "640px", height : "480px"});

        windowRef.instance.onOk.subscribe((value) => {
          let selection = document.getSelection();
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(rangeAt);
            document.execCommand("insertImage", false, value.data);
          }
        })
      }
    },
    handler: (event : Event) => {}
  }
  horizontalRule = {
    active: false,
    click() {
      document.execCommand("insertHorizontalRule")
    },
    handler(event : Event) {

    }
  }
  text = {
    active: false,
    click : () => {
      let selection = document.getSelection();
      if (selection) {
        let rangeAt = selection.getRangeAt(0);

        let windowRef = this.windowManager.create(AsDialogTextComponent, {header : "Text input", width : "640px", height: "480px"});

        windowRef.instance.onOk.subscribe((value) => {
          let selection = document.getSelection();
          if (selection) {
            selection.removeAllRanges();
            selection.addRange(rangeAt);
            document.execCommand("insertText", false, value);
          }
        })
      }
    },
    handler(event : Event) {

    }
  }
  orderedList = {
    active: false,
    click() {
      document.execCommand("insertOrderedList")
    },
    handler(event : Event) {

    }
  }
  unOrderedList = {
    active: false,
    click() {
      document.execCommand("insertUnorderedList")
    },
    handler(event : Event) {

    }
  }
  paragraph = {
    active: false,
    click() {
      document.execCommand("insertParagraph")
    },
    handler(event : Event) {

    }
  }

  ngAfterViewInit(): void {
    let handler = (event: Event) => {
      this.link.handler(event);
      this.unLink.handler(event);
      this.image.handler(event);
      this.horizontalRule.handler(event);
      this.text.handler(event);
      this.orderedList.handler(event);
      this.unOrderedList.handler(event);
      this.paragraph.handler(event);
    }
    this.content.clickChange.subscribe(handler)
  }

}
