import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output, QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

interface Model {
  name : string,
  lastModified : number,
  data : any,
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
  encapsulation : ViewEncapsulation.None
})
export class AsVideoUploadComponent implements AfterViewInit {

  @Input() placeholder : string = "Click here..."
  @ViewChild("input") inputRef! : ElementRef<HTMLInputElement>
  @ViewChildren("video") videoRef! : QueryList<ElementRef<HTMLVideoElement>>

  @Input() ngModel! : Model | null
  @Output() ngModelChange = new EventEmitter<Model | null>();

  image : any;

  width! : number;
  height! : number;

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
        this.ngModel = {
          name : file.name,
          lastModified : file.lastModified,
          type : file.type,
          data : reader.result,
          thumbnail : ""
        }
        this.ngModelChange.emit(this.ngModel);
      }
      reader.readAsDataURL(file);
    }
  }
}
