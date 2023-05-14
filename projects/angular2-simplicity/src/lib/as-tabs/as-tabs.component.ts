import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter, Input,
  Output,
  QueryList, TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {AsTabComponent} from "../as-tab/as-tab.component";

@Component({
  selector: 'as-tabs',
  templateUrl: 'as-tabs.component.html',
  styleUrls: ['as-tabs.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AsTabsComponent implements AfterContentInit {

  @Input() horizontal = true


  @Input() page : number = 0;
  @Output() pageChange : EventEmitter<number> = new EventEmitter<number>()
  @ContentChildren(AsTabComponent) tabs!: QueryList<AsTabComponent>

  ngAfterContentInit(): void {
    this.tabs.changes.forEach((value : any) => {
      let queryList : QueryList<AsTabComponent> = value;
      queryList.forEach((tab : AsTabComponent, index: number, array : AsTabComponent[]) => {
        tab.horizontal = this.horizontal;

        tab.click.subscribe((selected : boolean) => {
          this.tabs.forEach((tab) => {
            tab.selected = false;
          })

          tab.selected = true;
          this.pageChange.emit(array.indexOf(tab));
        })
      })
    });

    this.tabs.notifyOnChanges()

    let tab = this.tabs.get(this.page);
    if (tab) {
      tab.selected = true
    }
  }
}
