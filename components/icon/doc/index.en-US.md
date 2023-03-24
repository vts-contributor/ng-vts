---
category: Components
type: Components
title: Icon
order: 1
hasPageDemo: true
cover: https://gw.alipayobjects.com/zos/alicdn/rrwbSt3FQ/Icon.svg
---

## List of icons

```ts
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
```

## API

Icons can be loaded by one of these ways (Dynamic load by default):

- Static load:

```ts
// Provide which icons will be loaded in App Module and Sub Module
// Icons will be loaded into memory before usage

// Use forRoot in app.module
// app.module.ts
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VtsIcons } from '@ui-vts/icons-angular/icons' // All icons of VTS
import { AntdIcons } from '@ui-vts/icons-angular/icons' // All icons of Ant Design

@NgModule({
    declarations: [],
    imports: [
        // Load all icons of 2 types into memory
        VtsIconModule.forRoot([...Object.values(VtsIcons), ...Object.values(AntdIcons)]),
        ...
    ]
})

// Use forChild for any other modules
// feature.module.ts
import { VtsIconModule } from '@ui-vts/ng-vts/icon';
import { VsIcons } from '@ui-vts/icons-angular/icons' // All icons of VS Code
import { AddressBookRegular } from '@ui-vts/icons-angular/icons/fa' // A single icon defined of Font Awesome

@NgModule({
    declarations: [],
    imports: [
        // Load all icons of 2 types into memory
        VtsIconModule.forChild([...Object.values(VsIcons), AddressBookRegular]),
        ...
    ]
})
```

- Dynamic load:
```ts
// Dynamic load mean icons will be loaded using HttpClient and fetch from "assets" contents
// Developper must make sure icon's assets is ready before usage
// BE CAUTION: IF UI PAGE USE MASSIVE AMOUNT OF ICONS, THIS WILL CREATE MASSIVE AMOUNT OF HTTP REQUEST

// Declare assets content inside angular.json
// angular.json: projects > architect > (build | serve) > options > assets (Add an entry inside assets list) 
{
    "glob": "**/*",
    "input": "./node_modules/@ui-vts/icons-svg/svg/",
    "output": "/assets/"
}
```

After provided, icon can be used as follow:

```ts
<i vts-icon vtsType="Accessibility:vts"></i>
```

Developper can also provide custom icon (Same as static load):

```ts
import { VtsIconModule } from '@ui-vts/ng-vts/icon';

constructor(private iconService: VtsIconService) {}

ngOnInit(): void {
    const svgContent = `<svg viewBox="64 64 896 896" focusable="false" fill="currentColor" width="1em" height="1em" class="ng-tns-c586-146" data-icon="rotate-left" aria-hidden="true"><defs><style></style></defs><path d="M672 418H144c-17.7 0-32 14.3-32 32v414c0 17.7 14.3 32 32 32h528c17.7 0 32-14.3 32-32V450c0-17.7-14.3-32-32-32zm-44 402H188V494h440v326z"></path><path d="M819.3 328.5c-78.8-100.7-196-153.6-314.6-154.2l-.2-64c0-6.5-7.6-10.1-12.6-6.1l-128 101c-4 3.1-3.9 9.1 0 12.3L492 318.6c5.1 4 12.7.4 12.6-6.1v-63.9c12.9.1 25.9.9 38.8 2.5 42.1 5.2 82.1 18.2 119 38.7 38.1 21.2 71.2 49.7 98.4 84.3 27.1 34.7 46.7 73.7 58.1 115.8a325.95 325.95 0 016.5 140.9h74.9c14.8-103.6-11.3-213-81-302.3z"></path></svg>`
    
    // Use one of below
    this.iconService.addIcon({
        icon: svgContent,
        name: 'AvatarPreviewRotateLeft',
        type: 'avatar'
    })
    // Or
    this.iconService.addIconLiteral('AvatarPreviewRotateLeft:avatar', svgContent)
}

// Usage
<i vts-icon vtsType="AvatarPreviewRotateLeft:avatar"></i>
```

### [vts-icon]

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| vtsType | Type of VTS icon in list (above) | `string` | 