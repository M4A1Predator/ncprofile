import { ServiceContainer } from '../service/container'
import InstallationService from '../service/installation-service'
import AdminService from './admin-service'

export const initServices = () => {
  const installationService = new InstallationService()
  installationService.init()
  const adminervice = new AdminService()
  adminervice.init()

  ServiceContainer.init({ installationService, adminervice })
}