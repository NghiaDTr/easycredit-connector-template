import {
    ComponentOptions,
    PaymentComponent,
    PaymentDropinBuilder,
    PaymentMethod
  } from '../../../payment-enabler/payment-enabler';
  import { BaseComponent } from "../../base";
  import { BaseOptions } from "../../../payment-enabler/payment-enabler-mock.ts";
  
  export class EasyCreditWidgetBuilder implements PaymentDropinBuilder {
    public componentHasSubmit = false
  
    constructor(private baseOptions: BaseOptions) {}
      dropinHasSubmit: boolean;
  
    build(config: ComponentOptions): PaymentComponent {
      return new EasyCreditWidget(this.baseOptions, config);
    }
  }
  
  export class EasyCreditWidget extends BaseComponent {
    
    constructor(baseOptions: BaseOptions, componentOptions: ComponentOptions) {
      super(PaymentMethod.easycredit, baseOptions, componentOptions);
    }
  
    mount(selector: string) {
      document.querySelector(selector).insertAdjacentHTML("afterbegin", this._getTemplate());
    }
  
    async submit() {
    //   // here we would call the SDK to submit the payment
    //   this.sdk.init({ environment: this.environment });
    //   const isFormValid = validateAllFields();
    //   if (!isFormValid) {
    //     return;
    //   }
    //   try {
    //     // Below is a mock implementation but not recommend and PCI compliant approach,
    //     // please use respective PSP iframe capabilities to handle PAN data
    //     const requestData = {
    //       paymentMethod: {
    //           type: this.paymentMethod,
    //           cardNumber: getInput(fieldIds.cardNumber).value.replace(/\s/g, ''),
    //           expiryMonth: getInput(fieldIds.expiryDate).value.split('/')[0],
    //           expiryYear: getInput(fieldIds.expiryDate).value.split('/')[1],
    //           cvc: getInput(fieldIds.cvv).value,
    //           holderName: getInput(fieldIds.holderName).value,
    //       }
    //     };
  
    //     // Mock Validation
    //     let isAuthorized = this.isCreditCardAllowed(requestData.paymentMethod.cardNumber);
    //     const resultCode = isAuthorized ? PaymentOutcome.AUTHORIZED : PaymentOutcome.REJECTED;
  
    //     const request: PaymentRequestSchemaDTO = {
    //       paymentMethod: {
    //         type: this.paymentMethod,
    //       },
    //       paymentOutcome: resultCode,
    //     };
    //     const response = await fetch(this.processorUrl + '/payments', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json', 'X-Session-Id': this.sessionId },
    //       body: JSON.stringify(request),
    //     });
    //     const data = await response.json();
  
    //     if (resultCode === PaymentOutcome.AUTHORIZED) {
    //       this.onComplete && this.onComplete({ isSuccess: true, paymentReference: data.paymentReference });
    //     } else {
    //       this.onComplete && this.onComplete({ isSuccess: false });
    //     }
    //   } catch(e) {
    //     this.onError('Some error occurred. Please try again.');
    //   }
    }
  
    private _getTemplate() {
      console.log('get widget template');
      
        return `
        <script type="module" src="https://ratenkauf.easycredit.de/api/resource/webcomponents/v3/easycredit-components/easycredit-components.esm.js"></script>
      <easycredit-widget amount="500" webshop-id="2.de.7607.2" />
      `
    }
  
    isAvailable() {
      return Promise.resolve(true);
    }
  }
  