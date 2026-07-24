/**
 * Global attributes supported by HTML elements.
 */
export interface HTMLElementAttributeInterface {
  width?: string | number;
  height?: string | number;
  class?: string;
  id?: string;
  style?: string;
  title?: string;
  role?: string;
  hidden?: boolean;
  accesskey?: string;
  autocapitalize?: string;
  autofocus?: boolean;
  contenteditable?: boolean | "plaintext-only";
  dir?: "ltr" | "rtl" | "auto";
  draggable?: boolean;
  inert?: boolean;
  lang?: string;
  nonce?: string;
  part?: string;
  popover?: boolean | "auto" | "hint" | "manual";
  slot?: string;
  spellcheck?: boolean;
  tabindex?: number;
  translate?: boolean;
}
