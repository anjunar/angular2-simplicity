import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter, forwardRef,
  Input,
  Output, QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

export interface AsVideoUploadModel {
  name : string,
  lastModified : number,
  data : string | ArrayBuffer,
  type : string,
  thumbnail : string
}

const generateVideoThumbnailImmediate = (video: HTMLVideoElement) : Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");

    video.autoplay = true;
    video.muted = true;

    video.onloadeddata = () => {
      let ctx = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (ctx) {
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        video.pause();
        return resolve(canvas.toDataURL("image/png"));
      }
      return reject();
    };
  });
};


const generateVideoThumbnail = (video : HTMLVideoElement) => {
  const canvas = document.createElement("canvas");

  let ctx = canvas.getContext("2d");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  if (ctx) {
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    video.pause();
    return canvas.toDataURL("image/png");
  }
  return null;
};

@Component({
  selector: 'as-video-upload',
  templateUrl: 'as-video-upload.component.html',
  styleUrls: ['as-video-upload.component.css'],
  encapsulation : ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsVideoUploadComponent),
      multi: true
    }
  ]
})
export class AsVideoUploadComponent implements AfterViewInit, ControlValueAccessor {

  @Input() placeholder : string = "Click here..."
  @ViewChild("input") inputRef! : ElementRef<HTMLInputElement>
  @ViewChildren("video") videoRef! : QueryList<ElementRef<HTMLVideoElement>>

  @Input() ngModel! : AsVideoUploadModel | null
  @Output() ngModelChange = new EventEmitter<AsVideoUploadModel | null>();

  image : any;

  width! : number;
  height! : number;

  onChange!: (value: any) => void

  @Input() disabled : boolean = false;

  constructor(private sanitizer: DomSanitizer, private elementRef : ElementRef) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.width = this.elementRef.nativeElement.offsetWidth
      this.height = this.elementRef.nativeElement.offsetHeight
    })

    this.videoRef.changes.subscribe((queryList : QueryList<ElementRef<HTMLVideoElement>>) => {
      let elementRef = queryList.get(0);
      if (elementRef) {
        elementRef.nativeElement.onseeked = (event : Event) => {
          let thumbnail = generateVideoThumbnail(event.target as HTMLVideoElement);
          if (thumbnail) {
            if (this.ngModel) {
              this.ngModel.thumbnail = thumbnail
            }

          }
        }
        generateVideoThumbnailImmediate(elementRef.nativeElement)
          .then((thumbnail : string) => {
            if (this.ngModel) {
              this.ngModel.thumbnail = thumbnail
            }
          })
      }
    })
  }

  onDeleteClick() {
    this.ngModel = null;
    this.ngModelChange.emit(this.ngModel)
    if (this.onChange) {
      this.onChange(this.ngModel)
    }
  }

  onPlaceholderClick() {
    this.inputRef.nativeElement.value = "";
    this.inputRef.nativeElement.click();
  }

  onInputChange(event : Event) {
    let input = event.target as HTMLInputElement
    if (input.files) {
      let file = input.files[0];
      let reader = new FileReader();
      reader.onload = (e : Event) => {
        if (reader.result) {
          this.ngModel = {
            name : file.name,
            lastModified : file.lastModified,
            type : file.type,
            data : reader.result,
            thumbnail : ""
          }
          this.ngModelChange.emit(this.ngModel);

          if (this.onChange) {
            this.onChange(this.ngModel)
          }
        }
      }
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
