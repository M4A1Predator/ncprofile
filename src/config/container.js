
export class ConfigContainer {
  static init({ dbConfig }) {
    this.config = {}
    this.config.dbConfig = dbConfig
  }

  static getConfigs() {
    return this.config
  }

}