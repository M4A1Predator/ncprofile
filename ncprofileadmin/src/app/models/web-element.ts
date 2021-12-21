import { WebElementTypeEnum } from "../constants/web-element-type-enum";

export class WebElement {
  public name: string;
  public type: WebElementTypeEnum;
  public content: string;
  public data: string;
}
