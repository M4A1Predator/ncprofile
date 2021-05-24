import { ELM_FIELD_TYPES } from '../constants/default-web-elm'

export const MainBannerMeta = {
  fields: [
    {
      name: "text",
      isRequired: false,
      type: ELM_FIELD_TYPES.TEXT
    },
    {
      name: "image",
      isRequired: false,
      type: ELM_FIELD_TYPES.IMAGE
    }
  ]
}