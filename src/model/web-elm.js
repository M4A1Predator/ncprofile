export class WebElm {
  constructor() {
    this.name = undefined
    this.meta = undefined
    this.data = undefined
    this.type = undefined
  }
}

export const webEmlSchema = {
  id: "/WebElm",
  type: "object",
  properties: {
    name: {type: "string"},
    meta: {type: "object"},
    type: {type: "string"}
  },
  required: ["name", "type"]
}

export const webEmlReqSchema = {
  id: "/WebElmReq",
  type: "array",
  items: {
    properties: {
      name: {type: "string"},
      meta: {type: "object"},
      type: {type: "string"}
    },
    required: ["name", "type"]
  }
}
