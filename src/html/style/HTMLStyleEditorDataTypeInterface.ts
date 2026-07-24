/**
 * Provides write access to CSS embedded in an HTML document.
 */
export interface HTMLStyleEditorDataTypeInterface {
  setContent(content: string): this;
  setMedia(media: string | undefined): this;
}
