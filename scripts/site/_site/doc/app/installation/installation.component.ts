import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-introduction',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class InstallationComponent implements OnInit, OnDestroy {
  Array = Array;
  vtsSize: any = 'md';

  listOfOption: Array<{ label: string; value: string }> = [];
  selectValue = ['option1', 'option5'];

  dateValue = new Date(2021, 3, 10, 13, 45, 0);

  pageSize = 10;
  pageIndex = 1;
  checked = false;
  indeterminate = false;
  setOfCheckedId = new Set<string>();
  tableData = Array.from({ length: 300 }).map((_, i) => {
    return {
      id: `${i + 1}`,
      orderId: `${Math.round(Math.random() * 10000) + 10000}-${
        Math.round(Math.random() * 100) + 100
      }`,
      country: this.random([
        'Czech Republic CZ',
        'China CN',
        'Peru PE',
        'Vietnam VN',
        'Japan JP',
        'France FR',
        'Russia RU',
        'Indonesia ID'
      ]),
      companyName: this.random([
        'Cassin, Krajcik and Nicolas',
        'Gorczany-O’Keefe',
        'Dickens, Jast and Abernathy',
        'Kshlerin Treutel',
        'Tillman & Rogahn',
        'Friesen',
        'Schmeler & Swift',
        'Feil-Monahan'
      ]),
      status: this.random(['Success', 'Pending', 'Info', 'Danger']),
      type: this.random(['Direct', 'Online', 'Retail'])
    };
  });

  random(list: any[]) {
    const length = list.length;
    const random = Math.round(Math.random() * (length - 1));
    return list[random];
  }

  onAllChecked(checked: any): void {
    this.tableData.forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.tableData;
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate =
      listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  sortDirections = ['ascend', 'descend', null];
  sortFn = (a: any, b: any) => (a.country[0] < b.country[0] ? 1 : -1);

  constructor() {}

  ngOnInit(): void {
    for (let i = 1; i < 9; i++) {
      this.listOfOption.push({ label: `Option ${i}`, value: `option${i}` });
    }

    const container = document.querySelector('.main-container');
    container?.setAttribute('style', 'padding-right: 40px;');

    const prevNext = document.querySelector('.prev-next-nav');
    prevNext?.setAttribute('style', 'margin-right: 40px;');
  }

  ngOnDestroy() {
    const container = document.querySelector('.main-container');
    container?.removeAttribute('style');

    const prevNext = document.querySelector('.prev-next-nav');
    prevNext?.removeAttribute('style');
  }
}
