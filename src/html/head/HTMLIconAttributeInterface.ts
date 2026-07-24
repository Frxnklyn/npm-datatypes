import type { HTMLElementAttributeInterface } from "../attributes/HTMLElementAttributeInterface.js";

/**
 * Attributes used to create a browser tab icon through `link rel="icon"`.
 */
export interface HTMLIconAttributeInterface extends HTMLElementAttributeInterface {
  href: string;
  type?: string;
  sizes?: string;
  media?: string;
  crossorigin?: "anonymous" | "use-credentials";
  referrerpolicy?: string;
  fetchpriority?: "high" | "low" | "auto";
}
