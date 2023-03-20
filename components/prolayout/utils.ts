/**
 * Export functions used for pro-layout
 */

import { MenuItemProLayout } from './pro-layout.types';

export function renderMenuProLayout(menuData: MenuItemProLayout[]) {
  let output: string = ``;
  menuData.forEach(menu => {
    if (menu.children && menu.children.length > 0) {
        output += `<li vts-submenu ${menu.isOpen ? 'vtsOpen': ''} [vtsTitle]="${menu.title}" ${menu.icon ? `[vtsIcon]="${menu.icon}`: ''}">`;
        output += '<ul>';
        output += renderMenuProLayout(menu.children);
        output += '</ul>';
    } else {
      if (menu.isSelected) {
        output += `<li vts-menu-item vtsSelected>${menu.title}</li>`;
      }
      else {
        output += `<li vts-menu-item>${menu.title}</li>`;
      }
    }
  });
  return output;
}
