import { BACKSPACE, DOWN_ARROW, ENTER, ESCAPE, SPACE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  dispatchFakeEvent,
  dispatchKeyboardEvent,
  dispatchMouseEvent,
  ɵComponentBed as ComponentBed,
  ɵcreateComponentBed as createComponentBed
} from '@ui-vts/ng-vts/core/testing';
import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { VtsIconTestModule } from '@ui-vts/ng-vts/icon/testing';
import { VtsSelectComponent, VtsSelectSize } from './select.component';
import { VtsSelectModule } from './select.module';
import {
  vtsCustomFilterFnType,
  VtsSelectItemInterface,
  VtsSelectOptionInterface
} from './select.types';

describe('select', () => {
  describe('default template mode', () => {
    let testBed: ComponentBed<TestSelectTemplateDefaultComponent>;
    let component: TestSelectTemplateDefaultComponent;
    let fixture: ComponentFixture<TestSelectTemplateDefaultComponent>;
    let selectElement!: HTMLElement;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      testBed = createComponentBed(TestSelectTemplateDefaultComponent, {
        imports: [VtsSelectModule, VtsIconTestModule, FormsModule]
      });
      component = testBed.component;
      fixture = testBed.fixture;
      selectElement = testBed.debugElement.query(By.directive(VtsSelectComponent)).nativeElement;
    });

    beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainerElement = oc.getContainerElement();
    }));

    it('should classname correct', () => {
      expect(selectElement.classList).toContain('vts-select');
      expect(selectElement.classList).toContain('vts-select-single');
    });
    it('should vtsSize work', () => {
      component.vtsSize = 'large';
      fixture.detectChanges();
      expect(selectElement.classList).toContain('vts-select-lg');
      component.vtsSize = 'small';
      fixture.detectChanges();
      expect(selectElement.classList).toContain('vts-select-sm');
    });
    it('should vtsPlaceHolder work', () => {
      expect(
        selectElement.querySelector('.vts-select-selection-placeholder')!.textContent!.trim()
      ).toBe('');
      component.vtsPlaceHolder = 'placeholder';
      fixture.detectChanges();
      expect(
        selectElement.querySelector('.vts-select-selection-placeholder')!.textContent
      ).toContain('placeholder');
    });
    it('should vtsDropdownRender work', () => {
      component.vtsOpen = true;
      fixture.detectChanges();
      expect(document.getElementsByClassName('dropdown-render').length).toBe(0);
      component.vtsDropdownRender = component.dropdownTemplate;
      fixture.detectChanges();
      expect(document.getElementsByClassName('dropdown-render')[0]!.textContent).toBe(
        'dropdownRender'
      );
    });
    it('should ngModel match vtsLabel', fakeAsync(() => {
      component.listOfOption = [{ vtsValue: 'test_value', vtsLabel: 'test_label' }];
      fixture.detectChanges();
      expect(selectElement.querySelector('vts-select-item')).toBeFalsy();
      component.value = 'test_value';
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.querySelector('vts-select-item')!.textContent).toBe('test_label');
      component.listOfOption = [];
      fixture.detectChanges();
      expect(selectElement.querySelector('vts-select-item')!.textContent).toBe('test_label');
      expect(component.valueChange).not.toHaveBeenCalled();
    }));
    it('should ngModelChange trigger when click option', fakeAsync(() => {
      component.listOfOption = [
        { vtsValue: 'test_01', vtsLabel: 'test_01' },
        { vtsValue: 'test_02', vtsLabel: 'test_02' }
      ];
      component.value = 'test_01';
      component.vtsOpen = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const listOfContainerItem = document.querySelectorAll('vts-option-item');
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.valueChange).toHaveBeenCalledTimes(1);
      expect(component.valueChange).toHaveBeenCalledWith('test_02');
      expect(component.openChange).toHaveBeenCalledTimes(1);
      expect(component.openChange).toHaveBeenCalledWith(false);
    }));
    it('should ngModelChange trigger when click clear icon', fakeAsync(() => {
      component.listOfOption = [{ vtsValue: 'test_value', vtsLabel: 'test_label' }];
      component.value = 'test_value';
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.querySelector('vts-select-clear')).toBeFalsy();
      component.vtsAllowClear = true;
      fixture.detectChanges();
      dispatchMouseEvent(selectElement.querySelector('vts-select-clear')!, 'click');
      fixture.detectChanges();
      expect(component.valueChange).toHaveBeenCalledTimes(1);
      expect(component.valueChange).toHaveBeenCalledWith(null);
    }));
    it('should vtsOpenChange trigger correct times', () => {
      component.vtsOpen = true;
      fixture.detectChanges();
      expect(component.openChange).not.toHaveBeenCalled();
      const topSelectElement = selectElement.querySelector('.vts-select-selector')!;
      dispatchFakeEvent(topSelectElement, 'click');
      fixture.detectChanges();
      expect(component.openChange).toHaveBeenCalledTimes(1);
      expect(component.openChange).toHaveBeenCalledWith(false);
      dispatchFakeEvent(topSelectElement, 'click');
      fixture.detectChanges();
      expect(component.openChange).toHaveBeenCalledTimes(2);
      expect(component.openChange).toHaveBeenCalledWith(true);
    });
    it('should click input not close in searching mode', () => {
      component.vtsShowSearch = true;
      fixture.detectChanges();
      const topSelectElement = selectElement.querySelector('.vts-select-selector')!;
      dispatchFakeEvent(topSelectElement, 'click');
      fixture.detectChanges();
      expect(component.openChange).toHaveBeenCalledTimes(1);
      expect(component.openChange).toHaveBeenCalledWith(true);
      dispatchFakeEvent(topSelectElement, 'click');
      fixture.detectChanges();
      expect(component.openChange).toHaveBeenCalledTimes(1);
    });
    it('should vtsCustomTemplate works', fakeAsync(() => {
      component.listOfOption = [{ vtsValue: 'value', vtsLabel: 'label' }];
      fixture.detectChanges();
      expect(selectElement.querySelector('vts-select-item')).toBeFalsy();
      component.value = 'value';
      component.vtsCustomTemplate = component.customTemplate;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.querySelector('vts-select-item')!.textContent).toBe('selected: label');
    }));
    it('should vtsShowArrow works', () => {
      expect(selectElement.querySelector('vts-select-arrow')).toBeTruthy();
      component.vtsShowArrow = false;
      fixture.detectChanges();
      expect(selectElement.querySelector('vts-select-arrow')).toBeFalsy();
    });
    it('should vtsSuffixIcon works', () => {
      expect(selectElement.querySelector('.vtsicon-down')).toBeTruthy();
      component.vtsSuffixIcon = component.suffixIconTemplate;
      fixture.detectChanges();
      expect(selectElement.querySelector('vts-select-arrow')!.textContent).toBe('icon');
    });
    it('should vtsClearIcon works', fakeAsync(() => {
      component.vtsAllowClear = true;
      component.listOfOption = [{ vtsValue: 'value', vtsLabel: 'label' }];
      component.value = 'value';
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.querySelector('.vtsicon-Close')).toBeTruthy();
      component.vtsClearIcon = component.suffixIconTemplate;
      fixture.detectChanges();
      expect(selectElement.querySelector('vts-select-clear')!.textContent).toBe('icon');
    }));
    it('should vtsShowSearch works', fakeAsync(() => {
      component.listOfOption = [
        { vtsValue: 'test_01', vtsLabel: 'test_01' },
        { vtsValue: 'test_02', vtsLabel: 'test_02' }
      ];
      component.vtsShowSearch = true;
      component.vtsOpen = true;
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.searchValueChange).toHaveBeenCalledWith('test');
      expect(document.querySelectorAll('vts-option-item').length).toBe(2);
      inputElement.value = '02';
      dispatchFakeEvent(inputElement, 'input');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(document.querySelectorAll('vts-option-item').length).toBe(1);
    }));
    it('should vtsCustomFilterFn works', fakeAsync(() => {
      component.listOfOption = [
        { vtsValue: 'test_01', vtsLabel: 'test_01' },
        { vtsValue: 'test_02', vtsLabel: 'test_02' },
        { vtsValue: 'test_03', vtsLabel: 'test_03' }
      ];
      component.vtsShowSearch = true;
      component.vtsCustomFilterFn = () => true;
      component.vtsOpen = true;
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = '02';
      dispatchFakeEvent(inputElement, 'input');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(document.querySelectorAll('vts-option-item').length).toBe(3);
    }));
    it('should vtsCustomCompareFn works', fakeAsync(() => {
      component.listOfOption = [{ vtsValue: { value: 'test_value' }, vtsLabel: 'test_label' }];
      fixture.detectChanges();
      expect(selectElement.querySelector('vts-select-item')).toBeFalsy();
      component.value = { value: 'test_value' };
      component.vtsCustomCompareFn = (o1: VtsSafeAny, o2: VtsSafeAny) =>
        o1 && o2 ? o1.value === o2.value : o1 === o2;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.querySelector('vts-select-item')!.textContent).toBe('test_label');
    }));
    it('should vtsBorderless works', () => {
      expect(selectElement.classList).not.toContain('vts-select-borderless');
      component.vtsBorderless = true;
      fixture.detectChanges();
      expect(selectElement.classList).toContain('vts-select-borderless');
    });
    it('should vtsAutoFocus works', () => {
      component.vtsAutoFocus = true;
      fixture.detectChanges();
      expect(selectElement.querySelector('input')!.attributes.getNamedItem('autofocus')!.name).toBe(
        'autofocus'
      );
      component.vtsAutoFocus = false;
      fixture.detectChanges();
      expect(
        selectElement.querySelector('input')!.attributes.getNamedItem('autofocus')
      ).toBeFalsy();
    });
    it('should vtsServerSearch works', fakeAsync(() => {
      component.listOfOption = [
        { vtsValue: '1', vtsLabel: '1' },
        { vtsValue: '2', vtsLabel: '2' },
        { vtsValue: '3', vtsLabel: '3' }
      ];
      component.vtsServerSearch = true;
      component.vtsShowSearch = true;
      component.vtsOpen = true;
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = '02';
      dispatchFakeEvent(inputElement, 'input');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(document.querySelectorAll('vts-option-item').length).toBe(3);
    }));
    it('should vtsDisabled works', fakeAsync(() => {
      component.vtsDisabled = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.classList).toContain('vts-select-disabled');
      expect(selectElement.querySelector('input')!.getAttribute('disabled')).toBe('');
    }));

    it('should vtsBackdrop works', fakeAsync(() => {
      component.vtsOpen = true;
      component.vtsBackdrop = true;
      fixture.detectChanges();
      flush();
      expect(overlayContainerElement.children[0].classList).toContain('cdk-overlay-backdrop');
    }));

    it('should close dropdown when ESC keydown', fakeAsync(() => {
      component.vtsOpen = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      dispatchKeyboardEvent(overlayContainerElement, 'keydown', ESCAPE, overlayContainerElement);

      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(component.vtsOpen).toBe(false);
    }));

    it('should keydown up arrow and down arrow', fakeAsync(() => {
      const flushChanges = () => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      };
      component.listOfOption = [
        { vtsValue: 'value_01', vtsLabel: 'label_01' },
        { vtsValue: 'value_02', vtsLabel: 'label_02', vtsDisabled: true },
        { vtsValue: 'value_03', vtsLabel: 'label_03' }
      ];
      component.value = 'value_01';
      component.vtsOpen = true;
      flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      dispatchKeyboardEvent(inputElement, 'keydown', UP_ARROW, inputElement);
      flushChanges();
      expect(document.querySelectorAll('vts-option-item')[2]!.classList).toContain(
        'vts-select-item-option-active'
      );
      dispatchKeyboardEvent(inputElement, 'keydown', DOWN_ARROW, inputElement);
      flushChanges();
      expect(document.querySelectorAll('vts-option-item')[0]!.classList).toContain(
        'vts-select-item-option-active'
      );
      dispatchKeyboardEvent(inputElement, 'keydown', DOWN_ARROW, inputElement);
      flushChanges();
      dispatchKeyboardEvent(inputElement, 'keydown', ENTER, inputElement);
      flushChanges();
      expect(component.valueChange).toHaveBeenCalledWith('value_03');
      flushChanges();
      dispatchKeyboardEvent(inputElement, 'keydown', SPACE, inputElement);
      flushChanges();
      expect(component.openChange).toHaveBeenCalledWith(false);
      dispatchKeyboardEvent(inputElement, 'keydown', SPACE, inputElement);
      flushChanges();
      expect(component.openChange).toHaveBeenCalledWith(true);
      dispatchKeyboardEvent(inputElement, 'keydown', TAB, inputElement);
      flushChanges();
      expect(component.openChange).toHaveBeenCalledWith(false);
      expect(component.openChange).toHaveBeenCalledTimes(3);
    }));
    it('should mouseenter activated option work', fakeAsync(() => {
      const flushChanges = () => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      };
      component.listOfOption = [
        { vtsValue: 'value_01', vtsLabel: 'label_01' },
        { vtsValue: 'value_02', vtsLabel: 'label_02', vtsDisabled: true },
        { vtsValue: 'value_03', vtsLabel: 'label_03' }
      ];
      component.vtsOpen = true;
      flushChanges();
      const targetItem = document.querySelectorAll('vts-option-item')[2]!;
      expect(targetItem.classList).not.toContain('vts-select-item-option-active');
      dispatchFakeEvent(targetItem, 'mouseenter');
      flushChanges();
      expect(targetItem.classList).toContain('vts-select-item-option-active');
    }));

    it('should group item change work', fakeAsync(() => {
      component.listOfGroup = [
        {
          vtsLabel: 'group-1',
          children: [{ vtsValue: 'value_01', vtsLabel: 'label_01' }]
        }
      ];
      component.vtsOpen = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(document.querySelectorAll('vts-option-item')!.length).toBe(1);
      expect(document.querySelectorAll('vts-option-item-group')!.length).toBe(1);
      component.listOfGroup = [
        {
          vtsLabel: 'group-1',
          children: [
            { vtsValue: 'value_01', vtsLabel: 'label_01' },
            { vtsValue: 'value_02', vtsLabel: 'label_02' }
          ]
        },
        {
          vtsLabel: 'group-2',
          children: [{ vtsValue: 'value_03', vtsLabel: 'label_03' }]
        }
      ];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(document.querySelectorAll('vts-option-item')!.length).toBe(3);
      expect(document.querySelectorAll('vts-option-item-group')!.length).toBe(2);
      expect(document.querySelectorAll('vts-option-item-group')[0]!.textContent).toBe('group-1');
      expect(document.querySelectorAll('vts-option-item')[0].textContent).toBe('label_01');
      component.listOfGroup[0].vtsLabel = 'change-group';
      component.listOfGroup[0].children[0].vtsLabel = 'change-label';
      fixture.detectChanges();
      expect(document.querySelectorAll('vts-option-item-group')[0]!.textContent).toBe(
        'change-group'
      );
      expect(document.querySelectorAll('vts-option-item')[0].textContent).toBe('change-label');
    }));

    it('should group item sort be right', fakeAsync(() => {
      component.listOfGroup = [
        {
          vtsLabel: 'group-1',
          children: [
            { vtsValue: 'value_01', vtsLabel: 'label_01' },
            { vtsValue: 'value_02', vtsLabel: 'label_02' }
          ]
        },
        {
          vtsLabel: 'group-2',
          children: [
            { vtsValue: 'value_03', vtsLabel: 'label_03' },
            { vtsValue: 'value_04', vtsLabel: 'label_04' }
          ]
        }
      ];
      component.vtsOpen = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(
        document
          .querySelectorAll('vts-option-item')[0]
          .parentElement!.querySelector('vts-option-item')!.nextElementSibling!.textContent
      ).toBe('label_02');
    }));

    it('should have selected class if item was selected', fakeAsync(() => {
      const flushChanges = () => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      };
      component.listOfOption = [
        { vtsValue: 0, vtsLabel: 'Falsy value' },
        { vtsValue: 'Truthy value', vtsLabel: 'Truthy value' },
        { vtsValue: 'disabled', vtsLabel: 'disabled', vtsDisabled: true },
        { vtsValue: undefined, vtsLabel: 'undefined' },
        { vtsValue: null, vtsLabel: 'null' }
      ];
      component.vtsOpen = true;
      component.value = 0;
      flushChanges();
      expect(
        document.querySelectorAll('vts-option-item.vts-select-item-option-selected').length
      ).toBe(1);
      expect(
        document.querySelectorAll('vts-option-item.vts-select-item-option-selected')[0].textContent
      ).toBe('Falsy value');
      component.value = 'Truthy value';
      flushChanges();
      expect(
        document.querySelectorAll('vts-option-item.vts-select-item-option-selected').length
      ).toBe(1);
      expect(
        document.querySelectorAll('vts-option-item.vts-select-item-option-selected')[0].textContent
      ).toBe('Truthy value');
      ['disabled', undefined, null].forEach(value => {
        component.value = value;
        flushChanges();
        expect(
          document.querySelectorAll('vts-option-item.vts-select-item-option-selected').length
        ).toBe(0);
      });
    }));
  });
  describe('multiple template mode', () => {
    let testBed: ComponentBed<TestSelectTemplateMultipleComponent>;
    let component: TestSelectTemplateMultipleComponent;
    let fixture: ComponentFixture<TestSelectTemplateMultipleComponent>;
    let selectElement!: HTMLElement;
    beforeEach(() => {
      testBed = createComponentBed(TestSelectTemplateMultipleComponent, {
        imports: [VtsSelectModule, VtsIconTestModule, FormsModule]
      });
      component = testBed.component;
      fixture = testBed.fixture;
      selectElement = testBed.debugElement.query(By.directive(VtsSelectComponent)).nativeElement;
    });
    it('should classname correct', () => {
      expect(selectElement.classList).toContain('vts-select-multiple');
    });
    it('should ngModel works', fakeAsync(() => {
      component.listOfOption = [
        { vtsValue: 'value_01', vtsLabel: 'label_01' },
        { vtsValue: 'value_02', vtsLabel: 'label_02' }
      ];
      component.value = ['value_01', 'value_02'];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      let listOfSelectItem = selectElement.querySelectorAll('vts-select-item')!;
      expect(listOfSelectItem.length).toBe(2);
      expect(listOfSelectItem[0].textContent).toBe('label_01');
      expect(listOfSelectItem[1].textContent).toBe('label_02');
      component.listOfOption = [{ vtsValue: 'value_01', vtsLabel: 'label_01' }];
      fixture.detectChanges();
      listOfSelectItem = selectElement.querySelectorAll('vts-select-item')!;
      expect(listOfSelectItem.length).toBe(2);
      expect(listOfSelectItem[0].textContent).toBe('label_01');
      expect(listOfSelectItem[1].textContent).toBe('label_02');
      expect(component.valueChange).not.toHaveBeenCalled();
    }));
    it('should click option work', fakeAsync(() => {
      const flushRefresh = () => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      };
      component.vtsOpen = true;
      component.listOfOption = [
        { vtsValue: 'test_01', vtsLabel: 'test_01' },
        { vtsValue: 'test_02', vtsLabel: 'test_02' }
      ];
      component.value = ['test_01'];
      flushRefresh();
      const listOfContainerItem = document.querySelectorAll('vts-option-item');
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      flushRefresh();
      expect(component.valueChange).toHaveBeenCalledTimes(1);
      expect(component.value.length).toBe(2);
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      flushRefresh();
      expect(component.valueChange).toHaveBeenCalledTimes(2);
      expect(component.value.length).toBe(1);
      expect(component.value[0]).toBe('test_01');
      expect(component.openChange).not.toHaveBeenCalled();
    }));
    it('should vtsCustomCompareFn works', fakeAsync(() => {
      component.listOfOption = [{ vtsValue: { value: 'value' }, vtsLabel: 'label' }];
      fixture.detectChanges();
      expect(selectElement.querySelectorAll('vts-select-item').length).toBe(0);
      component.value = [{ value: 'value' }];
      component.vtsCustomCompareFn = (o1: VtsSafeAny, o2: VtsSafeAny) =>
        o1 && o2 ? o1.value === o2.value : o1 === o2;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.querySelectorAll('vts-select-item').length).toBe(1);
      expect(selectElement.querySelectorAll('vts-select-item')[0].textContent).toBe('label');
    }));
    it('should vtsMenuItemSelectedIcon works', fakeAsync(() => {
      component.listOfOption = [{ vtsValue: 'value', vtsLabel: 'label' }];
      component.value = ['value'];
      component.vtsOpen = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(document.querySelectorAll('.vts-select-selected-icon').length).toBe(1);
      component.vtsMenuItemSelectedIcon = component.iconTemplate;
      fixture.detectChanges();
      expect(document.querySelectorAll('.vts-select-selected-icon').length).toBe(0);
      expect(document.querySelector('.vts-select-item-option-state')!.textContent).toBe('icon');
    }));
    it('should removeIcon works', fakeAsync(() => {
      component.listOfOption = [{ vtsValue: 'value', vtsLabel: 'label' }];
      component.value = ['value'];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.querySelector('.vtsicon-close')).toBeTruthy();
      component.vtsRemoveIcon = component.iconTemplate;
      fixture.detectChanges();
      expect(selectElement.querySelector('.vts-select-selection-item-remove')!.textContent).toBe(
        'icon'
      );
    }));
    it('should removeIcon click works', fakeAsync(() => {
      component.listOfOption = [{ vtsValue: 'value', vtsLabel: 'label' }];
      component.value = ['value'];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      dispatchFakeEvent(selectElement.querySelector('.vtsicon-close')!, 'click');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.value.length).toBe(0);
    }));
    it('should backspace works', fakeAsync(() => {
      component.listOfOption = [{ vtsValue: 'value', vtsLabel: 'label' }];
      component.value = ['value'];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      dispatchKeyboardEvent(inputElement, 'keydown', BACKSPACE, inputElement);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.value.length).toBe(0);
    }));
    it('should vtsTokenSeparators work', fakeAsync(() => {
      component.listOfOption = [
        { vtsValue: 'test_01', vtsLabel: 'label_01' },
        { vtsValue: 'test_02', vtsLabel: 'label_02' }
      ];
      component.value = [];
      component.vtsTokenSeparators = [','];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'label_01,test_02';
      dispatchFakeEvent(inputElement, 'input');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.value.length).toBe(1);
      expect(component.value[0]).toBe('test_01');
    }));
    it('should vtsMaxMultipleCount work', fakeAsync(() => {
      const flushRefresh = () => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      };
      component.vtsOpen = true;
      component.listOfOption = [
        { vtsValue: 'test_01', vtsLabel: 'test_01' },
        { vtsValue: 'test_02', vtsLabel: 'test_02' }
      ];
      component.value = [];
      component.vtsMaxMultipleCount = 1;
      flushRefresh();
      const listOfContainerItem = document.querySelectorAll('vts-option-item');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      flushRefresh();
      expect(component.value.length).toBe(1);
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      flushRefresh();
      expect(component.value.length).toBe(1);
      expect(component.value[0]).toBe('test_01');
    }));
    it('should vtsAutoClearSearchValue work', fakeAsync(() => {
      const flushRefresh = () => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      };
      component.vtsOpen = true;
      component.listOfOption = [
        { vtsValue: 'test_01', vtsLabel: 'test_01' },
        { vtsValue: 'test_02', vtsLabel: 'test_02' }
      ];
      flushRefresh();
      const listOfContainerItem = document.querySelectorAll('vts-option-item');
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      flushRefresh();
      expect(inputElement.value).toBe('');
      component.vtsAutoClearSearchValue = false;
      flushRefresh();
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      flushRefresh();
      expect(inputElement.value).toBe('test');
    }));
  });
  describe('tags template mode', () => {
    let testBed: ComponentBed<TestSelectTemplateTagsComponent>;
    let component: TestSelectTemplateTagsComponent;
    let fixture: ComponentFixture<TestSelectTemplateTagsComponent>;
    let selectElement!: HTMLElement;
    beforeEach(() => {
      testBed = createComponentBed(TestSelectTemplateTagsComponent, {
        imports: [VtsSelectModule, VtsIconTestModule, FormsModule]
      });
      component = testBed.component;
      fixture = testBed.fixture;
      selectElement = testBed.debugElement.query(By.directive(VtsSelectComponent)).nativeElement;
    });
    it('should classname correct', () => {
      expect(selectElement.classList).toContain('vts-select-multiple');
    });
    it('should vtsTokenSeparators works', fakeAsync(() => {
      component.listOfOption = [
        { vtsValue: 'test_01', vtsLabel: 'label_01' },
        { vtsValue: 'test_02', vtsLabel: 'label_02' }
      ];
      component.value = [];
      component.vtsTokenSeparators = [','];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'label_01,test_02';
      dispatchFakeEvent(inputElement, 'input');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.value.length).toBe(2);
      expect(component.value[0]).toBe('test_01');
      expect(component.value[1]).toBe('test_02');
    }));
    it('should vtsMaxTagCount works', fakeAsync(() => {
      component.listOfOption = [
        { vtsValue: 'test_01', vtsLabel: 'label_01' },
        { vtsValue: 'test_02', vtsLabel: 'label_02' },
        { vtsValue: 'test_03', vtsLabel: 'label_03' },
        { vtsValue: 'test_04', vtsLabel: 'label_04' }
      ];
      component.value = ['test_01', 'test_02', 'test_03', 'test_04'];
      component.vtsMaxTagCount = 2;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const listOfItem = selectElement.querySelectorAll('vts-select-item');
      expect(listOfItem.length).toBe(3);
      expect(listOfItem[2].querySelector('.vts-select-selection-item-content')!.textContent).toBe(
        '+ 2 ...'
      );
      component.vtsMaxTagPlaceholder = component.tagTemplate;
      fixture.detectChanges();
      expect(listOfItem[2].textContent).toBe('and 2 more selected');
    }));
  });
  describe('default reactive mode', () => {
    let testBed: ComponentBed<TestSelectReactiveDefaultComponent>;
    let component: TestSelectReactiveDefaultComponent;
    let fixture: ComponentFixture<TestSelectReactiveDefaultComponent>;
    let selectElement!: HTMLElement;
    beforeEach(() => {
      testBed = createComponentBed(TestSelectReactiveDefaultComponent, {
        imports: [VtsSelectModule, VtsIconTestModule, FormsModule]
      });
      component = testBed.component;
      fixture = testBed.fixture;
      selectElement = testBed.debugElement.query(By.directive(VtsSelectComponent)).nativeElement;
    });
    it('should ngModel match vtsLabel', fakeAsync(() => {
      component.listOfOption = [{ value: 'test_value', label: 'test_label' }];
      fixture.detectChanges();
      expect(selectElement.querySelector('vts-select-item')).toBeFalsy();
      component.value = 'test_value';
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.querySelector('vts-select-item')!.textContent).toBe('test_label');
      component.listOfOption = [];
      fixture.detectChanges();
      expect(selectElement.querySelector('vts-select-item')!.textContent).toBe('test_label');
      expect(component.valueChange).not.toHaveBeenCalled();
    }));
    it('should ngModelChange trigger when click option', fakeAsync(() => {
      component.listOfOption = [
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ];
      component.value = 'test_01';
      component.vtsOpen = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const listOfContainerItem = document.querySelectorAll('vts-option-item');
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.valueChange).toHaveBeenCalledTimes(1);
      expect(component.valueChange).toHaveBeenCalledWith('test_02');
      expect(component.openChange).toHaveBeenCalledTimes(1);
      expect(component.openChange).toHaveBeenCalledWith(false);
    }));
    it('should ngModelChange trigger when click clear icon', fakeAsync(() => {
      component.listOfOption = [{ value: 'test_value', label: 'test_label' }];
      component.value = 'test_value';
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.querySelector('vts-select-clear')).toBeFalsy();
      component.vtsAllowClear = true;
      fixture.detectChanges();
      dispatchMouseEvent(selectElement.querySelector('vts-select-clear')!, 'click');
      fixture.detectChanges();
      expect(component.valueChange).toHaveBeenCalledTimes(1);
      expect(component.valueChange).toHaveBeenCalledWith(null);
    }));
    it('should vtsCustomTemplate works', fakeAsync(() => {
      component.listOfOption = [{ value: 'value', label: 'label' }];
      fixture.detectChanges();
      expect(selectElement.querySelector('vts-select-item')).toBeFalsy();
      component.value = 'value';
      component.vtsCustomTemplate = component.customTemplate;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.querySelector('vts-select-item')!.textContent).toBe('selected: label');
    }));
    it('should vtsShowSearch works', fakeAsync(() => {
      component.listOfOption = [
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ];
      component.vtsShowSearch = true;
      component.vtsOpen = true;
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.searchValueChange).toHaveBeenCalledWith('test');
      expect(document.querySelectorAll('vts-option-item').length).toBe(2);
      inputElement.value = '02';
      dispatchFakeEvent(inputElement, 'input');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(document.querySelectorAll('vts-option-item').length).toBe(1);
    }));
    it('should vtsCustomFilterFn works', fakeAsync(() => {
      component.listOfOption = [
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' },
        { value: 'test_03', label: 'test_03' }
      ];
      component.vtsShowSearch = true;
      component.vtsCustomFilterFn = () => true;
      component.vtsOpen = true;
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = '02';
      dispatchFakeEvent(inputElement, 'input');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(document.querySelectorAll('vts-option-item').length).toBe(3);
    }));
    it('should vtsCustomCompareFn works', fakeAsync(() => {
      component.listOfOption = [{ value: { value: 'test_value' }, label: 'test_label' }];
      fixture.detectChanges();
      expect(selectElement.querySelector('vts-select-item')).toBeFalsy();
      component.value = { value: 'test_value' };
      component.vtsCustomCompareFn = (o1: VtsSafeAny, o2: VtsSafeAny) =>
        o1 && o2 ? o1.value === o2.value : o1 === o2;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.querySelector('vts-select-item')!.textContent).toBe('test_label');
    }));
    it('should vtsServerSearch works', fakeAsync(() => {
      component.listOfOption = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' }
      ];
      component.vtsServerSearch = true;
      component.vtsShowSearch = true;
      component.vtsOpen = true;
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = '02';
      dispatchFakeEvent(inputElement, 'input');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(document.querySelectorAll('vts-option-item').length).toBe(3);
    }));
    it('should keydown up arrow and down arrow', fakeAsync(() => {
      const flushChanges = () => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      };
      component.listOfOption = [
        { value: 'value_01', label: 'label_01' },
        { value: 'value_02', label: 'label_02', disabled: true },
        { value: 'value_03', label: 'label_03' }
      ];
      component.value = 'value_01';
      component.vtsOpen = true;
      flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      dispatchKeyboardEvent(inputElement, 'keydown', UP_ARROW, inputElement);
      flushChanges();
      expect(document.querySelectorAll('vts-option-item')[2]!.classList).toContain(
        'vts-select-item-option-active'
      );
      dispatchKeyboardEvent(inputElement, 'keydown', DOWN_ARROW, inputElement);
      flushChanges();
      expect(document.querySelectorAll('vts-option-item')[0]!.classList).toContain(
        'vts-select-item-option-active'
      );
      dispatchKeyboardEvent(inputElement, 'keydown', DOWN_ARROW, inputElement);
      flushChanges();
      dispatchKeyboardEvent(inputElement, 'keydown', ENTER, inputElement);
      flushChanges();
      expect(component.valueChange).toHaveBeenCalledWith('value_03');
      flushChanges();
      dispatchKeyboardEvent(inputElement, 'keydown', SPACE, inputElement);
      flushChanges();
      expect(component.openChange).toHaveBeenCalledWith(false);
      dispatchKeyboardEvent(inputElement, 'keydown', SPACE, inputElement);
      flushChanges();
      expect(component.openChange).toHaveBeenCalledWith(true);
      dispatchKeyboardEvent(inputElement, 'keydown', TAB, inputElement);
      flushChanges();
      expect(component.openChange).toHaveBeenCalledWith(false);
      expect(component.openChange).toHaveBeenCalledTimes(3);
    }));
    it('should mouseenter activated option work', fakeAsync(() => {
      const flushChanges = () => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      };
      component.listOfOption = [
        { value: 'value_01', label: 'label_01' },
        { value: 'value_02', label: 'label_02', disabled: true },
        { value: 'value_03', label: 'label_03' }
      ];
      component.vtsOpen = true;
      flushChanges();
      const targetItem = document.querySelectorAll('vts-option-item')[2]!;
      expect(targetItem.classList).not.toContain('vts-select-item-option-active');
      dispatchFakeEvent(targetItem, 'mouseenter');
      flushChanges();
      expect(targetItem.classList).toContain('vts-select-item-option-active');
    }));

    it('should group item change work', fakeAsync(() => {
      component.listOfOption = [{ groupLabel: 'group-1', value: 'value_01', label: 'label_01' }];
      component.vtsOpen = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(document.querySelectorAll('vts-option-item')!.length).toBe(1);
      expect(document.querySelectorAll('vts-option-item-group')!.length).toBe(1);
      component.listOfOption = [
        { value: 'value_01', label: 'label_01', groupLabel: 'group-1' },
        { value: 'value_02', label: 'label_02', groupLabel: 'group-1' },
        { value: 'value_03', label: 'label_03', groupLabel: 'group-2' }
      ];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(document.querySelectorAll('vts-option-item')!.length).toBe(3);
      expect(document.querySelectorAll('vts-option-item-group')!.length).toBe(2);
      expect(document.querySelectorAll('vts-option-item-group')[0]!.textContent).toBe('group-1');
      expect(document.querySelectorAll('vts-option-item')[0].textContent).toBe('label_01');
      component.listOfOption = [
        { groupLabel: 'change-group', value: 'value_01', label: 'change-label' }
      ];

      fixture.detectChanges();
      expect(document.querySelectorAll('vts-option-item-group')[0]!.textContent).toBe(
        'change-group'
      );
      expect(document.querySelectorAll('vts-option-item')[0].textContent).toBe('change-label');
    }));

    it('should group item sort be right', fakeAsync(() => {
      component.listOfOption = [
        { value: 'value_01', label: 'label_01', groupLabel: 'group-1' },
        { value: 'value_02', label: 'label_02', groupLabel: 'group-1' },
        { value: 'value_03', label: 'label_03', groupLabel: 'group-2' },
        { value: 'value_04', label: 'label_04', groupLabel: 'group-2' }
      ];
      component.vtsOpen = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(
        document
          .querySelectorAll('vts-option-item')[0]
          .parentElement!.querySelector('vts-option-item')!.nextElementSibling!.textContent
      ).toBe('label_02');
    }));
  });
  describe('multiple reactive mode', () => {
    let testBed: ComponentBed<TestSelectReactiveMultipleComponent>;
    let component: TestSelectReactiveMultipleComponent;
    let fixture: ComponentFixture<TestSelectReactiveMultipleComponent>;
    let selectElement!: HTMLElement;
    beforeEach(() => {
      testBed = createComponentBed(TestSelectReactiveMultipleComponent, {
        imports: [VtsSelectModule, VtsIconTestModule, FormsModule]
      });
      component = testBed.component;
      fixture = testBed.fixture;
      selectElement = testBed.debugElement.query(By.directive(VtsSelectComponent)).nativeElement;
    });
    it('should ngModel works', fakeAsync(() => {
      component.listOfOption = [
        { value: 'value_01', label: 'label_01' },
        { value: 'value_02', label: 'label_02' }
      ];
      component.value = ['value_01', 'value_02'];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      let listOfSelectItem = selectElement.querySelectorAll('vts-select-item')!;
      expect(listOfSelectItem.length).toBe(2);
      expect(listOfSelectItem[0].textContent).toBe('label_01');
      expect(listOfSelectItem[1].textContent).toBe('label_02');
      component.listOfOption = [{ value: 'value_01', label: 'label_01' }];
      fixture.detectChanges();
      listOfSelectItem = selectElement.querySelectorAll('vts-select-item')!;
      expect(listOfSelectItem.length).toBe(2);
      expect(listOfSelectItem[0].textContent).toBe('label_01');
      expect(listOfSelectItem[1].textContent).toBe('label_02');
      expect(component.valueChange).not.toHaveBeenCalled();
    }));
    it('should click option work', fakeAsync(() => {
      const flushRefresh = () => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      };
      component.vtsOpen = true;
      component.listOfOption = [
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ];
      component.value = ['test_01'];
      flushRefresh();
      const listOfContainerItem = document.querySelectorAll('vts-option-item');
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      flushRefresh();
      expect(component.valueChange).toHaveBeenCalledTimes(1);
      expect(component.value.length).toBe(2);
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      flushRefresh();
      expect(component.valueChange).toHaveBeenCalledTimes(2);
      expect(component.value.length).toBe(1);
      expect(component.value[0]).toBe('test_01');
      expect(component.openChange).not.toHaveBeenCalled();
    }));
    it('should vtsCustomCompareFn works', fakeAsync(() => {
      component.listOfOption = [{ value: { value: 'value' }, label: 'label' }];
      fixture.detectChanges();
      expect(selectElement.querySelectorAll('vts-select-item').length).toBe(0);
      component.value = [{ value: 'value' }];
      component.vtsCustomCompareFn = (o1: VtsSafeAny, o2: VtsSafeAny) =>
        o1 && o2 ? o1.value === o2.value : o1 === o2;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.querySelectorAll('vts-select-item').length).toBe(1);
      expect(selectElement.querySelectorAll('vts-select-item')[0].textContent).toBe('label');
    }));
    it('should vtsMenuItemSelectedIcon works', fakeAsync(() => {
      component.listOfOption = [{ value: 'value', label: 'label' }];
      component.value = ['value'];
      component.vtsOpen = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(document.querySelectorAll('.vts-select-selected-icon').length).toBe(1);
      component.vtsMenuItemSelectedIcon = component.iconTemplate;
      fixture.detectChanges();
      expect(document.querySelectorAll('.vts-select-selected-icon').length).toBe(0);
      expect(document.querySelector('.vts-select-item-option-state')!.textContent).toBe('icon');
    }));
    it('should removeIcon works', fakeAsync(() => {
      component.listOfOption = [{ value: 'value', label: 'label' }];
      component.value = ['value'];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.querySelector('.vtsicon-close')).toBeTruthy();
      component.vtsRemoveIcon = component.iconTemplate;
      fixture.detectChanges();
      expect(selectElement.querySelector('.vts-select-selection-item-remove')!.textContent).toBe(
        'icon'
      );
    }));
    it('should removeIcon click works', fakeAsync(() => {
      component.listOfOption = [{ value: 'value', label: 'label' }];
      component.value = ['value'];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      dispatchFakeEvent(selectElement.querySelector('.vtsicon-close')!, 'click');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.value.length).toBe(0);
    }));
    it('should backspace works', fakeAsync(() => {
      component.listOfOption = [{ value: 'value', label: 'label' }];
      component.value = ['value'];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      dispatchKeyboardEvent(inputElement, 'keydown', BACKSPACE, inputElement);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.value.length).toBe(0);
    }));
    it('should vtsTokenSeparators work', fakeAsync(() => {
      component.listOfOption = [
        { value: 'test_01', label: 'label_01' },
        { value: 'test_02', label: 'label_02' }
      ];
      component.value = [];
      component.vtsTokenSeparators = [','];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'label_01,test_02';
      dispatchFakeEvent(inputElement, 'input');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.value.length).toBe(1);
      expect(component.value[0]).toBe('test_01');
    }));
    it('should vtsMaxMultipleCount work', fakeAsync(() => {
      const flushRefresh = () => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      };
      component.vtsOpen = true;
      component.listOfOption = [
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ];
      component.value = [];
      component.vtsMaxMultipleCount = 1;
      flushRefresh();
      const listOfContainerItem = document.querySelectorAll('vts-option-item');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      flushRefresh();
      expect(component.value.length).toBe(1);
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      flushRefresh();
      expect(component.value.length).toBe(1);
      expect(component.value[0]).toBe('test_01');
    }));
    it('should vtsAutoClearSearchValue work', fakeAsync(() => {
      const flushRefresh = () => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      };
      component.vtsOpen = true;
      component.listOfOption = [
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ];
      flushRefresh();
      const listOfContainerItem = document.querySelectorAll('vts-option-item');
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      flushRefresh();
      expect(inputElement.value).toBe('');
      component.vtsAutoClearSearchValue = false;
      flushRefresh();
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      flushRefresh();
      expect(inputElement.value).toBe('test');
    }));
  });
  describe('tags reactive mode', () => {
    let testBed: ComponentBed<TestSelectReactiveTagsComponent>;
    let component: TestSelectReactiveTagsComponent;
    let fixture: ComponentFixture<TestSelectReactiveTagsComponent>;
    let selectElement!: HTMLElement;
    beforeEach(() => {
      testBed = createComponentBed(TestSelectReactiveTagsComponent, {
        imports: [VtsSelectModule, VtsIconTestModule, FormsModule]
      });
      component = testBed.component;
      fixture = testBed.fixture;
      selectElement = testBed.debugElement.query(By.directive(VtsSelectComponent)).nativeElement;
    });
    it('should vtsTokenSeparators works', fakeAsync(() => {
      component.listOfOption = [
        { value: 'test_01', label: 'label_01' },
        { value: 'test_02', label: 'label_02' }
      ];
      component.value = [];
      component.vtsTokenSeparators = [','];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'label_01,test_02';
      dispatchFakeEvent(inputElement, 'input');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.value.length).toBe(2);
      expect(component.value[0]).toBe('test_01');
      expect(component.value[1]).toBe('test_02');
    }));
    it('should vtsMaxTagCount works', fakeAsync(() => {
      component.listOfOption = [
        { value: 'test_01', label: 'label_01' },
        { value: 'test_02', label: 'label_02' },
        { value: 'test_03', label: 'label_03' },
        { value: 'test_04', label: 'label_04' }
      ];
      component.value = ['test_01', 'test_02', 'test_03', 'test_04'];
      component.vtsMaxTagCount = 2;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const listOfItem = selectElement.querySelectorAll('vts-select-item');
      expect(listOfItem.length).toBe(3);
      expect(listOfItem[2].querySelector('.vts-select-selection-item-content')!.textContent).toBe(
        '+ 2 ...'
      );
      component.vtsMaxTagPlaceholder = component.tagTemplate;
      fixture.detectChanges();
      expect(listOfItem[2].textContent).toBe('and 2 more selected');
    }));
  });
});

