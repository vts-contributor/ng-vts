import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-steps-step-next',
  template: `
    <vts-steps [vtsCurrent]="current">
      <vts-step vtsTitle="Finished"></vts-step>
      <vts-step vtsTitle="In Progress"></vts-step>
      <vts-step vtsTitle="Waiting"></vts-step>
    </vts-steps>

    <div class="steps-content">{{ index }}</div>
    <div class="steps-action">
      <button vts-button vtsType="default" (click)="pre()" *ngIf="current > 0">
        <span>Previous</span>
      </button>
      <button vts-button vtsType="default" (click)="next()" *ngIf="current < 2">
        <span>Next</span>
      </button>
      <button vts-button vtsType="primary" (click)="done()" *ngIf="current === 2">
        <span>Done</span>
      </button>
    </div>
  `,
  styles: [
    `
      .steps-content {
        margin-top: 16px;
        border: 1px dashed #e9e9e9;
        border-radius: 6px;
        background-color: #fafafa;
        min-height: 200px;
        text-align: center;
        padding-top: 80px;
      }

      .steps-action {
        margin-top: 24px;
      }

      button {
        margin-right: 8px;
      }
    `
  ]
})
export class VtsDemoStepsStepNextComponent {
  current = 0;

  index = 'First-content';

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

  constructor() {}
}
