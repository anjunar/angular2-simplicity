import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'as-context-sizing',
  templateUrl: 'as-context-sizing.component.html',
  styleUrls: ['as-context-sizing.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AsContextSizingComponent implements OnInit {

  @Input() node! : HTMLElement;

  sizeX = {
    value : "",
    click : (event : string) => {
      this.node.style.width = event;
    }
  };

  sizeY = {
    value : "",
    click : (event : string) => {
      this.node.style.height = event;
    }
  }

  ngOnInit(): void {
    let computedStyle = window.getComputedStyle(this.node);
    this.sizeX.value = computedStyle.width;
    this.sizeY.value = computedStyle.height;
  }


}
