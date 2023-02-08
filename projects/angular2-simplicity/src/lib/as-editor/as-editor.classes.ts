import {AsEditorContentDirective} from "./as-editor-content.directive";

export interface AsEditorModel {
  html : string,
  text : string
}

export interface AsEditorInterface {

  content: AsEditorContentDirective

}