@Component({
  template: `
    <vts-select
      vtsMode="default"
      [(ngModel)]="value"
      [vtsSize]="vtsSize"
      [vtsDropdownMatchSelectWidth]="vtsDropdownMatchSelectWidth"
      [vtsPlaceHolder]="vtsPlaceHolder"
      [vtsDropdownRender]="vtsDropdownRender"
      [vtsCustomTemplate]="vtsCustomTemplate"
      [vtsSuffixIcon]="vtsSuffixIcon"
      [vtsClearIcon]="vtsClearIcon"
      [vtsShowArrow]="vtsShowArrow"
      [vtsCustomFilterFn]="vtsCustomFilterFn"
      [vtsCustomCompareFn]="vtsCustomCompareFn"
      [vtsAllowClear]="vtsAllowClear"
      [vtsBorderless]="vtsBorderless"
      [vtsShowSearch]="vtsShowSearch"
      [vtsLoading]="vtsLoading"
      [vtsAutoFocus]="vtsAutoFocus"
      [vtsServerSearch]="vtsServerSearch"
      [vtsDisabled]="vtsDisabled"
      [vtsBackdrop]="vtsBackdrop"
      [(vtsOpen)]="vtsOpen"
      (ngModelChange)="valueChange($event)"
      (vtsOnSearch)="searchValueChange($event)"
      (vtsOpenChange)="openChange($event)"
    >
      <vts-option
        *ngFor="let o of listOfOption"
        [vtsValue]="o.vtsValue"
        [vtsLabel]="o.vtsLabel"
        [vtsDisabled]="o.vtsDisabled"
        [vtsHide]="o.vtsHide"
      ></vts-option>
      <vts-option-group *ngFor="let group of listOfGroup" [vtsLabel]="group.vtsLabel">
        <vts-option
          *ngFor="let o of group.children"
          [vtsValue]="o.vtsValue"
          [vtsLabel]="o.vtsLabel"
          [vtsDisabled]="o.vtsDisabled"
          [vtsHide]="o.vtsHide"
        ></vts-option>
      </vts-option-group>
    </vts-select>
    <ng-template #dropdownTemplate>
      <div class="dropdown-render">dropdownRender</div>
    </ng-template>
    <ng-template #customTemplate let-selected>selected: {{ selected.vtsLabel }}</ng-template>
    <ng-template #suffixIconTemplate>icon</ng-template>
  `
})
export class TestSelectTemplateDefaultComponent {
  @ViewChild('dropdownTemplate') dropdownTemplate!: TemplateRef<VtsSafeAny>;
  @ViewChild('customTemplate') customTemplate!: TemplateRef<VtsSafeAny>;
  @ViewChild('suffixIconTemplate') suffixIconTemplate!: TemplateRef<VtsSafeAny>;
  value: VtsSafeAny | null = null;
  valueChange = jasmine.createSpy('valueChange');
  openChange = jasmine.createSpy('openChange');
  searchValueChange = jasmine.createSpy('searchValueChange');
  listOfGroup: Array<{
    vtsLabel: string | TemplateRef<VtsSafeAny> | null;
    children: VtsSelectItemInterface[];
  }> = [];
  listOfOption: VtsSelectItemInterface[] = [];
  vtsSize: VtsSelectSize = 'md';
  vtsDropdownMatchSelectWidth = true;
  vtsPlaceHolder: string | TemplateRef<VtsSafeAny> | null = null;
  vtsDropdownRender: TemplateRef<VtsSafeAny> | null = null;
  vtsCustomTemplate?: TemplateRef<{ $implicit: VtsSelectItemInterface }>;
  vtsSuffixIcon: TemplateRef<VtsSafeAny> | null = null;
  vtsClearIcon: TemplateRef<VtsSafeAny> | null = null;
  vtsShowArrow = true;
  vtsCustomFilterFn: vtsCustomFilterFnType = (
    searchValue: string,
    item: VtsSelectItemInterface
  ): boolean => {
    if (item && item.vtsLabel) {
      return item.vtsLabel.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
    } else {
      return false;
    }
  };
  vtsCustomCompareFn: (o1: VtsSafeAny, o2: VtsSafeAny) => boolean = (
    o1: VtsSafeAny,
    o2: VtsSafeAny
  ) => o1 === o2;
  vtsAllowClear = false;
  vtsBorderless = false;
  vtsShowSearch = false;
  vtsLoading = false;
  vtsAutoFocus = false;
  vtsServerSearch = false;
  vtsDisabled = false;
  vtsOpen = false;
  vtsBackdrop = false;
}

