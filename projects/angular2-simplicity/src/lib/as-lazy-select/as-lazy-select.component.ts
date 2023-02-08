import {
  Component,
  ContentChild,
  ElementRef, EventEmitter,
  forwardRef,
  HostListener,
  Injector,
  Input, OnChanges,
  OnInit, Optional, Output, SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {AsInputService, InputElement} from "../as-input.service";
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from "@angular/forms";
import {AsViewportComponent} from "../as-viewport/as-viewport.component";

export interface SelectQuery {
  index: number,
  limit: number,
  value: string
}


@Component({
  selector: 'as-lazy-select',
  templateUrl: 'as-lazy-select.component.html',
  styleUrls: ['as-lazy-select.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers : [
    AsInputService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsLazySelectComponent),
      multi: true
    }
  ]
})
export class AsLazySelectComponent implements OnInit, ControlValueAccessor, InputElement {

  index = 0;
  limit = 5;
  size = 0;

  window: any[] = [];
  display: string = ""
  name = "";
  showSelected = false;
  search = "";
  @Input() model!: any[] | any | null;
  @Output() modelChange = new EventEmitter<any>();

  open = false;

  @Input() items!: (query: SelectQuery, callback: (rows: any[], size: number) => void) => void;
  @Input() label: string[] | string = "name";
  @Input() placeholder = "";
  @Input() disabled = false;
  @Input() multiSelect = false;
  @Input() trackBy = "id";

  @ViewChild(AsInputService) service!: AsInputService
  @ViewChild("overlay", {read : ElementRef}) overlay! : ElementRef
  @ContentChild(TemplateRef, {descendants : true}) templateRef!: TemplateRef<any>

  onChange!: (_: any) => {}

  constructor(private elementRef: ElementRef<HTMLElement>, private injector: Injector, private inputService : AsInputService,@Optional() private viewport : AsViewportComponent) {
    inputService.input = this;
    inputService.element = elementRef.nativeElement;
    elementRef.nativeElement.tabIndex = 0;
  }

  get getPlaceholder(): string {
    return this.placeholder;
  }

  set setPlaceholder(value: string) {
    this.placeholder = value;
  }

  @HostListener("window:click")
  onWindowClick() {
    this.open = false;
  }

  ngOnInit(): void {
    this.inputService.ngControl = this.injector.get(NgControl);
    if (this.multiSelect) {
      this.model = this.model || [];
    } else {
      this.model = this.model || null;
    }

    this.doRender();
  }

  doRender() {
    let label = this.label;


    if (this.model) {
      if (this.multiSelect) {
        if (label instanceof Array) {
          let labelArray: string[] = label;
          this.display = this.model.map((model: any) => labelArray.map((label: string) => model[label]).join(" ")).join(", ")
        } else {
          let labelString: string = label;
          this.display = this.model.map((model: any) => model[labelString]).join(", ")
        }
      } else {
        if (label instanceof Array) {
          this.display = label.map((label) => this.model[label]).join(" ")
        } else {
          this.display = this.model[label]
        }
      }
    } else {
      this.display = ""
    }
  }

  inputWidth() {
    this.service.element.offsetWidth;
  }

  onItemClicked(event: Event, item: any) {
    event.stopPropagation();
    if (this.multiSelect) {
      if (this.model instanceof Array) {
        let find = this.model.find(model => model[this.trackBy] === item[this.trackBy]);
        if (!find) {
          this.model.push(item);
        } else {
          let indexOf = this.model.indexOf(item);
          this.model.splice(indexOf, 1);
        }
      }
    } else {
      if (this.model) {
        let model = this.model;
        if (model[this.trackBy] === item[this.trackBy]) {
          this.model = null;
        } else {
          this.model = item;
        }
      } else {
        this.model = item;
      }

    }

    this.doRender();

    if (this.onChange) {
      this.onChange(this.model)
    }

    this.modelChange.emit(this.model);

    return false;
  }

  openOverlay(event: Event) {
    event.stopPropagation();
    if (this.disabled === undefined || this.disabled === null || this.disabled === false) {
      this.load();
    }
    return false;
  }

  up(event: Event) {
    event.stopPropagation();
    this.index -= this.limit
    this.load();
    return false;
  }

  down(event: Event) {
    event.stopPropagation();
    this.index += this.limit;
    this.load();
    return false;
  }

  checkbox(event: Event, item: any) {
    event.stopPropagation();
    this.onItemClicked(event, item);
    return true;
  }

  showSelectedClick(event: Event) {
    event.stopPropagation();

    this.showSelected = !this.showSelected;

    if (this.showSelected) {
      this.index = 0;
      if (this.model) {
        if (this.multiSelect) {
          let model = this.model;
          if (model instanceof Array) {
            this.size = model.length;
            this.window = model.slice(this.index, this.index + this.limit);
          }
        } else {
          let model = this.model;
          this.window = [model];
        }
      }
    } else {
      this.load();
    }

    return false;
  }

  searchBox(event: Event) {
    event.stopPropagation();
    return false;
  }

  onWheel(event: WheelEvent) {
    event.stopPropagation();
    event.preventDefault();

    if (event.deltaY > 0) {
      if (this.index + this.limit < this.size) {
        this.index += this.limit
        this.load();
      }
    } else {
      if (this.index > 0) {
        this.index -= this.limit
        this.load();
      }
    }

    return false;
  }

  selected(item: any) {
    if (this.multiSelect) {
      if (this.model instanceof Array) {
        return this.model.some((model) => model[this.trackBy] === item[this.trackBy])
      }
    } else {
      if (this.model) {
        let model = this.model;
        return model[this.trackBy] === item[this.trackBy];
      }
      return false;
    }
    return false;
  }

  load() {
    if (this.showSelected) {
      this.open = true;
      if (this.multiSelect) {
        if (this.model instanceof Array) {
          this.window = this.model.slice(this.index, this.index + this.limit);
        }
      } else {
        if (this.model) {
          this.window = [this.model];
        }
      }
    } else {
      this.items({index: this.index, limit: this.limit, value: this.search}, (data: any[], size: number) => {
        this.size = size;
        this.open = true;
        this.showSelected = false;
        this.window = data;

        setTimeout(() => {
          if (this.viewport) {
            let viewport = this.viewport.element;
            let height = 14 + 39 + data.length * 42;
            let selectBoundingClientRect = this.elementRef.nativeElement.getBoundingClientRect();
            let viewPortBoundingClientRect = viewport.getBoundingClientRect();
            let overlay = this.overlay.nativeElement;
            if (selectBoundingClientRect.top + height > viewPortBoundingClientRect.top + viewPortBoundingClientRect.height) {
              overlay.style.top = "initial"
              overlay.style.bottom = "24px"
            } else {
              overlay.style.top = "14px";
              overlay.style.bottom = "initial";
            }
          }
        })
      })
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    if (obj) {
      this.model = obj;
      this.doRender()
    }
  }


}
