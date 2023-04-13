/**
 * Formats a label given a date, number or string.
 *
 * @export
 */
export function formatLabel(label: any): string {
  if (label instanceof Date) {
    label = label.toLocaleDateString();
  } else {
    label = label
  }

  return label;
}

/**
 * Escapes a label.
 *
 * @export
 */
export function escapeLabel(label: any): string {
  return label.toLocaleString().replace(/[&'`"<>]/g, (match: any) => {
    return ({
      '&': '&amp;',
      "'": '&#x27;',
      '`': '&#x60;',
      '"': '&quot;',
      '<': '&lt;',
      '>': '&gt;'
    } as any)[match];
  });
}
