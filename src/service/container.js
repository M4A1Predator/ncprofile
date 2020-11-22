import InstallationService from './installation-service'

export class ServiceContainer {
  static init(services) {
    // this.services = {}

    // init and set services
    this.services = services
  }

  static getServices() {
    return this.services
  }
}
