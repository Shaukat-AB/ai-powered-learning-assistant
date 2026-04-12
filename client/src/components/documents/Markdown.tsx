import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '../ui/button';

const Markdown = ({ text = '' }) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children, ...props }) => (
          <h1 className="h1" {...props}>
            {children}
          </h1>
        ),
        h2: ({ children, ...props }) => (
          <h2 className="h2 border-b" {...props}>
            {children}
          </h2>
        ),
        h3: ({ children, ...props }) => (
          <h3 className="h3" {...props}>
            {children}
          </h3>
        ),
        h4: ({ children, ...props }) => (
          <h4
            className="scroll-m-20 text-xl font-semibold tracking-tight"
            {...props}
          >
            {children}
          </h4>
        ),

        p: ({ children, ...props }) => (
          <p className="leading-7 not-first:mt-6" {...props}>
            {children}
          </p>
        ),

        blockquote: ({ children, ...props }) => (
          <blockquote className="mt-6 border-l-2 pl-6 italic" {...props}>
            {children}
          </blockquote>
        ),

        strong: ({ children, ...props }) => (
          <strong className="font-semibold" {...props}>
            {children}
          </strong>
        ),
        em: ({ children, ...props }) => (
          <em className="italic" {...props}>
            {children}
          </em>
        ),
        del: ({ children, ...props }) => (
          <del className="opacity-70" {...props}>
            {children}
          </del>
        ),

        a: ({ href, children, ...props }) => (
          <Button className="font-medium" variant={'link'} asChild>
            <a href={href} rel={'noopener noreferrer'} {...props}>
              {children}
            </a>
          </Button>
        ),

        img: ({ src, alt, title }) => (
          <img
            src={src}
            alt={alt}
            title={title}
            className="my-4 rounded-md border bg-muted object-contain"
          />
        ),

        // Lists
        ul: ({ children, ...props }) => (
          <ul className="my-4 ml-6 list-disc [&>li]:mt-2" {...props}>
            {children}
          </ul>
        ),
        ol: ({ children, ...props }) => (
          <ol className="my-4 ml-6 list-decimal [&>li]:mt-2" {...props}>
            {children}
          </ol>
        ),
        li: ({ children, ...props }) => (
          <li className="mt-1" {...props}>
            {children}
          </li>
        ),

        // Tables
        table: ({ node, ...props }) => (
          <div className="my-6 w-full overflow-auto">
            <table className="w-full min-w-150 table-auto" {...props} />
          </div>
        ),
        thead: ({ node, ...props }) => (
          <thead className="bg-muted/50 text-sm" {...props} />
        ),
        tbody: ({ node, ...props }) => <tbody {...props} />,
        tr: ({ node, ...props }) => (
          <tr className="even:bg-muted/20" {...props} />
        ),
        th: ({ node, ...props }) => (
          <th className="px-3 py-2 text-left text-sm font-medium" {...props} />
        ),
        td: ({ node, ...props }) => (
          <td className="px-3 py-2 align-top text-sm" {...props} />
        ),

        // Horizontal rule
        hr: () => <hr className="my-6 border-t border-muted" />,
      }}
      remarkPlugins={[remarkGfm]}
    >
      {text}
    </ReactMarkdown>
  );
};

export default Markdown;
