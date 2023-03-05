import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {AsScrollAreaComponent} from "angular2-simplicity";

@Component({
  selector: 'app-basic',
  templateUrl: 'app-basic.component.html',
  styleUrls: ['app-basic.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppBasicComponent {

  open: boolean = true
  @ViewChild(AsScrollAreaComponent) scroll!: AsScrollAreaComponent

  ngOnInit(): void {
    let matchMedia = window.matchMedia("(max-width: 800px)");
    this.open = !matchMedia.matches;
  }

  onActivate() {
    setTimeout(() => {
      this.scroll.onScrollX(0)
      this.scroll.onScrollY(0)
    })
  }

}
