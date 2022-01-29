const PREFIX = '/api/admin/';

export const URLs = {
  requestToken: `${PREFIX}token`,

  getAppSetting: `${PREFIX}appConfig`,
  install: `${PREFIX}install`,

  getMainContentInfo: `${PREFIX}cms-setting`,
  updateMainContentInfo: `${PREFIX}main-content-info`,

  mainPics: `${PREFIX}cms-setting/main-content-pics`,
  assets: `${PREFIX}cms-setting/files`,

  elm: `${PREFIX}cms-setting/elm`,

  languages: `${PREFIX}cms-setting/langs`
};
