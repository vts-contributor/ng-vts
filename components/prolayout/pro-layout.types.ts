/**
 * Export types using for pro-layout
 */

export type MenuItemProLayout = {
    title: string,
    children?: MenuItemProLayout[],
    isOpen?: boolean,
    isSelected?: boolean,
    icon?: string
}

export type ThemeColorType = {
    value: string,
    isChecked: boolean
}