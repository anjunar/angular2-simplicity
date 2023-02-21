import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {WindowManagerService, WindowRef} from "../window-manager.service";
import {AsTableConfigurationComponent} from "./as-table-configuration/as-table-configuration.component";
import {AsTableInterface, TableColumn, TableQuery} from "./as-table.classes";

@Component({
  selector: 'as-table',
  templateUrl: './as-table.component.html',
  styleUrls: ['./as-table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AsTableComponent implements OnInit, AfterContentInit, AsTableInterface {

  @ContentChildren("filter", {descendants: true}) templateRefsFilter!: QueryList<TemplateRef<any>>
  @ContentChildren("col", {descendants: true}) templateRefsCol!: QueryList<ElementRef>
  @ContentChildren("head", {descendants: true}) templateRefsHeader!: QueryList<TemplateRef<any>>
  @ContentChildren("body", {descendants: true}) templateRefsBody!: QueryList<TemplateRef<any>>

  index = 0;
  limit = 5;
  size = 0;

  @Output() items = new EventEmitter<{query : TableQuery, callback : (rows : any[], size : number) => void}>();
  window : any[] = [];
  columns: TableColumn[] = [];
  @Output() rowClick : EventEmitter<any> = new EventEmitter<any>();

  constructor(private windowManager : WindowManagerService) {}

  templateRefFilter(index: number): TemplateRef<any> | null {
    return this.templateRefsFilter.get(index) || null
  }

  templateRefHeader(index: number): TemplateRef<any> | null {
    return this.templateRefsHeader.get(index) || null
  }

  templateRefBody(index : number) : TemplateRef<any> | null {
    return this.templateRefsBody.get(index) || null
  }

  ngOnInit() {
    this.load();
  }

  ngAfterContentInit(): void {
    this.templateRefsCol.changes.subscribe(() => {
      this.columns = this.templateRefsCol.map((template, index) => {
        let pathAttribute = template.nativeElement.getAttribute("path");
        return {
          property : pathAttribute,
          index : index,
          visible : true,
          sort : "none",
          search : ""
        }
      })
    })

    this.templateRefsCol.notifyOnChanges();
  }

  configuration(columns : TableColumn[], allVisible: boolean) : TableColumn[] {
    if (allVisible) {
      return columns;
    }
    return columns.filter(column => column.visible)
  }

  showConfiguration(){
    let configurationRef : WindowRef<AsTableConfigurationComponent> = this.windowManager.create(AsTableConfigurationComponent, {header : "Table"});
    configurationRef.instance.table = this;
  }

  onRowClick(row : any) {
    this.rowClick.emit(row);
  }

  desc(td : TableColumn) {
    let column = this.columns[td.index];
    column.sort = "desc";
    td.sort = "desc";
    this.load();
  }

  asc(td : TableColumn) {
    let column = this.columns[td.index];
    column.sort = "asc";
    td.sort = "asc"
    this.load();
  }

  none(td : TableColumn) {
    let column = this.columns[td.index];
    column.sort = "none";
    td.sort = "none";
    this.load();
  }

  left(index: number): void {
    let element = this.columns[index];
    let other = this.columns[index - 1];

    let newColumns = Array.from(this.columns);
    newColumns[index] = other;
    newColumns[index - 1] = element;

    this.columns = newColumns;
  }

  right(index: number): void {
    let element = this.columns[index];
    let other = this.columns[index + 1];

    let newColumns = Array.from(this.columns);

    newColumns[index] = other;
    newColumns[index + 1] = element;

    this.columns = newColumns;
  }

  skipPrevious() {
    this.index = 0;
    this.load();
  }

  arrowLeft() {
    this.index -= this.limit;
    this.load();
  }

  arrowRight() {
    this.index += this.limit;
    this.load();
  }

  skipNext() {
    let number = Math.round(this.size / this.limit);
    this.index = (number - 1) * this.limit;
    this.load();
  }

  load() {

    let query : TableQuery = {
      index: this.index,
      limit: this.limit,
      filter : null,
      sort : []
    };

    let filter = this.columns
      .filter((column) => {
        let search = column.search;
        if (search instanceof Array) {
          return search.length > 0;
        }
        if (search instanceof Object) {
          return (search.from && search.to)
        }
        return column.search && (Number.isInteger(column.search))
      })

      .reduce((previous : TableColumn, current) => {
        let path : string = current.property;
        previous.search = current.search;
        return previous;
      }, {} as TableColumn)

    let sorting = this.columns
      .filter((column) => column.sort)
      .map((column) => column.property + ":" + column.sort)

    query.filter = filter;

    if (sorting.length > 0) {
      query.sort = sorting
    }

    this.items.emit({
      query : query,
      callback : (rows : any[], size: number) => {
        this.window = rows;
        this.size = size
      }
    })
  }

}
