import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-grid-basic',
  template: `
    <div vts-row>
      <div vts-col vtsSpan="12">col-12</div>
      <div vts-col vtsSpan="12">col-12</div>
    </div>
    <div vts-row>
      <div vts-col vtsSpan="8">col-8</div>
      <div vts-col vtsSpan="8">col-8</div>
      <div vts-col vtsSpan="8">col-8</div>
    </div>
    <div vts-row>
      <div vts-col vtsSpan="6">col-6</div>
      <div vts-col vtsSpan="6">col-6</div>
      <div vts-col vtsSpan="6">col-6</div>
      <div vts-col vtsSpan="6">col-6</div>
    </div>
    <div vts-row>
      <div vts-col vtsFlex="2">2 / 5</div>
      <div vts-col vtsFlex="3">3 / 5</div>
    </div>
    <div vts-row>
      <div vts-col vtsFlex="100px">100px</div>
      <div vts-col vtsFlex="auto">Fill</div>
    </div>
    <div vts-row>
      <div vts-col vtsFlex="1 1 200px">1 1 200px</div>
      <div vts-col vtsFlex="0 1 300px">0 1 300px</div>
    </div>
    <div vts-row>
      <div vts-col [vtsSpan]="18" [vtsPush]="6">col-18 col-push-6</div>
      <div vts-col [vtsSpan]="6" [vtsPull]="18">col-6 col-pull-18</div>
    </div>
    <div vts-row>
      <div vts-col vtsXXXs="12" vtsXXs="4" vtsXs="8" vtsSm="12" vtsMd="4" vtsLg="8" vtsXl="12">
        col-xl-12
        <br />
        col-lg-8
        <br />
        col-md-4
        <br />
        col-sm-12
        <br />
        col-xs-8
        <br />
        col-xxs-4
        <br />
        col-xxxs-12
      </div>
      <div vts-col vtsXXXs="20" vtsXXs="20" vtsXs="16" vtsSm="12" vtsMd="20" vtsLg="16" vtsXl="12">
        col-xl-12
        <br />
        col-lg-16
        <br />
        col-md-20
        <br />
        col-sm-12
        <br />
        col-xs-16
        <br />
        col-xxs-20
        <br />
        col-xxxs-12
      </div>
    </div>
  `
})
export class VtsDemoGridBasicComponent {}
