import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'as-context-flex-box',
  templateUrl: 'as-context-flex-box.component.html',
  styleUrls: ['as-context-flex-box.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AsContextFlexBoxComponent implements OnInit {

  @Input() node! : HTMLElement;

  flexDirection = {
    value : "",
    click : (event : string) => {
      this.node.style.flexDirection = event;
    }
  };

  flexWrap = {
    value : "",
    click : (event: string) => {
      this.node.style.flexWrap = event;
    }
  }

  justifyContent = {
    value : "",
    click : (event : string) => {
      this.node.style.justifyContent = event
    }
  }

  alignItems = {
    value : "",
    click : (event : string) => {
      this.node.style.alignItems = event
    }
  }

  alignContent = {
    value : "",
    click : (event : string) => {
      this.node.style.alignContent = event
    }
  }

  gap = {
    value : "",
    click : (event : string) => {
      this.node.style.gap = event;
    }
  }

  ngOnInit(): void {
    let computedStyle = window.getComputedStyle(this.node);

    this.flexDirection.value = computedStyle.flexDirection;
    this.flexWrap.value = computedStyle.flexWrap;
    this.justifyContent.value = computedStyle.justifyContent;
    this.alignItems.value = computedStyle.alignItems;
    this.alignContent.value = computedStyle.alignContent;
    this.gap.value = computedStyle.gap;
  }
}
