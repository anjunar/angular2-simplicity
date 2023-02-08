import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'as-context-paddings',
  templateUrl: 'as-context-paddings.component.html',
  styleUrls: ['as-context-paddings.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AsContextPaddingsComponent implements OnInit {

  @Input() node! : HTMLElement

  paddingLeft = 0
  paddingRight = 0
  paddingTop = 0
  paddingBottom = 0

  ngOnInit(): void {
    let regex = /(\d+).*/
    let computedStyle = window.getComputedStyle(this.node);
    let paddingLeftRegex = regex.exec(computedStyle.paddingLeft);
    if (paddingLeftRegex) {
      this.paddingLeft = Number.parseInt(paddingLeftRegex[1])
    }
    let paddingRightRegex = regex.exec(computedStyle.paddingRight);
    if (paddingRightRegex) {
      this.paddingRight = Number.parseInt(paddingRightRegex[1])
    }
    let paddingTopRegex = regex.exec(computedStyle.paddingTop);
    if (paddingTopRegex) {
      this.paddingTop = Number.parseInt(paddingTopRegex[1])
    }
    let paddingBottomRegex = regex.exec(computedStyle.paddingBottom);
    if (paddingBottomRegex) {
      this.paddingBottom = Number.parseInt(paddingBottomRegex[1])
    }
  }

  paddingLeftChange(event : string) {
    this.node.style.paddingLeft = event + "px";
  }

  paddingRightChange(event : string) {
    this.node.style.paddingRight = event + "px";
  }

  paddingTopChange(event : string) {
    this.node.style.paddingTop = event + "px";
  }

  paddingBottomChange(event : string) {
    this.node.style.paddingBottom = event + "px";
  }

}
