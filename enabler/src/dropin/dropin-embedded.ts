import {
  DropinComponent,
  DropinOptions,
  PaymentDropinBuilder,
} from "../payment-enabler/payment-enabler";
import { BaseOptions } from "../payment-enabler/payment-enabler-mock";

export class DropinEmbeddedBuilder implements PaymentDropinBuilder {
  public dropinHasSubmit = false;

  private config: BaseOptions;

  constructor(_baseOptions: BaseOptions) {
    this.config = _baseOptions;
  }

  build(): DropinComponent {
    const dropinOptions = {
      amount: this.config?.amount,
      webshopId: this.config?.webshopId,
      howPayButton: this.config?.showPayButton,
      onDropinReady: this.config?.onDropinReady,
      onPayButtonClick: this.config?.onPayButtonClick,
    }

    const dropin = new DropinComponents({
      dropinOptions: dropinOptions,
      processorUrl: this.config?.processorUrl
    });

    dropin.init();

    return dropin;
  }
}

export class DropinComponents implements DropinComponent {
  private dropinOptions: DropinOptions;
  private processorUrl: string;

  constructor(opts: { dropinOptions: DropinOptions, processorUrl: string }) {
    this.dropinOptions = opts.dropinOptions;
    this.processorUrl = opts.processorUrl;
  }

  init(): void {
    this.dropinOptions.onDropinReady?.();
  }

  async mount(selector: string) {
    // const res = await fetch(
    // `${this.processorUrl}/processor/widget`,
    // {
    //       method: "POST",
    //   }
    // );
    // const enable = await res.json();

    let enable = false

    if (this.dropinOptions.amount <= 1000) {
      enable = true;
    }

    if (!enable) {
      return;
    }

    const g = document.createElement('script');
    const s = document.getElementsByTagName('script')[0];
    g.type = "module";
    g.src = "https://ratenkauf.easycredit.de/api/resource/webcomponents/v3/easycredit-components/easycredit-components.esm.js"
    s.parentNode.insertBefore(g, s);

    document
    .querySelector(selector)
      .innerHTML = this._getTemplate();
  }

  private _getTemplate(): string {
      return `
    <easycredit-widget amount="${this.dropinOptions.amount}" webshop-id="${this.dropinOptions.webshopId}" />
    `
  }

  submit(): void {
    throw new Error("Implementation not provided");
  }
}
