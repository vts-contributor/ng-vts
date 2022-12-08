import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-badge-status',
  template: `
    <vts-badge vtsStatus="success"></vts-badge>
    <vts-badge vtsStatus="error"></vts-badge>
    <vts-badge vtsStatus="default"></vts-badge>
    <vts-badge vtsStatus="processing"></vts-badge>
    <vts-badge vtsStatus="warning"></vts-badge>
    <br />
    <vts-badge vtsStatus="success" vtsText="Success"></vts-badge>
    <br />
    <vts-badge vtsStatus="error" vtsText="Error"></vts-badge>
    <br />
    <vts-badge vtsStatus="default" vtsText="Default"></vts-badge>
    <br />
    <vts-badge vtsStatus="processing" vtsText="Processing"></vts-badge>
    <br />
    <vts-badge vtsStatus="warning" vtsText="Warning"></vts-badge>
    <br />
  `
})
export class VtsDemoBadgeStatusComponent {}
