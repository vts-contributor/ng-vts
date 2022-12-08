import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { VtsMessageService } from '@ui-vts/ng-vts/message';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface ItemData {
  gender: string;
  name: Name;
  email: string;
}

interface Name {
  title: string;
  first: string;
  last: string;
}

@Component({
  selector: 'vts-demo-list-infinite-load',
  template: `
    <div>
      <cdk-virtual-scroll-viewport itemSize="73" class="demo-infinite-container">
        <vts-list>
          <vts-list-item *cdkVirtualFor="let item of ds">
            <vts-skeleton
              *ngIf="!item"
              [vtsAvatar]="true"
              [vtsParagraph]="{ rows: 1 }"
            ></vts-skeleton>
            <vts-list-item-meta
              *ngIf="item"
              vtsAvatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              [vtsDescription]="item.email"
            >
              <vts-list-item-meta-title>
                <a href="https://ng.ant.design">{{ item.name.last }}</a>
              </vts-list-item-meta-title>
            </vts-list-item-meta>
          </vts-list-item>
        </vts-list>
      </cdk-virtual-scroll-viewport>
    </div>
  `,
  styles: [
    `
      .demo-infinite-container {
        height: 300px;
        border: 1px solid #e8e8e8;
        border-radius: 4px;
      }

      vts-list {
        padding: 24px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VtsDemoListInfiniteLoadComponent implements OnInit, OnDestroy {
  ds = new MyDataSource(this.http);

  private destroy$ = new Subject();
  constructor(private http: HttpClient, private vtsMessage: VtsMessageService) {}

  ngOnInit(): void {
    this.ds
      .completed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.vtsMessage.warning('Infinite List loaded all');
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

class MyDataSource extends DataSource<ItemData> {
  private pageSize = 10;
  private cachedData: ItemData[] = [];
  private fetchedPages = new Set<number>();
  private dataStream = new BehaviorSubject<ItemData[]>(this.cachedData);
  private complete$ = new Subject<void>();
  private disconnect$ = new Subject<void>();

  constructor(private http: HttpClient) {
    super();
  }

  completed(): Observable<void> {
    return this.complete$.asObservable();
  }

  connect(collectionViewer: CollectionViewer): Observable<ItemData[]> {
    this.setup(collectionViewer);
    return this.dataStream;
  }

  disconnect(): void {
    this.disconnect$.next();
    this.disconnect$.complete();
  }

  private setup(collectionViewer: CollectionViewer): void {
    this.fetchPage(0);
    collectionViewer.viewChange
      .pipe(takeUntil(this.complete$), takeUntil(this.disconnect$))
      .subscribe(range => {
        if (this.cachedData.length >= 50) {
          this.complete$.next();
          this.complete$.complete();
        } else {
          const endPage = this.getPageForIndex(range.end);
          this.fetchPage(endPage + 1);
        }
      });
  }

  private getPageForIndex(index: number): number {
    return Math.floor(index / this.pageSize);
  }

  private fetchPage(page: number): void {
    if (this.fetchedPages.has(page)) {
      return;
    }
    this.fetchedPages.add(page);

    this.http
      .get<{ results: ItemData[] }>(
        `https://randomuser.me/api/?results=${this.pageSize}&inc=name,gender,email,nat&noinfo`
      )
      .subscribe(res => {
        this.cachedData.splice(page * this.pageSize, this.pageSize, ...res.results);
        this.dataStream.next(this.cachedData);
      });
  }
}
