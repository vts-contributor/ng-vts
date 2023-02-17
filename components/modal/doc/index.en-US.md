---
type: Components
category: Components
title: Modal
col: 1
order: 18
cover: https://gw.alipayobjects.com/zos/alicdn/3StSdUlSH/Modal.svg
---

Modal dialogs.

## When To Use

When requiring users to interact with application, but without jumping to a new page to interrupt
the user's workflow, you can use `Modal` to create a new floating layer over the current page for user
getting feedback or information purposes.
Additionally, if you need show a simple confirmation dialog, you can use `VtsModalService.confirm()`,
and so on.

It is recommended to use the `Component` way to pop up the Modal, so that the component logic of the popup layer can be completely isolated from the outer component, and can be reused at any time. In the popup layer component, you can obtain Modal's component instance by injecting `VtsModalRef` to control the behavior of the modal box.

```ts
import { VtsModalModule } from '@ui-vts/ng-vts/modal';
```

## API

### VtsModalService

The dialog is currently divided into 2 modes, `normal mode` and `confirm box mode` (ie the `Confirm` dialog, which is called by calling `confirm/info/success/error/warning`). The degree of API support for the two modes is slightly different.

| Property | Description | Type | Default |
|----|----|----|----|
| vtsAfterOpen      | Specify a EventEmitter that will be emitted when modal opened | EventEmitter | - |
| vtsAfterClose      | Specify a EventEmitter that will be emitted when modal is closed completely (Can listen for parameters passed in the close/destroy method) | EventEmitter | - |
| vtsBodyStyle       | Body style for modal body element. Such as height, padding etc. | `object` | - |
| vtsCancelText      | Text of the Cancel button. <i>Set to null to show no cancel button (this value is invalid if the vtsFooter parameter is used in normal mode)</i> | `string` | Cancel |
| vtsCentered        | Centered Modal | `boolean` | `false` |
| vtsClosable        | Whether a close (x) button is visible on top right of the modal dialog or not. <i>Invalid value in confirm box mode (default will be hidden)</i> | `boolean` | `true` |
| vtsOkLoading       | Whether to apply loading visual effect for OK button or not | `boolean` | `false` |
| vtsCancelLoading   | Whether to apply loading visual effect for Cancel button or not | `boolean` | `false` |
| vtsOkDisabled      | Whether to disable Ok button or not | `boolean` | `false` |
| vtsCancelDisabled  | Whether to disable Cancel button or not | `boolean` | `false` |
| vtsFooter          | Footer content, set as footer=null when you don't need default buttons. <i>1. Only valid in normal mode.<br>2. You can customize the buttons to the maximum extent by passing a `ModalButtonOptions` configuration (see the case or the instructions below).</i> | string<br>TemplateRef<br>ModalButtonOptions | OK and Cancel buttons |
| vtsKeyboard        | Whether support press esc to close | `boolean` | `true` |
| vtsMask            | Whether show mask or not. | `boolean` | `true` | ✅ |
| vtsMaskClosable    | Whether to close the modal dialog when the mask (area outside the modal) is clicked | `boolean` | `true` | ✅ |
| vtsCloseOnNavigation    | Whether to close the modal when the user goes backwards/forwards in history. Note that this usually doesn't include clicking on links (unless the user is using the HashLocationStrategy). | `boolean` | `true` | ✅ |
| vtsDirection        | Direction of the text in the modal | `'ltr' \| 'rtl'` | - | ✅ |
| vtsMaskStyle       | Style for modal's mask element. | `object` | - |
| vtsOkText          | Text of the OK button. <i>Set to null to show no ok button (this value is invalid if the vtsFooter parameter is used in normal mode)</i> | `string` | OK |
| vtsOkType          | Button type of the OK button. <i>Consistent with the `vtsType` of the `vts-button`.</i> | `string` | `primary` |
| vtsOkDanger        | Danger status of the OK button. <i>Consistent with the `vtsDanger` of the `vts-button`.</i> | `boolean` | `false` |
| vtsStyle           | Style of floating layer, typically used at least for adjusting the position. | `object` | - |
| vtsCloseIcon       | Custom close icon | `string\|TemplateRef<void>` | - |
| vtsTitle           | The modal dialog's title. <i>Leave blank to show no title. The usage of TemplateRef can refer to the case</i> | string / TemplateRef | - |
| vtsVisible         | Whether the modal dialog is visible or not. <i>When using the `<vts-modal>` tag, be sure to use two-way binding, for example: `[(vtsVisible)]="visible"`.</i> | `boolean` | `false` |
| vtsWidth           | Width of the modal dialog. <i>When using numbers, the default unit is `px`</i> | string<br>number | 520 |
| vtsClassName       | The class name of the modal dialog | `string` | - |
| vtsWrapClassName   | The class name of the container of the modal dialog | `string` | - |
| vtsZIndex          | The z-index of the Modal | `number` | 1000 |
| vtsOnCancel        | Specify a function that will be called when a user clicks mask, close button on top right or Cancel button (If vtsContent is Component, the Component instance will be put in as an argument). <i>Note: When created with `VtsModalService.create`, this parameter should be passed into the type of function (callback function). This function returns a promise, which is automatically closed when the execution is complete or the promise ends (return `false` to prevent closing)</i> | EventEmitter | - |
| vtsOnOk            | Specify a EventEmitter that will be emitted when a user clicks the OK button (If vtsContent is Component, the Component instance will be put in as an argument). <i>Note: When created with `VtsModalService.create`, this parameter should be passed into the type of function (callback function). This function returns a promise, which is automatically closed when the execution is complete or the promise ends (return `false` to prevent closing)</i> | EventEmitter | - |
| vtsContent         | Content | string / TemplateRef / Component / ng-content | - |
| vtsComponentParams | Will be instance property when `vtsContent` is a component，will be template variable when `vtsContent` is `TemplateRef`  | `object` | - |
| vtsIconType        | Icon type of the Icon component. <i>Only valid in confirm box mode</i> | `string` | question-circle |
| vtsAutofocus        | autofocus and the position，disabled when is `null` | `'ok' \| 'cancel' \| 'auto' \| null` | `'auto'` |

