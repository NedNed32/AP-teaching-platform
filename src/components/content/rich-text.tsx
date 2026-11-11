import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { parseRichText, renderMath, type RichToken } from "@/lib/content/rich-text";

function renderTokens(tokens: readonly RichToken[]): ReactNode {
  return tokens.map((token, index) => {
    switch (token.kind) {
      case "text":
        return <Fragment key={index}>{token.text}</Fragment>;
      case "math":
        // KaTeX output from content that passed the content check; no user input reaches it.
        return <span key={index} dangerouslySetInnerHTML={{ __html: renderMath(token.tex) }} />;
      case "code":
        return (
          <code key={index} className="rounded bg-fg/10 px-1 py-0.5 font-mono text-[0.9em] text-fg">
            {token.text}
          </code>
        );
      case "codeblock":
        return (
          <code key={index} className="font-mono">
            {token.text}
          </code>
        );
      case "bold":
        return (
          <strong key={index} className="font-semibold text-fg">
            {renderTokens(token.children)}
          </strong>
        );
      case "italic":
        return <em key={index}>{renderTokens(token.children)}</em>;
    }
  });
}

/**
 * Renders a content string (**bold**, *italic*, $$math$$). `inline` for titles and
 * labels joins paragraphs into one run; otherwise each paragraph is a <p>.
 */
export function RichText({ text, inline = false, className }: { text: string; inline?: boolean; className?: string | undefined }) {
  const paragraphs = parseRichText(text);
  if (inline) {
    return (
      <span className={className}>
        {paragraphs.map((tokens, index) =>
          tokens[0]?.kind === "codeblock" ? (
            // Code keeps its line breaks even inside an inline run (e.g. a model answer).
            <span key={index} className="my-2 block overflow-x-auto whitespace-pre rounded-lg border border-hairline bg-fg/[0.04] p-2.5 text-[0.8125rem] leading-relaxed text-fg">
              {renderTokens(tokens)}
            </span>
          ) : (
            <Fragment key={index}>
              {index > 0 ? " " : null}
              {renderTokens(tokens)}
            </Fragment>
          ),
        )}
      </span>
    );
  }
  return (
    <div className={cn("space-y-3", className)}>
      {paragraphs.map((tokens, index) =>
        tokens[0]?.kind === "codeblock" ? (
          <pre key={index} className="overflow-x-auto rounded-xl border border-hairline bg-fg/[0.04] p-3 text-[0.8125rem] leading-relaxed text-fg">
            {renderTokens(tokens)}
          </pre>
        ) : (
          <p key={index}>{renderTokens(tokens)}</p>
        ),
      )}
    </div>
  );
}
