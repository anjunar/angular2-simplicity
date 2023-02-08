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
  fontSize = {
    value: "3",
    click(event : string) {
      document.execCommand("fontSize", false, event);
    },
    handler(event: Event) {
      function fontSizeTranslate(number : number) {
        switch (number) {
          case 9 :
            return "0"
          case 10 :
            return "1"
          case 13 :
            return "2"
          case 16 :
            return "3"
          case 18 :
            return "4"
          case 32 :
            return "5"
          default :
            return "none";
        }
      }

      let element = <HTMLElement>event.target;
      let computedStyle = window.getComputedStyle(element);
      let regex = /(\d+).*/
      let execArray = regex.exec(computedStyle.fontSize);
      if (execArray) {
        let number = Number.parseInt(execArray[1]);
        this.value = fontSizeTranslate(number);
      }
    }
  }
  formatBlock = {
    value: "none",
    click(event : string) {
      document.execCommand("formatBlock", false, event)
    },
    handler(event : Event) {
      function formatBlockRestriction(localName : string) {
        switch (localName) {
          case "h1" :
            return "H1"
          case "h2" :
            return "H2"
          case "h3" :
            return "H3"
          case "h4" :
            return "H4"
          case "h5" :
            return "H5"
          case "h6" :
            return "H6"
          default :
            return "p";
        }
      }

      let element = <HTMLElement>event.target;
      this.value = formatBlockRestriction(element.localName);
    }
  };

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
      this.fontSize.handler(event);
      this.formatBlock.handler(event);
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
