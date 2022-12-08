import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-input-search-input',
  template: `
    <vts-input-group vtsSize="sm" [vtsSuffix]="suffixIconSearch">
      <input type="text" vts-input placeholder="input search text" />
    </vts-input-group>
    <ng-template #suffixIconSearch>
      <i vts-icon vtsType="Search"></i>
    </ng-template>
    <br />
    <br />
    <vts-input-group [vtsSuffix]="suffixIconSearch">
      <input type="text" vts-input placeholder="input search text" />
    </vts-input-group>
    <ng-template #suffixIconSearch>
      <i vts-icon vtsType="Search"></i>
    </ng-template>
    <br />
    <br />
    <vts-input-group vtsSize="lg" [vtsSuffix]="suffixIconSearch">
      <input type="text" vts-input placeholder="input search text" />
    </vts-input-group>
    <ng-template #suffixIconSearch>
      <i vts-icon vtsType="Search"></i>
    </ng-template>
    <br />
    <br />
    <vts-input-group vtsSize="xl" [vtsSuffix]="suffixIconSearch">
      <input type="text" vts-input placeholder="input search text" />
    </vts-input-group>
    <ng-template #suffixIconSearch>
      <i vts-icon vtsType="Search"></i>
    </ng-template>
    <br />
    <br />
    <vts-input-group vtsSearch vtsSize="sm" [vtsAddOnAfter]="suffixIconButton">
      <input type="text" vts-input placeholder="input search text" />
    </vts-input-group>
    <ng-template #suffixIconButton>
      <button vts-button vtsType="primary" vtsSearch>
        <i vts-icon vtsType="Search"></i>
      </button>
    </ng-template>
    <br />
    <br />
    <vts-input-group vtsSearch [vtsAddOnAfter]="suffixIconButton">
      <input type="text" vts-input placeholder="input search text" />
    </vts-input-group>
    <ng-template #suffixIconButton>
      <button vts-button vtsType="primary" vtsSearch>
        <i vts-icon vtsType="Search"></i>
      </button>
    </ng-template>
    <br />
    <br />
    <vts-input-group vtsSearch vtsSize="lg" [vtsAddOnAfter]="suffixIconButton">
      <input type="text" vts-input placeholder="input search text" />
    </vts-input-group>
    <ng-template #suffixIconButton>
      <button vts-button vtsType="primary" vtsSearch>
        <i vts-icon vtsType="Search"></i>
      </button>
    </ng-template>
    <br />
    <br />
    <vts-input-group vtsSearch vtsSize="xl" [vtsAddOnAfter]="suffixButton">
      <input type="text" vts-input placeholder="input search text" />
    </vts-input-group>
    <ng-template #suffixButton>
      <button vts-button vtsType="primary" vtsSearch>Search</button>
    </ng-template>
  `
})
export class VtsDemoInputSearchInputComponent {}
