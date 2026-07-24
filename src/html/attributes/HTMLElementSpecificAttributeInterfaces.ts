import type { HTMLElementAttributeInterface } from "./HTMLElementAttributeInterface.js";

export interface HTMLAreaAttributeInterface extends HTMLElementAttributeInterface {
  alt?: string;
  coords?: string;
  shape?: "default" | "rect" | "circle" | "poly";
  href?: string;
  target?: string;
  download?: string | boolean;
  ping?: string;
  rel?: string;
  referrerpolicy?: string;
}

export interface HTMLAnchorAttributeInterface extends HTMLElementAttributeInterface {
  href?: string;
  target?: string;
  download?: string | boolean;
  ping?: string;
  rel?: string;
  hreflang?: string;
  type?: string;
  referrerpolicy?: string;
}

export interface HTMLBaseAttributeInterface extends HTMLElementAttributeInterface {
  href?: string;
  target?: string;
}

export interface HTMLQuoteAttributeInterface extends HTMLElementAttributeInterface {
  cite?: string;
}

export interface HTMLColumnAttributeInterface extends HTMLElementAttributeInterface {
  span?: number;
}

export interface HTMLDataAttributeInterface extends HTMLElementAttributeInterface {
  value?: string;
}

export interface HTMLModificationAttributeInterface extends HTMLElementAttributeInterface {
  cite?: string;
  datetime?: string;
}

export interface HTMLImageAttributeInterface extends HTMLElementAttributeInterface {
  src?: string;
  alt?: string;
  srcset?: string;
  sizes?: string;
  crossorigin?: "anonymous" | "use-credentials";
  usemap?: string;
  ismap?: boolean;
  loading?: "eager" | "lazy";
  decoding?: "sync" | "async" | "auto";
  referrerpolicy?: string;
  fetchpriority?: "high" | "low" | "auto";
}

export interface HTMLEmbedAttributeInterface extends HTMLElementAttributeInterface {
  src?: string;
  type?: string;
}

export interface HTMLFieldSetAttributeInterface extends HTMLElementAttributeInterface {
  disabled?: boolean;
  form?: string;
  name?: string;
}

export interface HTMLLinkAttributeInterface extends HTMLElementAttributeInterface {
  href?: string;
  crossorigin?: "anonymous" | "use-credentials";
  rel?: string;
  as?: string;
  media?: string;
  hreflang?: string;
  type?: string;
  sizes?: string;
  imagesrcset?: string;
  imagesizes?: string;
  referrerpolicy?: string;
  integrity?: string;
  blocking?: string;
  color?: string;
  disabled?: boolean;
  fetchpriority?: "high" | "low" | "auto";
}

export interface HTMLInputAttributeInterface extends HTMLElementAttributeInterface {
  accept?: string;
  alt?: string;
  autocomplete?: string;
  checked?: boolean;
  disabled?: boolean;
  form?: string;
  formaction?: string;
  formenctype?: string;
  formmethod?: string;
  formnovalidate?: boolean;
  formtarget?: string;
  list?: string;
  max?: string | number;
  maxlength?: number;
  min?: string | number;
  minlength?: number;
  multiple?: boolean;
  name?: string;
  pattern?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  size?: number;
  src?: string;
  step?: string | number;
  type?: string;
  value?: string | number;
}

export interface HTMLButtonAttributeInterface extends HTMLElementAttributeInterface {
  command?: string;
  commandfor?: string;
  disabled?: boolean;
  form?: string;
  formaction?: string;
  formenctype?: string;
  formmethod?: string;
  formnovalidate?: boolean;
  formtarget?: string;
  name?: string;
  popovertarget?: string;
  popovertargetaction?: "hide" | "show" | "toggle";
  type?: "button" | "reset" | "submit";
  value?: string;
}

export interface HTMLFormAttributeInterface extends HTMLElementAttributeInterface {
  "accept-charset"?: string;
  action?: string;
  autocomplete?: "on" | "off";
  enctype?: string;
  method?: "get" | "post" | "dialog";
  name?: string;
  novalidate?: boolean;
  rel?: string;
  target?: string;
}

export interface HTMLTextAreaAttributeInterface extends HTMLElementAttributeInterface {
  autocomplete?: string;
  cols?: number;
  dirname?: string;
  disabled?: boolean;
  form?: string;
  maxlength?: number;
  minlength?: number;
  name?: string;
  placeholder?: string;
  readonly?: boolean;
  required?: boolean;
  rows?: number;
  wrap?: "soft" | "hard";
}

