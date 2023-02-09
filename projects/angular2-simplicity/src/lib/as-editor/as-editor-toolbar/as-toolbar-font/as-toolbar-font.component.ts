import {AfterViewInit, Component, Input, OnDestroy, ViewEncapsulation} from '@angular/core';
import {AsEditorContentDirective} from "../../as-editor-content.directive";

@Component({
  selector: 'as-toolbar-font',
  templateUrl: 'as-toolbar-font.component.html',
  styleUrls: ['as-toolbar-font.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AsToolbarFontComponent implements AfterViewInit, OnDestroy {

  @Input() content!: AsEditorContentDirective

  fontName = {
    value: "Helvetica, serif",
    click(event : string) {
      document.execCommand("fontname", false, event);
    },
    handler(event : Event) {
      let element = <HTMLElement>event.target;
      let computedStyle = window.getComputedStyle(element);
      this.value = computedStyle.fontFamily.replace(/"/g, "") || "none";
    }
  }

  bold = {
    active: false,
    click() {
      document.execCommand("styleWithCSS", false, "true");
      document.execCommand('bold', false, "");
      let selection = document.getSelection();
      if (selection) {
        let anchorNode = selection.anchorNode;
        if (anchorNode?.parentElement) {
          let computedStyle = window.getComputedStyle(anchorNode.parentElement);
          this.active = computedStyle.fontWeight === "700";
        }
      }
    },
    handler(event : Event) {
      let element = <HTMLElement>event.target;
      let computedStyle = window.getComputedStyle(element);
      this.active = computedStyle.fontWeight === "700";
    }
  }
  italic = {
    active: false,
    click() {
      document.execCommand("styleWithCSS", false, "true");
      document.execCommand("italic", false, "");
      let selection = document.getSelection();
      if (selection) {
        let anchorNode = selection.anchorNode;
        if (anchorNode?.parentElement) {
          let computedStyle = window.getComputedStyle(anchorNode.parentElement);
          this.active = computedStyle.fontStyle === "italic";
        }
      }
    },
    handler(event : Event) {
      let element = <HTMLElement>event.target;
      let computedStyle = window.getComputedStyle(element);
      this.active = computedStyle.fontStyle === "italic";
    }
  }
  strikeThrough = {
    active: false,
    click() {
      document.execCommand("styleWithCSS", false, "true");
      document.execCommand("strikethrough", false, "");
      let selection = document.getSelection();
      if (selection) {
        let anchorNode = selection.anchorNode;
        if (anchorNode) {
          let element = <HTMLElement>anchorNode.parentElement;
          if (anchorNode.parentElement) {
            let computedStyle = window.getComputedStyle(element);
            this.active = computedStyle.textDecorationLine === "line-through";
          }
        }
      }
    },
    handler(event : Event) {
      let element = <HTMLElement>event.target;
      let computedStyle = window.getComputedStyle(element);
      this.active = computedStyle.textDecorationLine === "line-through";
    }
  }
  subScript = {
    active: false,
    click() {
      document.execCommand("styleWithCSS", false, "true");
      document.execCommand("subscript", false, "");
      let selection = document.getSelection();
      if (selection) {
        let anchorNode = selection.anchorNode;
        if (anchorNode) {
          let element = <HTMLElement>anchorNode.parentElement;
          let computedStyle = window.getComputedStyle(element);
          this.active = computedStyle.verticalAlign === "sub";
        }
      }
    },
    handler(event : Event) {
      let element = <HTMLElement>event.target;
      let computedStyle = window.getComputedStyle(element);
      this.active = computedStyle.verticalAlign === "sub";
    }
  }
  superScript = {
    active: false,
    click() {
      document.execCommand("styleWithCSS", false, "true");
      document.execCommand("superscript", false, "");
      let selection = document.getSelection();
      if (selection) {
        let anchorNode = selection.anchorNode;
        if (anchorNode) {
          let element = <HTMLElement>anchorNode.parentElement;
          let computedStyle = window.getComputedStyle(element);
          this.active = computedStyle.verticalAlign === "super";
        }
      }
    },
    handler(event : Event) {
      let element = <HTMLElement>event.target;
      let computedStyle = window.getComputedStyle(element);
      this.active = computedStyle.verticalAlign === "super";
    }
  }

  ngAfterViewInit(): void {
    let handler = (event : Event) => {
      this.fontName.handler(event);
      this.bold.handler(event);
      this.italic.handler(event);
      this.strikeThrough.handler(event);
      this.subScript.handler(event);
      this.superScript.handler(event);
    }

    this.content.clickChange.subscribe(handler)
  }

  ngOnDestroy(): void {
    this.content.clickChange.unsubscribe();
  }



}
