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
      howPayButton: this.config?.showPayButton,
      onDropinReady: this.config?.onDropinReady,
      onPayButtonClick: this.config?.onPayButtonClick,
    }
    console.log('url', this.config?.processorUrl);
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
    const res = await fetch(
      `${this.processorUrl}/processor/widget`,
      {
          method: "GET",
      }
      );
      const isWidgetEnabled = await res.json();

      if (isWidgetEnabled.is_enabled === true) {
        document
        .querySelector(selector)
        .insertAdjacentHTML("afterbegin", this._getTemplate());
      }
  }

  private _getTemplate() {
      return `
      <script type="module" src="https://ratenkauf.easycredit.de/api/resource/webcomponents/v3/easycredit-components/easycredit-components.esm.js"></script>
    <easycredit-widget amount="500" webshop-id="2.de.7607.2" />
    `
  }

  submit(): void {
    throw new Error("Implementation not provided");
  }
}
