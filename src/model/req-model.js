export class ReqModel {
  constructor() {
    this.body = undefined
  }

  static create(obj) {
    if (!obj) {
      return new ReqModel()
    }
    return Object.assign(new ReqModel(), obj)
  }
}