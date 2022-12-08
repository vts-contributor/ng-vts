import { Component, OnDestroy } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { Subscription } from 'rxjs';
import cs_CZ from './languages/cs_CZ';
import de_DE from './languages/de_DE';
import en_US from './languages/en_US';
import ka_GE from './languages/ka_GE';
import zh_CN from './languages/zh_CN';
import { VtsI18nInterface } from './vts-i18n.interface';
import { VtsI18nModule } from './vts-i18n.module';
import { VtsI18nService } from './vts-i18n.service';

describe('i18n service', () => {
  let srv: VtsI18nService;
  let fixture: ComponentFixture<VtsI18nTestComponent>;
  let testComponent: VtsI18nTestComponent;
  const DEFAULT_LAN = zh_CN;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VtsI18nTestComponent],
      imports: [VtsI18nModule]
    }).compileComponents();
  });

  describe('#setLocale', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(VtsI18nTestComponent);
      testComponent = fixture.debugElement.componentInstance;
    });

    beforeEach(inject([VtsI18nService], (s: VtsI18nService) => {
      srv = s;
    }));

    it('should interface be right', () => {
      const i18nEN: VtsI18nInterface = en_US;
      const i18nDE: VtsI18nInterface = de_DE;
      const i18nCS: VtsI18nInterface = cs_CZ;
      const i18nKA: VtsI18nInterface = ka_GE;
      console.log(i18nEN, i18nDE, i18nCS, i18nKA);
    });

    it('should be auto default zh_CN', () => {
      expect(testComponent.locale.locale).toBe(DEFAULT_LAN.locale);
    });

    it('should trigger changed when set different lang', () => {
      const spy = spyOn(testComponent, 'updateLocale');
      expect(spy).not.toHaveBeenCalled();
      srv.setLocale(en_US);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should not trigger change when set same lang', () => {
      const spy = spyOn(testComponent, 'updateLocale');
      expect(spy).not.toHaveBeenCalled();
      srv.setLocale(zh_CN);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should warn when locale for a component is not provided', () => {
      const spy = spyOn(console, 'warn');
      srv.setLocale({ locale: 'not_existing_language' } as any); // tslint:disable-line no-any
      expect(srv.getLocaleData('global.placeholder')).toBeTruthy();
      expect(spy).toHaveBeenCalledWith(
        '[NG-ZORRO]:',
        `Missing translations for "global.placeholder" in language "not_existing_language".
You can use "VtsI18nService.setLocale" as a temporary fix.
Welcome to submit a pull request to help us optimize the translations!
https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/CONTRIBUTING.md`
      );
    });
  });
});

@Component({
  template: ''
})
export class VtsI18nTestComponent implements OnDestroy {
  locale!: VtsI18nInterface;

  private localeSubscription: Subscription;

  constructor(private vtsI18nService: VtsI18nService) {
    this.localeSubscription = this.vtsI18nService.localeChange.subscribe(locale => {
      this.updateLocale(locale);
    });
  }

  ngOnDestroy(): void {
    this.localeSubscription.unsubscribe();
  }

  updateLocale(locale: VtsI18nInterface): void {
    this.locale = locale;
  }
}
