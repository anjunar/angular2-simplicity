import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import {AbstractControl, FormArray, FormGroup} from "@angular/forms";
import {Link, Model} from "./as-meta-form.classes";
import {KeyValue} from "@angular/common";
import {AsMetaFormService} from "./as-meta-form.service";
import {SelectQuery} from "../as-lazy-select/as-lazy-select.component";

@Component({
  selector: 'as-meta-form',
  templateUrl: 'as-meta-form.component.html',
  styleUrls: ['as-meta-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AsMetaFormComponent implements OnInit {

  @Input() model!: Model
  @Output() modelChange = new EventEmitter<any>();

  @Output() submit = new EventEmitter<any>();

  @ContentChild(TemplateRef) security! : TemplateRef<any>;

  form!: FormGroup

  links : any[] = []

  constructor(private service: AsMetaFormService) {}

  ngOnInit(): void {
    this.form = this.service.create(this.model.$schema.properties || {}, this.model)
    this.form.patchValue(this.model)
    this.links = Object.entries(this.model.$schema.links).filter(([key, value]) => value.method !== "GET").map(([key, value]) => {
      return {key, value}
    })
  }

  updateValues(form : any, model : any) {
    for (const key of Object.keys(form)) {
      let formProperty = form[key];
      let modelProperty = model[key];
      if (formProperty instanceof Array) {
        formProperty.forEach((element, index) => {
          this.updateValues(element, modelProperty[index])
        })
      } else {
        if (formProperty instanceof Object) {
          this.updateValues(formProperty, modelProperty)
        } else {
          model[key] = form[key];
        }
      }
    }
  }

  onSubmit(link : {key : string, value : Link}) {
    this.updateValues(this.form.value, this.model)
    this.modelChange.emit(this.model);
    this.submit.emit({link : link, model : this.model})
  }

  onReset() {
    this.model = JSON.parse(JSON.stringify(this.model))
    this.form = this.service.create(this.model.$schema.properties, this.model)
    this.form.patchValue(this.model)
  }

  add(control: FormArray, schema: any) {
    let form = this.service.schema2Form(schema, {});
    control.push(form)
    this.form.markAsDirty();
  }

  remove(control: FormArray, value: AbstractControl) {
    let indexOf = control.controls.indexOf(value);
    control.removeAt(indexOf);
    this.form.markAsDirty();
  }

  lazySelectLoader(link: any) {
    if (link) {
      return (query: SelectQuery, callback: (rows: any[], size: number) => void) => {
        fetch(`${link.url}?index=${query.index}&limit=${query.limit}&value=${query.value}`)
          .then(response => response.json())
          .then(response => {
            callback(response.rows, response.size)
          })
      }
    }
    return (query: SelectQuery, callback: (rows: any[], size: number) => void) => {}
  }

  lazySelectLabel(properties: { key: string, value: any }) {
    return Object.entries(properties).filter(([key, value]) => value.naming).map(([key, value]) => key)
  }

  lazySelectName(properties: { key: string, value: any }, model: any) {
    let label = this.lazySelectLabel(properties);
    return label.map(value => model[value]).join(" ")
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

}
