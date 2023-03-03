import {Component, ContentChild, TemplateRef, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'as-page',
  templateUrl: 'as-page.component.html',
  styleUrls: ['as-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AsPageComponent {

  active = false;

  @ContentChild(TemplateRef) templateRef! : TemplateRef<any>

}
