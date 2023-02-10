import {Component, EventEmitter, forwardRef, Input, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {AsEditorInterface, AsEditorModel} from "./as-editor.classes";
import {AsEditorContentDirective} from "./as-editor-content.directive";
import {ContextManagerService} from "../context-manager.service";
import {AsEditorContextComponent} from "./as-editor-context/as-editor-context.component";

@Component({
  selector: 'as-editor',
  templateUrl: 'as-editor.component.html',
  styleUrls: ['as-editor.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AsEditorComponent),
      multi: true
    }
  ]
})
export class AsEditorComponent implements ControlValueAccessor, AsEditorInterface {

  @Input() name! : string

  @Output() ngModelChange = new EventEmitter<AsEditorModel>();
  @ViewChild(AsEditorContentDirective, {static: true}) content!: AsEditorContentDirective
  page = 0;
  disabled = false;

  onChange!: (_: any) => {}

  _model: AsEditorModel = {
    html: "",
    text: ""
  }

  constructor(private contextManager: ContextManagerService) {}


  get model() {
    return this._model;
  }

  set model(value : AsEditorModel) {
    this._model = value;
    if (this.onChange) {
      this.onChange(value)
    }
  }

  @Input()
  get ngModel() {
    return this.model;
  }

  set ngModel(value) {
    this.model = value;
    if (this.onChange) {
      this.onChange(this.model)
    }
  }

  contextMenuClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    let content = this.content.element;

    let newPath : HTMLElement[] = [];
    for (const segment of event.composedPath()) {
      if (segment === content) {
        break
      }
      newPath.push(<HTMLElement>segment);
    }

    let contextRef = this.contextManager.create(AsEditorContextComponent, {pageX: event.pageX, pageY: event.pageY});
    contextRef.instance.path = newPath;

    return false;
  }


  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: any): void {
    if (value) {
      this.model = value;
    }
  }


}
