import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'as-context-margins',
  templateUrl: 'as-context-margins.component.html',
  styleUrls: ['as-context-margins.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AsContextMarginsComponent implements OnInit {

  @Input() node! : HTMLElement

  marginLeft = 0;
  marginRight = 0;
  marginTop = 0;
  marginBottom = 0;

  ngOnInit(): void {
    let regex = /(\d+).*/
    let computedStyle = window.getComputedStyle(this.node);
    let marginLeftRegex = regex.exec(computedStyle.marginLeft);
    if (marginLeftRegex) {
      this.marginLeft = Number.parseInt(marginLeftRegex[1])
    }
    let marginRightRegex = regex.exec(computedStyle.marginRight);
    if (marginRightRegex) {
      this.marginRight = Number.parseInt(marginRightRegex[1])
    }
    let marginTopRegex = regex.exec(computedStyle.marginTop);
    if (marginTopRegex) {
      this.marginTop = Number.parseInt(marginTopRegex[1])
    }
    let marginBottomRegex = regex.exec(computedStyle.marginBottom);
    if (marginBottomRegex) {
      this.marginBottom = Number.parseInt(marginBottomRegex[1])
    }
  }


  marginLeftChange(event : string) {
    this.node.style.marginLeft = event + "px";
  }

  marginRightChange(event : string) {
    this.node.style.marginRight = event + "px";
  }

  marginTopChange(event : string) {
    this.node.style.marginTop = event + "px";
  }

  marginBottomChange(event : string) {
    this.node.style.marginBottom = event + "px";
  }

}
