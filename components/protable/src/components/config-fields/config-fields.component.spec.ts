/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VtsConfigFieldsComponent } from '@ui-vts/ng-vts/protable/public-api';

describe('ConfigFieldsComponent', () => {
  let component: VtsConfigFieldsComponent;
  let fixture: ComponentFixture<VtsConfigFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtsConfigFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtsConfigFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
