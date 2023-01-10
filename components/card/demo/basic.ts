import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-card-basic',
  template: `
    <div vts-row [vtsGutter]="[16, 16]">
      <div vts-col vtsSpan="6">
        <vts-card
          [vtsCardLayout]="'basic'"
        >
          <vts-card-meta
            vtsTitle="Card title"
            vtsDescription="Lorem ipsum dolor sit"
            [vtsAvatar]="avatarTemplate"
          ></vts-card-meta>
          <div>$15.548</div>
          <div>Expense Account</div>
          <button style="width: 100%; margin-top: 0.5rem;" vts-button vtsType="primary">See detail</button>
        </vts-card>
        <ng-template #avatarTemplate>
          <vts-avatar
            vtsSrc="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          ></vts-avatar>
        </ng-template>
      </div>

      <div vts-col vtsSpan="6">
        <vts-card
          [vtsCardLayout]="'basic'"
          vtsCoverPosition="top"
          [vtsCover]="coverTemplate"
        >
          <vts-card-meta
            vtsTitle="Card title"
            vtsDescription="Lorem ipsum dolor sit amet, consectu adipis scling elit. Amet sed vel leo erati."
          ></vts-card-meta>
          <div style="display: flex; justify-content: flex-end;">
            <button vts-button vtsType="primary">Submit</button>
          </div>
        </vts-card>
        <ng-template #coverTemplate>
          <img
            alt="example"
            src="https://www.primefaces.org/primeng/assets/showcase/images/galleria/galleria1.jpg"
          />
        </ng-template>
      </div>

      <div vts-col vtsSpan="6">
        <vts-card
          [vtsCardLayout]="'basic'"
          vtsCoverPosition="top"
          [vtsCover]="coverTemplate"
          [vtsActions]="[actionFooter]"
        >
          <vts-card-meta
            vtsTitle="Card title"
            vtsDescription="Lorem ipsum dolor sit amet, consectu adipis scling elit. Amet sed vel leo erati."
          ></vts-card-meta>
        </vts-card>
        <ng-template #coverTemplate>
          <img
            alt="example"
            src="https://www.primefaces.org/primeng/assets/showcase/images/galleria/galleria1.jpg"
          />
        </ng-template>
        <ng-template #actionFooter>
          <div style="display: flex;">
            <button vts-button vtsType="text" style="color: red;">
              Readmore<i vts-icon vtsType="ArrowForward" style="margin-left: 2px; font-size: 14px;"></i>
            </button>
            <button vts-button vtsType="text" style="color: red;">
              Bookmark<i vts-icon vtsType="Bookmark" style="margin-left: 2px; font-size: 14px;"></i>
            </button>
          </div>
        </ng-template>
      </div>

      <div vts-col vtsSpan="6">
        <vts-card
          [vtsCardLayout]="'basic'"
          vtsCoverPosition="top"
          [vtsCover]="coverTemplate"
        >
          <vts-card-meta
            vtsTitle="Card title"
            vtsDescription="Lorem ipsum dolor sit amet, consectu adipis scling elit. Amet sed vel leo erati."
          ></vts-card-meta>
          <span>Lorem ipsum dolor sit amet.</span>
          <vts-divider style="margin: 10px 0;"></vts-divider>
          <span>Lorem ipsum dolor sit amet.</span>
          <vts-divider style="margin: 10px 0;"></vts-divider>
          <span>Lorem ipsum dolor sit amet.</span>
        </vts-card>
        <ng-template #coverTemplate>
          <img
            alt="example"
            src="https://www.primefaces.org/primeng/assets/showcase/images/galleria/galleria1.jpg"
          />
        </ng-template>
      </div>
    </div>
  `
})
export class VtsDemoCardBasicComponent {}
