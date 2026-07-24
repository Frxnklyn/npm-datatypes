import type { HTMLElementAttributeInterface } from "./HTMLElementAttributeInterface.js";
import type {
  HTMLAnchorAttributeInterface,
  HTMLAreaAttributeInterface,
  HTMLBaseAttributeInterface,
  HTMLButtonAttributeInterface,
  HTMLColumnAttributeInterface,
  HTMLDataAttributeInterface,
  HTMLDetailsAttributeInterface,
  HTMLDialogAttributeInterface,
  HTMLEmbedAttributeInterface,
  HTMLFieldSetAttributeInterface,
  HTMLFormAttributeInterface,
  HTMLIFrameAttributeInterface,
  HTMLImageAttributeInterface,
  HTMLInputAttributeInterface,
  HTMLLabelAttributeInterface,
  HTMLLinkAttributeInterface,
  HTMLListItemAttributeInterface,
  HTMLMapAttributeInterface,
  HTMLMediaAttributeInterface,
  HTMLMetaAttributeInterface,
  HTMLMeterAttributeInterface,
  HTMLModificationAttributeInterface,
  HTMLObjectAttributeInterface,
  HTMLOrderedListAttributeInterface,
  HTMLOptGroupAttributeInterface,
  HTMLOptionAttributeInterface,
  HTMLOutputAttributeInterface,
  HTMLProgressAttributeInterface,
  HTMLQuoteAttributeInterface,
  HTMLScriptAttributeInterface,
  HTMLSelectAttributeInterface,
  HTMLSlotAttributeInterface,
  HTMLSourceAttributeInterface,
  HTMLStyleAttributeInterface,
  HTMLTableCellAttributeInterface,
  HTMLTemplateAttributeInterface,
  HTMLTextAreaAttributeInterface,
  HTMLTimeAttributeInterface,
  HTMLTrackAttributeInterface,
  HTMLVideoAttributeInterface,
} from "./HTMLElementSpecificAttributeInterfaces.js";
import type { HTMLElementTagName } from "./HTMLElementTagName.js";

export interface HTMLElementAttributeMapInterface {
  a: HTMLAnchorAttributeInterface;
  area: HTMLAreaAttributeInterface;
  audio: HTMLMediaAttributeInterface;
  base: HTMLBaseAttributeInterface;
  blockquote: HTMLQuoteAttributeInterface;
  button: HTMLButtonAttributeInterface;
  col: HTMLColumnAttributeInterface;
  colgroup: HTMLColumnAttributeInterface;
  data: HTMLDataAttributeInterface;
  del: HTMLModificationAttributeInterface;
  details: HTMLDetailsAttributeInterface;
  dialog: HTMLDialogAttributeInterface;
  embed: HTMLEmbedAttributeInterface;
  fieldset: HTMLFieldSetAttributeInterface;
  form: HTMLFormAttributeInterface;
  iframe: HTMLIFrameAttributeInterface;
  img: HTMLImageAttributeInterface;
  input: HTMLInputAttributeInterface;
  ins: HTMLModificationAttributeInterface;
  label: HTMLLabelAttributeInterface;
  li: HTMLListItemAttributeInterface;
  link: HTMLLinkAttributeInterface;
  map: HTMLMapAttributeInterface;
  meta: HTMLMetaAttributeInterface;
  meter: HTMLMeterAttributeInterface;
  object: HTMLObjectAttributeInterface;
  ol: HTMLOrderedListAttributeInterface;
  optgroup: HTMLOptGroupAttributeInterface;
  option: HTMLOptionAttributeInterface;
  output: HTMLOutputAttributeInterface;
  progress: HTMLProgressAttributeInterface;
  q: HTMLQuoteAttributeInterface;
  script: HTMLScriptAttributeInterface;
  select: HTMLSelectAttributeInterface;
  slot: HTMLSlotAttributeInterface;
  source: HTMLSourceAttributeInterface;
  style: HTMLStyleAttributeInterface;
  td: HTMLTableCellAttributeInterface;
  template: HTMLTemplateAttributeInterface;
  textarea: HTMLTextAreaAttributeInterface;
  th: HTMLTableCellAttributeInterface;
  time: HTMLTimeAttributeInterface;
  track: HTMLTrackAttributeInterface;
  video: HTMLVideoAttributeInterface;
}

export type HTMLElementAttributesFor<TTagName extends HTMLElementTagName> =
  TTagName extends keyof HTMLElementAttributeMapInterface
    ? HTMLElementAttributeMapInterface[TTagName]
    : HTMLElementAttributeInterface;
