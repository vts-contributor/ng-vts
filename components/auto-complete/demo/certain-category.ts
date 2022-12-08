import { Component, OnInit, ViewEncapsulation } from '@angular/core';

export interface AutocompleteOptionGroups {
  title: string;
  count?: number;
  children?: AutocompleteOptionGroups[];
}

@Component({
  selector: 'vts-demo-auto-complete-certain-category',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="example-input">
      <vts-input-group vtsSize="lg" [vtsSuffix]="suffixIcon">
        <input
          placeholder="input here"
          vts-input
          [(ngModel)]="inputValue"
          (ngModelChange)="onChange($event)"
          [vtsAutocomplete]="auto"
        />
      </vts-input-group>
      <ng-template #suffixIcon>
        <i vts-icon vtsType="Search"></i>
      </ng-template>
      <vts-autocomplete #auto>
        <vts-auto-optgroup *ngFor="let group of optionGroups" [vtsLabel]="groupTitle">
          <ng-template #groupTitle>
            <span>
              {{ group.title }}
              <a class="more-link" href="https://www.google.com/search?q=ng+zorro" target="_blank">
                更多
              </a>
            </span>
          </ng-template>
          <vts-auto-option
            *ngFor="let option of group.children"
            [vtsLabel]="option.title"
            [vtsValue]="option.title"
          >
            {{ option.title }}
            <span class="certain-search-item-count">{{ option.count }} 人 关注</span>
          </vts-auto-option>
        </vts-auto-optgroup>
      </vts-autocomplete>
    </div>
  `,
  styles: [
    `
      .certain-search-item-count {
        position: absolute;
        color: #999;
        right: 16px;
      }

      .more-link {
        float: right;
      }
    `
  ]
})
export class VtsDemoAutoCompleteCertainCategoryComponent implements OnInit {
  inputValue?: string;
  optionGroups: AutocompleteOptionGroups[] = [];

  constructor() {}

  onChange(value: string): void {
    console.log(value);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.optionGroups = [
        {
          title: '话题',
          children: [
            {
              title: 'AntDesign',
              count: 10000
            },
            {
              title: 'AntDesign UI',
              count: 10600
            }
          ]
        },
        {
          title: '问题',
          children: [
            {
              title: 'AntDesign UI 有多好',
              count: 60100
            },
            {
              title: 'AntDesign 是啥',
              count: 30010
            }
          ]
        },
        {
          title: '文章',
          children: [
            {
              title: 'AntDesign 是一个设计语言',
              count: 100000
            }
          ]
        }
      ];
    }, 1000);
  }
}
