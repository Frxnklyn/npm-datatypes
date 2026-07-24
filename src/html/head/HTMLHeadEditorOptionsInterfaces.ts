export interface HTMLBaseOptionsInterface {
  href?: string;
  target?: string;
}

export interface HTMLLinkOptionsInterface {
  href: string;
  relation?: string;
  type?: string;
  media?: string;
  language?: string;
  sizes?: string;
  integrity?: string;
  crossOrigin?: "anonymous" | "use-credentials";
  referrerPolicy?: string;
  fetchPriority?: "high" | "low" | "auto";
}

export interface HTMLMetaOptionsInterface {
  name?: string;
  httpEquiv?: string;
  content?: string;
  charset?: string;
  media?: string;
}

export interface HTMLStyleOptionsInterface {
  media?: string;
  blocking?: string;
}

export interface HTMLTemplateOptionsInterface {
  shadowRootMode?: "open" | "closed";
  shadowRootDelegatesFocus?: boolean;
  shadowRootClonable?: boolean;
  shadowRootSerializable?: boolean;
}
