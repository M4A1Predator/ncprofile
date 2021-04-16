export class MainInfo {
  constructor() {
    this.websiteName = 'Hello'
    this.title = 'Welcome'
    this.tabTitle = null
    this.navbar = null
  }
}

export const MainInfo_DB_KEY = 'mainInfo'

export const mainInfoSchema = {
  "id": "/MainInfo",
  "type": "object",
  properties: {
    websiteName: {type: "string"},
    title: {type: "string"},
    tabTitle: {type: "string"}
  },
  required: ["websiteName", "title"]
}
