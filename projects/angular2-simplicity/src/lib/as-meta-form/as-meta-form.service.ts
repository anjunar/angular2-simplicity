import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {updateValues} from "../app.classes";

export class MetaFormGroup extends FormGroup {

  private readonly model : any;
  private readonly form : FormGroup

  constructor(model: any, form: FormGroup) {
    super(form.controls, form.validator, form.asyncValidator);
    this.model = model;
    this.form = form;
    this.form.patchValue(model)
  }

  getValue() {
    updateValues(this.form.getRawValue(), this.model)
    return this.model;
  }

}

@Injectable({
  providedIn: 'root'
})
export class AsMetaFormService {

  constructor(private formBuilder : FormBuilder) {}

  create(properties: any, model : any) {
    let group : FormGroup = this.formBuilder.group(this.schema2Form(properties, model));
    return new MetaFormGroup(model, group);
  }

  schema2Form(properties: any, model : any): any {
    let switchNode = (key : string, node: any, model : any) => {
      switch (node.widget) {
        case "form" : {
          return this.formBuilder.group(this.schema2Form(node.properties, model))
        }
        case "repeat" : {
          if (model) {
            return this.formBuilder.array(model.map((item: any) => this.schema2Form(node.items, item)))
          }
          return this.formBuilder.array([])
        }
        default : {
          if (node.validators) {
            let validators = Object.entries(node.validators).map(([key, value]) => {
              let object : any = value;
              switch (key) {
                case "required" : return Validators.required
                case "notNull" : return Validators.required
                case "notBlank" : return Validators.required
                case "size" : return Validators.compose([Validators.minLength(object.min), Validators.maxLength(object.max)])
                case "email" : return Validators.email
                case "min" : return Validators.min(object.value)
                case "max" : return Validators.max(object.value)
                default : return Validators.compose([])
              }
            });
            return [{value : "", disabled : node.readOnly}, validators]
          }
          return [{value : "", disabled : node.readOnly}]
        }
      }
    }

    if (properties.widget) {
      return switchNode("", properties, model)
    } else {
      return Object.entries(properties).reduce((prev, [key, value]) => {
        let childModel = model[key];
        prev[key] = switchNode(key, value, childModel);
        return prev;
      }, {} as any)
    }
  }
}
