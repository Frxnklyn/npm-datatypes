/**
 * Provides write access to an external CSS resource.
 */
export interface HTMLStyleLinkEditorDataTypeInterface {
  setSource(source: string): this;
  setMedia(media: string | undefined): this;
}
