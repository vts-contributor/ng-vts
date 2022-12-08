import { Component } from '@angular/core';

@Component({
  selector: 'vts-demo-drawer-user-profile',
  template: `
    <vts-list [vtsDataSource]="data" [vtsRenderItem]="item" [vtsItemLayout]="'horizontal'">
      <ng-template #item let-item>
        <vts-list-item [vtsActions]="[viewAction]">
          <ng-template #viewAction>
            <a (click)="open()">View Profile</a>
          </ng-template>
          <vts-list-item-meta
            [vtsTitle]="vtsTitle"
            vtsAvatar="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
            vtsDescription="Progresser AFX"
          >
            <ng-template #vtsTitle>
              <a href="https://ng.ant.design">{{ item.name }}</a>
            </ng-template>
          </vts-list-item-meta>
        </vts-list-item>
      </ng-template>
    </vts-list>
    <vts-drawer
      [vtsVisible]="visible"
      [vtsWidth]="640"
      [vtsClosable]="false"
      (vtsOnClose)="close()"
    >
      <ng-container *vtsDrawerContent>
        <p class="title" style=" margin-bottom: 24px;">User Profile</p>
        <vts-descriptions [vtsColumn]="2" vtsTitle="Personal">
          <vts-descriptions-item vtsTitle="Full Name" [vtsSpan]="1">Lily</vts-descriptions-item>
          <vts-descriptions-item vtsTitle="Account" [vtsSpan]="1">
            AntDesign@example.com
          </vts-descriptions-item>
          <vts-descriptions-item vtsTitle="City" [vtsSpan]="1">HangZhou</vts-descriptions-item>
          <vts-descriptions-item vtsTitle="Country" [vtsSpan]="1">China🇨🇳</vts-descriptions-item>
          <vts-descriptions-item vtsTitle="Birthday" [vtsSpan]="1">
            February 2,1900
          </vts-descriptions-item>
          <vts-descriptions-item vtsTitle="Website" [vtsSpan]="1">-</vts-descriptions-item>
          <vts-descriptions-item vtsTitle="Message" [vtsSpan]="2">
            Make things as simple as possible but no simpler.
          </vts-descriptions-item>
        </vts-descriptions>
        <vts-divider></vts-divider>
        <vts-descriptions [vtsColumn]="2" vtsTitle="Company">
          <vts-descriptions-item vtsTitle="Position" [vtsSpan]="1">
            Programmer
          </vts-descriptions-item>
          <vts-descriptions-item vtsTitle="Responsibilities" [vtsSpan]="1">
            Coding
          </vts-descriptions-item>
          <vts-descriptions-item vtsTitle="Department" [vtsSpan]="1">AFX</vts-descriptions-item>
          <vts-descriptions-item vtsTitle="Supervisor" [vtsSpan]="1">Lin</vts-descriptions-item>
          <vts-descriptions-item vtsTitle="Skills" [vtsSpan]="2">
            C / C + +, data structures, software engineering, operating systems, computer networks,
            databases, compiler theory, computer architecture, Microcomputer Principle and Interface
            Technology, Computer English, Java, ASP, etc.
          </vts-descriptions-item>
        </vts-descriptions>
        <vts-divider></vts-divider>
        <vts-descriptions [vtsColumn]="2" vtsTitle="Contacts">
          <vts-descriptions-item vtsTitle="Email" [vtsSpan]="1">
            AntDesign@example.com
          </vts-descriptions-item>
          <vts-descriptions-item vtsTitle="Phone Number" [vtsSpan]="1">
            +86 181 0000 0000
          </vts-descriptions-item>
          <vts-descriptions-item vtsTitle="Github" [vtsSpan]="2">
            <a href="https://github.com/NG-ZORRO/ng-zorro-antd" target="_blank">
              github.com/NG-ZORRO/ng-zorro-antd
            </a>
          </vts-descriptions-item>
        </vts-descriptions>
      </ng-container>
    </vts-drawer>
  `,
  styles: [
    `
      .title {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.85);
        line-height: 24px;
        display: block;
        margin-bottom: 16px;
      }
      .item-wrap {
        font-size: 16px;
        line-height: 22px;
        margin-bottom: 7px;
        color: rgba(0, 0, 0, 0.65);
      }
      .label {
        margin-right: 8px;
        display: inline-block;
        color: rgba(0, 0, 0, 0.85);
      }
    `
  ]
})
export class VtsDemoDrawerUserProfileComponent {
  data = [
    {
      name: 'Lily'
    },
    {
      name: 'Lily'
    }
  ];

  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
