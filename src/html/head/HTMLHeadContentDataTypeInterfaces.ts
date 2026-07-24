export interface HTMLBaseDataTypeInterface {
  getHref(): string | undefined;
  getTarget(): string | undefined;
  getCode(): string;
}

export interface HTMLTitleDataTypeInterface {
  getContent(): string;
  getCode(): string;
}

export interface HTMLLinkDataTypeInterface {
  getHref(): string;
  getRelation(): string | undefined;
  getType(): string | undefined;
  getMedia(): string | undefined;
  getCode(): string;
}

export interface HTMLMetaDataTypeInterface {
  getName(): string | undefined;
  getHttpEquiv(): string | undefined;
  getContent(): string | undefined;
  getCharset(): string | undefined;
  getMedia(): string | undefined;
  getCode(): string;
}

export interface HTMLTemplateDataTypeInterface {
  getContent(): string;
  getCode(): string;
}

export interface HTMLNoScriptDataTypeInterface {
  getContent(): string;
  getCode(): string;
}
