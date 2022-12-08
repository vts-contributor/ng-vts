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
import { VtsModalTitleDirective } from './modal-title.directive';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';

import { VtsModalRef } from './modal-ref';
import { VtsModalComponent } from './modal.component';
import { VtsModalModule } from './modal.module';
import { VtsModalService } from './modal.service';

describe('modal title directive', () => {
  let overlayContainer: OverlayContainer;
  let fixture: ComponentFixture<TestDirectiveTitleComponent>;
  let testComponent: TestDirectiveTitleComponent;
  let modalService: VtsModalService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [VtsModalModule, NoopAnimationsModule],
        declarations: [
          TestDirectiveTitleComponent,
          TestDirectiveTitleInServiceComponent,
          TestDirectiveTitleWithInitOpenedComponent
        ],
        providers: [VtsModalService]
      });

      TestBed.compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDirectiveTitleComponent);
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
    expect(modalRef!.getConfig().vtsTitle).toEqual(testComponent.vtsModalTitleDirective);

    testComponent.handleCancel();
    fixture.detectChanges();
  });

  it('should work with template when init opened', fakeAsync(() => {
    const initOpenedComponentFixture = TestBed.createComponent(
      TestDirectiveTitleWithInitOpenedComponent
    );
    const initOpenedComponent = initOpenedComponentFixture.componentInstance;
    initOpenedComponentFixture.detectChanges();
    expect(initOpenedComponent.isVisible).toBe(true);
    flush();
    initOpenedComponentFixture.detectChanges();
    const modalRef = initOpenedComponent.vtsModalComponent.getModalRef();

    expect(modalRef!.getConfig().vtsTitle).toEqual(initOpenedComponent.vtsModalTitleDirective);

    initOpenedComponentFixture.detectChanges();
  }));

  it('should work with service', () => {
    const modalRef = modalService.create({
      vtsContent: TestDirectiveTitleInServiceComponent,
      vtsTitle: ''
    });
    fixture.detectChanges();

    expect(modalRef.componentInstance!.vtsModalRef).toBe(modalRef);
    expect(modalRef.componentInstance!.VtsModalTitleDirective).toEqual(
      modalRef.getConfig().vtsTitle as TemplateRef<{}>
    );
  });
});

@Component({
  template: `
    <vts-modal [(vtsVisible)]="isVisible" (vtsOnCancel)="handleCancel()">
      <div>
        <p>Modal Content</p>
      </div>
      <div *vtsModalTitle>Custom Modal Title</div>
    </vts-modal>
  `
})
class TestDirectiveTitleComponent {
  isVisible = false;
  @ViewChild(VtsModalComponent) vtsModalComponent!: VtsModalComponent;
  @ViewChild(VtsModalTitleDirective, { static: true, read: TemplateRef })
  vtsModalTitleDirective!: TemplateRef<VtsSafeAny>;

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
    <vts-modal [(vtsVisible)]="isVisible">
      <div>
        <p>Modal Content</p>
      </div>
      <div *vtsModalTitle>Custom Modal Title</div>
    </vts-modal>
  `
})
class TestDirectiveTitleWithInitOpenedComponent {
  isVisible = true;
  @ViewChild(VtsModalComponent) vtsModalComponent!: VtsModalComponent;
  @ViewChild(VtsModalTitleDirective, { static: true, read: TemplateRef })
  vtsModalTitleDirective!: TemplateRef<VtsSafeAny>;

  constructor() {}
}

@Component({
  template: `
    <div *vtsModalTitle>Custom Modal Title</div>
  `
})
class TestDirectiveTitleInServiceComponent {
  @ViewChild(VtsModalTitleDirective, { static: true, read: TemplateRef })
  VtsModalTitleDirective!: TemplateRef<VtsSafeAny>;

  constructor(public vtsModalRef: VtsModalRef) {}

  handleCancel(): void {
    this.vtsModalRef.close();
  }
}