export interface HTMLSelectAttributeInterface extends HTMLElementAttributeInterface {
  autocomplete?: string;
  disabled?: boolean;
  form?: string;
  multiple?: boolean;
  name?: string;
  required?: boolean;
  size?: number;
}

export interface HTMLOptionAttributeInterface extends HTMLElementAttributeInterface {
  disabled?: boolean;
  label?: string;
  selected?: boolean;
  value?: string;
}

export interface HTMLMediaAttributeInterface extends HTMLElementAttributeInterface {
  src?: string;
  crossorigin?: "anonymous" | "use-credentials";
  preload?: "none" | "metadata" | "auto";
  autoplay?: boolean;
  loading?: "eager" | "lazy";
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
}

export interface HTMLVideoAttributeInterface extends HTMLMediaAttributeInterface {
  poster?: string;
  playsinline?: boolean;
}

export interface HTMLSourceAttributeInterface extends HTMLElementAttributeInterface {
  type?: string;
  media?: string;
  src?: string;
  srcset?: string;
  sizes?: string;
}

export interface HTMLIFrameAttributeInterface extends HTMLElementAttributeInterface {
  src?: string;
  srcdoc?: string;
  name?: string;
  sandbox?: string;
  allow?: string;
  allowfullscreen?: boolean;
  referrerpolicy?: string;
  loading?: "eager" | "lazy";
}

export interface HTMLScriptAttributeInterface extends HTMLElementAttributeInterface {
  src?: string;
  type?: string;
  nomodule?: boolean;
  async?: boolean;
  defer?: boolean;
  crossorigin?: "anonymous" | "use-credentials";
  integrity?: string;
  referrerpolicy?: string;
  blocking?: string;
  fetchpriority?: "high" | "low" | "auto";
}

export interface HTMLMetaAttributeInterface extends HTMLElementAttributeInterface {
  name?: string;
  "http-equiv"?: string;
  content?: string;
  charset?: string;
  media?: string;
}

export interface HTMLLabelAttributeInterface extends HTMLElementAttributeInterface {
  for?: string;
}

export interface HTMLDetailsAttributeInterface extends HTMLElementAttributeInterface {
  name?: string;
  open?: boolean;
}

export interface HTMLDialogAttributeInterface extends HTMLElementAttributeInterface {
  open?: boolean;
}

export interface HTMLMapAttributeInterface extends HTMLElementAttributeInterface {
  name?: string;
}

export interface HTMLMeterAttributeInterface extends HTMLElementAttributeInterface {
  value?: number;
  min?: number;
  max?: number;
  low?: number;
  high?: number;
  optimum?: number;
}

export interface HTMLObjectAttributeInterface extends HTMLElementAttributeInterface {
  data?: string;
  type?: string;
  name?: string;
  form?: string;
}

export interface HTMLOrderedListAttributeInterface extends HTMLElementAttributeInterface {
  reversed?: boolean;
  start?: number;
  type?: "1" | "a" | "A" | "i" | "I";
}

export interface HTMLListItemAttributeInterface extends HTMLElementAttributeInterface {
  value?: number;
}

export interface HTMLOptGroupAttributeInterface extends HTMLElementAttributeInterface {
  disabled?: boolean;
  label?: string;
}

export interface HTMLOutputAttributeInterface extends HTMLElementAttributeInterface {
  for?: string;
  form?: string;
  name?: string;
}

export interface HTMLProgressAttributeInterface extends HTMLElementAttributeInterface {
  value?: number;
  max?: number;
}

export interface HTMLSlotAttributeInterface extends HTMLElementAttributeInterface {
  name?: string;
}

export interface HTMLStyleAttributeInterface extends HTMLElementAttributeInterface {
  media?: string;
  blocking?: string;
}

export interface HTMLTableCellAttributeInterface extends HTMLElementAttributeInterface {
  abbr?: string;
  colspan?: number;
  rowspan?: number;
  headers?: string;
  scope?: "row" | "col" | "rowgroup" | "colgroup";
}

export interface HTMLTemplateAttributeInterface extends HTMLElementAttributeInterface {
  shadowrootmode?: "open" | "closed";
  shadowrootdelegatesfocus?: boolean;
  shadowrootclonable?: boolean;
  shadowrootserializable?: boolean;
}

export interface HTMLTimeAttributeInterface extends HTMLElementAttributeInterface {
  datetime?: string;
}

export interface HTMLTrackAttributeInterface extends HTMLElementAttributeInterface {
  default?: boolean;
  kind?: "subtitles" | "captions" | "descriptions" | "chapters" | "metadata";
  label?: string;
  src?: string;
  srclang?: string;
}
