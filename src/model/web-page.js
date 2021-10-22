export class WebPage {
  constructor() {
    this.name = null
    this.route = null
    this.elms = []
  }
}

export class WebPageReq {
  constructor() {
    this.name = null
    this.tabTitle = null
    this.route = null
    this.elms = []
  }
}

export const webPageReqSchema = {
  "id": "/WebPageReq",
  "type": "object",
  properties: {
    name: {type: "string"},
    tabTitle: {type: "string"},
    route: {type: "string"},
    emls: {type: "object"}
  },
  required: ["name"]
}
