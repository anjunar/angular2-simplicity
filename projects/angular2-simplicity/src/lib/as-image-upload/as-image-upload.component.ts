import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

export interface AsImageModel {
  width : number
  height : number;
  data: string,
  name: string
  cropped? : AsImageModel
}

@Component({
  selector: 'as-image-upload',
  templateUrl: 'as-image-upload.component.html',
  styleUrls: ['as-image-upload.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsImageUploadComponent),
      multi: true
    }
  ]
})
export class AsImageUploadComponent implements ControlValueAccessor, AfterViewInit {

  @ViewChild("input") inputRef!: ElementRef<HTMLInputElement>
  @ViewChild("canvas") canvasRef!: ElementRef<HTMLCanvasElement>
  @ViewChild("container") containerRef!: ElementRef<HTMLDivElement>

  @Output() ngModelChange = new EventEmitter<AsImageModel>();

  @Input() name!: string

  model!: AsImageModel

  image = new Image()
  imageSizing = 1
  imageOffsetX = 0
  imageOffsetY = 0

  rectangleOffsetX = 0
  rectangleOffsetY = 0
  @Input("cropWidth") rectangleWidth = 100
  @Input("cropHeight") rectangleHeight = 100
  @Input() cropping = false;

  width: number = 0;
  height: number = 0;

  range: number = 25;

  @Input() placeholder = ""
  disabled = false;

  ngAfterViewInit(): void {

    this.ngModelChange.subscribe((model) => {
      if (model.name.length > 0 && model.data.length > 0) {
        this.image = new Image();
        this.image.src = model.data;
        this.imageOffsetX = 0;
        this.imageOffsetY = 0;
        this.imageSizing = 1;
        this.range = 25
        this.rectangleOffsetX = this.containerRef.nativeElement.offsetWidth / 2 - this.rectangleWidth / 2
        this.rectangleOffsetY = this.containerRef.nativeElement.offsetHeight / 2 - this.rectangleHeight / 2
        this.model.width = this.image.width
        this.model.height = this.image.height
        this.draw();
      }
    })

    setTimeout(() => {
      this.width = this.containerRef.nativeElement.offsetWidth;
      this.height = this.containerRef.nativeElement.offsetHeight;
    })
  }

  onRange(value : number) {
    this.imageSizing = value / 25
    this.draw();
  }

  onDelete(event : Event) {
    event.stopPropagation();
    this.image = new Image();
    this.model = {
      cropped : {
        data : "",
        name : "",
        width : 0,
        height : 0
      },
      data : "",
      name : "",
      width : 0,
      height : 0
    }
    this.ngModelChange.emit(this.model)
    this.onChange(this.model)
  }

  onMouseDown(event : MouseEvent) {
    if (this.cropping) {
      event.preventDefault();

      let deltaY = 0, pointerY = event.clientY;
      let deltaX = 0, pointerX = event.clientX;

      document.onmousemove = (event: any) => {
        event.preventDefault();

        deltaY = pointerY - event.clientY;
        pointerY = event.clientY;
        deltaX = pointerX - event.clientX;
        pointerX = event.clientX;

        if (
          event.layerY > this.rectangleOffsetY &&
          event.layerY < this.rectangleOffsetY + this.rectangleWidth &&
          event.layerX > this.rectangleOffsetX &&
          event.layerX < this.rectangleOffsetX + this.rectangleHeight) {
          this.rectangleOffsetX -= deltaX
          this.rectangleOffsetY -= deltaY
        } else {
          this.imageOffsetX += deltaX
          this.imageOffsetY += deltaY;
        }

        this.draw();
      };

      document.onmouseup = () => {
        document.onmouseup = null;
        document.onmousemove = null;
      };
    }

  }
  draw() {
    window.requestAnimationFrame(() => {
      let canvas = this.canvasRef.nativeElement;
      let width = canvas.width, height = canvas.height;
      let context = canvas.getContext("2d", { willReadFrequently: true });
      if (context) {
        context.clearRect(0, 0, width, height);
        let horizontalRatio = this.image.width / this.image.height;
        let verticalRatio = this.image.height / this.image.width;

        if (horizontalRatio < 1) {
          let dw = height * horizontalRatio * this.imageSizing;
          let dh = height * this.imageSizing;
          let left = (width / 2 - dw / 2) - this.imageOffsetX
          let top = (height / 2 - dh / 2) - this.imageOffsetY
          context.drawImage(this.image, left, top, dw, dh)
        }
        if (verticalRatio < 1) {
          let dh = width * verticalRatio * this.imageSizing;
          let dw = width * this.imageSizing;
          let left = (width / 2 - dw / 2) - this.imageOffsetX
          let top = (height / 2 - dh / 2) - this.imageOffsetY
          context.drawImage(this.image, left, top, dw, dh)
        }

        if (this.cropping) {
          context.strokeRect(this.rectangleOffsetX, this.rectangleOffsetY, this.rectangleWidth, this.rectangleHeight)

          let imageData = context.getImageData(this.rectangleOffsetX, this.rectangleOffsetY, this.rectangleWidth, this.rectangleHeight);
          let tempCanvas = document.createElement("canvas");
          tempCanvas.width = imageData.width;
          tempCanvas.height = imageData.height;
          let tempContext = tempCanvas.getContext("2d");
          if (tempContext) {
            tempContext.putImageData(imageData, 0,0);
            this.model.cropped = {
              data : tempCanvas.toDataURL(),
              name : this.model.name,
              width : imageData.width,
              height : imageData.height
            }
          }
        }
      }
    })
  }



  @Input()
  get ngModel() {
    return this.model;
  }

  set ngModel(value: AsImageModel) {
    this.model = value;
    if (this.onChange) {
      this.onChange(value);
    }
  }

  onChange!: (value: any) => void

  get input() {
    return this.inputRef.nativeElement;
  }

  onAreaClick() {
    if (!this.disabled) {
      this.input.value = "";
      this.input.click()
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
            this.model = {
              data: <string>event.target.result,
              name: file.name,
              width : 0,
              height : 0
            }
            this.onChange(this.model);
            this.ngModelChange.emit(this.model);
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

  writeValue(value: any): void {
    if (value) {
      this.model = value;
    }
  }


}
