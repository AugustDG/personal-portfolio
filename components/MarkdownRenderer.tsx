import Markdown from "markdown-to-jsx";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({
  content,
  className = "",
}: MarkdownRendererProps) {
  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      <Markdown
        options={{
          overrides: {
            h1: {
              props: {
                className: "text-xl font-bold accent-green mb-3",
              },
            },
            h2: {
              props: {
                className: "text-lg font-semibold accent-cyan mb-2 mt-4",
              },
            },
            h3: {
              props: {
                className: "text-base font-medium accent-amber mb-2 mt-3",
              },
            },
            p: {
              props: {
                className:
                  "mb-3 leading-relaxed text-terminal-text-primary-light dark:text-terminal-text-primary-dark",
              },
            },
            ul: {
              props: {
                className: "list-none space-y-1 mb-3",
              },
            },
            li: {
              props: {
                className:
                  'before:content-["▸"] before:text-terminal-accent-green before:mr-2',
              },
            },
            code: {
              props: {
                className:
                  "bg-terminal-accent-blue/20 text-terminal-accent-blue px-1 py-0.5 rounded text-sm",
              },
            },
            pre: {
              props: {
                className:
                  "bg-terminal-frame-dark p-3 rounded mb-3 overflow-x-auto text-sm border border-terminal-frame-light dark:border-terminal-frame-dark",
              },
            },
            blockquote: {
              props: {
                className:
                  "border-l-2 border-terminal-accent-magenta pl-4 ml-2 mb-3 text-terminal-text-secondary-light dark:text-terminal-text-secondary-dark",
              },
            },
            a: {
              props: {
                className:
                  "accent-cyan hover:accent-amber transition-colors duration-200 underline",
                target: "_blank",
                rel: "noopener noreferrer",
              },
            },
            img: {
              props: {
                className:
                  "max-w-full h-auto rounded border border-terminal-frame-light dark:border-terminal-frame-dark my-4",
              },
            },
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