@Component({
  template: `
    <vts-select
      vtsMode="multiple"
      [(ngModel)]="value"
      [vtsMenuItemSelectedIcon]="vtsMenuItemSelectedIcon"
      [vtsTokenSeparators]="vtsTokenSeparators"
      [vtsRemoveIcon]="vtsRemoveIcon"
      [vtsMaxMultipleCount]="vtsMaxMultipleCount"
      [vtsCustomCompareFn]="vtsCustomCompareFn"
      [vtsAutoClearSearchValue]="vtsAutoClearSearchValue"
      [(vtsOpen)]="vtsOpen"
      (ngModelChange)="valueChange($event)"
      (vtsOpenChange)="valueChange($event)"
    >
      <vts-option
        *ngFor="let o of listOfOption"
        [vtsValue]="o.vtsValue"
        [vtsLabel]="o.vtsLabel"
        [vtsDisabled]="o.vtsDisabled"
        [vtsHide]="o.vtsHide"
      ></vts-option>
    </vts-select>
    <ng-template #iconTemplate>icon</ng-template>
  `
})
export class TestSelectTemplateMultipleComponent {
  @ViewChild('iconTemplate') iconTemplate!: TemplateRef<VtsSafeAny>;
  listOfOption: VtsSelectItemInterface[] = [];
  value: VtsSafeAny[] = [];
  vtsOpen = false;
  valueChange = jasmine.createSpy('valueChange');
  openChange = jasmine.createSpy('openChange');
  vtsMenuItemSelectedIcon: TemplateRef<VtsSafeAny> | null = null;
  vtsRemoveIcon: TemplateRef<VtsSafeAny> | null = null;
  vtsTokenSeparators: string[] = [];
  vtsMaxMultipleCount = Infinity;
  vtsCustomCompareFn: (o1: VtsSafeAny, o2: VtsSafeAny) => boolean = (
    o1: VtsSafeAny,
    o2: VtsSafeAny
  ) => o1 === o2;
  vtsAutoClearSearchValue = true;
}

