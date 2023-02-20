import {AfterViewInit, Component, EventEmitter, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AsViewportComponent} from "angular2-simplicity";

@Component({
  selector: 'app-advanced',
  templateUrl: 'app-advanced.component.html',
  styleUrls: ['app-advanced.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppAdvancedComponent implements OnInit, AfterViewInit {

  open : boolean = true
  @ViewChild(AsViewportComponent) viewport!: AsViewportComponent

  onViewport = new EventEmitter<AsViewportComponent>();
  ngOnInit(): void {
    let matchMedia = window.matchMedia("(max-width: 800px)");
    this.open = ! matchMedia.matches;
  }

  ngAfterViewInit(): void {
    this.onViewport.emit(this.viewport)
  }

}