#### Attentions

> The creation or modification of the `vtsComponentParams` property does not trigger the `ngOnChanges` life cycle hook of the `vtsContent` component.

#### Using service to create Normal Mode modal

> You can call `VtsModalService.create(options)` to dynamically create **normal mode** modals, where `options` is an object that supports the support given in the API above **normal mode** parameters

### Confirm box mode - VtsModalService.method()

There are five ways to display the information based on the content's nature:

- `VtsModalService.info`
- `VtsModalService.success`
- `VtsModalService.error`
- `VtsModalService.warning`
- `VtsModalService.confirm`

The items listed above are all functions, expecting a settings object as parameter.
Consistent with the above API, some property types or initial values are different as follows:

| Property   | Description    | Type             | Default       |
|------------|----------------|------------------|---------------|
| vtsOnOk          | Specify a EventEmitter that will be emitted when a user clicks the OK button (If vtsContent is Component, the Component instance will be put in as an argument.). <i>This function returns a promise, which is automatically closed when the execution is complete or the promise ends (return `false` to prevent closing)</i> | function | - |
| vtsOnCancel      | Specify a function that will be called when a user clicks mask, close button on top right or Cancel button (If vtsContent is Component, the Component instance will be put in as an argument.). <i>This function returns a promise, which is automatically closed when the execution is complete or the promise ends (return `false` to prevent closing)</i> | function | - |
| vtsWidth         | Width of the modal dialog | string / number | 416 |
| vtsMaskClosable  | Whether to close the modal dialog when the mask (area outside the modal) is clicked | `boolean` | `false` |

All the `VtsModalService.method`s will return a reference, and then we can close the popup by the reference.

