import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-basic',
  templateUrl: 'app-basic.component.html',
  styleUrls: ['app-basic.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppBasicComponent implements OnInit {

  open : boolean = true

  ngOnInit(): void {
    let matchMedia = window.matchMedia("(max-width: 800px)");
    this.open = ! matchMedia.matches;
  }

}