@Component({
  template: `
    <vts-select
      vtsMode="tags"
      [(ngModel)]="value"
      [vtsSize]="vtsSize"
      [vtsMaxTagCount]="vtsMaxTagCount"
      [vtsTokenSeparators]="vtsTokenSeparators"
      [vtsMaxTagPlaceholder]="vtsMaxTagPlaceholder"
      (ngModelChange)="valueChange($event)"
    >
      <vts-option
        *ngFor="let o of listOfOption"
        [vtsValue]="o.vtsValue"
        [vtsLabel]="o.vtsLabel"
        [vtsDisabled]="o.vtsDisabled"
        [vtsHide]="o.vtsHide"
      ></vts-option>
    </vts-select>
    <ng-template #tagTemplate let-selectedList>
      and {{ selectedList.length }} more selected
    </ng-template>
  `
})
export class TestSelectTemplateTagsComponent {
  @ViewChild('tagTemplate') tagTemplate!: TemplateRef<VtsSafeAny>;
  vtsSize: VtsSelectSize = 'md';
  vtsMaxTagCount = Infinity;
  value: VtsSafeAny[] = [];
  listOfOption: VtsSelectItemInterface[] = [];
  valueChange = jasmine.createSpy('valueChange');
  vtsTokenSeparators: string[] = [];
  vtsMaxTagPlaceholder!: TemplateRef<{ $implicit: VtsSafeAny[] }>;
}