```ts
constructor(modal: VtsModalService) {
  const ref: VtsModalRef = modal.info();
  ref.close(); // Or ref.destroy(); This dialog will be destroyed directly
}
```

### Related type definition

#### Other Methods/Attributes for VtsModalService

| Methods/Attributes | Description | Type |
|----|----|----|
| openModals | All currently open Modal list | VtsModalRef[] |
| afterAllClose | Callback called after all Modals closed completely | Observable&lt;void&gt; |
| closeAll() | Close all modals | function |

#### VtsModalRef

> VtsModalRef object is used to control dialogs and communicate with inside content

The dialog created by the service method `VtsModalService.xxx()` will return a `VtsModalRef` object that is used to manipulate the dialog (this object can also be obtained by dependency injection `VtsModalRef` if `vtsContent` is used as Component) , This object has the following methods:

| Method | Description |
|----|----|
| afterOpen                 | Same as vtsAfterOpen but of type Observable&lt;void&gt; |
| afterClose | Same as vtsAfterClose, but of type Observable&lt;result:any&gt; |
| close()                   | Close (hide) the dialog. <i>Note: When used for a dialog created as a service, this method will destroy the dialog directly (as with the destroy method)</i> |
| destroy()                 | Destroy the dialog. <i>Note: Used only for dialogs created by the service (non-service created dialogs, this method only hides the dialog)</i> |
| getContentComponent()  | Gets the Component instance in the contents of the dialog for `vtsContent`. <i> Note: When the dialog is not initialized (`ngOnInit` is not executed), this function will return `undefined`</i> |
| triggerOk()               | Manually trigger vtsOnOk |
| triggerCancel()           | Manually trigger vtsOnCancel |
| updateConfig(config: ModalOptions): void   | Update the config |

### ModalButtonOptions (used to customize the bottom button)

An array of `ModalButtonOptions` type can be passed to `vtsFooter` for custom bottom buttons.

The button configuration items are as follows (along with the button component):

```ts
vtsFooter: [{
  label: string; // Button text
  type?: string; // Types
  danger?: boolean; // Whether danger
  shape?: string; // Shape
  ghost?: boolean; // Whether ghost
  size?: string; // Size
  autoLoading?: boolean; // The default is true. If true, this button will automatically be set to the loading state when onClick returns a promise.

  // Tip: The `this` of below methods points to the configuration object itself. When vtsContent is a component class, the contentComponentInstance parameter passed in by the method below is an instance of the component class
  // Whether to show this button
  show?: boolean | ((this: ModalButtonOptions, contentComponentInstance?: object) => boolean);
  // Whether to display loading
  loading?: boolean | ((this: ModalButtonOptions, contentComponentInstance?: object) => boolean);
  // Is it disabled
  disabled?: boolean | ((this: ModalButtonOptions, contentComponentInstance?: object) => boolean);
  // Callback of clicking
  onClick?(this: ModalButtonOptions, contentComponentInstance?: object): void | Promise&lt;void&gt; | any;
}]
```

The above configuration items can also be changed in real-time to trigger the button behavior change.

### [vtsModalTitle]

Customize the title.

```html
<div *vtsModalTitle>
  Custom Modal Title
</div>

<!-- or -->

<ng-template [vtsModalTitle]>
  Custom Modal Title
</ng-template>
```

### [vtsModalFooter]

Customize the footer.

```html
<div *vtsModalFooter>
  <button vts-button vtsType="default" (click)="handleCancel()">Custom Callback</button>
  <button vts-button vtsType="primary" (click)="handleOk()" [vtsLoading]="isConfirmLoading">Custom Submit</button>
</div>

<!-- or -->

<ng-template [vtsModalFooter]>
  <button vts-button vtsType="default" (click)="handleCancel()">Custom Callback</button>
  <button vts-button vtsType="primary" (click)="handleOk()" [vtsLoading]="isConfirmLoading">Custom Submit</button>
</ng-template>
```
