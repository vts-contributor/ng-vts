import { Component, OnInit } from '@angular/core';

interface ItemData {
  href: string;
  title: string;
  avatar: string;
  description: string;
  content: string;
}

@Component({
  selector: 'vts-demo-list-vertical',
  template: `
    <vts-list vtsItemLayout="vertical">
      <vts-list-item *ngFor="let item of data">
        <vts-list-item-meta>
          <vts-list-item-meta-avatar [vtsSrc]="item.avatar"></vts-list-item-meta-avatar>
          <vts-list-item-meta-title>
            <a href="{{ item.href }}">{{ item.title }}</a>
          </vts-list-item-meta-title>
          <vts-list-item-meta-description>
            {{ item.description }}
          </vts-list-item-meta-description>
        </vts-list-item-meta>
        {{ item.content }}
        <ul vts-list-item-actions>
          <vts-list-item-action>
            <i vts-icon vtsType="star-o" style="margin-right: 8px;"></i>
            156
          </vts-list-item-action>
          <vts-list-item-action>
            <i vts-icon vtsType="star-o" style="margin-right: 8px;"></i>
            156
          </vts-list-item-action>
          <vts-list-item-action>
            <i vts-icon vtsType="star-o" style="margin-right: 8px;"></i>
            2
          </vts-list-item-action>
        </ul>
        <vts-list-item-extra>
          <img
            width="272"
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        </vts-list-item-extra>
      </vts-list-item>
    </vts-list>
  `
})
export class VtsDemoListVerticalComponent implements OnInit {
  data: ItemData[] = [];

  ngOnInit(): void {
    this.loadData(1);
  }

  loadData(pi: number): void {
    this.data = new Array(5).fill({}).map((_, index) => {
      return {
        href: 'http://ant.design',
        title: `ant design part ${index} (page: ${pi})`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
          'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources ' +
          '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
      };
    });
  }
}
