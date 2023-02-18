import {
  AfterViewInit,
  Component,
  ComponentRef,
  ContentChild,
  ElementRef,
  Input, OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {AsScrollPartComponent} from "./as-scroll-part/as-scroll-part.component";
import {AsViewportComponent} from "../as-viewport/as-viewport.component";

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
export class AsInfiniteScrollComponent implements AfterViewInit, OnDestroy {

  index = 0;
  @Input() limit = 10;

  loading = false;

  @Input() scrollOnViewport = true;

  components: ComponentRef<AsScrollPartComponent>[] = [];

  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>

  @ViewChild("viewport", {read: ElementRef}) viewportSelfRef!: ElementRef<HTMLDivElement>
  @ViewChild("container", {read: ElementRef}) containerRef!: ElementRef<HTMLDivElement>
  @ViewChild("viewContainerRef", {read: ViewContainerRef}) viewContainerRef!: ViewContainerRef

  @Input() items!: (query: InfinityQuery, callback: (rows: any[]) => void) => void

  onScroll!: (event: Event) => void

  constructor(private viewport : AsViewportComponent) {}

  get scroll() {
    if (this.scrollOnViewport) {
      return this.viewport.element
    }
    return this.viewportSelf
  }

  get viewportSelf() : HTMLDivElement {
    return this.viewportSelfRef.nativeElement;
  }

  get container() : HTMLDivElement {
    return this.containerRef.nativeElement;
  }

  ngAfterViewInit(): void {
    let prevScrollPos = this.scroll.scrollTop;

    let handler = () => {
      console.log(this.scroll.scrollTop)
      let currentScrollPos = this.scroll.scrollTop;

      if (prevScrollPos < currentScrollPos) {
        // scrolling down
        const scrollTop = this.scroll.scrollTop;
        const scrollHeight = this.container.offsetHeight
        const windowHeight = this.scroll.offsetHeight


        if (((scrollTop + windowHeight * 2) >= scrollHeight) && ! this.loading) {
          let component = this.components[this.components.length - 1];
          this.index = component.instance.index + this.limit;
          this.loadDownward()
        }
      } else {
        // scrolling up
        let component = this.components[0];

        if ((this.scroll.scrollTop < (this.scroll.offsetHeight) && component.instance.index > 0) && ! this.loading) {
          this.index = component.instance.index - this.limit;
          this.loadUpward();
        }
      }
      prevScrollPos = currentScrollPos;
    }

    this.onScroll = (event: Event) => {
      if (this.scrollOnViewport) {
        if (event.target === this.scroll) {
          handler();
        }
      } else {
        if (event.target === this.viewportSelf) {
          handler();
        }
      }
    }

    this.viewportSelf.addEventListener("scroll", this.onScroll)
    if (this.viewport) {
      this.viewport.element.addEventListener("scroll", this.onScroll)
    }

    this.loadDownward();
  }

  ngOnDestroy(): void {
    this.viewportSelf.removeEventListener("scroll", this.onScroll)
    if (this.viewport) {
      this.viewport.element.removeEventListener("scroll", this.onScroll)
    }
  }

  loadDownward() {
    this.loading = true
    this.items({index: this.index, limit: this.limit}, (rows) => {
      if (rows.length > 0) {
        let componentRef = this.viewContainerRef.createComponent(AsScrollPartComponent);
        componentRef.instance.index = this.index
        componentRef.instance.items = rows;
        componentRef.instance.templateRef = this.templateRef;
        this.components.push(componentRef)
        if (this.viewContainerRef.length > 3) {
          this.viewContainerRef.remove(0)
          this.components.splice(0, 1)
        }
        this.loading = false;
      }
    })
  }

  loadUpward() {
    this.loading = true;
    this.items({index: this.index, limit: this.limit}, (rows) => {
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
        }


        this.scroll.scrollTo({
          top : this.viewportSelf.offsetHeight / (this.limit / 2)
        })
      }
      this.loading = false
    })
  }


}
