import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AppView} from "angular2-simplicity";
import {ActivatedRoute} from "@angular/router";
import {AsMetaFormService} from "angular2-simplicity";
import {FormArray, FormGroup} from "@angular/forms";

interface Node {
  properties : {
    [key: string] : Node
  }
}

interface Model {
  form : any,
  $schema : Node
}

@Component({
  selector: 'app-meta-form-layout',
  templateUrl: 'app-meta-form-layout.component.html',
  styleUrls: ['app-meta-form-layout.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AppMetaFormLayoutComponent extends AppView implements OnInit {

  html! : string;
  typescript! : string
  json! : string

  model! : any;
  form! : FormGroup

  constructor(activatedRoute: ActivatedRoute, private service : AsMetaFormService) {
    super(activatedRoute);
  }

  ngOnInit(): void {
    this.form = this.service.create(this.model.$schema.properties, this.model)
    this.form.patchValue(this.model);
  }

  get emails() : FormArray {
    return this.form.get("form")?.get("emails") as FormArray
  }

  add() {
    let form = this.service.schema2Form(this.model.$schema.properties.form.properties.emails.items, {});
    this.emails.push(form)
    this.form.markAsDirty();
  }

  delete(value : any) {
    let indexOf = this.emails.controls.indexOf(value);
    this.emails.removeAt(indexOf);
    this.form.markAsDirty();
  }

  onSubmit() {
    alert(JSON.stringify(this.form.value, null, 4))
  }

  onReset() {
    this.model = JSON.parse(JSON.stringify(this.model));
    this.form = this.service.create(this.model.$schema.properties, this.model);
    this.form.patchValue(this.model);
  }

}
