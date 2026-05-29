export type HtmlAttributeValue = string | number | boolean;

export interface HtmlAttributes {
  [name: string]: HtmlAttributeValue;
}

export interface HtmlSelector {
  selector: string;
}
