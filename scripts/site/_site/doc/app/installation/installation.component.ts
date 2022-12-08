import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { VtsChartOptions, VtsDonutOptions } from '@ui-vts/ng-vts/chart';

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

  donutChartOptions: VtsChartOptions = {
    series: [50, 34, 96, 20],
    chart: {
      type: 'donut',
      width: 510,
      height: 190
    },
    colors: ['#708C95', '#385A64', '#004E7A', '#F88240'],
    labels: ['No process', 'Processing', 'Processed', 'Out of date'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ],
    title: {
      text: 'Process Statistic',
      align: 'center'
    }
  };

  extraDonutChartOptions: VtsDonutOptions = {
    title: '25.145',
    subtitle: 'Offers'
  };

  verticalBarChartOptions: VtsChartOptions = {
    series: [
      {
        name: 'distibuted',
        data: [115, 49, 74, 89, 66, 34, 92, 116, 92, 94]
      }
    ],
    chart: {
      type: 'bar',
      height: 350
    },
    colors: ['#51737D'],
    xaxis: {
      categories: Array.from({ length: 10 }).map(_ => '01/12')
    },
    title: {
      text: 'Population Distribution',
      align: 'left'
    }
  };

  veriticalLineChartOptions: VtsChartOptions = {
    series: [
      {
        name: 'New request',
        type: 'column',
        data: [376, 220, 288, 152, 272, 210, 330]
      },
      {
        name: 'Request processed',
        type: 'line',
        data: [320, 205, 260, 140, 300, 195, 220]
      }
    ],
    colors: ['#CB002B', '#385A64'],
    chart: {
      type: 'line',
      height: 350
    },
    labels: ['29/11', '30/11', '01/12', '02/12', '03/12', '04/12', '05/12'],
    title: {
      text: 'Request Usage',
      align: 'left'
    }
  };

  lineChartOptions: VtsChartOptions = {
    series: [
      {
        name: 'Network',
        data: [
          {
            x: 0,
            y: 210
          },
          {
            x: 3,
            y: 180
          },
          {
            x: 6,
            y: 90
          },
          {
            x: 9,
            y: 180
          },
          {
            x: 12,
            y: 200
          },
          {
            x: 15,
            y: 150
          },
          {
            x: 18,
            y: 100
          },
          {
            x: 21,
            y: 70
          },
          {
            x: 24,
            y: 145
          }
        ]
      }
    ],
    chart: {
      type: 'area',
      height: 350
    },
    colors: ['#C65312'],
    fill: {
      colors: ['#C0CFD3', '#C0CFD3']
    },
    markers: {
      size: 5,
      colors: ['#F80035']
    },
    xaxis: {
      min: 0,
      max: 24,
      tickAmount: 9,
      overwriteCategories: Array.from({ length: 9 }).map((_, idx) => `${idx * 3}h`)
    },
    title: {
      text: 'Network Usage',
      align: 'left'
    }
  };

  verticalGroupChartOptions: VtsChartOptions = {
    series: [
      {
        name: 'Value',
        data: [200, 350, 390, 432, 321, 199]
      }
    ],
    chart: {
      type: 'bar',
      height: 270
    },
    colors: ['#FF9466', '#D9733A', '#DBA816', '#AF8612', '#CB002B', '#AD0025'],
    labels: ['Option 01', 'Option 02', 'Option 03', 'Option 04', 'Option 05', 'Option 06'],
    title: {
      text: 'Resource Compare',
      align: 'left'
    }
  };

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
