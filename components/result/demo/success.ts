import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-result-success',
  template: `
    <vts-result
      vtsStatus="success"
      vtsTitle="Successfully Purchased Cloud Server ECS!"
      vtsSubTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    >
      <div vts-result-extra>
        <button vts-button vtsType="primary">Go Console</button>
        <button vts-button>Buy Again</button>
      </div>
    </vts-result>
  `
})
export class VtsDemoResultSuccessComponent {}
