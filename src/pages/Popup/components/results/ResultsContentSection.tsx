import React from 'react';
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
  markdown: string;
}

const ResultsContentSection = ({
  markdown,
}: Props) => {
  return (
    <div className="h-[420px] px-3 py-4 border rounded border-gray-500 mx-2 my-2 overflow-x-hidden overflow-y-scroll">
      <MarkdownDocumentView markdown={markdown} />
    </div>
  )
}

export default ResultsContentSection



export const MarkdownDocumentView: React.FC<{ markdown?: string }> = ({
  markdown,
}) => (
  <Markdown
    className="flex flex-col gap-y-1 overflow-y-auto"
    remarkPlugins={[remarkGfm]}
    components={{
      h1: (props) => <h1 className="text-3xl font-bold">{props.children}</h1>,
      h2: (props) => <h2 className="text-2xl font-bold">{props.children}</h2>,
      h3: (props) => <h3 className="text-xl font-bold">{props.children}</h3>,
      a: (props) => (
        <a
          className="text-primary-light hover:text-primary"
          target="_blank"
          rel="noopener noreferrer"
          href={props.href}
        >
          {props.children}
        </a>
      ),
      ol: (props) => (
        <ol className="ml-3 list-outside list-decimal">{props.children}</ol>
      ),
      ul: (props) => (
        <ul className="ml-3 list-outside list-disc">{props.children}</ul>
      ),
      li: (props) => <li>{props.children}</li>,
    }}
  >
    {markdown ?? ""}
  </Markdown>
);