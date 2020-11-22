import { ServiceContainer } from '../service/container'
import InstallationService from '../service/installation-service'

export const initServices = () => {
  const installationService = new InstallationService()
  installationService.init()
  ServiceContainer.init({ installationService })
}