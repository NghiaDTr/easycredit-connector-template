import {
  ComponentOptions,
  PaymentComponent,
  PaymentComponentBuilder,
  PaymentMethod
} from '../../../payment-enabler/payment-enabler';
import { BaseComponent } from "../../base";
import { BaseOptions } from "../../../payment-enabler/payment-enabler-mock.ts";

export class EasyCreditBuilder implements PaymentComponentBuilder {
  public componentHasSubmit = true

  constructor(private baseOptions: BaseOptions) {}

  build(config: ComponentOptions): PaymentComponent {
    return new EasyCredit(this.baseOptions, config);
  }
}

export class EasyCredit extends BaseComponent {
  private baseOptions: BaseOptions
  
  constructor(baseOptions: BaseOptions, componentOptions: ComponentOptions) {
    super(PaymentMethod.easycredit, baseOptions, componentOptions);
    this.baseOptions = baseOptions;
  }

  mount(selector: string) {
    if (this.baseOptions.amount > 1000) {
      return;
    }
    const g = document.createElement('script');
    const s = document.getElementsByTagName('script')[0];
    g.type = "module";
    g.src = "https://ratenkauf.easycredit.de/api/resource/webcomponents/v3/easycredit-components/easycredit-components.esm.js"
    s.parentNode.insertBefore(g, s);

    document.querySelector(selector).insertAdjacentHTML("afterbegin", this._getTemplate());
  }

  async submit() {

  }

  private _getTemplate() {
    return `
    <easycredit-checkout amount="${this.baseOptions.amount}" webshop-id="${this.baseOptions.webshopId}" />
    `
  }
}
