import {Component, ContentChild, HostListener, Input, OnInit, TemplateRef, ViewEncapsulation} from '@angular/core';
import {animate, style, transition, trigger, AnimationEvent} from "@angular/animations";

export interface CarouselQuery {
  index : number;
  limit : number
}

interface Step {
  index : number
  data : any[]
}

@Component({
  selector: 'as-carousel',
  templateUrl: 'as-carousel.component.html',
  styleUrls: ['as-carousel.component.css'],
  encapsulation : ViewEncapsulation.None,
  animations : [
    trigger("openClose", [
      transition('none => right', [
        animate("300ms cubic-bezier(0,.77,.5,1)", style({
          transform : "translateX(-400px)"
        }))
      ]),
      transition('none => left', [
        animate("300ms cubic-bezier(0,.77,.5,1)", style({
          transform : "translateX(+400px)"
        }))
      ])
    ])
  ]
})
export class AsCarouselComponent implements OnInit {

  direction = "none"
  value = 0;

  index = 0;
  limit = 5;

  cursor = {
    segments : 0,
    step : 0
  }
  segments : Step[] = [];

  @ContentChild(TemplateRef) templateRef! : TemplateRef<any>

  @Input() items! : (query : CarouselQuery, callback : (rows : any) => void) => void

  onAnimationEvent(event: AnimationEvent) {
    if (event.fromState === "none" && event.toState === "right") {
      this.direction = "none"
      let step = this.segments[this.cursor.segments];
      if (this.cursor.segments < this.segments.length - 1 && this.cursor.step === step.data.length - 1) {
        this.cursor.segments++
        this.cursor.step = 0;
      } else {
        if (this.cursor.step < step.data.length - 1) {
          this.cursor.step++
        }
      }


      let threshold = Math.floor(this.limit / 2);

      if (this.cursor.step === threshold && ! this.segments[this.cursor.segments + 1]) {
        this.index = step.index + this.limit;
        this.loadRight()
      }
    }

    if (event.fromState === "none" && event.toState === "left") {
      this.direction = "none"

      let step = this.segments[this.cursor.segments];
      if (this.cursor.segments > 0 && this.cursor.step === 0) {
        this.cursor.segments--
        this.cursor.step = this.limit - 1;
      } else {
        if (this.cursor.step > 0) {
          this.cursor.step--
        }
      }

      let threshold = Math.ceil(this.limit / 2);

      if (this.cursor.step === threshold && ! this.segments[this.cursor.segments - 1] && this.index > 0) {
        this.index = step.index - this.limit;
        this.loadLeft()
      }
    }
  }

  get prevItem() {
    if (this.cursor.step === 0) {
      let step = this.segments[this.cursor.segments - 1];
      if (step) {
        return step.data[this.limit - 1]
      }
      return null;
    } else {
      let step = this.segments[this.cursor.segments];
      if (step) {
        return step.data[this.cursor.step - 1]
      }
      return null;
    }
  }

  get currentItem() {
    let step = this.segments[this.cursor.segments];
    if (step) {
      return step.data[this.cursor.step]
    }
    return null;
  }

  get nextItem() {
    if (this.cursor.step === this.limit - 1) {
      let step = this.segments[this.cursor.segments + 1];
      if (step) {
        return step.data[0]
      }
      return null;
    } else {
      let step = this.segments[this.cursor.segments];
      if (step) {
        return step.data[this.cursor.step + 1]
      }
      return null;
    }
  }

  ngOnInit(): void {
    this.loadRight();
  }

  onRight() {
    this.direction = "right"
  }

  onLeft() {
    this.direction = "left"
  }

  @HostListener("wheel", ["$event"])
  onWheel(event : WheelEvent) {
    event.stopPropagation();
    event.preventDefault();

    if (event.deltaY > 0) {
      this.direction = "right"
    } else {
      this.direction = "left"
    }

    return false;
  }


  loadRight() {
    this.items({index : this.index, limit : this.limit}, (rows) => {
      if (rows.length > 0) {
        this.segments.push({
          index : this.index,
          data : rows
        })
      }

      if (this.segments.length > 3) {
        this.segments.shift()
        this.cursor.segments--
      }
    })
  }

  loadLeft() {
    this.items({index : this.index, limit : this.limit}, (rows) => {
      this.segments = [{data : rows, index : this.index}, ...this.segments]

      if (this.segments.length > 3) {
        this.segments.pop()
        this.cursor.segments++
      }
    })
  }


}
