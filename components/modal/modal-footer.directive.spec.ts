import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  inject,
  TestBed,
  waitForAsync
} from '@angular/core/testing';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

import { VtsModalFooterDirective } from './modal-footer.directive';
import { VtsModalRef } from './modal-ref';
import { VtsModalComponent } from './modal.component';
import { VtsModalModule } from './modal.module';
import { VtsModalService } from './modal.service';

describe('modal footer directive', () => {
  let overlayContainer: OverlayContainer;
  let fixture: ComponentFixture<TestDirectiveFooterComponent>;
  let testComponent: TestDirectiveFooterComponent;
  let modalService: VtsModalService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [VtsModalModule, NoopAnimationsModule],
      declarations: [
        TestDirectiveFooterComponent,
        TestDirectiveFooterInServiceComponent,
        TestDirectiveFooterWithInitOpenedComponent
      ],
      providers: [VtsModalService]
    });

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDirectiveFooterComponent);
    testComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject(
    [OverlayContainer, VtsModalService],
    (oc: OverlayContainer, m: VtsModalService) => {
      overlayContainer = oc;
      modalService = m;
    }
  ));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should work with template', () => {
    testComponent.showModal();
    fixture.detectChanges();
    expect(testComponent.isVisible).toBe(true);
    const modalRef = testComponent.vtsModalComponent.getModalRef();
    expect(modalRef!.getConfig().vtsFooter).toEqual(testComponent.vtsModalFooterDirective);

    testComponent.handleCancel();
    fixture.detectChanges();
  });

  it('should work with template when init opened', fakeAsync(() => {
    const initOpenedComponentFixture = TestBed.createComponent(
      TestDirectiveFooterWithInitOpenedComponent
    );
    const initOpenedComponent = initOpenedComponentFixture.componentInstance;
    initOpenedComponentFixture.detectChanges();
    expect(initOpenedComponent.isVisible).toBe(true);
    flush();
    initOpenedComponentFixture.detectChanges();
    const modalRef = initOpenedComponent.vtsModalComponent.getModalRef();

    expect(modalRef!.getConfig().vtsFooter).toEqual(initOpenedComponent.vtsModalFooterDirective);

    initOpenedComponentFixture.detectChanges();
  }));

  it('should work with service', () => {
    const modalRef = modalService.create({
      vtsContent: TestDirectiveFooterInServiceComponent,
      vtsFooter: null
    });
    fixture.detectChanges();

    expect(modalRef.componentInstance!.vtsModalRef).toBe(modalRef);
    expect(modalRef.componentInstance!.vtsModalFooterDirective).toEqual(
      modalRef.getConfig().vtsFooter as TemplateRef<{}>
    );
  });
});

@Component({
  template: `
    <vts-modal
      [(vtsVisible)]="isVisible"
      vtsTitle="Custom Modal Title"
      (vtsOnCancel)="handleCancel()"
    >
      <div>
        <p>Modal Content</p>
      </div>
      <div *vtsModalFooter>
        <button id="btn-template" vts-button vtsType="default" (click)="handleCancel()">
          Custom Callback
        </button>
      </div>
    </vts-modal>
  `
})
class TestDirectiveFooterComponent {
  isVisible = false;
  @ViewChild(VtsModalComponent) vtsModalComponent!: VtsModalComponent;
  @ViewChild(VtsModalFooterDirective, { static: true, read: TemplateRef })
  vtsModalFooterDirective!: TemplateRef<VtsSafeAny>;

  constructor() {}

  handleCancel(): void {
    this.isVisible = false;
  }

  showModal(): void {
    this.isVisible = true;
  }
}

@Component({
  template: `
    <vts-modal [(vtsVisible)]="isVisible" vtsTitle="Custom Modal Title">
      <div>
        <p>Modal Content</p>
      </div>
      <div *vtsModalFooter>
        <button id="btn-template" vts-button vtsType="default">Custom Callback</button>
      </div>
    </vts-modal>
  `
})
class TestDirectiveFooterWithInitOpenedComponent {
  isVisible = true;
  @ViewChild(VtsModalComponent) vtsModalComponent!: VtsModalComponent;
  @ViewChild(VtsModalFooterDirective, { static: true, read: TemplateRef })
  vtsModalFooterDirective!: TemplateRef<VtsSafeAny>;

  constructor() {}
}

@Component({
  template: `
    <div *vtsModalFooter>
      <button id="btn-template" vts-button vtsType="default" (click)="handleCancel()">
        Custom Callback
      </button>
    </div>
  `
})
class TestDirectiveFooterInServiceComponent {
  @ViewChild(VtsModalFooterDirective, { static: true, read: TemplateRef })
  vtsModalFooterDirective!: TemplateRef<VtsSafeAny>;

  constructor(public vtsModalRef: VtsModalRef) {}

  handleCancel(): void {
    this.vtsModalRef.close();
  }
}
