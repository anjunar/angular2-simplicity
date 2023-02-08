export interface Node {
  widget: string
  title : string
  properties: {
    [key: string]: Node
  }
}

export interface Model {
  $schema: Node,
  form: any
}
