import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  forwardRef,
  HostListener,
  Input, Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

export interface AsBackgroundModel {
  width : number
  height : number;
  data: string,
  name: string
  cropped? : AsBackgroundModel
}


@Component({
  selector: 'as-image-background',
  templateUrl: 'as-image-background.component.html',
  styleUrls: ['as-image-background.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsImageBackgroundComponent),
      multi: true
    }
  ]
})
export class AsImageBackgroundComponent implements ControlValueAccessor, AfterViewInit {

  @ViewChild("image", {read : ElementRef}) imageRef!: ElementRef<HTMLImageElement>
  @ViewChild("input", {read : ElementRef}) inputRef!: ElementRef<HTMLInputElement>
  @ViewChild("container", {read : ElementRef}) container! : ElementRef<HTMLDivElement>

  scrollTop = 0;
  scrollRatio = 0;
  height = 200;

  disabled = false;
  move = false;

  @Input() src! : string

  @Input() ngModel! : AsBackgroundModel
  @Output() ngModelChange = new EventEmitter<AsBackgroundModel>();

  onChange!: (value: any) => void

  constructor(private elementRef : ElementRef) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scale();
    })
  }

  scale() {
    let width = this.elementRef.nativeElement.offsetWidth;
    let ratio = 9 / 32;
    this.height = ratio * width
  }

  @HostListener("window:resize")
  onWindowResize() {
    this.scale();

    let divElement = this.container.nativeElement;

    this.scrollTop = this.scrollRatio * divElement.offsetHeight;

    window.requestAnimationFrame(() => {
      divElement.scrollTo({
        top : this.scrollTop
      })
    })
  }

  onAreaClick() {
    if (!this.disabled) {
      this.inputRef.nativeElement.value = "";
      this.inputRef.nativeElement.click()
    }
  }

  onMoveClick() {
    this.move = ! this.move;
    let divElement = this.container.nativeElement;
    window.requestAnimationFrame(() => {
      divElement.scrollTo({
        top : this.scrollTop
      })
    })
  }

  onOkay() {
    let image = new Image()
    image.src = this.ngModel.data
    image.onload = () => {
      let canvas = document.createElement("canvas");
      canvas.width = image.width
      canvas.height = image.height

      let context = canvas.getContext("2d");
      if (context) {
        context.drawImage(image, 0,0)

        let scrollRatio = this.scrollTop / this.imageRef.nativeElement.offsetHeight;
        let heightRatio = this.container.nativeElement.offsetHeight / this.imageRef.nativeElement.offsetHeight;

        let top = image.height * scrollRatio;
        let height = image.height * heightRatio
        let width = image.width;

        let imageData = context.getImageData(0, top, width, height);

        let tempCanvas = document.createElement("canvas");
        tempCanvas.width = width
        tempCanvas.height = height;
        let tempContext = tempCanvas.getContext("2d");
        if (tempContext) {
          tempContext.putImageData(imageData, 0,0);
          this.ngModel.cropped = {
            data : tempCanvas.toDataURL(),
            name : this.ngModel.name,
            width : image.width,
            height : this.height
          }
        }
        this.move = false;

        this.ngModelChange.emit(this.ngModel);
        this.onChange(this.ngModel)
      }
    }
  }

  onMouseDown(event: MouseEvent) {
    if (this.move) {
      event.preventDefault();

      let deltaY = 0, pointerY = event.clientY;
      let deltaX = 0, pointerX = event.clientX;

      document.onmousemove = (event: any) => {
        event.preventDefault();

        deltaY = pointerY - event.clientY;
        pointerY = event.clientY;
        deltaX = pointerX - event.clientX;
        pointerX = event.clientX;

        this.scrollTop += deltaY

        if (this.scrollTop < 0) {
          this.scrollTop = 0;
        }

        let divElement = this.container.nativeElement;

        if (this.scrollTop > divElement.scrollHeight - divElement.offsetHeight) {
          this.scrollTop = divElement.scrollHeight - divElement.offsetHeight
        }

        this.scrollRatio = divElement.scrollTop / divElement.offsetHeight

        divElement.scrollTo({
          top : this.scrollTop
        })

      };

      document.onmouseup = () => {
        document.onmouseup = null;
        document.onmousemove = null;
      };
    }
  }

  onLoad(event: Event) {
    let input = event.target as HTMLInputElement;
    let files = input.files;
    if (files) {
      let file = files[0];

      let reader = new FileReader();

      reader.addEventListener("load", (event) => {
        if (event.target) {
          if (event.target.result) {
            this.ngModel = {
              data: <string>event.target.result,
              name: file.name,
              width : 0,
              height : 0
            }
            if (this.onChange) {
              this.onChange(this.ngModel);
            }
            this.ngModelChange.emit(this.ngModel);

            this.move = true;
          }
        }
      })

      reader.readAsDataURL(file);

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
      this.ngModel = obj;
    }
  }


}
