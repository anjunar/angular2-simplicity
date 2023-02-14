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

function debounce(func: any, wait: number, immediate?: boolean, disable?: boolean) {
  if (disable) {
    return func;
  }
  let timeout: number | undefined;
  return function () {
    // @ts-ignore
    const context: any = this, args = arguments;
    const later = function () {
      timeout = undefined;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
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

  components: ComponentRef<AsScrollPartComponent>[] = [];

  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>

  @ViewChild("container", {read: ElementRef}) containerRef!: ElementRef<HTMLDivElement>
  @ViewChild("viewContainerRef", {read: ViewContainerRef}) viewContainerRef!: ViewContainerRef

  @Input() items!: (query: InfinityQuery, callback: (rows: any[]) => void) => void

  onScroll!: (event: Event) => void

  constructor(private viewport : AsViewportComponent) {}

  get scroll() {
    return this.viewport.element
  }

  get container() {
    return this.containerRef.nativeElement;
  }

  ngAfterViewInit(): void {
    let prevScrollPos = this.scroll.scrollTop;
    this.onScroll = debounce((event: Event) => {
      let currentScrollPos = this.scroll.scrollTop;

      if (prevScrollPos < currentScrollPos) {
        // scrolling down
        if (this.container.offsetHeight - this.scroll.scrollTop < (this.scroll.offsetHeight)) {
          let component = this.components[this.components.length - 1];
          this.index = component.instance.index + this.limit;
          this.loadDownward()
        }
      } else {
        // scrolling up
        let component = this.components[0];

        if (this.scroll.scrollTop < (this.scroll.offsetHeight) && component.instance.index > 0) {
          console.log(component.instance.index)
          console.log(this.container.offsetHeight)
          console.log(this.scroll.scrollTop)
          console.log(this.scroll.offsetHeight)

          this.index = component.instance.index - this.limit;
          this.loadUpward();
        }
      }
      prevScrollPos = currentScrollPos;
    }, 300)

    this.viewport.element.addEventListener("scroll", this.onScroll)
  }

  ngOnDestroy(): void {
    this.viewport.element.removeEventListener("scroll", this.onScroll)
  }

  ngOnInit(): void {
    this.loadDownward();
  }

  loadDownward() {
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
      }
    })
  }

  loadUpward() {
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
      }

    })
  }


}
