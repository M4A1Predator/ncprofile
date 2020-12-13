import { ServiceContainer } from '../service/container'
import InstallationService from '../service/installation-service'
import CmsSettingService from './cms-setting-service'
import AdminService from './admin-service'

export const initServices = () => {
  const installationService = new InstallationService()
  installationService.init()
  
  const adminService = new AdminService()
  adminService.init()

  const cmsSettingService = new CmsSettingService()
  cmsSettingService.init()

  ServiceContainer.init({ installationService, adminService, cmsSettingService })
}