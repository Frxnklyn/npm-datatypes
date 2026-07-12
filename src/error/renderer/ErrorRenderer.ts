import type { ErrorDataInterface } from "../interfaces/ErrorDataInterface.js";

/**
 * Renders the shared structured error data as Markdown or HTML.
 */
export class ErrorRenderer {
  static toMarkdown(data: ErrorDataInterface): string {
    const lines: string[] = [];
    const title = data.name || data.code;

    lines.push(`# ${this.toMarkdownText(title)}`);
    lines.push("");
    lines.push(this.toMarkdownText(data.message));
    lines.push("");
    lines.push(`- Fehlercode: ${this.toMarkdownText(data.code)}`);
    lines.push(`- Kategorie: ${this.toMarkdownText(data.category)}`);
    lines.push(`- Schweregrad: ${this.toMarkdownText(data.severity)}`);
    lines.push(`- Zeitpunkt: ${this.toMarkdownText(data.timestamp)}`);

    this.appendMarkdownValues(lines, "Kontext", data.context);
    this.appendMarkdownUnknown(lines, "Ursache", data.cause);

    for (const section of data.reportSections ?? []) {
      this.appendMarkdownValues(lines, section.title, section.values);
    }

    if (data.stack) {
      lines.push("");
      lines.push("## Stacktrace");
      lines.push("");
      lines.push("```text");
      lines.push(data.stack);
      lines.push("```");
    }

    return lines.join("\n");
  }

  static toHTML(data: ErrorDataInterface): string {
    const parts: string[] = [];
    const title = data.name || data.code;

    parts.push('<article class="structured-error">');
    parts.push(`<h1>${this.escapeHtml(title)}</h1>`);
    parts.push(`<p>${this.escapeHtml(data.message)}</p>`);
    parts.push("<dl>");
    parts.push(`<dt>Fehlercode</dt><dd>${this.escapeHtml(data.code)}</dd>`);
    parts.push(`<dt>Kategorie</dt><dd>${this.escapeHtml(data.category)}</dd>`);
    parts.push(`<dt>Schweregrad</dt><dd>${this.escapeHtml(data.severity)}</dd>`);
    parts.push(`<dt>Zeitpunkt</dt><dd>${this.escapeHtml(data.timestamp)}</dd>`);
    parts.push("</dl>");

    this.appendHtmlValues(parts, "Kontext", data.context);
    this.appendHtmlUnknown(parts, "Ursache", data.cause);

    for (const section of data.reportSections ?? []) {
      this.appendHtmlValues(parts, section.title, section.values);
    }

    if (data.stack) {
      parts.push("<section>");
      parts.push("<h2>Stacktrace</h2>");
      parts.push(`<pre><code>${this.escapeHtml(data.stack)}</code></pre>`);
      parts.push("</section>");
    }

    parts.push("</article>");
    return parts.join("");
  }

  static safeValue(value: unknown): unknown {
    return this.normalizeValue(value, new WeakSet<object>());
  }

  static safeRecord(values: Record<string, unknown>): Record<string, unknown> {
    return this.safeValue(values) as Record<string, unknown>;
  }

  private static appendMarkdownValues(lines: string[], title: string, values: Record<string, unknown>): void {
    const entries = Object.entries(this.safeRecord(values));
    if (entries.length === 0) {
      return;
    }

    lines.push("");
    lines.push(`## ${this.toMarkdownText(title)}`);
    lines.push("");

    if (entries.every(([, value]) => this.isSimpleValue(value))) {
      lines.push("| Feld | Wert |");
      lines.push("| --- | --- |");
      for (const [key, value] of entries) {
        lines.push(`| ${this.toMarkdownTableCell(key)} | ${this.toMarkdownTableCell(this.valueToString(value))} |`);
      }
      return;
    }

    lines.push("```json");
    lines.push(this.safeJSONStringify(Object.fromEntries(entries)));
    lines.push("```");
  }

  private static appendMarkdownUnknown(lines: string[], title: string, value: unknown): void {
    if (value === undefined) {
      return;
    }

    lines.push("");
    lines.push(`## ${this.toMarkdownText(title)}`);
    lines.push("");

    const normalizedValue = this.safeValue(value);
    if (this.isSimpleValue(normalizedValue)) {
      lines.push(this.toMarkdownText(this.valueToString(normalizedValue)));
      return;
    }

    lines.push("```json");
    lines.push(this.safeJSONStringify(normalizedValue));
    lines.push("```");
  }

