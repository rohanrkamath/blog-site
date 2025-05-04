// ** third party
import { MDXRemote } from "next-mdx-remote/rsc";

import { MDXComponents } from "mdx/types";
import remarkGfm from "remark-gfm";

// ** mui
import Link from "@mui/material/Link";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import StyledTableCell from "./markdown/styled/StyledTableCell";
import StyledTableRow from "./markdown/styled/StyledTableRow";
import Image, { ImageProps } from "next/image";
import MarkdownSyntaxHighlighter from "./markdown/SyntaxHighlighter";

type RenderMdxProps = {
  content: string;
};

export default function RenderMdx({ content }: RenderMdxProps) {
  const components: MDXComponents = {
    a({ className, children, ...props }) {
      return (
        <Link
          href={props.href}
          target={props.target}
          className={className}
          sx={{
            color: '#2196f3',
            '&:hover': {
              color: '#1976d2'
            }
          }}
          underline="hover"
        >
          {children}
        </Link>
      );
    },
    table({ className, children }) {
      return (
        <TableContainer component={Paper}>
          <Table size="small">{children}</Table>
        </TableContainer>
      );
    },
    thead({ className, children }) {
      return <TableHead>{children}</TableHead>;
    },
    tr({ className, children }) {
      return <StyledTableRow>{children}</StyledTableRow>;
    },
    th({ className, children }) {
      return <StyledTableCell>{children}</StyledTableCell>;
    },
    td({ className, children }) {
      return <StyledTableCell>{children}</StyledTableCell>;
    },
    img({ className, children, alt, src, ...props }) {
      if (!src) return <></>;
      return (
        <span style={{ display: 'block', textAlign: 'center', padding: '24px 0' }}>
          <Image
            alt={alt ?? ""}
            src={src}
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto", maxWidth: "700px", display: "inline-block" }}
          />
        </span>
      );
    },
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return match ? (
        <MarkdownSyntaxHighlighter codeLanguage={match[1]}>
          {children}
        </MarkdownSyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

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
        components={components}
      />
    </div>
  );
}
