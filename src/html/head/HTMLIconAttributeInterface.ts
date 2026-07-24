/**
 * Attributes used to create a browser tab icon through `link rel="icon"`.
 */
export interface HTMLIconAttributeInterface {
  href: string;
  type?: string;
  sizes?: string;
  media?: string;
  crossorigin?: "anonymous" | "use-credentials";
  referrerpolicy?: string;
  fetchpriority?: "high" | "low" | "auto";
}
