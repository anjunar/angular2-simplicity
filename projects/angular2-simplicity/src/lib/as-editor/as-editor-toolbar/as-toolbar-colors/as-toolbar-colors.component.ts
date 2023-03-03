import {AfterViewInit, Component, Input, OnDestroy, ViewEncapsulation} from '@angular/core';
import {AsEditorInterface} from "../../as-editor.classes";
import {AsEditorContentDirective} from "../../as-editor-content.directive";

@Component({
  selector: 'as-toolbar-colors',
  templateUrl: 'as-toolbar-colors.component.html',
  styleUrls: ['as-toolbar-colors.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AsToolbarColorsComponent implements AfterViewInit {

  @Input() content!: AsEditorContentDirective

  color = {
    value: "none",
    click(event: string) {
      document.execCommand("styleWithCSS", false, "true");
      document.execCommand("foreColor", false, event)
    },
    handler(event: Event) {
      function rgbToHex(color: string) {
        color = "" + color;
        if (!color || color.indexOf("rgb") < 0) {
          return;
        }

        if (color.charAt(0) === "#") {
          return color;
        }

        let nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color);
        if (nums) {
          let r = parseInt(nums[2], 10).toString(16);
          let g = parseInt(nums[3], 10).toString(16);
          let b = parseInt(nums[4], 10).toString(16);

          return "#" + (
            (r.length === 1 ? "0" + r : r) +
            (g.length === 1 ? "0" + g : g) +
            (b.length === 1 ? "0" + b : b)
          );
        }
        return null;
      }

      let element = <HTMLElement>event.target;
      let computedStyle = window.getComputedStyle(element);

      this.value = rgbToHex(computedStyle.color) || "none";
    }
  };

  backGroundColor = {
    value: "rgba(0, 0, 0, 0)",
    click(event: string) {
      document.execCommand("styleWithCSS", false, "true");
      document.execCommand("backColor", false, event);
    },
    handler(event: Event) {
      let element = <HTMLElement>event.target;
      let computedStyle = window.getComputedStyle(element);
      this.value = computedStyle.backgroundColor || "none";
    }
  };

  ngAfterViewInit(): void {
    this.content.clickChange.subscribe((event) => {
      this.color.handler(event);
      this.backGroundColor.handler(event);
    })
  }

}
