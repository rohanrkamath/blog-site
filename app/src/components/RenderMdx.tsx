// ** third party
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

type RenderMdxProps = {
  content: string;
};

export default function RenderMdx({ content }: RenderMdxProps) {
  return (
    <div className="mdx-content">
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
          scope: {},
        }}
      />
    </div>
  );
}
