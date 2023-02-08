import {AfterViewInit, Component, Input, OnDestroy, ViewEncapsulation} from '@angular/core';
import {AsEditorContentDirective} from "../../as-editor-content.directive";

@Component({
  selector: 'as-toolbar-justify',
  templateUrl: 'as-toolbar-justify.component.html',
  styleUrls: ['as-toolbar-justify.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AsToolbarJustifyComponent implements AfterViewInit, OnDestroy {

  @Input() content!: AsEditorContentDirective

  justify = {
    active: false,
    click: () => {
      document.execCommand("justifyFull");
      this.justify.active = true;

      this.justifyLeft.active = false;
      this.justifyRight.active = false;
      this.justifyCenter.active = false;
    },
    handler(event: Event) {
      let element = <HTMLElement>event.target;
      let computedStyle = window.getComputedStyle(element);
      this.active = computedStyle.textAlign === "justify";
    }
  }
  justifyLeft = {
    active: false,
    click: () => {
      document.execCommand("justifyLeft");
      this.justifyLeft.active = true

      this.justify.active = false;
      this.justifyRight.active = false;
      this.justifyCenter.active = false;
    },
    handler(event: Event) {
      let element = <HTMLElement>event.target;
      let computedStyle = window.getComputedStyle(element);
      this.active = computedStyle.textAlign === "left";
    }
  }
  justifyRight = {
    active: false,
    click: () => {
      document.execCommand("justifyRight");
      this.floatRight.active = true

      this.justify.active = false;
      this.justifyLeft.active = false;
      this.justifyCenter.active = false;
    },
    handler(event: Event) {
      let element = <HTMLElement>event.target;
      let computedStyle = window.getComputedStyle(element);
      this.active = computedStyle.textAlign === "right";
    }
  }
  justifyCenter = {
    active: false,
    click: () => {
      document.execCommand("justifyCenter");
      this.justifyCenter.active = true

      this.justify.active = false;
      this.justifyLeft.active = false;
      this.justifyRight.active = false;
    },
    handler(event: Event) {
      let element = <HTMLElement>event.target;
      let computedStyle = window.getComputedStyle(element);
      this.active = computedStyle.textAlign === "center";
    }
  }

  indent = {
    active: false,
    click() {
      document.execCommand("indent");
    },
    handler(event: Event) {
      //Todo: Needs to be implemented
    }
  }
  outdent = {
    active: false,
    click() {
      document.execCommand("outdent");
    },
    handler(event: Event) {
      //Todo: Needs to be implemented
    }
  }
  floatLeft = {
    active: false,
    click: () => {
      let selection = window.getSelection();
      if (selection) {
        let anchorNode = selection.anchorNode;
        if (anchorNode) {
          let parentElement = anchorNode.parentElement;

          if (parentElement) {
            let computedStyle = window.getComputedStyle(parentElement);

            if (computedStyle.float === "left") {
              parentElement.style.float = "";
              this.floatLeft.active = false;
            } else {
              parentElement.style.float = "left";
              this.floatLeft.active = true;
              this.floatRight.active = false;
            }
          }
        }
      }
    },
    handler(event: Event) {
      let element = <HTMLElement>event.target;
      let computedStyle = window.getComputedStyle(element);
      this.active = computedStyle.float === "left"
    }
  }
  floatRight = {
    active: false,
    click: () => {
      let selection = window.getSelection();
      if (selection) {
        let anchorNode = selection.anchorNode;
        if (anchorNode) {
          let parentElement = anchorNode.parentElement;
          if (parentElement) {
            let computedStyle = window.getComputedStyle(parentElement);

            if (computedStyle.float === "right") {
              parentElement.style.float = "";
              this.floatRight.active = false;
            } else {
              parentElement.style.float = "right";
              this.floatLeft.active = false;
              this.floatRight.active = true;
            }
          }
        }
      }
    },
    handler(event: Event) {
      let element = <HTMLElement>event.target;
      let computedStyle = window.getComputedStyle(element);
      this.active = computedStyle.float === "right"
    }
  }

  ngAfterViewInit(): void {
    let handler = (event : Event) => {
      this.justify.handler(event);
      this.justifyLeft.handler(event);
      this.justifyRight.handler(event);
      this.justifyCenter.handler(event);
      this.outdent.handler(event);
      this.indent.handler(event);
      this.floatLeft.handler(event);
      this.floatRight.handler(event);
    }

    this.content.clickChange.subscribe(handler)

  }

  ngOnDestroy(): void {
    this.content.clickChange.unsubscribe()
  }

}
