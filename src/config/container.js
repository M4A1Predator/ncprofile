
export class ConfigContainer {
  static init({ dbConfig }) {
    this.config = {}

    // initial configs
    this.config.dbConfig = dbConfig
  }

  static getConfigs() {
    return this.config
  }

}