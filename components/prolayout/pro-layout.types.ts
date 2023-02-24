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