  private static appendHtmlValues(parts: string[], title: string, values: Record<string, unknown>): void {
    const entries = Object.entries(this.safeRecord(values));
    if (entries.length === 0) {
      return;
    }

    parts.push("<section>");
    parts.push(`<h2>${this.escapeHtml(title)}</h2>`);

    if (entries.every(([, value]) => this.isSimpleValue(value))) {
      parts.push("<table><thead><tr><th>Feld</th><th>Wert</th></tr></thead><tbody>");
      for (const [key, value] of entries) {
        parts.push(`<tr><td>${this.escapeHtml(key)}</td><td>${this.escapeHtml(this.valueToString(value))}</td></tr>`);
      }
      parts.push("</tbody></table>");
    } else {
      parts.push(`<pre><code>${this.escapeHtml(this.safeJSONStringify(Object.fromEntries(entries)))}</code></pre>`);
    }

    parts.push("</section>");
  }

  private static appendHtmlUnknown(parts: string[], title: string, value: unknown): void {
    if (value === undefined) {
      return;
    }

    const normalizedValue = this.safeValue(value);
    parts.push("<section>");
    parts.push(`<h2>${this.escapeHtml(title)}</h2>`);

    if (this.isSimpleValue(normalizedValue)) {
      parts.push(`<p>${this.escapeHtml(this.valueToString(normalizedValue))}</p>`);
    } else {
      parts.push(`<pre><code>${this.escapeHtml(this.safeJSONStringify(normalizedValue))}</code></pre>`);
    }

    parts.push("</section>");
  }

  private static normalizeValue(value: unknown, seen: WeakSet<object>): unknown {
    if (value instanceof Date) {
      return value.toISOString();
    }

    if (value instanceof Error) {
      const errorValue: Record<string, unknown> = {
        name: value.name,
        message: value.message,
        stack: value.stack,
      };

      const maybeStructuredError = value as { toJSON?: () => unknown };
      if (typeof maybeStructuredError.toJSON === "function") {
        try {
          return this.normalizeValue(maybeStructuredError.toJSON(), seen);
        } catch {
          return errorValue;
        }
      }

      return errorValue;
    }

    if (typeof value === "bigint") {
      return value.toString();
    }

    if (typeof value === "function") {
      return `[Function ${value.name || "anonymous"}]`;
    }

    if (typeof value === "symbol") {
      return value.toString();
    }

    if (value === null || typeof value !== "object") {
      return value;
    }

    if (seen.has(value)) {
      return "[Circular]";
    }

    seen.add(value);

    if (Array.isArray(value)) {
      return value.map((entry) => this.normalizeValue(entry, seen));
    }

    const output: Record<string, unknown> = {};
    let entries: [string, unknown][];

    try {
      entries = Object.entries(value);
    } catch {
      seen.delete(value);
      return "[Unserializable]";
    }

    for (const [key, entry] of entries) {
      try {
        output[key] = this.normalizeValue(entry, seen);
      } catch {
        output[key] = "[Unserializable]";
      }
    }

    seen.delete(value);
    return output;
  }

  private static safeJSONStringify(value: unknown): string {
    try {
      return JSON.stringify(this.safeValue(value), null, 2) ?? "null";
    } catch {
      return JSON.stringify("[Unserializable]", null, 2);
    }
  }

  private static isSimpleValue(value: unknown): boolean {
    return value === null || ["string", "number", "boolean", "bigint", "undefined"].includes(typeof value);
  }

  private static valueToString(value: unknown): string {
    if (value === undefined) {
      return "";
    }

    if (typeof value === "string") {
      return value;
    }

    if (this.isSimpleValue(value)) {
      return String(value);
    }

    return this.safeJSONStringify(value);
  }

  private static toMarkdownText(value: unknown): string {
    return this.valueToString(value);
  }

  private static toMarkdownTableCell(value: unknown): string {
    return this.valueToString(value).replace(/\|/g, "\\|").replace(/\n/g, "<br>");
  }

  private static escapeHtml(value: unknown): string {
    return this.valueToString(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
}
