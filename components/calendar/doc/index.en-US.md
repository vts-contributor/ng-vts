---
category: Components
type: Data Display
cols: 1
title: Calendar
cover: https://gw.alipayobjects.com/zos/antfincdn/dPQmLq08DI/Calendar.svg
---

Container for displaying data in calendar form.

## When To Use

When data is in the form of dates, such as schedules, timetables, prices calendar, lunar calendar. This component also supports Year/Month switch.

```ts
import { VtsCalendarModule } from '@ui-vts/ng-vts/calendar';
```


## API

**Note:** Some of Calendar's locale are coming from [Angular i18n](https://angular.io/guide/i18n), that should be provided in the file of `app.module.ts`.

For example:
```typescript
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);
```

```html
<vts-calendar
  [vtsDateCell]="dateCellTpl"
  [(ngModel)]="selectedDate"
  [(vtsMode)]="mode"
  (vtsPanelChange)="panelChange($event)"
  (vtsSelectChange)="selectChange($event)">
  <!-- Another method for cell definition -->
  <div *vtsDateCell>Foo</div>
</vts-calendar>
<!-- Passing TemplateRef -->
<ng-template #dateCellTpl let-date><span>{{ date | date:'d'}}</span></ng-template>
```

### vts-calendar

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[(ngModel)]` | (Two-way bindable) The current selected date | `Date` | current date |
| `[(vtsMode)]` | The display mode of the calendar (two-way bindable) | `'month' \| 'year'` | `'month'` |
| `[vtsFullscreen]` | Whether to display in full-screen | `boolean` | `true` |
| `[vtsDateCell]` | (Contentable) Customize the display of the date cell, the template content will be appended to the cell | `TemplateRef<Date>` | - |
| `[vtsDateFullCell]` | (Contentable) Customize the display of the date cell, the template content will override the cell | `TemplateRef<Date>` | - |
| `[vtsMonthCell]` | (Contentable) Customize the display of the month cell, the template content will be appended to the cell | `TemplateRef<Date>` | - |
| `[vtsMonthFullCell]` | (Contentable) Customize the display of the month cell, the template content will override the cell | `TemplateRef<Date>` | - |
| `[vtsDisabledDate]` | specify the date that cannot be selected | `(current: Date) => boolean` | - | - |
| `(vtsPanelChange)` | Callback for when panel changes | `EventEmitter<{ date: Date, mode: 'month' \| 'year' }>` | - |
| `(vtsSelectChange)` | A callback function of selected item | `EventEmitter<Date>` | - |