@Component({
  template: `
    <vts-select
      vtsMode="default"
      [(ngModel)]="value"
      [vtsOptions]="listOfOption"
      [vtsSize]="vtsSize"
      [vtsDropdownMatchSelectWidth]="vtsDropdownMatchSelectWidth"
      [vtsPlaceHolder]="vtsPlaceHolder"
      [vtsDropdownRender]="vtsDropdownRender"
      [vtsCustomTemplate]="vtsCustomTemplate"
      [vtsSuffixIcon]="vtsSuffixIcon"
      [vtsClearIcon]="vtsClearIcon"
      [vtsShowArrow]="vtsShowArrow"
      [vtsCustomFilterFn]="vtsCustomFilterFn"
      [vtsCustomCompareFn]="vtsCustomCompareFn"
      [vtsAllowClear]="vtsAllowClear"
      [vtsBorderless]="vtsBorderless"
      [vtsShowSearch]="vtsShowSearch"
      [vtsLoading]="vtsLoading"
      [vtsAutoFocus]="vtsAutoFocus"
      [vtsServerSearch]="vtsServerSearch"
      [vtsDisabled]="vtsDisabled"
      [(vtsOpen)]="vtsOpen"
      (ngModelChange)="valueChange($event)"
      (vtsOnSearch)="searchValueChange($event)"
      (vtsOpenChange)="openChange($event)"
    ></vts-select>
    <ng-template #dropdownTemplate>
      <div class="dropdown-render">dropdownRender</div>
    </ng-template>
    <ng-template #customTemplate let-selected>selected: {{ selected.vtsLabel }}</ng-template>
    <ng-template #suffixIconTemplate>icon</ng-template>
  `
})
export class TestSelectReactiveDefaultComponent {
  @ViewChild('dropdownTemplate') dropdownTemplate!: TemplateRef<VtsSafeAny>;
  @ViewChild('customTemplate') customTemplate!: TemplateRef<VtsSafeAny>;
  @ViewChild('suffixIconTemplate') suffixIconTemplate!: TemplateRef<VtsSafeAny>;
  value: VtsSafeAny | null = null;
  valueChange = jasmine.createSpy('valueChange');
  openChange = jasmine.createSpy('openChange');
  searchValueChange = jasmine.createSpy('searchValueChange');
  listOfOption: VtsSelectOptionInterface[] = [];
  vtsSize: VtsSelectSize = 'md';
  vtsDropdownMatchSelectWidth = true;
  vtsPlaceHolder: string | TemplateRef<VtsSafeAny> | null = null;
  vtsDropdownRender: TemplateRef<VtsSafeAny> | null = null;
  vtsCustomTemplate?: TemplateRef<{ $implicit: VtsSelectItemInterface }>;
  vtsSuffixIcon: TemplateRef<VtsSafeAny> | null = null;
  vtsClearIcon: TemplateRef<VtsSafeAny> | null = null;
  vtsShowArrow = true;
  vtsCustomFilterFn: vtsCustomFilterFnType = (
    searchValue: string,
    item: VtsSelectItemInterface
  ): boolean => {
    if (item && item.vtsLabel) {
      return item.vtsLabel.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
    } else {
      return false;
    }
  };
  vtsCustomCompareFn: (o1: VtsSafeAny, o2: VtsSafeAny) => boolean = (
    o1: VtsSafeAny,
    o2: VtsSafeAny
  ) => o1 === o2;
  vtsAllowClear = false;
  vtsBorderless = false;
  vtsShowSearch = false;
  vtsLoading = false;
  vtsAutoFocus = false;
  vtsServerSearch = false;
  vtsDisabled = false;
  vtsOpen = false;
}

