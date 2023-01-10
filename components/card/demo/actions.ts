import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-card-actions',
  template: `
    <div vts-row [vtsGutter]="[16,16]">
      <div vts-col [vtsSpan]="6">
        <vts-card
          [vtsCardLayout]="'basic'"
          [vtsType]="'container'"
          [vtsAlign]="'left'"
          [vtsExtra]="actionHeader"
          [vtsTitle]="'Card name'"
          [vtsActions]="[actionCount]"
        >
          <vts-card-meta
            vtsTitle="Card title"
            vtsDescription="Lorem ipsum dolor sit amet, consectu adipis scling elit. Amet sed vel leo erati. Amet sed vel leo erati."
          ></vts-card-meta>
        </vts-card>

        <ng-template #actionCount>
          <div style="display: flex; justify-content: space-between; width: 100%;">
            <span style="width: fit-content;">1 day ago</span>
            <button vts-button vtsType="text" style="color: red;">
              <strong>Read more<i vts-icon vtsType="ArrowForward" style="margin-left: 2px; font-size: 14px;"></i></strong>
            </button>
          </div>
        </ng-template>

        <ng-template #actionHeader>
          <button vts-button vtsType="text">
            <i vts-icon vtsType="Close"></i>
          </button>
        </ng-template>
      </div>

      <div vts-col [vtsSpan]="6">
        <vts-card
          [vtsCardLayout]="'basic'"
          [vtsType]="'container'"
          [vtsAlign]="'left'"
          [vtsExtra]="actionHeader"
          [vtsTitle]="titleTemplate"
          [vtsActions]="[actionCount]"
        >
          <vts-card-meta
            vtsTitle="Card title"
            vtsDescription="Lorem ipsum dolor sit amet, consectu adipis scling elit. Amet sed vel leo erati. Amet sed vel leo erati."
          ></vts-card-meta>
        </vts-card>

        <ng-template #actionCount>
          <div style="display: flex; justify-content: space-between; width: 100%;">
            <span style="width: fit-content;">1 day ago</span>
            <button vts-button vtsType="text" style="color: red;">
              <strong>Read more<i vts-icon vtsType="ArrowForward" style="margin-left: 2px; font-size: 14px;"></i></strong>
            </button>
          </div>
        </ng-template>

        <ng-template #actionHeader>
          <button vts-button vtsType="text">
            <i vts-icon vtsType="Close"></i>
          </button>
        </ng-template>

        <ng-template #titleTemplate>
          <strong>Ticket<span style="color: red;">#123456</span></strong>
        </ng-template>
      </div>

      <div vts-col [vtsSpan]="6">
        <vts-card
          [vtsCardLayout]="'basic'"
          [vtsType]="'container'"
          [vtsAlign]="'left'"
          [vtsExtra]="actionHeader"
          [vtsTitle]="anotherTitle"
          [vtsActions]="[actionFooter]"
        >
          <vts-card-meta
            vtsTitle="Card title"
            vtsDescription="Lorem ipsum dolor sit amet, consectu adipis scling elit. Amet sed vel leo erati. Amet sed vel leo erati."
          ></vts-card-meta>
        </vts-card>

        <ng-template #actionFooter>
          <button vts-button vtsType="link">
            View All Notification (2)<i vts-icon vtsType="ArrowForward" style="margin-left: 2px; font-size: 14px;"></i>
          </button>
        </ng-template>

        <ng-template #actionHeader>
          <button vts-button vtsType="text">
            <i vts-icon vtsType="Close"></i>
          </button>
        </ng-template>

        <ng-template #anotherTitle>
          <strong><i vts-icon vtsType="AllInBox"></i>Card name</strong>
        </ng-template>
      </div>

      <div vts-col [vtsSpan]="6">
        <vts-card
          [vtsCardLayout]="'basic'"
          [vtsType]="'container'"
          [vtsAlign]="'left'"
          [vtsExtra]="actionHeader"
          [vtsTitle]="anotherTitle"
        >
          <vts-card-meta
            vtsTitle="Card title"
            vtsDescription="Lorem ipsum dolor sit amet, consectu adipis scling elit. Amet sed vel leo erati. Amet sed vel leo erati."
          ></vts-card-meta>
          <div>
            <button vts-button vtsType="default" style="margin-right: 5px;">Close</button>
            <button vts-button vtsType="primary">Read more</button>
          </div>
        </vts-card>

        <ng-template #actionHeader>
          <button vts-button vtsType="text">
            <i vts-icon vtsType="Close"></i>
          </button>
        </ng-template>

        <ng-template #anotherTitle>
          <strong><i vts-icon vtsType="AllInBox"></i>Card name</strong>
        </ng-template>
      </div>
    </div>

    <div vts-row [vtsGutter]="[16, 16]">
      <div vts-col vtsSpan="6">
        <vts-card
          [vtsCardLayout]="'basic'"
          [vtsType]="'avatar'"
        >
          <vts-card-meta
            vtsTitle="Card title"
            [vtsAction]="actionMore"
            vtsDescription="Lorem ipsum."
          ></vts-card-meta>
          Too much or too little spacing, as in the example below, can make things unpleasant for the reader.
        </vts-card>
        <ng-template #actionMore>
          <button vts-button vtsType="link">More</button>
        </ng-template>
      </div>
      <div vts-col vtsSpan="6">
        <vts-card
          [vtsCardLayout]="'basic'"
          [vtsType]="'container'"
          [vtsAlign]="'center'"
          vtsTitle="Card name"
          [vtsExtra]="actionHeader"
          [vtsActions]="[actionButton]"
        >
          <vts-card-meta
            vtsTitle="Gabriel Palmer"
            vtsDescription="Graphic Designer"
            [vtsAvatar]="avatarTemplate"
          ></vts-card-meta>
        </vts-card>

        <ng-template #avatarTemplate>
          <vts-avatar
            vtsSrc="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          ></vts-avatar>
        </ng-template>

        <ng-template #actionHeader>
          <button vts-button vtsType="text">
            <i vts-icon vtsType="Close"></i>
          </button>
        </ng-template>

        <ng-template #actionButton>
          <button vts-button vtsType="primary" style="margin-right: 5px; background: #3B5998; border: 1px solid white;"><i vts-icon vtsType="Notifications"></i></button>
          <button vts-button vtsType="primary" style="margin-right: 5px; background: #33B01E; border: 1px solid white;"><i vts-icon vtsType="Bookmarks"></i></button>
          <button vts-button vtsType="primary"><i vts-icon vtsType="Settings"></i></button>
        </ng-template>
      </div>
      <div vts-col vtsSpan="12">
        <vts-card
          [vtsCardLayout]="'basic'"
          [vtsExtra]="anotherActionHeader"
          vtsTitle="Card name"
        >
          <div *ngFor="let content of listContents;" style="display: -webkit-inline-box;">
            <i vts-icon vtsType="Done" style="background: #00AB76; border-radius: 50%; margin-right: 1rem; color: white; font-size: 12px;"></i>
            <div>{{content}}</div>
          </div>
        </vts-card>
        <ng-template #anotherActionHeader>
          <button vts-button vtsType="text">
            <i vts-icon vtsType="Minimize"></i>
          </button>
          <button vts-button vtsType="text">
            <i vts-icon vtsType="Close"></i>
          </button>
        </ng-template>
      </div>
    </div>
  `
})
export class VtsDemoCardActionsComponent {
  listContents = [
    'Some placeholder content for the collapse component',
    'Too much or too little spacing, as in the example below, can make things unpleasant for the reader. The goal is to make your text as comfortable to read as possible.',
    'This may be the most commonly encountered tip I received from the designers I spoke with. They highly encourage that you use different fonts in one design.'
  ]
}
