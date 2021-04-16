export class NavbarInfo {
  constructor() {
    this.meta = {}
    this.data = []
  }
}

export const navbarReqSchema = {
  id: "/NavbarReq",
  type: "array",
  items: {
    properties: {
      name: {type: "string"},
      link: {type: "string"}
    },
    required: ["name", "link"]
  }
}
