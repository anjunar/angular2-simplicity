import {Component, ElementRef, Input, ViewEncapsulation} from '@angular/core';
import highlight from 'highlight.js';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';

highlight.registerLanguage('typescript', typescript);
highlight.registerLanguage('xml', xml);

@Component({
  selector: 'as-code',
  templateUrl: 'as-code.component.html',
  styleUrls: ['as-code.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AsCodeComponent {

  @Input() code!: string;

  @Input() type!: string;

  convert(html: string) {
    let spaceRegex = /\S/;

    let split = html.split("\n");
    let indexOfFirstChar = 100;
    for (const segment of split) {
      let exec = spaceRegex.exec(segment);
      if (exec !== null && indexOfFirstChar > exec.index) {
        indexOfFirstChar = exec.index;
      }
    }

    let index = 1;
    let result = "";
    for (const segment of split) {
      let exec = spaceRegex.exec(segment);
      if (exec !== null) {
        result = result + segment.substr(indexOfFirstChar, segment.length) + "\n";
      } else {
        result = result + "\n"
      }
    }

    return result;
  }

  get highlight(): string {
    if (this.code) {
      return highlight.highlight(this.code, {language: this.type}).value
    }
    return "";
  }

}
