import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {WindowManagerService} from "../../window-manager.service";
import {AsDialogContextComponent} from "../as-editor-dialog/as-dialog-context/as-dialog-context.component";

@Component({
  selector: 'as-editor-context',
  templateUrl: 'as-editor-context.component.html',
  styleUrls: ['as-editor-context.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AsEditorContextComponent implements OnInit {

  page = 0;
  path : HTMLElement[] = [];
  isCollapsed = true;

  constructor(private windowManager : WindowManagerService) {}

  ngOnInit(): void {
    let selection = window.getSelection();
    if (selection) {
      this.isCollapsed = selection.isCollapsed;
    }
  }

  cut() {
    document.execCommand("cut")
  }

  copy() {
    document.execCommand("copy")
  }

  paste() {
    document.execCommand("paste")
  }

  findElement(callback : (element : HTMLElement) => boolean) {
    for (const pathElement of this.path) {
      if (callback(pathElement)) {
        return pathElement;
      }
    }
    return null;
  }

  get isExtensionContext() {
    return this.path.length > 0
  }

  get isFlexBoxContext() {
    return this.findElement((element) => {
      return element.className === "flex"
    })
  }

  addFlexColumn() {
    let flexBoxElement = this.findElement((element) => element.className === "flex");
    if (flexBoxElement) {
      flexBoxElement.appendChild(document.createElement("div"))
    }
  }

  removeFlexColumn() {
    let flexBoxElement = this.findElement((element) => element.className === "flex");
    if (flexBoxElement) {
      let lastElementChild = flexBoxElement.lastElementChild;
      if (lastElementChild) {
        lastElementChild.remove();
      }
    }
  }

  get isTableContext() {
    return this.findElement((element) => {
      return element.localName === "table";
    });
  }

  addTableRow() {
    let tableElement = this.findElement((element) => element.localName === "table");
    if (tableElement) {
      let tbodyElement = tableElement.querySelector("tbody");
      if (tbodyElement) {
        let tableRowElement = tbodyElement.querySelector("tr");
        if (tableRowElement) {
          let tableColElement = tableRowElement.querySelectorAll("td");


          let tr = document.createElement("tr");
          for (let i = 0; i < tableColElement.length; i++) {
            let td = document.createElement("td");
            tr.appendChild(td);
          }

          tbodyElement.appendChild(tr);
        }
      }
    }
  }

  addTableColumns() {
    let tableElement = this.findElement((element) => element.localName === "table");
    if (tableElement) {
      let tbodyElement = tableElement.querySelector("tbody");
      if (tbodyElement) {
        let tableRowElements = tbodyElement.querySelectorAll("tr");
        if (tableRowElements) {
          for (const tableRowElement of Array.from(tableRowElements)) {
            tableRowElement.appendChild(document.createElement("td"))
          }
        }
      }
    }
  }

  removeTableRow() {
    let tableElement = this.findElement((element) => element.localName === "table");
    if (tableElement) {
      let tbodyElement = tableElement.querySelector("tbody");
      if (tbodyElement) {
        let lastElementChild = tbodyElement.lastElementChild;
        if (lastElementChild) {
          lastElementChild.remove();
        }
      }
    }
  }

  removeTableColumns() {
    let tableElement = this.findElement((element) => element.localName === "table");
    if (tableElement) {
      let tbodyElement = tableElement.querySelector("tbody");
      if (tbodyElement) {
        let trElements = tbodyElement.querySelectorAll("tr");
        for (const trElement of Array.from(trElements)) {
          let lastElementChild = trElement.lastElementChild;
          if (lastElementChild) {
            lastElementChild.remove();
          }
        }
      }
    }
  }

  extension() {
    let windowRef = this.windowManager.create(AsDialogContextComponent, {header : "Extended Context"});
    windowRef.instance.path = this.path;
  }


}
