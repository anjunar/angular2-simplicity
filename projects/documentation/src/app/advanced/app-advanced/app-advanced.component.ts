import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-advanced',
  templateUrl: 'app-advanced.component.html',
  styleUrls: ['app-advanced.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppAdvancedComponent implements OnInit {

  open : boolean = true

  ngOnInit(): void {
    let matchMedia = window.matchMedia("(max-width: 800px)");
    this.open = ! matchMedia.matches;
  }

}
