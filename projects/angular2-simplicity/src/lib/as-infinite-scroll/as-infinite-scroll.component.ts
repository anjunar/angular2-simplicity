import {
  AfterViewInit,
  Component,
  ComponentRef,
  ContentChild,
  ElementRef, EventEmitter,
  Input, OnDestroy,
  OnInit, Optional, Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {AsScrollPartComponent} from "./as-scroll-part/as-scroll-part.component";
import {AsViewportComponent} from "../as-viewport/as-viewport.component";
import {AsScrollAreaComponent} from "../as-scroll-area/as-scroll-area.component";

export interface InfinityQuery {
  index: number
  limit: number
}

@Component({
  selector: 'as-infinity-scroll',
  templateUrl: 'as-infinite-scroll.component.html',
  styleUrls: ['as-infinite-scroll.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AsInfiniteScrollComponent implements AfterViewInit {

  index = 0;
  @Input() limit = 10;

  loading = false;

  components: ComponentRef<AsScrollPartComponent>[] = [];

  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>

  @ViewChild("container", {read: ElementRef}) containerRef!: ElementRef<HTMLDivElement>
  @ViewChild("viewContainerRef", {read: ViewContainerRef}) viewContainerRef!: ViewContainerRef

  @Output() items = new EventEmitter<{query: InfinityQuery, callback: (rows: any[]) => void}>();

  constructor(private scroll : AsScrollAreaComponent) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      let prevScrollPos = this.scroll.scrollY;

      let handler = () => {
        let currentScrollPos = this.scroll.scrollY;

        if (prevScrollPos < currentScrollPos) {
          // scrolling down
          const scrollTop = this.scroll.scrollY;


          if (scrollTop > 0.8 && ! this.loading) {
            let component = this.components[this.components.length - 1];
            this.index = component.instance.index + this.limit;
            this.loadDownward()
          }
        } else {
          // scrolling up
          const scrollTop = this.scroll.scrollY;
          let component = this.components[0];

          if ((scrollTop < 0.2 && component.instance.index > 0) && ! this.loading) {
            this.index = component.instance.index - this.limit;
            this.loadUpward();
          }
        }
        prevScrollPos = currentScrollPos;
      }

      this.scroll.scroll.subscribe(() => {
        handler();
      })

      this.loadDownward();
    })
  }

  add(model : any) {
    let componentRef = this.components.find(component => component.instance.items.length < this.limit);
    if (componentRef) {
      componentRef.instance.items.push(model)
    }
  }

  delete(value : string) {
    this.components.forEach((component) => component.instance.delete(value))
  }

  loadDownward() {
    this.loading = true
    this.items.emit({query : {index: this.index, limit: this.limit}, callback : (rows) => {
        if (rows.length > 0) {
          let componentRef = this.viewContainerRef.createComponent(AsScrollPartComponent);
          componentRef.instance.index = this.index
          componentRef.instance.items = rows;
          componentRef.instance.templateRef = this.templateRef;
          this.components.push(componentRef)
          if (this.viewContainerRef.length > 3) {
            this.viewContainerRef.remove(0)
            this.components.splice(0, 1)
            setTimeout(() => {
              let offsetPosition = componentRef.location.nativeElement.offsetHeight / this.scroll.height;
              this.scroll.scrollY -= offsetPosition;
              this.scroll.onScrollY(this.scroll.scrollY)
            })
          }
          this.loading = false;
        }
      }})
  }

  loadUpward() {
    this.loading = true;
    this.items.emit({query : {index: this.index, limit: this.limit}, callback : (rows) => {
        let component = this.components[0];

        if (component.instance.index > -1) {
          let componentRef = this.viewContainerRef.createComponent(AsScrollPartComponent);
          this.viewContainerRef.move(componentRef.hostView, 0)


          componentRef.instance.index = this.index
          componentRef.instance.items = rows;
          componentRef.instance.templateRef = this.templateRef;

          this.components = [componentRef, ...this.components]

          if (this.viewContainerRef.length > 3) {
            this.viewContainerRef.remove(this.viewContainerRef.length - 1)
            this.components.splice(this.components.length - 1, 1)
            setTimeout(() => {
              let offsetPosition = componentRef.location.nativeElement.offsetHeight / this.scroll.height;
              this.scroll.scrollY += offsetPosition;
              this.scroll.onScrollY(this.scroll.scrollY)
            })
          }

        }
        this.loading = false
      }})
  }


}
