import {AfterViewInit, Component, Input, OnDestroy, ViewEncapsulation} from '@angular/core';
import {AsEditorContentDirective} from "../../as-editor-content.directive";

@Component({
  selector: 'as-toolbar-size',
  templateUrl: 'as-toolbar-size.component.html',
  styleUrls: ['as-toolbar-size.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AsToolbarSizeComponent implements AfterViewInit {

  @Input() content!: AsEditorContentDirective

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
    value: "div",
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

  ngAfterViewInit(): void {
    let handler = (event : Event) => {
      this.fontSize.handler(event);
      this.formatBlock.handler(event);
    }

    this.content.clickChange.subscribe(handler)
  }

}
