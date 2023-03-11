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
import {AbstractControl, FormArray} from "@angular/forms";
import {Link, Model} from "./as-meta-form.classes";
import {KeyValue} from "@angular/common";
import {AsMetaFormService, MetaFormGroup} from "./as-meta-form.service";
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

  @ContentChild(TemplateRef) security!: TemplateRef<any>;

  form!: MetaFormGroup

  links: any[] = []

  constructor(private service: AsMetaFormService) {
  }

  ngOnInit(): void {
    this.form = this.service.create(this.model.$schema.properties || {}, this.model)
    this.links = Object.entries(this.model.$schema.links).filter(([key, value]) => value.method !== "GET").map(([key, value]) => {
      return {key, value}
    })
  }

  onSubmit(link: { key: string, value: Link }) {
    let model = this.form.getValue();
    this.modelChange.emit(model);
    this.submit.emit({link: link, model: model})
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

  lazySelectLoader(event: { query: SelectQuery, callback: (rows: any[], size: number) => void }, link: any) {
    if (link) {
      fetch(`${link.url}?index=${event.query.index}&limit=${event.query.limit}&value=${event.query.value}`)
        .then(response => response.json())
        .then(response => {
          event.callback(response.rows, response.size)
        })
    }
  }

  lazySelectLabel(properties: { key: string, value: any }) {
    return Object.entries(properties).filter(([key, value]) => value.naming).map(([key, value]) => key)
  }

  lazySelectName(properties: { key: string, value: any }, model: any) {
    let label = this.lazySelectLabel(properties);
    return label.map(value => model[value]).join(" ")
  }

  lazySelectTrackBy(properties: { key: string, value: any }) {
    let find = Object.entries(properties).find(([key, value]) => value.id);
    if (find) {
      return find[0];
    }
    return "id";
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

}
