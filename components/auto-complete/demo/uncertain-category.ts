import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'vts-demo-auto-complete-uncertain-category',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="example-input">
      <vts-input-group vtsSearch vtsSize="lg" [vtsAddOnAfter]="suffixIconButton">
        <input
          placeholder="input here"
          vts-input
          [(ngModel)]="inputValue"
          (input)="onChange($event)"
          [vtsAutocomplete]="auto"
        />
      </vts-input-group>
      <ng-template #suffixIconButton>
        <button vts-button vtsType="primary" vtsSize="lg" vtsSearch>
          <i vts-icon vtsType="Search"></i>
        </button>
      </ng-template>
      <vts-autocomplete #auto>
        <vts-auto-option
          class="global-search-item"
          *ngFor="let option of options"
          [vtsValue]="option.category"
        >
          Found {{ option.value }} on
          <a
            class="global-search-item-desc"
            [href]="'https://s.taobao.com/search?q=' + option.value"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ option.category }}
          </a>
          <span class="global-search-item-count">{{ option.count }} results</span>
        </vts-auto-option>
      </vts-autocomplete>
    </div>
  `,
  styles: [
    `
      .global-search-item {
        display: flex;
      }

      .global-search-item-desc {
        flex: auto;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .global-search-item-count {
        flex: none;
      }
    `
  ]
})
export class VtsDemoAutoCompleteUncertainCategoryComponent {
  inputValue?: string;
  options: Array<{ value: string; category: string; count: number }> = [];

  onChange(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this.options = new Array(this.getRandomInt(5, 15))
      .join('.')
      .split('.')
      .map((_item, idx) => ({
        value,
        category: `${value}${idx}`,
        count: this.getRandomInt(200, 100)
      }));
  }

  private getRandomInt(max: number, min: number = 0): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