@Component({
  template: `
    <vts-select
      vtsMode="multiple"
      [(ngModel)]="value"
      [vtsOptions]="listOfOption"
      [vtsMenuItemSelectedIcon]="vtsMenuItemSelectedIcon"
      [vtsTokenSeparators]="vtsTokenSeparators"
      [vtsRemoveIcon]="vtsRemoveIcon"
      [vtsMaxMultipleCount]="vtsMaxMultipleCount"
      [vtsCustomCompareFn]="vtsCustomCompareFn"
      [vtsAutoClearSearchValue]="vtsAutoClearSearchValue"
      [(vtsOpen)]="vtsOpen"
      (ngModelChange)="valueChange($event)"
      (vtsOpenChange)="valueChange($event)"
    ></vts-select>
    <ng-template #iconTemplate>icon</ng-template>
  `
})
export class TestSelectReactiveMultipleComponent {
  @ViewChild('iconTemplate') iconTemplate!: TemplateRef<VtsSafeAny>;
  listOfOption: VtsSelectOptionInterface[] = [];
  value: VtsSafeAny[] = [];
  vtsOpen = false;
  valueChange = jasmine.createSpy('valueChange');
  openChange = jasmine.createSpy('openChange');
  vtsMenuItemSelectedIcon: TemplateRef<VtsSafeAny> | null = null;
  vtsRemoveIcon: TemplateRef<VtsSafeAny> | null = null;
  vtsTokenSeparators: string[] = [];
  vtsMaxMultipleCount = Infinity;
  vtsCustomCompareFn: (o1: VtsSafeAny, o2: VtsSafeAny) => boolean = (
    o1: VtsSafeAny,
    o2: VtsSafeAny
  ) => o1 === o2;
  vtsAutoClearSearchValue = true;
}

@Component({
  template: `
    <vts-select
      vtsMode="tags"
      [(ngModel)]="value"
      [vtsOptions]="listOfOption"
      [vtsSize]="vtsSize"
      [vtsMaxTagCount]="vtsMaxTagCount"
      [vtsTokenSeparators]="vtsTokenSeparators"
      [vtsMaxTagPlaceholder]="vtsMaxTagPlaceholder"
      (ngModelChange)="valueChange($event)"
    ></vts-select>
    <ng-template #tagTemplate let-selectedList>
      and {{ selectedList.length }} more selected
    </ng-template>
  `
})
export class TestSelectReactiveTagsComponent {
  @ViewChild('tagTemplate') tagTemplate?: TemplateRef<VtsSafeAny>;
  vtsSize: VtsSelectSize = 'md';
  vtsMaxTagCount = Infinity;
  value: VtsSafeAny[] = [];
  listOfOption: VtsSelectOptionInterface[] = [];
  valueChange = jasmine.createSpy('valueChange');
  vtsTokenSeparators: string[] = [];
  vtsMaxTagPlaceholder?: TemplateRef<{ $implicit: VtsSafeAny[] }>;
}
