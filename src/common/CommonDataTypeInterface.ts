export interface CommonDataTypeInterface<TContent = unknown> {
  getContent(): TContent;
  getContentString(): string;
  changeContent(newContent: TContent): this;
}
