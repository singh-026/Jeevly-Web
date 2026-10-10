/**
 * The one look for every selectable control: tabs, filter chips and the
 * enquiry form's choice pills. A selected item takes the primary CTA fill, so
 * "chosen" and "click me" read as the same orange with white text site-wide.
 * Shape (radius, padding, border) stays with each component.
 */
export function toggleStyles(selected: boolean) {
  return selected ? "bg-cta text-on-cta shadow-sm hover:bg-cta-hover" : "text-navy hover:bg-navy-50";
}

/**
 * `toggleStyles` for a <label> wrapping a native radio or checkbox, driven by
 * its checked state. The extra hover variant outranks the unchecked hover.
 */
export const checkableToggleStyles =
  "text-navy hover:bg-navy-50 has-checked:bg-cta has-checked:text-on-cta has-checked:shadow-sm has-checked:hover:bg-cta-hover has-focus-visible:ring-2 has-focus-visible:ring-cta has-focus-visible:ring-offset-2";
