export interface Link {
  method : string
  url : string
}

export interface Node {
  widget: string
  title : string
  properties: {
    [key: string]: Node
  }
  links : {
    [key : string] : Link
  }
}

export interface Model {
  $schema: Node,
  form: any
}
