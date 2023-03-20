import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-card-meta',
  template: `
    <div style="padding: 16px">
      <vts-row [vtsGutter]="[32, 32]">
        <div vts-col vtsFlex="400px">
          <p>Direction Vertical - Align Left</p>
          <vts-card>
            <vts-card-header vtsTitle="Card name">
              <vts-card-header-extra>
                <button vts-button vtsType="text">
                  <i vts-icon vtsType="Close"></i>
                </button>
              </vts-card-header-extra>
            </vts-card-header>
            <vts-card-meta
              vtsTitle="Gabriel Palmer"
              vtsDescription="Graphic Designer"
              vtsDirection="vertical"
              vtsAlign="left"
            >
              <vts-card-meta-avatar
                vtsShape="rounded"
                [vtsSize]="72"
                [vtsSrc]="image"
                style="background: #00AB76"
              ></vts-card-meta-avatar>
            </vts-card-meta>
            <vts-card-footer vtsBordered>
              <vts-space vtsPreset="2" vtsJustify="center" style="width: 100%">
                <ng-container *vtsSpaceItem>
                  <ng-container *ngTemplateOutlet="fb"></ng-container>
                </ng-container>
                <ng-container *vtsSpaceItem>
                  <ng-container *ngTemplateOutlet="whatsapp"></ng-container>
                </ng-container>
                <ng-container *vtsSpaceItem>
                  <ng-container *ngTemplateOutlet="linkedin"></ng-container>
                </ng-container>
              </vts-space>
            </vts-card-footer>
          </vts-card>
        </div>
        <div vts-col vtsFlex="400px">
          <p>Direction Vertical - Align Center</p>
          <vts-card>
            <vts-card-header vtsTitle="Card name">
              <vts-card-header-extra>
                <button vts-button vtsType="text">
                  <i vts-icon vtsType="Close"></i>
                </button>
              </vts-card-header-extra>
            </vts-card-header>
            <vts-card-meta
              vtsTitle="Gabriel Palmer"
              vtsDescription="Graphic Designer"
              vtsDirection="vertical"
              vtsAlign="center"
            >
              <vts-card-meta-avatar
                vtsShape="rounded"
                [vtsSize]="72"
                [vtsSrc]="image"
                style="background: #00AB76"
              ></vts-card-meta-avatar>
            </vts-card-meta>
            <vts-card-footer vtsBordered>
              <vts-space vtsPreset="2" vtsJustify="center" style="width: 100%">
                <ng-container *vtsSpaceItem>
                  <ng-container *ngTemplateOutlet="fb"></ng-container>
                </ng-container>
                <ng-container *vtsSpaceItem>
                  <ng-container *ngTemplateOutlet="whatsapp"></ng-container>
                </ng-container>
                <ng-container *vtsSpaceItem>
                  <ng-container *ngTemplateOutlet="linkedin"></ng-container>
                </ng-container>
              </vts-space>
            </vts-card-footer>
          </vts-card>
        </div>
        <div vts-col vtsFlex="400px">
          <p>Direction Vertical - Align Right</p>
          <vts-card>
            <vts-card-header vtsTitle="Card name">
              <vts-card-header-extra>
                <button vts-button vtsType="text">
                  <i vts-icon vtsType="Close"></i>
                </button>
              </vts-card-header-extra>
            </vts-card-header>
            <vts-card-meta
              vtsTitle="Gabriel Palmer"
              vtsDescription="Graphic Designer"
              vtsDirection="vertical"
              vtsAlign="right"
            >
              <vts-card-meta-avatar
                vtsShape="rounded"
                [vtsSize]="72"
                [vtsSrc]="image"
                style="background: #00AB76"
              ></vts-card-meta-avatar>
            </vts-card-meta>
            <vts-card-footer vtsBordered>
              <vts-space vtsPreset="2" vtsJustify="center" style="width: 100%">
                <ng-container *vtsSpaceItem>
                  <ng-container *ngTemplateOutlet="fb"></ng-container>
                </ng-container>
                <ng-container *vtsSpaceItem>
                  <ng-container *ngTemplateOutlet="whatsapp"></ng-container>
                </ng-container>
                <ng-container *vtsSpaceItem>
                  <ng-container *ngTemplateOutlet="linkedin"></ng-container>
                </ng-container>
              </vts-space>
            </vts-card-footer>
          </vts-card>
        </div>
        <div vts-col vtsFlex="400px">
          <p>Direction Horizontal - Align Left</p>
          <vts-card>
            <vts-card-header vtsTitle="Card name">
              <vts-card-header-extra>
                <button vts-button vtsType="text">
                  <i vts-icon vtsType="Close"></i>
                </button>
              </vts-card-header-extra>
            </vts-card-header>
            <vts-card-meta
              vtsTitle="Gabriel Palmer"
              vtsDescription="Graphic Designer"
              vtsDirection="horizontal"
              vtsAlign="left"
            >
              <vts-card-meta-avatar
                vtsShape="rounded"
                [vtsSize]="72"
                [vtsSrc]="image"
                style="background: #00AB76"
              ></vts-card-meta-avatar>
            </vts-card-meta>
            <vts-card-footer vtsBordered>
              <vts-space vtsPreset="2" vtsJustify="center" style="width: 100%">
                <ng-container *vtsSpaceItem>
                  <ng-container *ngTemplateOutlet="fb"></ng-container>
                </ng-container>
                <ng-container *vtsSpaceItem>
                  <ng-container *ngTemplateOutlet="whatsapp"></ng-container>
                </ng-container>
                <ng-container *vtsSpaceItem>
                  <ng-container *ngTemplateOutlet="linkedin"></ng-container>
                </ng-container>
              </vts-space>
            </vts-card-footer>
          </vts-card>
        </div>
        <div vts-col vtsFlex="400px">
          <p>Direction Horizontal - Align Right</p>
          <vts-card>
            <vts-card-header vtsTitle="Card name">
              <vts-card-header-extra>
                <button vts-button vtsType="text">
                  <i vts-icon vtsType="Close"></i>
                </button>
              </vts-card-header-extra>
            </vts-card-header>
            <vts-card-meta
              vtsTitle="Gabriel Palmer"
              vtsDescription="Graphic Designer"
              vtsDirection="horizontal"
              vtsAlign="right"
            >
              <vts-card-meta-avatar
                vtsShape="rounded"
                [vtsSize]="72"
                [vtsSrc]="image"
                style="background: #00AB76"
              ></vts-card-meta-avatar>
            </vts-card-meta>
            <vts-card-footer vtsBordered>
              <vts-space vtsPreset="2" vtsJustify="center" style="width: 100%">
                <ng-container *vtsSpaceItem>
                  <ng-container *ngTemplateOutlet="fb"></ng-container>
                </ng-container>
                <ng-container *vtsSpaceItem>
                  <ng-container *ngTemplateOutlet="whatsapp"></ng-container>
                </ng-container>
                <ng-container *vtsSpaceItem>
                  <ng-container *ngTemplateOutlet="linkedin"></ng-container>
                </ng-container>
              </vts-space>
            </vts-card-footer>
          </vts-card>
        </div>
      </vts-row>
    </div>

    <ng-template #fb>
      <svg
        width="37"
        height="36"
        viewBox="0 0 37 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.799805" width="36" height="36" rx="3" fill="#3B5998" />
        <path
          d="M16.4002 27.5999V17.9999H13.2002V14.7999H16.4002V13.0815C16.4002 9.8279 17.985 8.3999 20.689 8.3999C21.9842 8.3999 22.669 8.4959 22.993 8.5399V11.5999H21.149C20.001 11.5999 19.6002 12.2055 19.6002 13.4327V14.7999H22.9642L22.5074 17.9999H19.6002V27.5999H16.4002Z"
          fill="white"
        />
      </svg>
    </ng-template>
    <ng-template #whatsapp>
      <svg
        width="37"
        height="36"
        viewBox="0 0 37 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.799805" width="36" height="36" rx="3" fill="#33B01E" />
        <path
          d="M18.8002 8.3999C13.4986 8.3999 9.2002 12.6983 9.2002 17.9999C9.2002 19.8009 9.70607 21.48 10.5689 22.9202L9.28613 27.5999L14.0658 26.3452C15.4637 27.1399 17.0774 27.5999 18.8002 27.5999C24.1018 27.5999 28.4002 23.3015 28.4002 17.9999C28.4002 12.6983 24.1018 8.3999 18.8002 8.3999ZM15.5143 13.5218C15.6703 13.5218 15.8305 13.5208 15.9689 13.528C16.1401 13.532 16.3265 13.5446 16.5049 13.939C16.7169 14.4078 17.1785 15.5838 17.2377 15.703C17.2969 15.8222 17.3388 15.9627 17.2564 16.1187C17.178 16.2787 17.1373 16.3755 17.0221 16.5171C16.9029 16.6547 16.7723 16.8256 16.6643 16.9296C16.5451 17.0488 16.422 17.1795 16.5596 17.4171C16.6972 17.6547 17.175 18.4336 17.8814 19.0624C18.7894 19.8736 19.5555 20.1229 19.7939 20.2421C20.0323 20.3613 20.1704 20.3427 20.308 20.1827C20.4496 20.0267 20.9027 19.4914 21.0627 19.253C21.2187 19.0146 21.3779 19.0559 21.5939 19.1343C21.8131 19.2127 22.9821 19.7885 23.2205 19.9077C23.4589 20.0269 23.6152 20.0859 23.6752 20.1827C23.7368 20.2827 23.7369 20.7588 23.5393 21.314C23.3417 21.8684 22.3713 22.4045 21.9361 22.4421C21.4969 22.4829 21.087 22.6395 19.0814 21.8499C16.6622 20.8971 15.1366 18.4193 15.0174 18.2593C14.8982 18.1033 14.0486 16.971 14.0486 15.803C14.0486 14.631 14.6631 14.0571 14.8783 13.8187C15.0975 13.5803 15.3543 13.5218 15.5143 13.5218Z"
          fill="white"
        />
      </svg>
    </ng-template>
    <ng-template #linkedin>
      <svg
        width="37"
        height="36"
        viewBox="0 0 37 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.799805" width="36" height="36" rx="3" fill="#0D659A" />
        <path
          d="M14 25.9999H10V13.9999H14V25.9999ZM12.0008 12.3999C10.8944 12.3999 10 11.5031 10 10.3991C10 9.2951 10.896 8.3999 12.0008 8.3999C13.1032 8.3999 14 9.2967 14 10.3991C14 11.5031 13.1032 12.3999 12.0008 12.3999ZM28.4 25.9999H24.5544V20.1599C24.5544 18.7671 24.528 16.9759 22.5552 16.9759C20.5528 16.9759 20.2448 18.4927 20.2448 20.0591V25.9999H16.4V13.9911H20.0912V15.6319H20.1432C20.6568 14.6879 21.912 13.6927 23.784 13.6927C27.68 13.6927 28.4 16.1799 28.4 19.4135V25.9999Z"
          fill="white"
        />
      </svg>
    </ng-template>
  `
})
export class VtsDemoCardMetaComponent {
  image =
    'data:image/png;base64,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';
}
