/**
 * Export types using for pro-layout
 */

import { VtsSizeLDSType } from "@ui-vts/ng-vts/core/types"

export type MenuItemProLayout = {
    title: string,
    children?: MenuItemProLayout[],
    isOpen?: boolean,
    isSelected?: boolean,
    icon?: string,
    id?: string | number
}

export type ThemeColorType = {
    value: string,
    isChecked: boolean
}

export type AvatarUser = {
    name?: string,
    subname?: string,
    imgUrl?: string,
    size: VtsSizeLDSType,
    menu: AvatarMenu[]
}

export type AvatarMenu = {
    url: string,
    label: string
}

export type BreadCrumb = {
    label: string,
    url: string,
    status: 'active' | 'inactive'
}