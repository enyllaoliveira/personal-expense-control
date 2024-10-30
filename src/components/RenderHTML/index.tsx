import { ReactHTML, createElement } from "react";

interface IRenderHTML {
  rawHTML?: string | null;
  className?: string;
  tag: keyof ReactHTML;
}

export default function RenderHTML({ rawHTML, className, tag }: IRenderHTML) {
  return createElement(tag, {
    dangerouslySetInnerHTML: { __html: rawHTML },
    className,
  });
}
