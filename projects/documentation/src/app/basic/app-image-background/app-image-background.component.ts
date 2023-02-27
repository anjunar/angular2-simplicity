import {Component, ViewEncapsulation} from '@angular/core';
import {AppView} from "angular2-simplicity";
import {ActivatedRoute} from "@angular/router";
import {
  AsBackgroundModel
} from "angular2-simplicity";

@Component({
  selector: 'app-image-background',
  templateUrl: 'app-image-background.component.html',
  styleUrls: ['app-image-background.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppImageBackgroundComponent extends AppView {

  html! :string
  typescript! : string

  image! : AsBackgroundModel;

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);

    let item = sessionStorage.getItem("background");
    if (item) {
      this.image = JSON.parse(item)
    }
  }

  onSave(value : AsBackgroundModel) {
    sessionStorage.setItem("background", JSON.stringify(value));
  }

}
