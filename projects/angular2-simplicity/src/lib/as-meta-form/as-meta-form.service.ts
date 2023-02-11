import { Injectable } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AsMetaFormService {

  constructor(private formBuilder : FormBuilder) {}

  create(properties: any, model : any) {
    return this.formBuilder.group(this.schema2Form(properties, model))
  }

  schema2Form(properties: any, model : any): any {
    let switchNode = (key : string, node: any, model : any) => {
      switch (node.widget) {
        case "form" : {
          return this.formBuilder.group(this.schema2Form(node.properties, model))
        }
        case "repeat" : {
          return this.formBuilder.array(model.map((item: any) => this.schema2Form(node.items, item)))
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
            return [{value : "", disabled : node.readOnly, name : key}, validators]
          }
          return [{value : "", disabled : node.readOnly, name : key}]
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
