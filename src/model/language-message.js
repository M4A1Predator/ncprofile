import Base from './base'

export class LanguageMessage extends Base {
    constructor() {
        super()
        this.lang = undefined
        this.messages = []
    }
}

export class WebMessage extends Base {
    constructor() {
        super()
        this.key = undefined
        this.value = undefined
    }
}

export const webMessageSchema = {
    "id": "/WebMessage",
    "type": "object",
    properties: {
      key: {type: "string"},
      value: {type: "string"},
    },
    required: ["key", "value"]
}
  
